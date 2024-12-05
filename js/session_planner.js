//buttons (add and delete exercise).
const buildExercise = document.getElementById("exerciseBtns");

//div for stopwatch.
const timerContainer = document.getElementById("timerCon");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const reset = document.getElementById("resetBtn");


//Elements responding to secs, mins and hour.
let hour = document.getElementsByClassName("hour");
let min = document.getElementsByClassName("min");
let sec = document.getElementsByClassName("sec");



//global values for stopwatch.
let startSeconds = 0;

let accumulatedSecs = 0;
let startTime = 0;
let increaseTime;

let paused = false;

//main function that calculates the time difference.
const startWatch = function () {
  startTime = Date.now();

  increaseTime = setInterval(() => {
    const seconds = (paused ? accumulatedSecs : (accumulatedSecs + (Date.now() - startTime))) / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    const sPrefix = seconds < 10;
    const mPrefix = minutes < 10;
    const hPrefix = hours < 10;

    sec[0].innerText = (sPrefix ? "0" : "") + Math.floor(seconds % 60);
    min[0].innerText = (mPrefix ? "0" : "") + Math.floor(minutes % 60);
    hour[0].innerText = (hPrefix ? "0" : "") + Math.floor(hours);
  }, 10);

  startBtn.disabled = true;
  reset.disabled = false;
};

//Buttons to control stopwatch.
startBtn.addEventListener('click', startWatch);

pauseBtn.addEventListener('click', () => {
  if (!paused) {
    accumulatedSecs += (Date.now() - startTime);
    paused = true;
  } else {
    startTime = Date.now();
    paused = false;
  }
});

reset.addEventListener('click', () => {
  paused = false;
  startBtn.disabled = false;
  clearInterval(increaseTime);
  accumulatedSecs = 0;

  sec[0].innerText = min[0].innerText = hour[0].innerText = "00";
});






//shows current time and date including time zone.
function displayDate() {
  const timeAndDate = document.getElementById('dateandtime');
  const date = new Date();
  timeAndDate.innerText = date.toDateString();
  return date;
};
const updateTime = setInterval(displayDate, 1000);


//Ids and classes of grid.
const addE = document.getElementById("additionBtn");
const loadE = document.getElementById("loadBtn");
const deleteE = document.getElementById("removeBtn");

let repBar = document.getElementsByClassName("reps");
let exerciseBar = document.getElementsByClassName("exercise");
const exerciseList = document.getElementsByClassName("exercise-list");
const repList = document.getElementsByClassName("rep-list");
let reminder = document.getElementsByClassName("invalid-entry");
const allDays = document.getElementById("day-container");
const week = document.getElementsByClassName("day-of-week");
const dayCheck = document.getElementsByClassName("day-check");

//For building a local storage
let exercises = [];
let reps = [];

const day = [dayCheck[0], dayCheck[1], dayCheck[2], dayCheck[3], dayCheck[4], dayCheck[5], dayCheck[6]];


//exercise grid class for adding and deleting exercises.
class Planning {
  constructor(exerciseBar, repBar) {
    this.addE = addE;
    this.deleteE = deleteE;
    this.exerciseBar = exerciseBar;
    this.repBar = repBar;
    this.reminder = reminder;
    this.allDays = allDays;
  }
  
  addExercise(exercise, reps) {
    //Adds exercise.
    let makeExercise = document.createElement("li");
    exerciseList[0].appendChild(makeExercise);
    makeExercise.className = "current-exercise";
    makeExercise.innerText = exercise;

    //Adds reps
    let makeReps = document.createElement("li");
    repList[0].appendChild(makeReps);
    makeReps.innerText = reps;
    makeReps.className = "rep-amount";

    //control flow of input in boxes.
    if (exercise === "") {
      this.reminder[0].innerText = "No exercise/repetitions entered!";
      exerciseList[0].removeChild(exerciseList[0].lastChild);
      repList[0].removeChild(repList[0].lastChild);

    } else if (reps === "") {
      this.reminder[0].innerText = "No exercise/repetitions entered!";
      exerciseList[0].removeChild(exerciseList[0].lastChild);
      repList[0].removeChild(repList[0].lastChild);

    } else if (exerciseBar[0].value != "") {
      this.reminder[0].innerText = "";
    }

    exercises.push({ exercise: exerciseBar[0].value, reps: repBar[0].value});
   
    return makeExercise[0];
  }

  deleteExercise() {
    if (exerciseList[0].hasChildNodes()) {
      exerciseList[0].removeChild(exerciseList[0].lastChild);
      this.reminder[0].innerText = "No exercise/repetitions entered!";
    }

    if (repList[0].hasChildNodes()) {
      repList[0].removeChild(repList[0].lastChild);
      this.reminder[0].innerText = "No exercise/repetitions entered!";
    }
  }

  storage() {
    localStorage.setItem("exercises", JSON.stringify(exercises));

    localStorage.setItem('mon', JSON.stringify(day[0].checked));
    localStorage.setItem('tue', JSON.stringify(day[1].checked));
    localStorage.setItem('wed', JSON.stringify(day[2].checked));
    localStorage.setItem('thur', JSON.stringify(day[3].checked));
    localStorage.setItem('fri', JSON.stringify(day[4].checked));
    localStorage.setItem('sat', JSON.stringify(day[5].checked));
    localStorage.setItem('sun', JSON.stringify(day[6].checked));
  };

  getBackStorage() {
    const hydrated = JSON.parse(localStorage.getItem("exercises"));
    for (const { exercise, reps } of hydrated) {
      this.addExercise(exercise, reps);
    }
  }
};

const build = new Planning(exerciseBar, repBar);


addE.addEventListener("click", () => {
  build.addExercise(exerciseBar[0].value, repBar[0].value);
  build.storage();
});



deleteE.addEventListener("click", () => {
  build.deleteExercise();
});

loadE.addEventListener("click", () => {
  build.getBackStorage();
});




window.addEventListener("load", () => {
  
  const monday = JSON.parse(localStorage.getItem('mon'));
  day[0].checked = monday;
  const tuesday = JSON.parse(localStorage.getItem('tue'));
  day[1].checked = tuesday;
  const wednesday = JSON.parse(localStorage.getItem('wed'));
  day[2].checked = wednesday;
  const thursday = JSON.parse(localStorage.getItem('thur'));
  day[3].checked = thursday;
  const friday = JSON.parse(localStorage.getItem('fri'));
  day[4].checked = friday;
  const saturday = JSON.parse(localStorage.getItem('sat'));
  day[5].checked = saturday;
  const sunday = JSON.parse(localStorage.getItem('sun'));
  day[6].checked = sunday;
 
  build.getBackStorage();
  
});

/*
const arr = [{ name: 'test', age: 30 }, { name: 'test2', age: 32 }]

for (const { name, age } of arr) console.log(name, age)
1 test2 30
 test2 32

for (const person of arr) console.log(person.name, person.age)
test 30
test2 32*/

