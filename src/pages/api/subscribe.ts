import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    // Get database connection
    const { db } = await connectToDatabase();
    
    const collection = db.collection('subscribers');
    
    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    
    if (existingSubscriber) {
      return res.status(400).json({ error: 'Email is already subscribed' });
    }
    
    // Add new subscriber
    await collection.insertOne({
      email,
      subscribed_at: new Date(),
    });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'An error occurred while saving your subscription' });
  }
}