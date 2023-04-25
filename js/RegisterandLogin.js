personal_record_table = {}
var username1;


var users = JSON.parse(localStorage.getItem("users")) || {};
if (!users.hasOwnProperty("p")) {
    users["p"] = "testuser";
    localStorage.setItem("users", JSON.stringify(users));
}

function addScoreToRecord(score) {
  if (!personal_record_table.hasOwnProperty(username1)) {
    personal_record_table[username1] = [score];
  } else {
    personal_record_table[username1].push(score);
  }
  return;
}


function playMusicGame() {
  document.getElementById("bgMusic").play();


}
function stopMusicGame() {
  document.getElementById("bgMusic").pause();
}
function stoplostmusic() {
  document.getElementById("lostMusic").pause();
}


function registerUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var birthdate = document.getElementById("birthdate").value;
    var terms = document.getElementById("terms").checked;
  
    // Check if all fields are filled in
    if (username == "" || password == "" || confirmPassword == "" || firstname == "" || lastname == "" || email == "" || birthdate == "" || !terms) {
      alert("Please fill in all fields and agree to the terms and conditions.");
      return false;
    }
  
    // Check password strength
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      alert("Password must contain at least 8 characters, including both letters and numbers.");
      return false;
    }
  
    // Check that firstname and lastname don't include numbers
    var nameRegex = /^[a-zA-Z]+$/;
    if (!firstname.match(nameRegex) || !lastname.match(nameRegex)) {
      alert("First name and last name cannot contain numbers.");
      return false;
    }
  
    // Check email validity
    var emailRegex = /\S+@\S+\.\S+/;
    if (!email.match(emailRegex)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    // Check that password and confirm password fields match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
  
    // Add new user to the users object and save to localStorage
    if (users.hasOwnProperty(username)) {
        alert("Username already exists.");
        return false;
      } else {
        users[username] = {
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email,
          birthdate: birthdate
        };
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        alert(JSON.stringify(users));
        return true;
      }
      
}
function loginUser() {
    
    var username = document.getElementById("login-username").value;
    username1 = username;
    var password = document.getElementById("login-password").value;
    var errorMessage = document.getElementById("login-error-message");
  
    if (username === "p" && password === "testuser") {
      alert("Login successful!");
      showScreen('configuration'); // Navigate to the game window here

      // Navigate to the game window here
      return true;
    } else if (users.hasOwnProperty(username)) {
      if (users[username].password === password) {
        alert("Login successful!");
        showScreen('configuration'); // Navigate to the game window here

        // Navigate to the game window here
        return true;
      } else {
        errorMessage.innerHTML = "Invalid password.";
        return false;
      }
    } else {
      errorMessage.innerHTML = "User not found.";
      return false;
    }
  }
  function setGameOverBackground(imageUrl) {
    const gameoverScreen = document.getElementById('gameover');
    gameoverScreen.style.backgroundImage = `url('${imageUrl}')`;
    
  }
  
 
  
  

