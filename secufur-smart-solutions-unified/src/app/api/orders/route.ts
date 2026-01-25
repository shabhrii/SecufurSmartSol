import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {
            items,
            shippingAddressId,
            totalAmount,
            currency = "INR"
        } = await req.json();

        if (!items || items.length === 0 || !shippingAddressId) {
            return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
        }

        // 1. Create Order and OrderItems in transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    userId: session.user.id,
                    totalAmount: parseFloat(totalAmount),
                    currency,
                    status: "PENDING",
                    shippingAddressId,
                    payment: {
                        create: {
                            amount: parseFloat(totalAmount),
                            status: "PENDING"
                        }
                    }
                },
                include: {
                    payment: true,
                    items: true
                }
            });

            // Create Order Items
            // Note: We need prices from DB for security, but for now assuming frontend passes valid data or we check it.
            // In production, fetch products first to get real price.

            for (const item of items) {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }
                });
            }

            return newOrder;
        });

        return NextResponse.json(order, { status: 201 });

    } catch (error) {
        console.error("Create Order Error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
