import express, { application } from "express";
import AdminAuthRoutes from "./Routes/AdminAuth";


const app = express();

app.use(express.json());
app.use("/api/admin/auth", AdminAuthRoutes);



export default app;
