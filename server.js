require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { initFirebase } = require('./config/firebase');

const app = express();

// Initialize Firebase
initFirebase();

// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https://storage.googleapis.com'],
      },
    },
  })
);

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Body parsing (limit size)
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const routes = require('./routes/index');
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { title: '404 — Tureko', message: 'Page not found.' });
});

// Error handler (no stack traces in production)
app.use((err, req, res, next) => {
  console.error(err.message);
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred.'
      : err.message;
  res.status(500).render('error', { title: 'Error — Tureko', message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tureko server running on port ${PORT}`);
});
