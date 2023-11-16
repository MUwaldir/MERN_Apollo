
import { typeDefs } from './graphql/typeDefs.js'
import { resolvers } from './graphql/resolvers.js'
import { startApolloServer } from './app.js'
import connectDB from './db.js'

connectDB()
startApolloServer(typeDefs,resolvers)
