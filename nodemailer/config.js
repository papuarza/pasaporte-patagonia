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
    let email = '';
    let fromSender = '';
    switch (type) {
      case 'activar':
        message = template.emailingTemplate(user, `${process.env.URL}/auth/confirmation/${user.activationCode}/${user.dni}`, 'Activa tu Cuenta', ' necesitas confirmar tu cuenta para poder empezar a sumar kilómetros y canjear premios', 'Hacé click en el botón y empieza a disfrutar de tu Pasaporte Patagonia.', '');
        subject = '¡Confirma tu dirección de correo y empieza a sumar kilómetros! ✈️🍺';
        email = user.email;
        fromSender = '"Pasaporte Patagonia - ✈️🍺" <pasaporte@patagonia.com>';
        emailUser = '';
        break;
      case 'recuperar':
        subject = '¡Recupera tu contraseña y sigue disfrutando del Pasaporte Patagonia! ✈️🍺';
        message = template.emailingTemplate(user, `${process.env.URL}/auth/recuperar/${user.activationCode}`, 'Recupera tu contraseña', ' si te olvidaste tu contraseña, no te preocupes, tenemos una solución!', '¡Hacé click en el botón y crea una nueva!', '');
        email = user.email;
        fromSender = '"Pasaporte Patagonia - ✈️🍺" <pasaporte@patagonia.com>';
        emailUser = '';
        break;
      case 'voucher':
        subject = '¡Aquí tienes tu Voucher Patagonia! ✈️🍺';
        message = template.emailingTemplate(user, `${process.env.URL}/canjes`, 'Ver mis Vouchers', ' has generado un voucher', 'Para canjear tu premio acercate a uno de nuestros puntos de canje con el código de tu voucher y cédula de identidad', `El código de tu voucher es: <strong>${extraInfo.voucher}</strong>`);
        email = user.email;
        fromSender = '"Pasaporte Patagonia - ✈️🍺" <pasaporte@patagonia.com>';
        emailUser = '';
        break;
      case 'contactar':
        subject = 'Consulta en la web de Patagonia';
        message = `Desde la web de Pasaporte Patagonia, un usuario tiene una consulta.<br><br><br>
        Consulta:<br>
        ${extraInfo.consulta}<br><br>
        Los datos de contacto del usuario son:<br>
        Email: ${extraInfo.email}<br>
        Celular:${extraInfo.phone}`;
        email = [process.env.MAILTO];
        emailUser = [process.env.MAILTO]
        emailUser.push(extraInfo.email);
        break;
        case 'newsletter':
        subject = '¡Seguí acumulando kms en tu Pasaporte Patagonia!';
        message = template.emailingTemplate(user, `${process.env.URL}`, 'Sumar kilómetros', ` tenés ${user.kmsAvailable}kms en tu Pasaporte Patagonia`, '¡Seguí acumulando que podes canjear por premios o viajar a Bariloche!', '');
        email = user.email;
        fromSender = '"Pasaporte Patagonia - ✈️🍺" <pasaporte@patagonia.com>';
        emailUser = '';
    }
    return transporter.sendMail({
      from: fromSender,
      to: email,
      replyTo: emailUser,
      subject: subject, 
      html: message
    })
  }
}