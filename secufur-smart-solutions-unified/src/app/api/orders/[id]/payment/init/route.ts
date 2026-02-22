import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Await params as per Next.js 15+ changes if needed, but in 14 it's direct.
        // In strict Next.js 15, params is a promise.
        const { id: orderId } = await params;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { payment: true }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (order.userId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 });
        }

        // Create Razorpay Order
        // Amount in Razorpay is in paisa (integer)
        const options = {
            amount: Math.round(order.totalAmount * 100),
            currency: order.currency,
            receipt: order.id,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Update local Payment record
        await prisma.payment.update({
            where: { orderId: order.id },
            data: {
                razorpayOrderId: razorpayOrder.id
            }
        });

        return NextResponse.json({
            orderId: razorpayOrder.id,
            amount: order.totalAmount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Payment Init Error:", error);
        return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
    }
}
