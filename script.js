// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $('div[class*="row"]').on("click", "button", function(){
    console.log(this.parentNode.children[1].value);
  })


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function setClasses() {
    const time = dayjs().format("HH");
    for(let i=9; i<18; i++) {
      let id = "#hour-" + i;
      // console.log(i, time);
      if(time > i) {
        $(id).removeClass("future");
        $(id).removeClass("present");
        $(id).addClass("past");
      } else if(time == i) {
        $(id).removeClass("future");
        $(id).addClass("present");
        $(id).removeClass("past");
      } else {
        $(id).addClass("future");
        $(id).removeClass("present");
        $(id).removeClass("past");
      };
    }
  }

  const classInterval = setInterval(setClasses, 30000);


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //



  // TODO: Add code to display the current date in the header of the page.
  function setDate() {
    $("#currentDay").text(dayjs().format("ddd:MMM:YYYY HH:mm:ss"));
  }
  
  const dateInterval = setInterval( setDate, 1000);
  // console.log(dayjs().format("ddd:MMM:YYYY"));
  setDate();
  setClasses();
});
