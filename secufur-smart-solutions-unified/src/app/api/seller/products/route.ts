import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user || (session.user as any).role !== "SELLER") {
            return NextResponse.json({ error: "Unauthorized access. Seller role required." }, { status: 401 });
        }

        const body = await req.json();
        const {
            name,
            description,
            price,
            category,
            subcategory,
            images,
            stock,
            specifications
        } = body;

        // Basic validation
        if (!name || !description || !price || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find seller profile using session.user.id
        const sellerProfile = await prisma.sellerProfile.findUnique({
            where: { userId: session.user.id }
        });

        if (!sellerProfile) {
            return NextResponse.json({ error: "Seller profile not found. Please complete your profile." }, { status: 404 });
        }

        const product = await prisma.product.create({
            data: {
                sellerId: sellerProfile.id,
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                category,
                subcategory,
                images: images || [],
                specifications: specifications || {}, // Json type
                isActive: true
            }
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Create product error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
