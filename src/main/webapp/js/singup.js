const singUpScreen = (function() {
  function goToDateScreen() {
    $("#firstSingupScreen").hide();
    $("#secondSingupScreen").show();
  }

  function backToEmailScreen() {
    $("#firstSingupScreen").show();
    $("#secondSingupScreen").hide();
  }

  $("#singupButton").click(goToDateScreen);
  $("#goBackToEmailScreen").click(backToEmailScreen);
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
    const d = new Date(), month = d.getMonth(), year = d.getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    for(let i = 1; i < daysInMonth; i++) {
      putOptionInTheSelect($("#day"), i, i);
    }
  }


  function addYears() {
    const currentYear = new Date().getFullYear();
    let years = currentYear - 120, i = 1;
    for(years; years <= currentYear; years++) {
      putOptionInTheSelect($("#year"), years ,i++);
    }
  }


  function putOptionInTheSelect(elementFather, text, value) {
    const option = $("<option></option>").text(text);
    option.attr("value", value);
    elementFather.append(option);
  }


  addMonths();
  addDays();
  addYears();
}());