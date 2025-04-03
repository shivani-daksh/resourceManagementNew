const employeeIDs = [1012, 1007, 1043, 1029, 1035, 1048]; 
let usedIDs = []; 
let rounds = 1;
let score = 0; 

let skipScoreForLastName = false;
let skipScoreForPhoneNumber = false;
let skipScoreForEmail = false;


function getRandomEmployeeID() {
  if (usedIDs.length === employeeIDs.length) {
    usedIDs = [];
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


function toRun(event) {
  event.preventDefault();

  let firstNameInput = document.getElementById("first-name").value;
  let lastNameInput = document.getElementById("last-name").value;
  let phoneNumberInput = document.getElementById("phone-number").value;
  let emailAddressInput = document.getElementById("email-address").value;
  let cityInput = document.getElementById("city").value;
  let stateInput = document.getElementById("dropdown").value;
  let zipInput = document.getElementById("zip").value;
  let jobTitleInput = document.getElementById("job-title").value;
  let departmentInput = document.querySelector(".department").value;
  let startDateInput = document.getElementById("start-date").value;
  let managerInput = document.getElementById("manager").value;

  let errorPopup = document.getElementById("error-popup");
  let errorContainer = document.querySelector(".error-details-container");

  errorContainer.innerHTML = "";
  let hasErrors = false;

  if (!skipScoreForLastName && !lastNameInput) {
    errorContainer.innerHTML += '<p class="last-name-error">Last name is required.</p>';
    hasErrors = true;
    skipScoreForLastName = true;
  }

  if (!skipScoreForPhoneNumber && !/^[\d-]+$/.test(phoneNumberInput)) { 
    errorContainer.innerHTML += '<p class="number-error">Enter a valid phone number.</p>';
    hasErrors = true;
    skipScoreForPhoneNumber = true;
  }

  if (!skipScoreForEmail && !emailAddressInput.includes("@")) {
    errorContainer.innerHTML += '<p class="email-error">Email must contain "@".</p>';
    hasErrors = true;
    skipScoreForEmail = true;
  }

  if (hasErrors) {
    errorPopup.style.display = "block";
    document.getElementById("overlay").style.display = "block";
    return;  
  }

  let roundScore = 0;
  if (firstNameInput) roundScore++;
  if (!skipScoreForLastName && lastNameInput) roundScore++;
  if (!skipScoreForPhoneNumber && phoneNumberInput) roundScore++;
  if (!skipScoreForEmail && emailAddressInput) roundScore++;
  if (cityInput) roundScore++;
  if (stateInput !== "select") roundScore++;
  if (zipInput) roundScore++;
  if (jobTitleInput) roundScore++;
  if (departmentInput !== "department") roundScore++;
  if (startDateInput) roundScore++;
  if (managerInput) roundScore++;

  score += roundScore; 

  document.querySelector(".score-field").innerHTML = `Correctly Submitted Fields: ${score}/${rounds * 11}`;

  document.querySelector("form").reset();

  skipScoreForLastName = false;
  skipScoreForPhoneNumber = false;
  skipScoreForEmail = false;

  setEmployeeID();

  rounds++;

  if (rounds > 6) {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    let registerButton = document.querySelector(".submit-button");
    registerButton.disabled = true;
    registerButton.style.cursor = "not-allowed";
    registerButton.style.opacity = "0.6";
    registerButton.style.boxShadow = "none";
  }

  document.querySelector(".ok-btn").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
}

document.querySelector(".edit-btn").addEventListener("click", function () {
  document.getElementById("error-popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    skipScoreForLastName = false;
    skipScoreForPhoneNumber = false;
    skipScoreForEmail = false;
  });


document.querySelector(".continue-btn").addEventListener("click", function () {
  document.getElementById("error-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";

  toRun(new Event("submit")); 
});



