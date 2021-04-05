var validateNumberOrEmail;
var validateFullname;
var validateUsername;
var validatePassword;

const InputValidator = (function() {
	
	//AJAX METHODS 
	 function searchRepeatDataViaAjax(input, column = "", theUrl = "", func) {
    return $.ajax({
			url:theUrl,
			data: {input:JSON.stringify(input.val()), sqlColumn:column},
			type:'POST',
			dataType:"json",
			success:function(data) {
				func(input, data);
			}
		});
	}
	
	//METHODS OF VALIDATE MOBILE NUMBER OR EMAIL
	validateNumberOrEmail = function(input) {
		input = $(input);
		if(input.val() !== "") {
			searchRepeatDataViaAjax(input,"number_or_email" , "/my_fullstack_instagram/searchForEquals", finalizyTheEmailOrNumberValidation);
			return;
		}
		manipulateStatusInputVisibility(icone, false);
	}
	
	
	function finalizyTheEmailOrNumberValidation(input, theNameAlredyExist) {
		const isAInvalidEmail = validateRegexp(input.val(), /^\w+@{1}(outlook|hotmail|gmail)\.com{1}$/);
		const isAInvalidMobileNumber = validateRegexp(input.val(), /^\d{8}$/);
		const icone = input.parent().children("i");
		showIconeBasedInTheEmailOrMobileValidation(isAInvalidEmail, isAInvalidMobileNumber, theNameAlredyExist, icone);
	}
	
	
	function showIconeBasedInTheEmailOrMobileValidation(isAInvalidEmail = true, isAInvalidMobileNumber = true,
	 theEmailOrNumberAlredyExists = true, icone) {
		icone.removeClass();
		if(!theEmailOrNumberAlredyExists) {
			if(!isAInvalidEmail || !isAInvalidMobileNumber) {
			icone.addClass("far fa-check-circle okIcone defaultInputStatusIconePosition");
			return;
		}
		}
		icone.addClass("far fa-times-circle erroIcone defaultInputStatusIconePosition");
	}
	
  
  //METHODS OF VALIDATE FULL NAME INPUT
  validateFullname = function(input) {
    input = $(input);
    const icone = input.parent().children("i");
    if(input.val() !== "") {
      const theNameIsAValidName = validateRegexp(input.val(), /\d+/);
      const theNameHasAValidSize = seeIfTheStringIsGreaterThan(input.val(), 2); 
      showIconeBasedInTheFullnameValidation(theNameIsAValidName, theNameHasAValidSize, icone);
      return;
    }
    manipulateStatusInputVisibility(icone, false);
  }


  function showIconeBasedInTheFullnameValidation(theNameIsAValidName, theNameHasAValidSize, icone) {
    icone.removeClass();
    if(theNameHasAValidSize && theNameIsAValidName) {
      icone.addClass("far fa-check-circle okIcone defaultInputStatusIconePosition");
      return;
    }
    icone.addClass("far fa-times-circle erroIcone defaultInputStatusIconePosition");
  }


	//METHODS OF VALIDATE USERNAME
	validateUsername = function(input) {
		input = $(input);
		const icone = input.parent().children("i");
		if(input.val() !== "") {
			searchRepeatDataViaAjax(input,"username" , "/my_fullstack_instagram/searchForEquals", showIconeBasedInTheUsernameValidation);
			return;
		}
		manipulateStatusInputVisibility(icone, false);
	}
	
	
	function showIconeBasedInTheUsernameValidation(input, theUsernameAlredyExists = true) {
		const icone = input.parent().children("i");
		icone.removeClass();
    if(!theUsernameAlredyExists) {
      icone.addClass("far fa-check-circle okIcone usernameInputStatusIconePosition");
      return;
    }
    icone.addClass("far fa-times-circle erroIcone usernameInputStatusIconePosition");
  }
	

  //METHODS OF VALIDATE PASSWORD
  validatePassword = function(input) {
    input = $(input);
    const icone = input.parent().children("i");
    if(input.val() !== "") {
      const theNameHasAValidSize = seeIfTheStringIsGreaterThan(input.val(), 6); 
      showIconeBasedInThePasswordValidation(theNameHasAValidSize, icone);
      return;
    }
    manipulateStatusInputVisibility(icone, false);
  }


  function showIconeBasedInThePasswordValidation(theNameHasAValidSize = true, icone) {
    if(theNameHasAValidSize) {
      icone.addClass("far fa-check-circle okIcone passwordInputStatusIconePosition");
      return;
    }
    icone.addClass("far fa-times-circle erroIcone passwordInputStatusIconePosition");
  }


  function seeIfTheStringIsGreaterThan(string = "", value = 0) {
    if(string.length > value) {
      return true;
    }
    return false;
  }


  function validateRegexp(text = "", regExp = "") {
    if(text.search(regExp) === -1) {
      return true;
    }
    return false;
  }


  function validateIfTheStatusIconeOfInputMustAppear(input, inputHasFocus = true) {
    const icone = $(input).parent().children("i");
    if(inputHasFocus) {
      manipulateStatusInputVisibility(icone, false);
    }
    if(inputHasFocus === false && input.value !== "") {
      manipulateStatusInputVisibility(icone, true);
    }
  }


  function manipulateStatusInputVisibility(icone, iconeMustApear = true) {
    if(iconeMustApear) {
      icone.show();
      return;
    } 
    icone.hide();
  }


  $(".hasIcone .defaultInput").focus(() => validateIfTheStatusIconeOfInputMustAppear(event.target));
  $(".hasIcone .defaultInput").blur(() => validateIfTheStatusIconeOfInputMustAppear(event.target, false));
}());


const PlaceholderAnimator = (function () {
  var placeholderLoop;

  function executePlaceholderAnimation() {
    const input = $(this);
    placeholderLoop = setInterval(() => {
      if (input.val() !== "") {
        doPlaceholderAnimation(input, input.parent().children(".placeholder"), true);
        return;
      }
      doPlaceholderAnimation(input, input.parent().children(".placeholder"), false);
    }, 1);
  }


  function doPlaceholderAnimation(input, placeholder, placeholderMustUp) {
    if (placeholderMustUp) {
      input.css({ "padding-top":"20px", "padding-bottom":"0px"});
      placeholder.css({ "font-size": "1rem", "top": "30%" });
      return;
    }
    input.css({ "padding-top": "10px", "padding-bottom":"10px"});
    placeholder.css({ "font-size": "1.4rem", "top": "50%" });
  }


  $(".defaultInputContainer > .defaultInput").click(executePlaceholderAnimation);
  $(".defaultInputContainer > .defaultInput").blur(() => clearInterval(placeholderLoop));
}());


const InputPassword = (function () {
  function manipulateShowVisibility() {
    const input = $(this);
    const show = input.parent().children(".showPassword");
    if (input.val() !== "") {
      show.show();
      return;
    }
    show.hide();
  }


  function manipulatePasswordVisibility() {
    const input = $(this).parent().children(".defaultInput");
    if(input.attr("type") === "password") {
      input.attr("type", "text");
      return;
    }
    input.attr("type", "password");
  }


  $(".defaultInput[type='password']").keyup(manipulateShowVisibility);
  $(".showPassword").click(manipulatePasswordVisibility);
}());


const UsernameGenarator = (function() {
	
}());