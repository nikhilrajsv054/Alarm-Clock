// Get elements from the DOM
const clockElement = document.getElementById('clock');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');
const ampmSelect = document.getElementById('ampm');
const setAlarmButton = document.getElementById('set-alarm');
const alarmsList = document.getElementById('alarms');
const alarmsHeading = document.getElementById('alarms-heading');

// Array to store alarms
let alarms = [];

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM'; 

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
  clockElement.textContent = timeString;
}

// Function to add leading zero to single-digit numbers
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

// Function to set an alarm
function setAlarm() {
  const hour = parseInt(hourInput.value, 10);
  const minute = parseInt(minuteInput.value, 10);
  const second = parseInt(secondInput.value, 10);
  const ampm = ampmSelect.value;

  // Validate input values for hours, minutes, and seconds
  if (hour < 1 || hour > 12 || isNaN(hour)) {
    alert("Invalid hour value. Please enter a valid hour (1-12).");
    return;
  }

  if (minute < 0 || minute > 59 || isNaN(minute)) {
    alert("Invalid minute value. Please enter a valid minute (0-59).");
    return;
  }

  if (second < 0 || second > 59 || isNaN(second)) {
    alert("Invalid second value. Please enter a valid second (0-59).");
    return;
  }

  const alarmTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)} ${ampm}`;
  alarms.push(alarmTime);
  renderAlarms();

  // Show the alert with the set alarm time
  alert(`Alarm set at ${alarmTime}`);
}

// Function to delete an alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

// Function to render the list of alarms
function renderAlarms() {
  alarmsList.innerHTML = '';
  alarms.forEach((alarm, index) => {
    const alarmItem = document.createElement('li');
    alarmItem.classList.add('alarm-item');
    alarmItem.textContent = alarm;

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteAlarm(index));

    alarmItem.appendChild(deleteButton);
    alarmsList.appendChild(alarmItem);
  });

  // Show/hide the alarms heading based on the number of alarms
  if (alarms.length > 0) {
    alarmsHeading.style.display = 'block';
  } else {
    alarmsHeading.style.display = 'none';
  }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Add click event listener to the "Set Alarm" button
setAlarmButton.addEventListener('click', setAlarm);

// Add event listeners for input validation
hourInput.addEventListener('input', restrictNegativeInput);
minuteInput.addEventListener('input', restrictNegativeInput);
secondInput.addEventListener('input', restrictNegativeInput);

function restrictNegativeInput(event) {
  const input = event.target;
  const value = parseInt(input.value, 10);

  if (isNaN(value) || value < 0) {
    input.value = ''; // Clear the input if it's not a positive integer
  }
}
