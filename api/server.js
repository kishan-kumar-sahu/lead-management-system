const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const User = require('./models/User');

dotenv.config();

const app = express();
const defaultPort = Number(process.env.PORT || 5173);
const mongoUri = process.env.MONGODB_URI;

// app.use(cors());
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3005",
      "https://lead-management-system-1-6ekb.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
   
app.use(express.json());

const seedAdminUser = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@leaddesk.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('Seeded default admin user');
    }
  } catch (error) {
    console.warn('Admin seed skipped:', error.message);
  }
};

connectDB(mongoUri).then((connected) => {
  if (connected) {
    seedAdminUser();
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (_req, res) => {
  res.json({ message: 'Protected route works' });
});

app.use(errorMiddleware);

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(` server is listening on port ${server.address().port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is busy. Trying ${port + 1}...`);
      startServer(port + 1);
      return;
    }

    throw error;
  });
}

startServer(defaultPort);
