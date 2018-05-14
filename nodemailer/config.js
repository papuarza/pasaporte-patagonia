const nodemailer  = require('nodemailer');
const template = require('../templates/emailing.js');

module.exports = {
  sendTheEmail: (user, type) => {
    console.log(user, type)
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
    let message = '';
    let subject = '';
    switch (type) {
      case 'activar':
        message = template.emailingTemplate(user, `${process.env.URL}/auth/confirmation/${user.activationCode}/${user.dni}`, 'Activa tu Cuenta', 'Necesitas confirmar tu cuenta para poder empezar a sumar kilómetros y canjear premios!', 'Hacé click en el botón y empieza a disfrutar de tu Pasaporte Patagonia.');
        subject = 'Confirma tu dirección de correo y empieza a sumar kilómetros! ✈️🍺'
        break;
      case 'recuperar':
        subject = 'Recupera tu contraseña y sigue disfrutando del Pasaporte Patagonia! ✈️🍺';
        message = template.emailingTemplate(user, `${process.env.URL}/auth/recuperar/${user.activationCode}`, 'Recupera tu contraseña', 'Si te olvidaste tu contraseña, no te preocupes, tenemos una solución!', 'Hacé click en el botón y crea una nueva!');
        break;
      case 'voucher':
        subject = 'Aquí tienes tu Voucher Patagonia! ✈️🍺';
        message = template.emailingTemplate(user, `${process.env.URL}/auth/recuperar/${user.activationCode}`, 'Voucher', 'Si te olvidaste tu contraseña, no te preocupes, tenemos una solución!', 'Hacé click en el botón y crea una nueva!');
        break;
    }
    return transporter.sendMail({
      from: '"Pasaporte Patagonia - ✈️🍺" <pasaporte@patagonia.com>',
      to: user.email,
      subject: subject, 
      html: message
    })
  }
}