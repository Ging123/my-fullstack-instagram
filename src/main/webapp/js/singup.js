var sendFormToServerViaAjax;

const singUpScreen = (function() {
  function goToDateScreen() {
    $("#firstSingupScreen").hide();
    $("#secondSingupScreen").show();
  }

  function backToEmailScreen() {
    $("#firstSingupScreen").show();
    $("#secondSingupScreen").hide();
  }

	//METHODS TO SEND THE DATA OF THE FIRST FORM IN THE SING UP TO THE SERVER
	function sendInputsOfFirstScreen() {
		const inputs = document.querySelectorAll("#firstSingUpForm input");
		const values = {
			emailOrNumber:inputs[0].value,
			fullname:inputs[1].value,
			username:inputs[2].value,
			password:inputs[3].value
		};
		sendFormToServerViaAjax(values, "/my_fullstack_instagram/validateSingupForm", nextScreen);
	}
	
	
	sendFormToServerViaAjax = function(formData, theUrl, func) {
		$.ajax({
	  	url:theUrl,
			data: {formData:JSON.stringify(formData)},
			type:'POST',
			dataType:"json",
			success:function(data) {
				func(data);
			}
		});
	}
	
	
	function nextScreen(erroMensage) {
		const erroTag = $("#firstSingUpForm .mensageOfErro");
		if(erroMensage !== "") {
			erroTag.show();
			erroTag.text(erroMensage);
			return;
		}
		erroTag.hide();
		goToDateScreen();
	}
	
	
  $("#goBackToEmailScreen").click(backToEmailScreen);
	$("#singupButton").click(sendInputsOfFirstScreen);
}());


const selectDates = (function() {
  function addMonths() {
    const months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];
    for(let i = 0; i < months.length; i++) {
      putOptionInTheSelect($("#month"), months[i], i + 1);
    }
  }


  function addDays() {
    const daysInMonth = 32;
    for(let i = 1; i < daysInMonth; i++) {
      putOptionInTheSelect($("#day"), i, i);
    }
  }


  function addYears() {
    let currentYear = new Date().getFullYear();
    let years = currentYear - 120;
    for(years; years <= currentYear; years++) {
      putOptionInTheSelect($("#year"), currentYear ,currentYear);
			currentYear--;
    }
  }


  function putOptionInTheSelect(elementFather, text, value) {
    const option = $("<option></option>").text(text);
    option.attr("value", value);
    elementFather.append(option);
  }


	function getData() {
		const date = {
		  month:$("#month").val(),
			day:$("#day").val(),
			year:$("#year").val()
		}
		sendFormToServerViaAjax(date, "/my_fullstack_instagram/validateDate", theUserIsRegister);
	}
	
	
	function theUserIsRegister(result) {
		
	}


	$("#nextButton").click(getData);
  addMonths();
  addDays();
  addYears();
}());