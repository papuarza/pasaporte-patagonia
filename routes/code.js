const express = require('express');
const router  = express.Router();
const User = require("../models/User.js");
const Code = require("../models/Code.js");


userCategory = (kms) => {
  if(kms >= 200) return {name: 'God', image: '/images/categorias/categoria_05@2x.png'}
  if(kms >= 175) return {name: 'Master', image: '/images/categorias/categoria_04@2x.png'}
  if(kms >= 150) return {name: 'The Man', image: '/images/categorias/categoria_03@2x.png'}
  if(kms >= 100) return {name: 'Junior', image: '/images/categorias/categoria_02@2x.png'}
  if(kms < 100) return {name: 'Rookie', image: '/images/categorias/categoria_01@2x.png'}
}

router.post('/new', (req, res, next) => {
  const value = req.body.code;
  const userId = req.session.passport.user;
  Code.findOne({code_id: value})
  .then(code => {
    if(!code) {
      res.status(200).json({message: 'El código que ingresaste no existe.', subMessage: 'Lo sentimos!'});
      return;
    } else if(code.status == 'Canjeado') {
      res.status(200).json({message: 'El código que ingresaste ya ha sido utilizado.', subMessage: 'Lo sentimos!'})
      return;
    } else {
      User.findOne({_id: userId})
      .populate('codes')
      .then(user => {
        let usedCode = []; 
        usedCode = user.codes.filter(codeElem => codeElem.code_id == value);
        if(usedCode.length > 0) {
          res.status(200).json({message: 'El código promocional solo puede ser utilizado una vez.', subMessage: 'Lo sentimos!'})
          return;
        } else {
          userTodayCode = user.codes.filter(codeElem => `${codeElem.updated_at.getDate()}/${codeElem.updated_at.getMonth()+1}/${codeElem.updated_at.getFullYear()}` == `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`);
          if(userTodayCode.length >= 5) {
            res.status(200).json({message: 'Solo puedes cargar 5 códigos diarios, mañana puedes intentarlo otra vez!', subMessage: 'Lo sentimos!'})
          } else {
            let newCategory = userCategory(user.kmsTotal+code['kmsValue']);
            User.updateOne( {_id: userId}, 
            {
              $push: { codes: code._id},
              $set:  { category: newCategory},
              $inc:  { kmsTotal: code['kmsValue'], kmsAvailable: code['kmsValue']}
            }, 
            { new: true })
            .then(updatedUser => {
              Code.findOne({code_id: value})
              .then(codeFind => {
                codeFind.type == 'Programatic' ? update = {$set: {status: 'Pendiente'}} : update = {$set: {status: 'Canjeado'}};
                Code.updateOne({code_id: value}, update, {new: true})
                .then(codeReady => {
                  res.status(200).json({message: `Has acumulado correctamente ${code.kmsValue}kms!`, subMessage: 'Felicidades!'});
                })
              })
            })
          };
        };
      })
    }
  })
  .catch(error => next(error))
});


module.exports = router;
