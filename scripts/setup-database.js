const { MongoClient } = require("mongodb")

async function setupDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("MONGODB_URI environment variable is not set")
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()

    const db = client.db()

    // Create indexes for users collection
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ mobile: 1 }, { unique: true })

    // Create indexes for books collection
    await db.collection("books").createIndex({ title: "text", location: "text" })
    await db.collection("books").createIndex({ standard: 1, condition: 1, location: 1 })
    await db.collection("books").createIndex({ seller: 1 })
    await db.collection("books").createIndex({ createdAt: -1 })

  } catch (error) {
    console.error("Database setup failed:", error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

setupDatabase()
