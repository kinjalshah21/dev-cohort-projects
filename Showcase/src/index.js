const display = document.getElementById("display");
const normalCalc = document.getElementById("normal-calc-div");
const bmiCalc = document.getElementById("bmi-calc-div");
//to-do: get review collector when ready
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
let currentIndex = 0;
const projects = [bmiCalc, normalCalc, normalCalc]; //to-do: replace 3rd item with review controller

nextBtn.addEventListener("click", () => {
  console.log("currentIndex in next ", currentIndex);
  if (currentIndex < projects.length - 1) {
    currentIndex++;
    console.log("currentIndex in next after if ", currentIndex);
  }
  displayProject(currentIndex);
  toggleNextButton(nextBtn);
  togglePrevButton(prevBtn);
});

prevBtn.addEventListener("click", () => {
  console.log("currentIndex in prev ", currentIndex);
  if (currentIndex > 0) {
    currentIndex--;
    console.log("currentIndex in prev after if ", currentIndex);
  }
  displayProject(currentIndex);
  toggleNextButton(nextBtn);
  togglePrevButton(prevBtn);
});

function toggleNextButton(button) {
  if(currentIndex == projects.length - 1){
    button.disabled = true;
    button.classList.remove("hover:bg-gray-500", "hover:text-gray-300","transition");
  }else{
    button.disabled = false;
    button.classList.add("hover:bg-gray-500", "hover:text-gray-300","transition");
  }
}
function togglePrevButton(button) {
  if(currentIndex == 0){
    button.disabled = true;
    button.classList.remove("hover:bg-gray-500", "hover:text-gray-300","transition");
  }else{
    button.disabled = false;
     button.classList.add("hover:bg-gray-500", "hover:text-gray-300","transition");
  }
}

function displayProject(currentIndex){
  //hide every project first
  projects.forEach(project => project.classList.add("hidden"));
  projects[currentIndex].classList.remove("hidden");
}

function calculateBMI() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let gender = document.querySelector('input[name = "gender"]:checked').value;
  let result = document.getElementById("result");
  let errorMessage = document.getElementById("error-message");

  //check if inputs are valid
  if (weight <= 0 || height <= 0 || weight === "" || height === "") {
    errorMessage.innerText = "Please enter valid values!";
    errorMessage.classList.remove("hidden");
    result.innerText = "";
    return;
  } else {
    errorMessage.classList.add("hidden");
  }

  let bmi = ((weight * 10000) / (height * height)).toFixed(2);
  let category = "";
  let colorClass = "";

  //BMI category based on gender
  if (gender === "male") {
    if (bmi < 18.5) {
      category = "Underweight";
      colorClass = "text-red-500";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      colorClass = "text-green-700";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      colorClass = "text-red-500";
    } else {
      category = "Obese";
      colorClass = "text-red-500";
    }
  } else {
    if (bmi < 18.0) {
      category = "Underweight";
      colorClass = "text-red-500";
    } else if (bmi >= 18.0 && bmi < 24.0) {
      category = "Normal weight";
      colorClass = "text-green-500";
    } else if (bmi >= 24.0 && bmi < 29.0) {
      category = "Overweight";
      colorClass = "text-red-500";
    } else {
      category = "Obese";
      colorClass = "text-red-500";
    }
  }

  result.innerText = `BMI: ${bmi} (${category})`;
  result.classList.add(colorClass);
}

//learning :: variables value can be null until the html cannot load the element so insert script tag at the end of html body

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function appendToDisplay(val) {
  //decimal number validation
  let currentText = display.innerText;
  let lastNumber = currentText.split(/[\+\-\*\/]/).pop();

  if (val === "." && lastNumber.includes(".")) return;

  display.innerText =
    (currentText === "0" || currentText === "00") && val !== "."
      ? val
      : currentText + val;
}

function calculateResult() {
  if (display.innerText !== "0") {
    let exp = display.innerText.replace("%", "/");
    display.innerText = eval(exp);
  }
}

//default display
displayProject(currentIndex);
