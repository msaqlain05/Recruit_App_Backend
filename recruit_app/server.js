import dotenv from 'dotenv';
import app from './app.js';         
import connectDB from './config/db.js';
import cors from 'cors';

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 7800;

// Connect to MongoDB
connectDB();

// ✅ Enable CORS BEFORE routes/middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // <-- Your frontend IP & port here
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// ✅ Optional: allow JSON parsing if not already done in app.js
// app.use(express.json());

// ✅ Start the server on 0.0.0.0 to allow LAN access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://192.168.1.166:${PORT}`);
});
