import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import auditRoutes from "./routes/auditRoutes.js";


dotenv.config();

const app = express();


// MIDDLEWARE

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// --------------------
// ROUTES
// --------------------
// IMPORTANT: this prefix decides your frontend URL
app.use("/api/audit", auditRoutes);


// --------------------
// TEST ROUTE
// --------------------
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});