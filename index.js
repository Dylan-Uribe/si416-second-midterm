const { ApolloServer } = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    const {url} = await startStandaloneServer(server, {
        context: async ({req}) => {
            const token = req.headers.authorization || '';
            if (token) {
                try {
                    const user = jwt.verify(token, process.env.SECRET);
                    return { user };
                } catch (error) {
                    console.error('Invalid token', error);
                }
            }
            return { user: null };
        },
        listen: { port: 4000 },
    });
    console.log(`Server ready at: ${url}`);
}

startServer().catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
});