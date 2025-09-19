import express, { application } from "express";
import AdminAuthRoutes from "./Routes/AdminAuth";
import UserAuthRoutes from "./Routes/UserAuth";


const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(express.json());
app.use('/ekart-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/admin/auth", AdminAuthRoutes);
app.use("/api/user/auth", UserAuthRoutes);



export default app;
