const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

const users = [
  {
    id: '1',
    username: 'sisadmin',
    password: 'sisadmin',
  },
];

const resolvers = {
  Query: {
    _empty: () => 'API is running!',
  },
  Mutation: {
    login: (_, { username, password }) => {
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
      return { token, user: { id: user.id, username: user.username } };
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Inicia o servidor Apollo

  const app = express();
  app.use(cors()); // Adiciona middleware CORS

  server.applyMiddleware({ app }); // Aplica o middleware Apollo Server ao app Express

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
