import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Connect the client to server
  await client.connect()

  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME)
}

// const listDatabases = async (client) => {
//   const databaseList = await client.db().admin().listDatabases()
//   console.log('Your databases:')
//   databaseList.databases.forEach(db => console.log(` - ${db.name}`))
// }

// Get dbInstance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to Database first!')

  return dbInstance
}
