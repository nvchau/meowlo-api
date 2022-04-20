import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect the client to server
    await client.connect()
    console.log('Connected successfully to server')

    // List databases
    await listDatabases(client)
  } finally {
    // Ensure that the client will close when finish or error
    await client.close()
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases()
  console.log('Your databases:')
  databaseList.databases.forEach(db => console.log(` - ${db.name}`))
}
