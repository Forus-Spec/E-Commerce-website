import connect from './Utils/DBConnection.js';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from 'body-parser';
import "express-async-errors";
// import xss from 'xss-clean';
// import helmet from 'helmet';
const app = express();

import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import brandRouter from './routes/brandRoutes.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import imageRouter from './routes/imageRoute.js';
// import rateLimit from 'express-rate-limit';

import FourOFourMiddleware from './middleware/notFoundMiddleware.js';
import errorHandlerMiddleware from './middleware/errorMiddleware.js';

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors())
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 50, }));

app.use('/api/v1/', messageRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/', brandRouter);
app.use('/api/v1/', categoryRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', userRouter);
app.use('/api/v1',  imageRouter)

app.use(FourOFourMiddleware);
app.use(errorHandlerMiddleware);

connect("Fares Essayeh", app);
