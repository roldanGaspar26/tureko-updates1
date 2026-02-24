const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const servicesController = require('../controllers/servicesController');
const quoteController = require('../controllers/quoteController');
const careersController = require('../controllers/careersController');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed.'), false);
  },
});

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', homeController.getHome);
router.get('/services', servicesController.getServices);

router.get('/quote', quoteController.getQuote);
router.post('/quote', formLimiter, quoteController.validateQuote, quoteController.postQuote);

router.get('/careers', careersController.getCareers);
router.post(
  '/careers',
  formLimiter,
  (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
      if (err) {
        return res.render('careers', {
          title: 'Careers — Tureko',
          positionOptions: [
            'Eco-Chef','Sustainability Officer','Eco-Tour Guide','Environmental Compliance Manager',
            'Green Operations Consultant','Climate Program Coordinator','Waste Management Specialist',
            'ESG Reporting Officer','Sustainable Procurement Specialist',
          ],
          errors: [{ msg: err.message }],
          formData: req.body,
          success: false,
        });
      }
      next();
    });
  },
  careersController.validateApplication,
  careersController.postApplication
);

module.exports = router;
