import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'infinai';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const options: MongoClientOptions = {
    // Remove any current SSL/TLS options and use these:
    tls: true,
    ssl: true,
    tlsInsecure: false,
    // This specifically addresses the TLSv1 alert error:
    rejectUnauthorized: true,
    connectTimeoutMS: 30000
  };

  try {
    console.log("Attempting to connect to MongoDB...");
    const client = new MongoClient(MONGODB_URI!, options);
    await client.connect();
    const db = client.db(MONGODB_DB);
    console.log("Successfully connected to MongoDB database:", MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}