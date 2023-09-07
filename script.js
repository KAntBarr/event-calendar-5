// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  let hourBlocks = { // a global object to help get/set from/to local storage
    "hour-9": '',
    "hour-10": '',
    "hour-11": '',
    "hour-12": '',
    "hour-13": '',
    "hour-14": '',
    "hour-15": '',
    "hour-16": '',
    "hour-17": ''
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // an event listener for the hour row blocks.
  // it event delegates to the button that is inside the row
  // in order to react to a save event.
  $('div[class*="row"]').on("click", "button", function(){
    // traverse the dom to get to the textarea value(text)
    const textEl = this.parentNode.children[1].value; 
    // traverse to get the id of the hour row block that was clicked on
    const parentID = this.parentNode.id;
    // set the text to the corresponding hour using the id of the parent element
    hourBlocks[parentID] = textEl;
    // update this change to local storage
    localStorage.setItem("hourBlocks", JSON.stringify(hourBlocks));
    // refresh the hour row blocks
    loadEvents();
  })


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // set the correct time classes to all hour row blocks
  function setClasses() {
    // get the current hour in military time
    const time = dayjs().format("HH");
    // loop through all hour row blocks
    for(let i=9; i<18; i++) {
      let id = "#hour-" + i;
      // set and remove the corresponding time classes 
      if(time > i) { // if current time is greater than this node, set past
        $(id).removeClass("future");
        $(id).removeClass("present");
        $(id).addClass("past");
      } else if(time == i) { // if current time is equal to this node, set present
        $(id).removeClass("future");
        $(id).addClass("present");
        $(id).removeClass("past");
      } else { // else set this node to future
        $(id).addClass("future");
        $(id).removeClass("present");
        $(id).removeClass("past");
      };
    }
  }

  // use an interval timer to update the hour row blocks every 30 seconds
  const classInterval = setInterval(setClasses, 30000);


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // get the text events from local storage and load them to the hour row blocks
  function loadEvents() {
    // load from local storage and save into the global object
    hourBlocks = JSON.parse(localStorage.getItem("hourBlocks"));
    // loop through each hour id key in the global object
    for(const hour in hourBlocks){
      // use the current hour id key to set the text stored
      // in the object for that block to the text area inside the hour row block
      $('#'+hour).children()[1].value = hourBlocks[hour];
    }
  }


  // TODO: Add code to display the current date in the header of the page.
  // set the date time to the p tag in the header
  function setDate() {
    $("#currentDay").text(dayjs().format("ddd:MMM:YYYY HH:mm:ss"));
  }
  
  // set an interval timer to update the date time on screen every second
  const dateInterval = setInterval( setDate, 1000);
  
  setDate(); // call setDate to set the date on page load
  setClasses(); // set the corresponding time classes on page load
  loadEvents(); // load the text events from local storage on page load
});
