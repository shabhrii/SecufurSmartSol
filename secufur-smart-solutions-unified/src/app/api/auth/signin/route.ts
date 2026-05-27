import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase();

    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: emailLower }
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 2. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 3. Extract first/last name
    const nameParts = (user.name || 'John Doe').trim().split(/\s+/);
    const firstName = nameParts[0] || 'John';
    const lastName = nameParts.slice(1).join(' ') || 'Doe';

    const buyerUser = {
      id: user.id,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      fullName: user.name || `${firstName} ${lastName}`,
      isEmailVerified: true,
      isMobileVerified: !!user.phone,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };

    const tokens = {
      accessToken: `buyer-access-token-${user.id}`,
      refreshToken: `buyer-refresh-token-${user.id}`,
      expiresIn: 86400
    };

    return NextResponse.json(
      {
        success: true,
        data: {
          user: buyerUser,
          tokens
        },
        message: 'Sign-in successful!'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signin API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
