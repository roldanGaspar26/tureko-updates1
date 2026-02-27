const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
}

function emailConfigured() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    console.warn('[Mailer] EMAIL_USER, EMAIL_PASS, or EMAIL_TO is not set in .env — skipping email notification.');
    return false;
  }
  return true;
}

async function sendQuoteNotification(data) {
  if (!emailConfigured()) return;
  const transporter = createTransporter();
  const servicesText = Array.isArray(data.servicesNeeded)
    ? data.servicesNeeded.join(', ')
    : data.servicesNeeded || 'N/A';

  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
    <div style="background:#1a5c2e;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;letter-spacing:4px;font-size:22px;">TUREKO</h1><p style="color:#a8d5b5;margin:4px 0 0;font-size:13px;">New Quote Request</p></div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#555;width:180px;font-size:14px;">Business Name</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.businessName || 'N/A'}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Contact Person</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.contactPerson}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.email}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Phone</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.phone}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Business Type</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.businessType}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Location</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.location}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Services Needed</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${servicesText}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Workforce Needed</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.workforceNeeded || 'N/A'}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Preferred Start Date</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.preferredStartDate || 'N/A'}</td></tr>
      </table>
      <div style="margin-top:24px;padding:16px;background:#f8f9fa;border-radius:6px;"><p style="color:#555;font-size:13px;margin:0 0 8px;">Project Description</p><p style="font-size:14px;margin:0;line-height:1.6;">${data.message || 'No description provided.'}</p></div>
    </div>
    <div style="background:#f0f7f3;padding:16px;text-align:center;"><p style="color:#888;font-size:12px;margin:0;">Tureko &mdash; ${new Date().toLocaleString()}</p></div>
  </div>`;

  await transporter.sendMail({
    from: `"Tureko Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `[Tureko] New Quote Request — ${data.contactPerson}`,
    html,
  });
}

async function sendApplicationNotification(data) {
  if (!emailConfigured()) return;
  const transporter = createTransporter();

  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
    <div style="background:#1a5c2e;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;letter-spacing:4px;font-size:22px;">TUREKO</h1><p style="color:#a8d5b5;margin:4px 0 0;font-size:13px;">New Career Application</p></div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#555;width:200px;font-size:14px;">Full Name</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.fullName}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.email}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Contact Number</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.contactNumber}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Location</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.location}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Position</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.position}</td></tr>
        <tr><td style="padding:8px 0;color:#555;font-size:14px;">Sustainability Experience</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${data.sustainabilityExperience.hasExperience ? 'Yes' : 'No'}</td></tr>
      </table>
      <div style="margin-top:24px;padding:16px;background:#f8f9fa;border-radius:6px;"><p style="color:#555;font-size:13px;margin:0 0 8px;">Skills and Experience</p><p style="font-size:14px;margin:0;line-height:1.6;">${data.skillsAndExperience}</p></div>
      ${data.sustainabilityExperience.explanation ? `<div style="margin-top:16px;padding:16px;background:#f0f7f3;border-radius:6px;"><p style="color:#555;font-size:13px;margin:0 0 8px;">Sustainability Details</p><p style="font-size:14px;margin:0;line-height:1.6;">${data.sustainabilityExperience.explanation}</p></div>` : ''}
      <div style="margin-top:24px;padding:16px;background:#e8f5e9;border-radius:6px;"><p style="color:#1a5c2e;font-size:13px;margin:0 0 8px;font-weight:600;">Resume Link</p><a href="${data.resumeURL}" style="color:#2e7d32;font-size:14px;word-break:break-all;">${data.resumeURL}</a></div>
    </div>
    <div style="background:#f0f7f3;padding:16px;text-align:center;"><p style="color:#888;font-size:12px;margin:0;">Tureko &mdash; ${new Date().toLocaleString()}</p></div>
  </div>`;

  await transporter.sendMail({
    from: `"Tureko Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `[Tureko] New Application — ${data.fullName} (${data.position})`,
    html,
  });
}

module.exports = { sendQuoteNotification, sendApplicationNotification };
