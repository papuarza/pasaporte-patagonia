const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User.js");
const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const emailing = require('../nodemailer/config.js');


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/confirmation/:confirmation/:dni", (req, res, next) => {
  const { dni, confirmation } = req.params;
  const confirmationCode = encodeURIComponent(confirmation)
  User.findOne({ dni: dni })
  .then(user => {
    if (user.activationCode == confirmationCode) {
      User.updateOne({ dni }, { $set: { status: 'Activado' }})
      .then(userActive => { 
        req.login(user, error => {
          if (!error) {
            res.redirect("/")
          }
          else next(error)
        })
      }) 
    } else {
      res.status(400).json({message: 'Error en la activación de la cuenta!'})
    }
  })
});

authRoutes.post("/signup/password", (req, res, next) => {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(req.session.passport.user, {$set: {password: hashPass}})
  .then(user => {
    emailing.sendTheEmail(user, 'activar')
          .then(info => {
            res.redirect('/registro/step-3')
          })
          .catch(error => next(error));
  })
  .catch(error => next(error))
})

authRoutes.post("/signup", (req, res, next) => {
  const { email, name, lastName, dni, birthdate, gender, flag } = req.body;

  if (!email || !dni || !name || !lastName || !birthdate || !gender) {
    res.send({ message: "Por favor indica todos los campos!"})
    return;
  }
  User.findOne({ $or: [{ dni: dni } ] })
  .then(user => {
    if (user !== null) {
      res.send({ message: "El DNI/Pasaporte ya existen"})
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashCode = bcrypt.hashSync(email, salt);
    const activationCode = encodeURIComponent(hashCode);
    const category = {
      name: 'Rookie',
      image: '/images/categorias/categoria_01@2x.png'
    }

    const newUser = new User({
      email, 
      name, 
      lastName, 
      dni, 
      birthdate,
      category, 
      gender,
      activationCode
    });

    newUser.save()
    .then(user => {
      req.login(user, error => {
        if (!error) {
          res.redirect('/registro/step-2')
        }
        else next(error)
      })
    })
    .catch(error => next(error))
      
    })
    .catch(error => next(error));
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

authRoutes.post("/edit", (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  const update = {$set: {email, password: hashPass}}
  User.findByIdAndUpdate(req.session.passport.user, update, {new: true})
  .then(user => {
    res.redirect('/')
  })
  .catch(error => next(error))
});

authRoutes.post("/recuperar-password", (req, res, next) => {
  const email = req.body.email;
  User.findOne({email})
  .then(user => {
    if(user) {
      emailing.sendTheEmail(user, 'recuperar')
            .then(info => {
              res.status(200).json({message: 'El correo ha sido enviado!'})
            })
            .catch(error => next(error));
    } else {
      res.status(200).json({message: 'No existe un usuario con esa dirección de correo.'})
    }
  })
  .catch(error => next(error));
});

authRoutes.get("/recuperar/:code", (req, res) => {
  const code = req.params.code;
  const confirmationCode = encodeURIComponent(code);
  User.findOne({activationCode: confirmationCode})
  .then(user => {
    res.render('registro/recuperarForm', {user, layout: false})
  })
  .catch(error => next(error))
});

authRoutes.post("/resend-activation", (req, res) => {
  User.findById(req.session.passport.user)
  .then(user => {
    sendTheEmail(user, 'activar')
    .then(info => {
      res.status(200).json({message: 'El correo se ha enviado correctamente!'})
    })
    .catch(error => next(error))
  })

});

authRoutes.post("/panel/login", (req, res, next) => {
  let { username, password } = req.body;
  Admin.findOne({username})
  .then(user => {
    if(!user) {
      res.status(200).json({message: 'El usuario no existe'});
    } else if (!bcrypt.compareSync(password, user.password)) {
      next(null, false, { message: 'Incorrect password' });
      return;
    } else {
      req.app.locals.user = user;
      res.redirect('/store-panel')
    }
  })
});

authRoutes.get('/facebook',
  passport.authenticate('facebook', { scope : ['email'] }));

authRoutes.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/registro' }),
  function(req, res) {
    res.render('registro/registroUno', {user: req.user, flag: true, layout: false});
  });

module.exports = authRoutes;
