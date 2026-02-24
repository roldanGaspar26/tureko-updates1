const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const { getDb, admin } = require('../config/firebase');
const { sendQuoteNotification } = require('../config/mailer');
const services = require('../data/services');

const workforceOptions = [
  'Eco-Chef',
  'Sustainability Officer',
  'Eco-Tour Guide',
  'Environmental Compliance Manager',
  'Green Operations Consultant',
  'Climate Program Coordinator',
  'Waste Management Specialist',
  'ESG Reporting Officer',
  'Sustainable Procurement Specialist',
  'Not Required',
];

exports.getQuote = (req, res) => {
  res.render('quote', {
    title: 'Request a Quote — Tureko',
    services,
    workforceOptions,
    errors: [],
    formData: {},
    success: false,
  });
};

exports.validateQuote = [
  body('contactPerson').trim().notEmpty().withMessage('Contact person is required.'),
  body('email').trim().isEmail().withMessage('A valid email address is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('businessType').trim().notEmpty().withMessage('Business type is required.'),
  body('location').trim().notEmpty().withMessage('Location is required.'),
];

exports.postQuote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('quote', {
      title: 'Request a Quote — Tureko',
      services,
      workforceOptions,
      errors: errors.array(),
      formData: req.body,
      success: false,
    });
  }

  const sanitize = (str) =>
    sanitizeHtml(str || '', { allowedTags: [], allowedAttributes: {} });

  const data = {
    businessName: sanitize(req.body.businessName),
    contactPerson: sanitize(req.body.contactPerson),
    email: sanitize(req.body.email),
    phone: sanitize(req.body.phone),
    businessType: sanitize(req.body.businessType),
    location: sanitize(req.body.location),
    servicesNeeded: Array.isArray(req.body.servicesNeeded)
      ? req.body.servicesNeeded.map(sanitize)
      : req.body.servicesNeeded
      ? [sanitize(req.body.servicesNeeded)]
      : [],
    workforceNeeded: sanitize(req.body.workforceNeeded),
    message: sanitize(req.body.message),
    preferredStartDate: sanitize(req.body.preferredStartDate),
    status: 'new',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const db = getDb();
    await db.collection('quotes').add(data);

    try {
      await sendQuoteNotification(data);
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr.message);
    }

    return res.render('quote', {
      title: 'Request a Quote — Tureko',
      services,
      workforceOptions,
      errors: [],
      formData: {},
      success: true,
    });
  } catch (err) {
    console.error('Quote submission error:', err.message);
    return res.status(500).render('error', { title: 'Error — Tureko', message: 'An error occurred. Please try again.' });
  }
};
