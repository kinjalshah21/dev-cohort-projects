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

  let bmi = (weight * 10000 / (height * height)).toFixed(2);
  let category = "";
  let colorClass = "";

  //BMI category based on gender
  console.log(`bmi ${bmi}`);
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

  console.log(`category ${category}`);
  console.log(`colorClass ${colorClass}`);

  result.innerText = `BMI: ${bmi} (${category})`;
  result.classList.add(colorClass);
}
