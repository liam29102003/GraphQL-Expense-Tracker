import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import  mergedResolvers from './resolvers/index.js'
import mergedTypeDefs from './typeDefs/index.js'
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import {connectDB} from './db/connectDB.js';
import { buildContext} from "graphql-passport";
import { configurePassport} from './passport/passport.config.js';   
configurePassport();
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection:'sessions'
});
store.on('error',(error)=>{
    console.log(error);
});
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, //don't save session if unmodified
        saveUninitialized: false, //don't create session until something stored
        cookie:{
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            httpOnly: true, //prevent client side javascript from accessing the cookie
        },
        store: store
    })
)
app.use(passport.initialize());
app.use(passport.session());
const server  = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();

app.use('/', cors({
    origin: 'http://localhost:3000',
    credentials: true,
}), express.json(), expressMiddleware(server,{
    context: async ({req,res}) => buildContext({req, res})
}));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB(); 
console.log(`🚀 Server ready at http://localhost:4000/`);