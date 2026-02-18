import patientRoutes from "../routes/patientRoutes.js";
import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());
app.use("/patients", patientRoutes);

export default app;
