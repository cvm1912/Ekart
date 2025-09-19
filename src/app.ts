import express, { application } from "express";
import AdminAuthRoutes from "./Routes/AdminAuth";


const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(express.json());
app.use('/ekart-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/admin/auth", AdminAuthRoutes);



export default app;
