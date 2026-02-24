const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const path = require('path');
const { getDb, getBucket, admin } = require('../config/firebase');
const { sendApplicationNotification } = require('../config/mailer');

const positionOptions = [
  'Eco-Chef',
  'Sustainability Officer',
  'Eco-Tour Guide',
  'Environmental Compliance Manager',
  'Green Operations Consultant',
  'Climate Program Coordinator',
  'Waste Management Specialist',
  'ESG Reporting Officer',
  'Sustainable Procurement Specialist',
];

exports.getCareers = (req, res) => {
  res.render('careers', {
    title: 'Careers — Tureko',
    positionOptions,
    errors: [],
    formData: {},
    success: false,
  });
};

exports.validateApplication = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.'),
  body('email').trim().isEmail().withMessage('A valid email address is required.'),
  body('contactNumber').trim().notEmpty().withMessage('Contact number is required.'),
  body('location').trim().notEmpty().withMessage('Location is required.'),
  body('position').trim().notEmpty().withMessage('Please select a position.'),
  body('skillsAndExperience').trim().notEmpty().withMessage('Skills and experience is required.'),
  body('agreeCode').equals('on').withMessage('You must agree to the Environmental Code of Conduct.'),
];

exports.postApplication = async (req, res) => {
  const renderWithErrors = (errors) =>
    res.render('careers', {
      title: 'Careers — Tureko',
      positionOptions,
      errors,
      formData: req.body,
      success: false,
    });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderWithErrors(errors.array());
  }

  if (!req.file) {
    return renderWithErrors([{ msg: 'Please upload your resume (PDF, max 2MB).' }]);
  }

  const sanitize = (str) =>
    sanitizeHtml(str || '', { allowedTags: [], allowedAttributes: {} });

  let resumeURL = '';
  try {
    const bucket = getBucket();
    const filename = `resumes/${Date.now()}_${path.basename(req.file.originalname)}`;
    const fileUpload = bucket.file(filename);

    await fileUpload.save(req.file.buffer, {
      metadata: { contentType: 'application/pdf' },
    });

    await fileUpload.makePublic();
    resumeURL = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${filename}`;
  } catch (uploadErr) {
    console.error('Resume upload error:', uploadErr.message);
    return renderWithErrors([{ msg: 'Resume upload failed. Please try again.' }]);
  }

  const hasExperience = req.body.hasSustainabilityExperience === 'yes';

  const data = {
    fullName: sanitize(req.body.fullName),
    email: sanitize(req.body.email),
    contactNumber: sanitize(req.body.contactNumber),
    location: sanitize(req.body.location),
    position: sanitize(req.body.position),
    skillsAndExperience: sanitize(req.body.skillsAndExperience),
    sustainabilityExperience: {
      hasExperience,
      explanation: sanitize(req.body.sustainabilityExplanation),
    },
    resumeURL,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const db = getDb();
    await db.collection('applications').add(data);

    try {
      await sendApplicationNotification(data);
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr.message);
    }

    return res.render('careers', {
      title: 'Careers — Tureko',
      positionOptions,
      errors: [],
      formData: {},
      success: true,
    });
  } catch (err) {
    console.error('Application submission error:', err.message);
    return res.status(500).render('error', { title: 'Error — Tureko', message: 'An error occurred. Please try again.' });
  }
};
