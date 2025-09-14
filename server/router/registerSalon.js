
// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs'); // bcrypt for password hashing
const Salon = require('../schema/Salon'); // corrected model import

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post('/register/shop', upload.fields([
  { name: 'shopFrontPhoto', maxCount: 1 },
  { name: 'shopInteriorPhoto', maxCount: 1 },
  { name: 'passbookPhoto', maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      mobile, password, email, ownerName, salonName, address,
      genderType, latitude, longitude, bankName,
      accountNumber, accountHolder, ifsc, upiId,
      servicesAndTiming
    } = req.body;

    // ✅ Parse services JSON string if needed
    const parsedServicesAndTiming = typeof servicesAndTiming === 'string'
      ? JSON.parse(servicesAndTiming)
      : servicesAndTiming;

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSalon = new Salon({
      mobile,
      password: hashedPassword,
      email,
      ownerName,
      salonName,
      address,
      genderType,
      latitude,
      longitude,
      bankName,
      accountNumber,
      accountHolder,
      ifsc,
      upiId,
      servicesAndTiming: parsedServicesAndTiming,
      shopFrontPhoto: req.files?.shopFrontPhoto?.[0]?.filename || '',
      shopInteriorPhoto: req.files?.shopInteriorPhoto?.[0]?.filename || '',
      passbookPhoto: req.files?.passbookPhoto?.[0]?.filename || '',
    });

    await newSalon.save();
    res.status(201).json({ message: '✅ Salon registered successfully' });
  } catch (err) {
    console.error('❌ Error saving salon:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
