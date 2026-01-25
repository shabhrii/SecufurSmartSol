import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;
    const search = searchParams.get("search");

    try {
        const whereClause: any = {
            isActive: true,
        };

        if (category) {
            whereClause.category = category;
        }

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        const products = await prisma.product.findMany({
            where: whereClause,
            take: limit,
            include: {
                seller: {
                    select: {
                        businessName: true
                        // rating: true // Field does not exist in schema yet
                    }
                },
                reviews: {
                    select: {
                        rating: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Transform to match frontend expected structure
        const mappedProducts = products.map((p: any) => {
            const avgRating = p.reviews.length > 0
                ? p.reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / p.reviews.length
                : 0;

            return {
                ...p,
                rating: {
                    average: avgRating,
                    distribution: { five: 0, four: 0, three: 0, two: 0, one: 0 } // Placeholder
                },
                reviewCount: p.reviews.length,
                sellerInfo: {
                    name: p.seller.businessName,
                    rating: 0 // Placeholder
                }
            };
        });

        return NextResponse.json({
            products: mappedProducts,
            totalCount: products.length,
            page: 1,
            totalPages: 1
        });
    } catch (error) {
        console.error("Product fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
