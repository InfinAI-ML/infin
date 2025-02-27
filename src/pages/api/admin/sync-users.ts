import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from '@clerk/nextjs/server';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Secure this endpoint with a secret key
  if (req.headers.authorization !== `Bearer ${process.env.SYNC_API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get database connection
    const { db } = await connectToDatabase();
    const collection = db.collection('users');
    
    console.log('Connected to database:', db.databaseName);
    console.log('Collections:', await db.listCollections().toArray());
    
    // Get Clerk client instance
    const clerk = await clerkClient();
    
    // Fetch users from Clerk (paginate for large user bases)
    const usersResponse = await clerk.users.getUserList({ limit: 100 });
    const users = usersResponse.data;
    let updatedCount = 0;
    
    for (const user of users) {
      const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
      
      // Update user in MongoDB
      await collection.updateOne(
        { clerkId: user.id },
        {
          $set: {
            email: primaryEmail,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            imageUrl: user.imageUrl,
            updated_at: new Date()
          }
        },
        { upsert: true }
      );
      updatedCount++;
    }
    
    return res.status(200).json({ success: true, syncedUsers: updatedCount });
  } catch (error) {
    console.error('Sync Error:', error);
    return res.status(500).json({ error: 'Failed to sync users' });
  }
}