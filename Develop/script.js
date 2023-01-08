// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {}
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?

var todayHour = dayjs().format("HH");
var hourAM = $(".am");
var hourPM = $(".pm");
var parentEl, divTextHour;

if (todayHour > 12) {
  var todayhour = todayHour - 12;
  for (var j = 0; j < hourAM.length; j++) {
    parentEl = hourAM[j].parentElement;
    parentEl.classList.add("past");
  }
  // loop through all pm hours
  for (var h = 0; h < hourPM.length; h++) {
    divTextHour = Number(hourPM[h].innerText.replace("PM", ""));
    //if pm hour is 12 and current hour is pass 12pm then 12pm is past
    if (divTextHour === 12) {
      parentEl = hourPM[h].parentElement;
      parentEl.classList.add("past");
    }
    //if pm hour is less than current hour than assign past
    if (divTextHour < todayhour) {
      parentEl = hourPM[h].parentElement;
      parentEl.classList.add("past");
    }
    //if pm hour is equal to current hour than assign past
    if (divTextHour === todayhour) {
      parentEl = hourPM[h].parentElement;
      parentEl.classList.add("present");
    }
    //if pm hour is greater than current hour than assign future
    if (divTextHour > todayhour && divTextHour !== 12) {
      parentEl = hourPM[h].parentElement;
      parentEl.classList.add("future");
    }
  }
  // when current hour is am
}
if (todayHour < 12) {
  for (var h = 0; h < hourPM.length; h++) {
    parentEl = hourPM[h].parentElement;
    parentEl.classList.add("future");
  }
  for (var j = 0; j < hourAM.length; j++) {
    divTextHour = Number(hourAM[j].innerText.replace("AM", ""));
    //if am hour is less than current hour than assign past
    if (divTextHour < todayHour) {
      parentEl = hourAM[j].parentElement;
      parentEl.classList.add("past");
    }
    if (divTextHour > todayHour) {
      parentEl = hourAM[j].parentElement;
      parentEl.classList.add("future");
    }
    if (divTextHour === todayHour) {
      parentEl = hourAM[j].parentElement;
      parentEl.classList.add("present");
    }
  }
}
if (todayHour === 12) {
  parentEl = hourPM[0].parentElement;
  parentEl.classList.add("present");
}

// Event listener for the button
var textInput = { id: "", text: "" };
var savelog = [];
var scheduleSaved = localStorage.getItem("schedulesaved");
// var textInput9 = localStorage.getItem("textinput9");
// var textInput10 = localStorage.getItem("textinput10");
// var textInput11 = localStorage.getItem("textinput11");
var btnEl = $("button");
var textareaInput = $("textarea");

// textareaInput[0].value = localStorage.getItem("textinput9")
// textareaInput[1].value = localStorage.getItem("textinput10")
// textareaInput[2].value = localStorage.getItem("textinput11")
getSchedule = JSON.parse(localStorage.getItem("schedulesaved"));

if (getSchedule) {
  for (var i = 0; i <= getSchedule.length; i++) {
    var idnumber = getSchedule[i].id;
    console.log(idnumber)
    var textareaEl = document.getElementById(idnumber).children[1];
    console.log(textareaEl)
    textareaEl.value = getSchedule[i].text;
  }
}

btnEl.on("click", function () {
  var parentBox = event.target.parentElement;
  textInput.id = parentBox.id;
  textInput.text = parentBox.children[1].value;
  savelog.push(textInput);
  scheduleSaved = JSON.stringify(savelog);
  localStorage.setItem("schedulesaved", scheduleSaved);
  textInput = { id: "", text: "" };
});

// (btnEl[1]).on("click",function(){
//   var parentBox = event.target.parentElement
//   console.log(parentBox)
//   textInput9 = parentBox.children[1].value
//   localStorage.setItem("textinput10", textInput10)
// })

// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

//get current
//select all the time div and put it into a array
//if time dive.textcontent
