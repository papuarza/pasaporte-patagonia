document.addEventListener('DOMContentLoaded', () => {
  let map = document.getElementById('map-container');
  if(map) {
    var bar = new ProgressBar.Path('#heart-path', {
      easing: 'easeInOut',
      duration: 1400
    });
    bar.animate(kmsAvailable/2640);
  }

  let closePopUpButton = document.getElementById('close-pop-up');
  if(closePopUpButton) {
    closePopUpButton.addEventListener('click', () => {
      document.getElementById('tutorial-wrapper').style.display = 'none'
    })
  }
  

  validateForm = () => {
    let name = document.forms["step-one-form"]["name"].value;
    let lastName = document.forms["step-one-form"]["lastName"].value;
    let email = document.forms["step-one-form"]["email"].value;
    let dni = document.forms["step-one-form"]["dni"].value;
    let genre = document.forms["step-one-form"]["gender"].value;
    let day = document.forms["step-one-form"]["day"].value;
    let month = document.forms["step-one-form"]["month"].value;
    let year = document.forms["step-one-form"]["year"].value;
    document.getElementById("birthdate").value = `${year}-${month}-${day}`;
    if (name == '' || lastName == '' || email == '' || dni == '' || genre == '' || day == '' || month == '' || year == '') {
      document.getElementById("form-error-message").innerHTML = "Debes completar todos los campos del formulario!"
      return false
    }
  }

  validateSecondStepForm = () => {
    let password = document.forms["step-two-form"]["password"].value;
    let repeatPass = document.forms["step-two-form"]["repeat"].value;
    if (password != repeatPass) {
      document.getElementById("form-error-message").innerHTML = "Las contraseñas no coinciden!"
      return false
    }
  }

  validateLogin = () => {
    let password = document.forms["step-three-form"]["password"].value;
    let dni = document.forms["step-three-form"]["dni"].value;
    if (password == '' || dni == '') {
      document.getElementById("form-error-message").innerHTML = "Completa todos los campos!"
      return false
    }
  }

  validateProfileForm = () => {
    let email = document.forms["profile-form"]["email"].value;
    let password = document.forms["profile-form"]["password"].value;
    let repeatPass = document.forms["profile-form"]["repeat"].value;
    if (password != repeatPass) {
      document.getElementById("form-error-message").innerHTML = "Las contraseñas no coinciden!"
      return false
    } else if(password == '' || email == '') {
      document.getElementById("form-error-message").innerHTML = "Debe rellenar todos los campos!"
      return false
    } else {
      return true;
    }
  }

  let mayor = document.getElementById("mayor-trigger");
  if(mayor) {
    mayor.addEventListener('click', () => {
      let generarBtn = document.getElementById("nuevo-usuario-btn");
      let generarBtnFb = document.getElementById("nuevo-usuario-btn-fb");
      let ageInput = document.getElementById('mayor-input');
      if(generarBtn.classList.contains('disabled')) {
        generarBtn.classList.remove('disabled');
        generarBtnFb.classList.remove('disabled');
        ageInput.checked = true;
        mayor.style.fontFamily = "AmsiPro-Bold";
      } else {
        generarBtn.classList.add('disabled');
        generarBtnFb.classList.add('disabled');
        ageInput.checked = false;
        mayor.style.fontFamily = "AmsiPro-Light";
      }
    })
  }

  let genre = document.getElementById("genre-input");
  if(genre) {
    genre.addEventListener('click', () => {
      let genreList = document.getElementById('genre-list');
      let dayList = document.getElementById('day-list');
      let monthList = document.getElementById('month-list');
      let yearList = document.getElementById('year-list');
      dayList.classList.remove('show-input-options');
      monthList.classList.remove('show-input-options');
      yearList.classList.remove('show-input-options');
      if(genreList.classList.contains('show-input-options')) {
        genreList.classList.remove('show-input-options');
      } else {
        genreList.classList.add('show-input-options');
      }
    })
  }

  let genreOptions = document.getElementsByClassName("option-genre");
  if(genreOptions) {
    for(i = 0; i < genreOptions.length; i++) {
      genreOptions[i].addEventListener('click', (e) => {
        document.getElementById("genre-select").value = e.target.getAttribute("data-value");
        document.getElementById("current-genre").innerHTML = e.target.innerHTML
      })
    }
  }

  let day = document.getElementById("day-input");
  if(day) {
    day.addEventListener('click', () => {
      let genreList = document.getElementById('genre-list');
      let dayList = document.getElementById('day-list');
      let monthList = document.getElementById('month-list');
      let yearList = document.getElementById('year-list');
      genreList.classList.remove('show-input-options');
      monthList.classList.remove('show-input-options');
      yearList.classList.remove('show-input-options');
      if(dayList.classList.contains('show-input-options')) {
        dayList.classList.remove('show-input-options');
      } else {
        dayList.classList.add('show-input-options');
      }
    })
  }

  let dayOptions = document.getElementsByClassName("option-day");
  if(dayOptions) {
    for(i = 0; i < dayOptions.length; i++) {
      dayOptions[i].addEventListener('click', (e) => {
        document.getElementById("day-select").value = e.target.getAttribute("data-value");
        document.getElementById("current-day").innerHTML = e.target.innerHTML
      })
    }
  }

  let month = document.getElementById("month-input");
  if(month) {
    month.addEventListener('click', () => {
      let genreList = document.getElementById('genre-list');
      let dayList = document.getElementById('day-list');
      let monthList = document.getElementById('month-list');
      let yearList = document.getElementById('year-list');
      genreList.classList.remove('show-input-options');
      dayList.classList.remove('show-input-options');
      yearList.classList.remove('show-input-options');
      if(monthList.classList.contains('show-input-options')) {
        monthList.classList.remove('show-input-options');
      } else {
        monthList.classList.add('show-input-options');
      }
    })
  }

  let monthOptions = document.getElementsByClassName("option-month");
  if(monthOptions) {
    for(i = 0; i < monthOptions.length; i++) {
      monthOptions[i].addEventListener('click', (e) => {
        document.getElementById("month-select").value = e.target.getAttribute("data-value");
        document.getElementById("current-month").innerHTML = e.target.innerHTML
      })
    }
  }

  let year = document.getElementById("year-input");
  if(year) {
    year.addEventListener('click', () => {
      let genreList = document.getElementById('genre-list');
      let dayList = document.getElementById('day-list');
      let monthList = document.getElementById('month-list');
      let yearList = document.getElementById('year-list');
      genreList.classList.remove('show-input-options');
      dayList.classList.remove('show-input-options');
      monthList.classList.remove('show-input-options');
      if(yearList.classList.contains('show-input-options')) {
        yearList.classList.remove('show-input-options');
      } else {
        yearList.classList.add('show-input-options');
      }
    })
  }

  let yearOptions = document.getElementsByClassName("option-year");
  if(yearOptions) {
    for(i = 0; i < yearOptions.length; i++) {
      yearOptions[i].addEventListener('click', (e) => {
        document.getElementById("year-select").value = e.target.getAttribute("data-value");
        document.getElementById("current-year").innerHTML = e.target.innerHTML
      })
    }
  }

  chargeTheCode = (code) => {
      axios.post('/code/new', { code })
      .then((response) => {
        document.getElementById("message-wrapper").style.display = "flex";
        document.getElementById("code-value").value = "";
        document.getElementById("return-message").innerHTML = response.data.subMessage;
        document.getElementById("return-message-kms").innerHTML = response.data.message;
      })
      .catch((error) => {
        document.getElementById("message-wrapper").style.display = "flex"
        document.getElementById("code-value").value = "";
        document.getElementById("return-message").innerHTML = 'Lo sentimos!';
        document.getElementById("return-message-kms").innerHTML = 'Hubo un error durante la carga! Intentalo nuevamente.';
      });
  }

  let chargeCode = document.getElementById("code-charge");
  if(chargeCode) {
    chargeCode.addEventListener('click', (e) => {
      e.preventDefault();
      let codeValue = document.getElementById("code-value");
      chargeTheCode(codeValue.value);
    })
  }

  let vouchers = document.getElementsByClassName("voucher-button");
  if(vouchers) {
    for(i=0; i < vouchers.length; i++) {
      vouchers[i].addEventListener('click', (e) => {
        e.preventDefault();
        axios.post(`/voucher/create/${e.target.getAttribute('data-value')}`)
        .then((response) => {
          document.getElementById("response-message-voucher").style.display = "flex";
          document.getElementById("main-message").innerHTML = response.data.subMessage;
          document.getElementById("secondary-message").innerHTML = response.data.message;
          document.getElementById("instructions-message").innerHTML = response.data.instructions;
          document.getElementById("redirection-button").innerHTML = response.data.redirection;
          document.getElementById("redirection-button").href = response.data.ref;
        })
        .catch(response => {
          document.getElementById("response-message-voucher").style.display = "flex";
          document.getElementById("main-message").innerHTML = response.data.subMessage;
          document.getElementById("secondary-message").innerHTML = response.data.message;
          document.getElementById("instructions-message").innerHTML = response.data.instructions;
          document.getElementById("redirection-button").innerHTML = response.data.redirection;
          document.getElementById("redirection-button").href = response.data.ref;
        })
      })
    } 
  }

  let recuperarBtn = document.getElementById('recuperar-button');
  if(recuperarBtn) {
    recuperarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let email = document.getElementById('recuperar-email').value;
      axios.post(`/auth/recuperar-password`, {email})
      .then(response => {
        document.getElementById('form-error-message').innerHTML = 'El correo se ha enviado correctamente!';
        document.getElementById('form-error-message').style.color = '#fff';
      })
      .catch(error => {

      })
    })
  }

  let consultarBtn = document.getElementById('consultar-button');
  if(consultarBtn) {
    consultarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let email = document.getElementById('consultar-email').value;
      let phone = document.getElementById('consultar-phone').value;
      let consulta = document.getElementById('consultar-mensaje').value;
      axios.post(`/enviar-consulta`, {email, phone, consulta})
      .then(response => {
        document.getElementById('consultar-email').value = '';
        document.getElementById('consultar-phone').value = '';
        document.getElementById('consultar-mensaje').value = '';
        document.getElementById('consultar-return-message').innerHTML = 'El correo se ha enviado correctamente!';
        document.getElementById('consultar-return-message').style.color = '#fff';
      })
      .catch(error => {

      })
    })
  }

  let confirmationBtn = document.getElementById('confirmation-email');
  if(confirmationBtn) {
    confirmationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      axios.postque (`/auth/resend-activation`)
      .then(response => {
        document.getElementById('form-error-message').innerHTML = 'El correo se ha enviado correctamente!';
        document.getElementById('form-error-message').style.color = '#fff';
      })
      .catch(error => {

      })
    })
  }

  let menuMobileTrigger = document.getElementById("menu-mobile");
  if(menuMobileTrigger) {
    menuMobileTrigger.addEventListener('click', () => {
      let menuWrapper = document.getElementById("menu-mobile-wrapper");
      menuWrapper.style.display = 'flex';
      menuWrapper.classList.remove('slideOutLeft');
      menuWrapper.classList.add('slideInLeft');
    })
  } 

  let closeTrigger = document.getElementById("close-icon");
  if(closeTrigger) {
    closeTrigger.addEventListener('click', () => {
      let menuWrapper = document.getElementById("menu-mobile-wrapper");
      menuWrapper.classList.remove('slideInLeft');
      menuWrapper.classList.add('slideOutLeft');
    })
  };

  let voucherCheck = document.getElementById("voucher-check");
  if(voucherCheck) {
    voucherCheck.addEventListener('click', (e) => {
      e.preventDefault();
      let vocuherValue = document.getElementById("voucher-value");
      axios.post('/voucher/validate', { voucher: vocuherValue.value })
      .then((response) => {
        document.getElementById("message-wrapper").style.display = "flex";
        document.getElementById("return-message").innerHTML = response.data.subMessage;
        document.getElementById("return-message-kms").innerHTML = response.data.message;
        document.getElementById("voucher-owner").innerHTML = `<span style="font: 1em 'AmsiPro-Light', sans-serif;">Usuario: </span>${response.data.voucher.user.name} ${response.data.voucher.user.lastName}`;
        document.getElementById("voucher-prize").innerHTML = `<span style="font: 1em 'AmsiPro-Light', sans-serif;">Premio: </span>${response.data.voucher.prize.name}`;
        document.getElementById('trade-voucher').href = `/voucher/trade/${response.data.voucher.voucher}`
      })
      .catch((error) => {
        document.getElementById("message-wrapper").style.display = "flex"
        document.getElementById("return-message").innerHTML = 'Lo sentimos!';
        document.getElementById("return-message-kms").innerHTML = 'Hubo un error durante la carga! Intentalo nuevamente.';
      });
    })
  }
  
}, false);