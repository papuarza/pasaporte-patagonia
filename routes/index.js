const express = require('express');
const router  = express.Router();
const User = require("../models/User.js");
const Prize = require("../models/Prize.js");
const Voucher = require("../models/Voucher.js");
const Code = require("../models/Code.js");
const emailing = require('../nodemailer/config.js');

formatDate = (elem) => {
  let day = elem['created_at'].getDate();
  let month = elem['created_at'].getMonth();
  let year = elem['created_at'].getFullYear();
  return `${day}/${month+1}/${year}`
}

formatDateUpdate = (elem) => {
  let day = elem['updated_at'].getDate();
  let month = elem['updated_at'].getMonth();
  let year = elem['updated_at'].getFullYear();
  return `${day}/${month+1}/${year}`
} 

renderUserAndPrizes = (req, res, next, render) => {
  User.findById(req.session.passport.user, {_id:0, activationCode: 0})
  .then(user => {
    user['codesQ'] = user.codes.length;
    user['vouchersQ'] = user.vouchers.length;
    user['kmsToBariloche'] = 2640-user.kmsAvailable;
    Prize.find({})
    .sort({kms: -1 })
    .then(prizes => {
      prizes = prizes.map(prize => {
        prize['kmsLeft'] = prize.kms - user.kmsAvailable < 0 ? 0 : prize.kms - user.kmsAvailable;
        prize['available'] = prize['kmsLeft'] == 0 ? true : false;
        if(prize.kms == 2640) {
          prize['regularPrize'] = false;
          if(prize.qty >= process.env.BARILOCHE) user['prizeAvailable'] = false;
          else user['prizeAvailable'] = true;
        } else prize['regularPrize'] = true;
        return prize;
      })
      if(user['kmsToBariloche'] <= 0) {
        user['kmsToBariloche'] = 0;
        user['finalPrize'] = true;
      }
      res.render(render, {user, prizes});
    })
  })
  .catch(error => next(error))
}

ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.session.passport.user)
    .then(user => {
      if(user.role == 'Store') {
        res.redirect('/store-panel')
      } else if(user.role == 'Admin') {
        res.redirect('/info-promo');
      } else if(user.status == 'Activado') {
        return next();
      } else {
        res.redirect('/activar-cuenta')
      }
    })
    .catch(error => next(error))
  } else {
    res.redirect('/registro')
  }
}

ensureStoreRole = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.session.passport.user)
    .then(user => {
      user.role == 'Store' ? next() : res.redirect('/panel')
    })
  }
}

ensureAdminRole = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.session.passport.user)
    .then(user => {
      user.role == 'Admin' ? next() : res.redirect('/panel')
    })
  }
}

router.get('/', ensureAuthenticated, (req, res, next) => {
  renderUserAndPrizes(req, res, next, 'home')
});


router.get('/activar-cuenta', (req, res, next) => {
  User.findById(req.session.passport.user)
  .then(user => {
    res.render('activarCuenta', {user})
  })
  .catch(error => next(error))
});

router.get('/codigos', ensureAuthenticated, (req, res, next) => {
    res.render('codigo');
});

router.get('/profile', ensureAuthenticated, (req, res, next) => {
  User.find({}, {_id: 1})
  .sort({'kmsTotal': -1})
  .then(users => {
    User.findById(req.session.passport.user)
    .then(user => {
      usersArray = users.map(u => ''+u._id);
      let position = usersArray.indexOf(''+user._id)+1;
      let day = user['birthdate'].getDate();
      let month = user['birthdate'].getMonth();
      let year = user['birthdate'].getFullYear();
      user['formatDate'] = `${day}/${month+1}/${year}`;
      user['position'] = position;
      user['kmsToBariloche'] = 2640-user.kmsAvailable;
      res.render('profile', {user})
    })
  })
  .catch(error => next(error))
});

router.get('/faqs', (req, res, next) => {
  res.render('faq');
});

router.post('/enviar-consulta', (req, res, next) => {
  emailing.sendTheEmail({}, 'contactar', req.body)
    .then(info => {
      res.status(200).json({message: 'El correo ha sido enviado!'})
    })
    .catch(error => next(error));
});

router.get('/bases-condiciones', (req, res, next) => {
  res.render('bases', {layout: false});
});

router.get('/recuperar-password', (req, res, next) => {
  res.render('registro/recuperarPass', {layout: false});
});

router.get('/premios', ensureAuthenticated, (req, res, next) => {
  renderUserAndPrizes(req, res, next, 'premios')
})

router.get('/canjes', ensureAuthenticated, (req, res, next) => {
  User.findById(req.session.passport.user)
  .populate('vouchers')
  .populate('prize')
  .populate('codes')
  .then(user => {
    let voucherPromises = [];
    user.vouchers.forEach(voucher => {
      voucher['date'] = formatDate(voucher);
      voucherPromises.push(
        new Promise((resolve, reject) => {
          Prize.findById(voucher.prize)
          .then(prizeObj => {
            voucher['prizeObj'] = prizeObj;
            resolve(voucher)
          })
        })
      )
    })
    Promise.all(voucherPromises)
    .then(vouchers => {
      let codes = user.codes.map(code => {
        code['date'] = formatDateUpdate(code)
        return code
      })
      res.render('canjes', {vouchers, codes});
    })

  })
  .catch(error => next(error))
});

