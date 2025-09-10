
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Connection = require('./database/db');
const Routes = require('./router/authRouter');
const salon = require('./router/registerSalon');
const path = require('path');
const Booking = require('./router/bookingRouter');

dotenv.config();
const app = express();

// ✅ Handle CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to database
Connection();

// ✅ Route setup
app.use('/api', Routes);
app.use('/api', salon);
app.use('/api',Booking);

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Default route (optional)
app.get('/', (req, res) => {
  res.send('API running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
