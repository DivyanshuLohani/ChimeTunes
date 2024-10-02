import { configDotenv } from "dotenv";
import express from "express";

// Set environment variables
configDotenv();

const app = express();

app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Sync Chat App Backend!");
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
