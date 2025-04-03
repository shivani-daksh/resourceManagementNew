const employeeIDs = [1012, 1007, 1043, 1029, 1035, 1048]; 
let usedIDs = [];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomEmployeeID() {
  if (usedIDs.length === employeeIDs.length) {
    usedIDs = [];
    shuffleArray(employeeIDs);
  }
  let availableIDs = employeeIDs.filter(id => !usedIDs.includes(id));
  let randomID = availableIDs[Math.floor(Math.random() * availableIDs.length)];
  usedIDs.push(randomID);
  return randomID;
}

function setEmployeeID() {
  document.getElementById("employee-id").value = getRandomEmployeeID();
}

window.onload = setEmployeeID;

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  setEmployeeID();
});
