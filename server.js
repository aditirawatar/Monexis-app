import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import plaidRoutes from "./routes/plaidRoutes.js";
import cors from "cors";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/plaid", plaidRoutes);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => console.log('❌ MongoDB connection error:', error));
