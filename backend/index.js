import express from 'express';
import session from "express-session";
import passport from "passport";
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import { adminJs, router as adminRouter } from './admin.js';
import googleauthRoute from './routes/googleLoginRoute.js';
import facebookauthRoute from './routes/facebookLoginRoute.js';
import appleauthRoute from './routes/appleLoginRoute.js';
import registerRoute from './routes/registerRoute.js';
import sportsRoute from './routes/sportsRoute.js'
import profileRoute from './routes/profileRoute.js';
import sportsDetailRoute from './routes/sportsDetailRoute.js';


dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(
    session({
      secret: "your_secret_key", // Replace with a strong secret for cookie encryption
      resave: false, // Avoid resaving session if not modified
      saveUninitialized: true, // Save uninitialized session
      cookie: { secure: false }, // Set to true if using HTTPS
    })
  );

app.use(express.json());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/',googleauthRoute);
app.use("/",facebookauthRoute);
app.use("/",appleauthRoute);
app.use("/register",registerRoute);
app.use("/profile",profileRoute);
app.use('/sportsRegister',sportsRoute);
app.use('/sportsDetail',sportsDetailRoute);
// app.use('/api', userRoutes);
app.use(adminJs.options.rootPath, adminRouter);

server.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`AdminJS running on http://localhost:${process.env.PORT}${adminJs.options.rootPath}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync({ alter: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
