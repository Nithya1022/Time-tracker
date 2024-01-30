const name = document.getElementById("name");
const desc = document.getElementById("des");
const row = document.getElementById("row");
const start = document.getElementById("start");
let inc = document.getElementById("inc");
let timeId;
let val = 0;

// Load saved data from localStorage
function loadTableData() {
    const savedData = JSON.parse(localStorage.getItem('tableData')) || [];
    const headerRow = '<tr><th>Name</th><th>Description</th><th>Time</th></tr>';
    const dataRows = savedData.map(rowData => `<tr><td>${rowData.name}</td><td>${rowData.desc}</td><td>${rowData.time}</td></tr>`).join('');
    row.innerHTML = headerRow + dataRows;
}

function startTimer() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    timeId = setInterval(function () {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }

        const formattedTime =
            `${hours}`.padStart(2, '0') + ':' +
            `${minutes}`.padStart(2, '0') + ':' +
            `${seconds}`.padStart(2, '0');

        inc.textContent = formattedTime;
    }, 1000);
}

function starttime() {
    startTimer();
    start.textContent = 'stop';
    start.style.backgroundColor = 'red';
    start.removeEventListener('click', starttime);
    start.addEventListener('click', endtime);
}

function endtime() {
    clearInterval(timeId);
    const rowData = { name: name.value, desc: desc.value, time: inc.textContent };

    // Save data to localStorage
    const savedData = JSON.parse(localStorage.getItem('tableData')) || [];
    savedData.push(rowData);
    localStorage.setItem('tableData', JSON.stringify(savedData));

    // Reload table data
    loadTableData();

    name.value = '';
    desc.value = '';
    val = 0;
    inc.textContent = `${val}`;
    start.textContent = 'start';
    start.style.backgroundColor = 'green';
    start.removeEventListener('click', endtime);
    start.addEventListener('click', starttime);
}

start.addEventListener('click', starttime);

// Load table data when the page is loaded
document.addEventListener('DOMContentLoaded', loadTableData);
