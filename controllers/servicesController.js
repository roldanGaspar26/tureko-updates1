const services = require('../data/services');

exports.getServices = (req, res) => {
  res.render('services', {
    title: 'Services — Tureko',
    services,
  });
};
