# Tureko — Sustainability & Tourism Consultancy Website

A full-stack, production-ready sustainability agency website built with Node.js, Express.js, EJS, and Firebase.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in all values:
```bash
cp .env.example .env
```

### 3. Add Your Logo
Place your logo image at:
```
public/images/logo.jpg
```

### 4. Start the Server
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

---

## 🏗️ Project Structure

```
tureko/
├── config/
│   ├── firebase.js       # Firebase Admin SDK initialization
│   └── mailer.js         # Nodemailer email utility
├── controllers/
│   ├── homeController.js
│   ├── servicesController.js
│   ├── quoteController.js
│   └── careersController.js
├── data/
│   └── services.js       # All services data
├── routes/
│   └── index.js          # All route definitions
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── services.ejs
│   ├── quote.ejs
│   ├── careers.ejs
│   └── error.ejs
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/logo.jpg   ← Add your logo here
├── firestore.rules
├── storage.rules
├── server.js
├── .env.example
└── package.json
```

---

## 🔒 Security Features

- **Helmet.js** — Secure HTTP headers
- **express-rate-limit** — Rate limiting on form routes (10 req / 15 min)
- **Input validation** — express-validator on all form fields
- **Sanitization** — sanitize-html on all user inputs
- **Body size limits** — 10KB max for JSON/URL-encoded bodies
- **File validation** — PDF only, 2MB max for resume uploads
- **No hardcoded credentials** — All secrets via environment variables
- **No stack traces in production** — Generic error messages
- **Firestore rules** — Allow create, deny public read/update/delete

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home page |
| `/services` | Full services listing (5 categories, 45 services) |
| `/quote` | Request a quote form |
| `/careers` | Career application form with resume upload |

---

## 🎨 Design System

- **Primary Color**: `#1a5c2e` (Deep Green)
- **Accent**: `#4caf50` (Light Green)
- **Background**: `#ffffff` (White)
- **Font**: Inter (sans-serif) + Playfair Display (headings)
- **Opening Animation**: Fade-in small-caps "tureko" in green on first load

---

Built with ❤️ for a climate-responsible future by Tino!
