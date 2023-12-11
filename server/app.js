import express from "express";
import User from "./src/models/user.model.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.get("/", (req, res) => res.send("hello welcome merndb"));
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server,
    {
      context: async ({ req }) => {
        // console.log("Entrando en la función de contexto");
        const auth = req ? req.headers.authorization : null;
        // console.log(auth);
        // Declarar token fuera del bloque try
        let token = null; // Establece token en null por defecto
  
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          try {
            token = auth.substring(7);
            // console.log(token);
            const decodedToken = jwt.verify(token, "tu-secreto-secreto");
            console.log(decodedToken);
            const { id } = decodedToken;
  
            const currentUser = await User.findById(id);
            console.log('userr  :  '+currentUser);
            return { currentUser };
          } catch (error) {
            console.error("Error al verificar el token:", error.message, token);
            // token ya está establecido en null
          }
        }
  
        return { currentUser: null }; // Retorna un objeto con currentUser: null si no se proporciona un token válido
      },
    }));

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log("🚀 Server ready at http://localhost:4000/graphql");
}
