function Strength(password, username){
  let score = 0;

  if (password.length >= 8) 
    score++;

  if (/[A-Z]/.test(password)) 
    score++;

  if (/[0-9]/.test(password)) 
    score++;

  if (/[\W]/.test(password)) 
    score++;

  if (!hasRepeatedPatterns(password))
    score++;

  if (!containsDate(password)) 
    score++;

  if (!containsMobileNumber(password)) 
    score++;

  if (!password.toLowerCase().includes(username.toLowerCase())) 
    score++;

  return score === 8 ? "strong" : score >= 5 ? "moderate" : "weak";
}

function hasRepeatedPatterns(password) {
  const repeatedPattern = /(.+)\1+/;
  return repeatedPattern.test(password);
}

function containsDate(password) {
 
  const datePatterns = [
      /\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/i,  
      /\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b/i,    
      /\b\d{1,2}\s[a-zA-Z]{3,}\s\d{2,4}\b/i,  
      /\b\d{8}\b/i,                          
      /\b\d{1,2}[a-zA-Z]{3,}\d{2,4}\b/i,   
  ];
  return datePatterns.some((pattern) => pattern.test(password));
}

function containsMobileNumber(password) {
  const mobileNumberPattern = /\b\d{10}\b/;
  return mobileNumberPattern.test(password);
}

function getFeedback(password, username) {

  const feedback = [];
  if (password.length < 8) 
    feedback.push("Add at least 8 characters.");
  if (!/[A-Z]/.test(password))
    feedback.push("Include at least one uppercase letter.");
  if (!/[0-9]/.test(password)) 
    feedback.push("Include at least one number.");
  if (!/[\W]/.test(password)) 
    feedback.push("Include at least one special character (e.g., @, #, $, etc.).");
  if (hasRepeatedPatterns(password)) 
    feedback.push("Avoid repeated patterns (e.g., 'aaa', '123123').");
  if (containsDate(password)) 
    feedback.push("Avoid using dates in any format.");
  if (containsMobileNumber(password)) 
    feedback.push("Avoid using mobile numbers.");
  if (password.toLowerCase().includes(username.toLowerCase())) 
    feedback.push("Password should not include your username.");

  return feedback.join(" ");
}

let container = document.querySelector(".container");
let feedbackText = document.createElement("p");

feedbackText.style.color = "aliceblue";
feedbackText.style.marginTop = "10px";
container.appendChild(feedbackText);

document.addEventListener("keyup", function (e) {
  let password = document.querySelector("#YourPassword").value;
  let username = document.querySelector("#YourUsername").value;

  if (e.target.id === "YourPassword") {
      if (username.trim() === "") {
          alert("Please enter a username before checking the password.");
          return;
      }

      let strength = Strength(password, username);
      let feedback = getFeedback(password, username);

      if (strength === "weak") {
          container.classList.add("weak");
          container.classList.remove("moderate");
          container.classList.remove("strong");
          feedbackText.textContent = "Weak Password. " + feedback;
      }
      else if (strength === "moderate") {
          container.classList.remove("weak");
          container.classList.add("moderate");
          container.classList.remove("strong");
          feedbackText.textContent = "Moderate Password. " + feedback;
      }
      else {
          container.classList.remove("weak");
          container.classList.remove("moderate");
          container.classList.add("strong");
          feedbackText.textContent = "Strong Password. Great job!";
      }
  }
});

let password = document.querySelector("#YourPassword");
let show = document.querySelector(".show");
show.onclick = function () {
  if (password.type === "password") {
      password.setAttribute("type", "text");
      show.classList.add("hide");
  }
  else {
      password.setAttribute("type", "password");
      show.classList.remove("hide");
  }
};
