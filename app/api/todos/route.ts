import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET semua todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

// POST tambah todo
export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title wajib diisi" }, { status: 400 });
    }

    const todo = await prisma.todo.create({
      data: { title },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: "Gagal tambah todo" }, { status: 500 });
  }
}

// PUT update todo (done / title)
export async function PUT(req: Request) {
  try {
    const { id, done, title } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID wajib ada" }, { status: 400 });
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(done !== undefined ? { done } : {}),
        ...(title ? { title } : {}),
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update todo" }, { status: 500 });
  }
}

// DELETE hapus todo
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID wajib ada" }, { status: 400 });
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Todo dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus todo" }, { status: 500 });
  }
}
