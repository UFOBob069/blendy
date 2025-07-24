import { NextRequest, NextResponse } from 'next/server';
import { getBlendyResponse } from '../../../lib/getBlendyResponse';

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();
  const reply = await getBlendyResponse(userMessage);
  return NextResponse.json({ reply });
} 