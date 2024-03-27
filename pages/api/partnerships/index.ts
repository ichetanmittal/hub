// API Route: /pages/api/partnerships.js or .ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, userId } = req.query; // Assuming `userId` represents the organization ID of the user

  try {
    let query = supabase
      .from('partnerships')
      .select('*')
      .eq('type', type);

    if (type === 'sent') {
      query = query
        .eq('sender_id', userId);
    } else if (type === 'received') {
      query = query
        .eq('receiver_id', userId) // Ensure 'received' partnerships are associated with the user's organization
    }

    let { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
  }
}
