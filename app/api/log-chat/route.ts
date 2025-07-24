import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const TABLE_NAME = 'blendy-chat';

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

if (!AIRTABLE_API_KEY) throw new Error('Missing AIRTABLE_API_KEY env var');
if (!AIRTABLE_BASE_ID) throw new Error('Missing AIRTABLE_BASE_ID env var');

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID!);

export async function POST(req: NextRequest) {
  try {
    const { userMessage, aiReply } = await req.json();
    if (!userMessage || !aiReply) {
      return NextResponse.json({ error: 'Missing userMessage or aiReply' }, { status: 400 });
    }
    const created = await base(TABLE_NAME).create([
      {
        fields: {
          userMessage,
          aiReply,
          timestamp: new Date().toISOString(),
        },
      },
    ]);
    return NextResponse.json({ success: true, recordId: created[0].id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to log chat' }, { status: 500 });
  }
} 