import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id: orderId } = await params;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { payment: true }
        });

        if (!order || !order.payment || !order.payment.razorpayOrderId) {
            return NextResponse.json({ success: false, message: "Invalid order state" }, { status: 400 });
        }

        if (order.payment.razorpayOrderId !== razorpay_order_id) {
            return NextResponse.json({ success: false, message: "Order ID mismatch" }, { status: 400 });
        }

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Success
            await prisma.$transaction([
                prisma.payment.update({
                    where: { orderId: orderId },
                    data: {
                        status: "SUCCESS",
                        razorpayPaymentId: razorpay_payment_id,
                        razorpaySignature: razorpay_signature
                    }
                }),
                prisma.order.update({
                    where: { id: orderId },
                    data: {
                        status: "CONFIRMED"
                    }
                })
            ]);

            return NextResponse.json({ success: true, orderId });
        } else {
            return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
        }

    } catch (error) {
        console.error("Payment Verify Error:", error);
        return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
    }
}
