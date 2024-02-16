const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();

const db = require('./src/config/database');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

const { errorHandler } = require('./src/utils/error');

const app = express();
app.use(cors());

const server = new ApolloServer({
	cors: true,
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const user = req.headers.authorization ? true : false;

		if (!user) {
			throw new Error('Unauthorized Access');
		}

		return {
			db,
			user,
		};
	},
});

async function startServer() {
	await server.start();
	server.applyMiddleware({ app, path: '/graphql' });

	// Middleware
	app.use(express.json(), express.urlencoded({ extended: true }));

	app.use(errorHandler);

	app.get('/', (req, res) => {
		res.json({ message: 'Welcome to Knowledge Base API.' });
	});

	const PORT = process.env.PORT || 8081;
	app.listen(PORT, () => {
		console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
	});
}

startServer();