router.get('/premios', ensureAuthenticated, (req, res, next) => {
  res.render('premios');
});


router.get('/registro', (req, res, next) => {
  res.render('registro/index', {layout: false});
});

router.get('/registro/step-1', (req, res, next) => {
  res.render('registro/registroUno', {layout: false});
});

router.get('/registro/step-2', (req, res, next) => {
  User.findById(req.session.passport.user)
  .then(user => {
    res.render('registro/registroDos', {layout: false});
  })
  .catch(error => next(error))
});

router.get('/registro/step-3', (req, res, next) => {
  User.findById(req.session.passport.user)
  .then(user => {
    res.render('registro/registroTres', {layout: false, user});
  })
  .catch(error => next(error))
});

router.get('/registro/step-4', (req, res, next) => {
  User.findById(req.session.passport.user)
  .then(user => {
    res.render('registro/registroCuatro', {layout: false});
  })
  .catch(error => next(error))
});

router.get('/login', (req, res, next) => {
  res.render('registro/login', {layout: false});
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/registro");
});

router.get('/panel', (req, res, next) => {
  res.render("admin/login", {layout: false});
});

router.get('/store-panel', ensureStoreRole, (req, res, next) => {
  res.render('admin/voucherControl', {layout: false})
});

router.get('/canjes-realizados', ensureStoreRole, (req, res, next) => {
  Voucher.find({centro: req.user._id})
  .populate('user')
  .populate('prize')
  .then(vouchers => {
    res.render('admin/vouchersCanjeados', {layout: false, vouchers});
  })
  .catch(error => next(error))
});

router.get('/premios-entregados', ensureStoreRole, (req, res, next) => {
  let premiosEntregados = {
    'Mochila': 0,
    'Kepi': 0,
    'VoucherConsumición': 0,
    'Remera': 0,
    'VasoRiegsse': 0,
    'GrowlerCarga': 0,
    'Abridor': 0
  };
  Voucher.find({centro: req.user._id})
  .populate('prize')
  .then(vouchers => {
    premiosEntregados['Mochila'] = vouchers.filter(voucher => voucher.prize.name == "Mochila").length;
    premiosEntregados['Kepi'] = vouchers.filter(voucher => voucher.prize.name == "Kepi").length;
    premiosEntregados['VoucherConsumición'] = vouchers.filter(voucher => voucher.prize.name == "Voucher Consumición").length;
    premiosEntregados['Remera'] = vouchers.filter(voucher => voucher.prize.name == "Remera").length;
    premiosEntregados['VasoRiegsse'] = vouchers.filter(voucher => voucher.prize.name == "Vaso Riegsse").length;
    premiosEntregados['GrowlerCarga'] = vouchers.filter(voucher => voucher.prize.name == "Growler + Carga").length;
    premiosEntregados['Abridor'] = vouchers.filter(voucher => voucher.prize.name == "Abridor").length;
    res.render('admin/voucherControl', {layout: false, premiosEntregados});
  })
  .catch(error => next(error))
});

router.get('/usuarios', ensureAdminRole, (req, res, next) => {
  User.find({role: 'User'})
  .sort({kmsAvailable: -1})
  .then(users => {
    res.render('admin/listaUsuarios', {layout: false, users})
  })
  .catch(error => next(error))
});

router.get('/vouchers-totales', ensureAdminRole, (req, res, next) => {
  Voucher.find({status: 'Utilizado'})
  .populate('user')
  .populate('prize')
  .populate('centro')
  .then(vouchers => {
    res.render('admin/vouchersTotales', {layout: false, vouchers});
  })
  .catch(error => next(error))
});

router.get('/vouchers-generados', ensureAdminRole, (req, res, next) => {
  Voucher.find({status: 'Generado'})
  .populate('user')
  .populate('prize')
  .then(vouchers => {
    res.render('admin/voucherGeneradosTotal', {layout: false, vouchers});
  })
  .catch(error => next(error))
});

router.get('/premios-totales', ensureStoreRole, (req, res, next) => {
  res.render('admin/premiosTotales', {layout: false})
});


router.get('/info-promo', ensureAdminRole, (req, res, next) => {
  User.find({role: 'User'})
  .then(users => {
    Code.find({status: 'Canjeado'})
    .then(codes => {
      Voucher.find({status: 'Generado'})
      .then(vouchersGenerados => {
        Voucher.find({status: 'Utilizado'})
        .then(vouchersUtilizados => {
          codesTotal = {
            "4 Pack (Botella 355ml)": 0,
            "4 Pack (Botella 730ml)": 0,
            "6 Pack (Lata 24.7)": 0,
            "6 Pack (Lata 473ml)": 0,
            "Chopp ON": 0,
            "Chopp Refugio": 0,
            "Promo Botella 730ml ON": 0,
            "Test": 0
          }
          codes.forEach((code) => {
            codesTotal[code.type]++;
          })
          console.log(codesTotal)
          res.render('admin/infoPromo', {layout: false, codes, vouchersGenerados, vouchersUtilizados, users, codesTotal})
        })
      })
    })
  })
});

module.exports = router;
