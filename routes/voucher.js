const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router  = express.Router();
const User = require("../models/User.js");
const Prize = require("../models/Prize.js");
const Voucher = require("../models/Voucher.js");
const emailing = require('../nodemailer/config.js');


ensureStoreRole = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.session.passport.user)
    .then(user => {
      user.role == 'Store' ? next() : res.redirect('/panel')
    })
  }
}

router.post('/create/:id', (req, res, next) => {
  const userId = req.session.passport.user;
  const prizeId = req.params.id;
  Promise.all([
    User.findById(userId),
    Prize.findById(prizeId)
  ]).then(data => {
    let user = data[0] || null;
    let prize = data[1] || null;
    if(prize.kms > user.kmsAvailable) {
      res.status(200).json({subMessage: 'Lo sentimos', message: "No dispones de suficientes kms para éste premio!", instructions: 'Puedes intentar nuevamente accediento a la sección de "Premios" de la web.', redirection: 'VER PREMIOS', ref:'/premios'});
      return;
    } else {
      let voucherCode = crypto.randomBytes(8).toString('HEX');
      let newVoucher = new Voucher({
        voucher: voucherCode+user.name[0]+user.lastName[0],
        kmsUsed: prize.kms,
        user: userId,
        prize: prizeId,
      }).save()
      .then(voucher => {
        User.updateOne({ _id: userId }, {
          $inc: { kmsAvailable: -prize.kms},
          $push: { vouchers: voucher._id},
        }, {new: true} )
        .then(modifiedInfo => {
          emailing.sendTheEmail(user, 'voucher', voucher)
          .then(info => {
            res.status(200).json({subMessage: "Felicidades!", message: "Tu voucher ha sido generado.", instructions: 'En tu mail recibirás el voucher y las instrucciones para canjear tu premio. Para más información sobre tus vouchers, ingresá a la sección CANJES.', redirection: 'VER CANJES', ref:'/canjes'})
          })
          .catch(error => next(error))
        })
      })
    }
  })
  .catch(error => next(error))
});

router.post('/validate', (req, res, next) => {
  const voucherId = req.body.voucher;
  Voucher.findOne({voucher: voucherId})
  .populate('user')
  .populate('prize')
  .then(voucher => {
    if(!voucher) {
      res.status(200).json({message: 'No existe ningún voucher con ese código!', subMessage: 'Lo sentimos!'})
    } else if (voucher.status == 'Utilizado') {
      res.status(200).json({message: 'El voucher ya ha sido utilizado!', subMessage: 'Lo sentimos!', voucher})
    } else {
      res.status(200).json({message: 'El voucher está listo para ser canjeado!', subMessage: 'Genial!', voucher})
    }
  })
  .catch(error => next(error))
});

router.get('/trade/:voucher', ensureStoreRole, (req, res, next) => {
  const voucherId = req.params.voucher;
  Voucher.findOne({voucher: voucherId})
  .then(voucher => {
    if(!voucher) {
      res.render('admin/voucherTrade', {layout: false, message: 'No existe ningún voucher con ese código!'})
    } else if (voucher.status == 'Utilizado') {
      res.render('admin/voucherTrade', {layout: false, message: 'El voucher ya ha sido utilizado!'})
    } else {
      Voucher.updateOne({voucher: voucherId}, {$set: {status: 'Utilizado', centro: req.user._id}}, {new: true})
      .then(newVoucher => {
        res.render('admin/voucherTrade', {layout: false, message: 'El voucher ha sido procesado correctamente!'})
      })
    }
  })
  .catch(error => next(error))
});

module.exports = router;