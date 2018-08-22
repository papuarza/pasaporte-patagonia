const nodemailer  = require('nodemailer');
const template = require('../templates/emailing.js');

module.exports = {
  sendTheEmail: (user, type, extraInfo) => {
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
        message = template.emailingTemplate(user, `${process.env.URL}/auth/confirmation/${user.activationCode}/${user.dni}`, 'Activa tu Cuenta', '¡Necesitas confirmar tu cuenta para poder empezar a sumar kilómetros y canjear premios ', 'Hacé click en el botón y empieza a disfrutar de tu Pasaporte Patagonia.', '');
        subject = '¡Confirma tu dirección de correo y empieza a sumar kilómetros! ✈️🍺'
        break;
      case 'recuperar':
        subject = '¡Recupera tu contraseña y sigue disfrutando del Pasaporte Patagonia! ✈️🍺';
        message = template.emailingTemplate(user, `${process.env.URL}/auth/recuperar/${user.activationCode}`, 'Recupera tu contraseña', '¡Si te olvidaste tu contraseña, no te preocupes, tenemos una solución!', '¡Hacé click en el botón y crea una nueva!');
        break;
      case 'voucher':
        subject = '¡Aquí tienes tu Voucher Patagonia! ✈️🍺';
        message = template.emailingTemplate(user, `${process.env.URL}/canjes`, 'Ver mis Vouchers', '¡Has generado un voucher', 'Para canjear tu premio acercate a uno de nuestros puntos de canje con el código de tu voucher.', `El código de tu voucher es: <strong>${extraInfo.voucher}</strong>`);
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