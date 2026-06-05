let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let running = false;

const display =
document.getElementById('display');

const laps =
document.getElementById('laps');

const progressCircle =
document.querySelector('.progress-circle');

const circumference = 817;

const clickSound =
document.getElementById('clickSound');

/* Sound */

function playSound(){

  clickSound.currentTime = 0;

  clickSound.play();

}

/* Update Display */

function updateDisplay(){

  let h =
  hours < 10 ? '0' + hours : hours;

  let m =
  minutes < 10 ? '0' + minutes : minutes;

  let s =
  seconds < 10 ? '0' + seconds : seconds;

  let ms =
  milliseconds < 10
  ? '0' + milliseconds
  : milliseconds;

  display.innerText =
  `${h}:${m}:${s}:${ms}`;

  updateProgress();
}

/* Progress Ring */

function updateProgress(){

  const progress =
  (seconds / 60) * circumference;

  progressCircle.style.strokeDashoffset =
  circumference - progress;
}

/* Stopwatch Logic */

function stopwatch(){

  milliseconds++;

  if(milliseconds === 100){

    milliseconds = 0;

    seconds++;
  }

  if(seconds === 60){

    seconds = 0;

    minutes++;
  }

  if(minutes === 60){

    minutes = 0;

    hours++;
  }

  updateDisplay();
}

/* Start */

function startWatch(){

  if(running) return;

  playSound();

  running = true;

  timer =
  setInterval(stopwatch,10);
}

/* Pause */

function pauseWatch(){

  playSound();

  running = false;

  clearInterval(timer);
}

/* Reset */

function resetWatch(){

  playSound();

  clearInterval(timer);

  running = false;

  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateDisplay();

  progressCircle.style.strokeDashoffset =
  circumference;

  laps.innerHTML = '';

  localStorage.removeItem('laps');
}

/* Add Lap */

function addLap(){

  if(display.innerText ===
  '00:00:00:00') return;

  playSound();

  const li =
  document.createElement('li');

  li.innerHTML = `
    <strong>
      Lap ${laps.children.length + 1}
    </strong>

    <span class="lap-time">
      ${display.innerText}
    </span>
  `;

  laps.prepend(li);

  saveLaps();
}

/* Save Laps */

function saveLaps(){

  localStorage.setItem(
    'laps',
    laps.innerHTML
  );
}

/* Load Saved Laps */

window.onload = () => {

  const savedLaps =
  localStorage.getItem('laps');

  if(savedLaps){

    laps.innerHTML =
    savedLaps;
  }

}

/* Buttons */

document
.getElementById('start')
.addEventListener(
  'click',
  startWatch
);

document
.getElementById('pause')
.addEventListener(
  'click',
  pauseWatch
);

document
.getElementById('reset')
.addEventListener(
  'click',
  resetWatch
);

document
.getElementById('lap')
.addEventListener(
  'click',
  addLap
);

/* Clear Laps */

document
.getElementById('clearLaps')
.addEventListener(
  'click',
  () => {

  laps.innerHTML = '';

  localStorage.removeItem('laps');

});

/* Keyboard Shortcuts */

document.addEventListener(
'keydown',
(e) => {

  if(e.code === 'Space'){

    e.preventDefault();

    if(running){

      pauseWatch();

    }
    else{

      startWatch();
    }
  }

  if(e.key.toLowerCase() === 'r'){

    resetWatch();
  }

  if(e.key.toLowerCase() === 'l'){

    addLap();
  }

});

/* Theme Toggle */

const themeToggle =
document.getElementById(
'themeToggle'
);

let darkMode = true;

themeToggle.addEventListener(
'click',
() => {

  document.body.classList
  .toggle('light');

  darkMode = !darkMode;

  themeToggle.innerText =
  darkMode ? '🌙' : '☀️';

});

updateDisplay();