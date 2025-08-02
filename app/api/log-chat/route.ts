import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const TABLE_NAME = 'blendy-chat';

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

// Log environment variable status (without exposing actual values)
console.log('Environment check:', {
  hasApiKey: !!AIRTABLE_API_KEY,
  hasBaseId: !!AIRTABLE_BASE_ID,
  tableName: TABLE_NAME
});

if (!AIRTABLE_API_KEY) {
  console.error('Missing AIRTABLE_API_KEY environment variable');
  throw new Error('Missing AIRTABLE_API_KEY env var');
}
if (!AIRTABLE_BASE_ID) {
  console.error('Missing AIRTABLE_BASE_ID environment variable');
  throw new Error('Missing AIRTABLE_BASE_ID env var');
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID!);

export async function POST(req: NextRequest) {
  try {
    console.log('Log chat API called');
    const { userMessage, aiReply } = await req.json();
    
    if (!userMessage || !aiReply) {
      console.error('Missing required fields:', { hasUserMessage: !!userMessage, hasAiReply: !!aiReply });
      return NextResponse.json({ error: 'Missing userMessage or aiReply' }, { status: 400 });
    }

    console.log('Attempting to create Airtable record...');
    const created = await base(TABLE_NAME).create([
      {
        fields: {
          userMessage,
          aiReply,
          timestamp: new Date().toISOString(),
        },
      },
    ]);
    
    console.log('Airtable record created successfully:', created[0].id);
    return NextResponse.json({ success: true, recordId: created[0].id });
  } catch (err: any) {
    console.error('Airtable log error details:', {
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      response: err.response?.body,
      stack: err.stack
    });
    
    return NextResponse.json({ 
      error: err.message || 'Failed to log chat',
      details: err.code || 'Unknown error'
    }, { status: 500 });
  }
} 