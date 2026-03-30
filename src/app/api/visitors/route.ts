import { incrementVisitors, getVisitorCount } from "@/lib/visitors";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const count = await incrementVisitors();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await getVisitorCount();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}