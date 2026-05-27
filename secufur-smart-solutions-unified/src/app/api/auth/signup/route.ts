import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase();

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailLower }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user in the database
    const newUser = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: emailLower,
        password: hashedPassword,
        role: 'BUYER'
      }
    });

    // 4. Construct buyer user payload in correct format
    const buyerUser = {
      id: newUser.id,
      email: newUser.email,
      firstName: firstName,
      lastName: lastName,
      fullName: newUser.name || `${firstName} ${lastName}`,
      isEmailVerified: true,
      isMobileVerified: false,
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString()
    };

    // 5. Construct token set
    const tokens = {
      accessToken: `buyer-access-token-${newUser.id}`,
      refreshToken: `buyer-refresh-token-${newUser.id}`,
      expiresIn: 86400
    };

    return NextResponse.json(
      {
        success: true,
        data: {
          user: buyerUser,
          tokens
        },
        message: 'Account created successfully!'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
