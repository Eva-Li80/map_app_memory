// /app/api/users/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';

// Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// Create a new user
export async function POST(req: Request) {
  const { name, email, password } = await req.json(); // Declare the 'email' variable
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

// Update an existing user
export async function PUT(req: Request) {
  const { id, name } = await req.json();
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

// Delete a user
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
