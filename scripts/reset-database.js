const { MongoClient } = require("mongodb")

async function resetDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("MONGODB_URI environment variable is not set")
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    // console.log("Connected to MongoDB")

    const db = client.db()

    // Drop all collections
    const collections = await db.listCollections().toArray()

    for (const collection of collections) {
      await db.collection(collection.name).drop()
    }

  
  } catch (error) {
    console.error("Database reset failed:", error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

resetDatabase()
