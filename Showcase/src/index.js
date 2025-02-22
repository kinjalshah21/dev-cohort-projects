const display = document.getElementById("display");
const normalCalc = document.getElementById("normal-calc-div");
const bmiCalc = document.getElementById("bmi-calc-div");
const reviewCollector = document.getElementById("review-collector");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
let currentIndex = 0;
const projects = [bmiCalc, normalCalc, reviewCollector];
let reviews = [];
let currentPage = 1;
const reviewsPerPage = 3;
let givenRating = 0;

nextBtn.addEventListener("click", () => {
  if (currentIndex < projects.length - 1) {
    currentIndex++;
  }
  displayProject(currentIndex);
  toggleNextButton(nextBtn);
  togglePrevButton(prevBtn);
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  }
  displayProject(currentIndex);
  toggleNextButton(nextBtn);
  togglePrevButton(prevBtn);
});

function toggleNextButton(button) {
  if (currentIndex == projects.length - 1) {
    button.disabled = true;
    button.classList.remove(
      "hover:bg-gray-500",
      "hover:text-gray-300",
      "transition"
    );
  } else {
    button.disabled = false;
    button.classList.add(
      "hover:bg-gray-500",
      "hover:text-gray-300",
      "transition"
    );
  }
}
function togglePrevButton(button) {
  if (currentIndex == 0) {
    button.disabled = true;
    button.classList.remove(
      "hover:bg-gray-500",
      "hover:text-gray-300",
      "transition"
    );
  } else {
    button.disabled = false;
    button.classList.add(
      "hover:bg-gray-500",
      "hover:text-gray-300",
      "transition"
    );
  }
}

function displayProject(currentIndex) {
  //hide every project first
  projects.forEach((project) => project.classList.add("hidden"));
  projects[currentIndex].classList.remove("hidden");
}

function prevPage() {
  if(currentPage > 1){
    currentPage--;
    showReviews();
  }
}
function nextPage() {
  if(currentPage * reviewsPerPage < reviews.length){
    currentPage++;
    showReviews();
  }
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

//update selected star colors
function updateStars(rating) {
  document.querySelectorAll(".star").forEach((star, index) => {
    star.classList.toggle("text-yellow-400", index < rating);
    star.classList.toggle("text-gray-300", index >= rating);
  });
}

//handle star ratings
document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    givenRating = this.getAttribute("data-value");
    updateStars(givenRating);
  });

  //hover effect
  star.addEventListener("mouseover", function () {
    updateStars(this.getAttribute("data-value"));
  });

  //when no rating is selected
  star.addEventListener("mouseout", function () {
    updateStars(givenRating);
  });
});

//handle form submission
document.getElementById("review-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value.trim();
  let review = document.getElementById("review").value.trim();

  if (!name || !review || givenRating == 0) {
    alert("Please fill all fields and select a rating!");
    return;
  }

  reviews.push({ name, review, rating: givenRating });
  //reset form
  document.getElementById("review-form").reset();
  givenRating = 0;
  updateStars(0);
  showReviews();
});

//showReviews
function showReviews() {
  let container = document.getElementById("review-container");
  let prevPageButton = document.getElementById("prev-review-btn");
  let nextPageButton = document.getElementById("next-review-btn");
  container.innerHTML = "";
  let start = (currentPage - 1) * reviewsPerPage;
  let end = start + reviewsPerPage;
  let perPageReviews = reviews.slice(start, end);

  perPageReviews.forEach((item) => {
    let div = document.createElement("div");
    div.classList = "p-4 bg-white shadow rounded-lg border border-gray-200 w-full mb-1";
    div.innerHTML = `<strong>${item.name}</strong> - <strong class = "text-yellow-400">${"★".repeat(item.rating)}</strong> 
                     <p class="text-gray-600">${item.review}</p>`;
    container.appendChild(div);
  });


  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = end >= reviews.length;
  document.getElementById("page-number").innerHTML = currentPage;

  toggleHoverEffect(prevPageButton);
  toggleHoverEffect(nextPageButton);
}

function toggleHoverEffect(button){
  button.classList.toggle("hover:bg-gray-300", !button.disabled)
}

//default display
displayProject(currentIndex);
