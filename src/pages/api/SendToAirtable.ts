// pages/api/SendToAirtable.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface AirtableRecord {
  fields: {
    Name: string;
    Email: string;
    Message: string;
    'Submitted At'?: string;
  };
}

interface AirtableResponse {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = new Date();
  const formattedDateTime = `${now.getDate().toString().padStart(2, '0')}/${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${now.getFullYear()} ${now
    .getHours()
    .toString()
    .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const AIRTABLE_API_KEY: string | undefined = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID: string | undefined = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME: string =
      process.env.AIRTABLE_TABLE_NAME || 'Table 1';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return res.status(500).json({
        error: 'Server configuration error: Missing Airtable credentials',
      });
    }

    // Prepare the data for Airtable
    const airtableData: AirtableRecord = {
      fields: {
        Name: name.trim(),
        Email: email.trim(),
        Message: message.trim(),
        'Submitted At': formattedDateTime,
      },
    };

    // Send data to Airtable
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`;

    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(airtableData),
    });

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text();
      console.error('Airtable API Error:', {
        status: airtableResponse.status,
        statusText: airtableResponse.statusText,
        body: errorData,
      });

      return res.status(500).json({
        error: 'Failed to save to Airtable',
        details: {
          status: airtableResponse.status,
          message: errorData,
        },
      });
    }

    const result: AirtableResponse = await airtableResponse.json();
    console.log('Success! Airtable record created:', result.id);

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully!',
      recordId: result.id,
    });
  } catch (error: any) {
    console.error('API Route Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
