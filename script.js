// Assignment Code
var generateBtn = document.querySelector("#generate");

/* outputs an array of 1 number and 4 booleans indicating if this password should include:  
    0: num of characters
    1: bool if lowercase, 
    2: bool if uppercase, 
    3: bool if numeric, 
    4: bool if special characters
 */
function gatherParameters(){ 
  //var output = [8,false,false,false,false];

  var output = {
    numCharacters: 8,
    availableTypes: [false,false,false,false]
  }

  var messages = [
    "Would you like to include lowercase letters in your password?",
    "Would you like to include uppercase letters in your password?",
    "Would you like to include numbers in your password",
    "Would you like to include special characters in your password"
  ]
  
  var valid = false;
  while (!valid){
    var attempt = parseInt(prompt("How many characters do you want your password to be? \n\n (Answer needs to be between 8 and 256)"),10)

    if (isNaN(attempt)|| attempt < 8 || attempt > 256 ){
      alert("Input is not valid. Please try again")
    }
    else{
      valid = true;
      output.numCharacters = attempt;
    }
  }



  for (var i = 0; i < 4; i++){
    output.availableTypes[i] = confirm(messages[i]);
  }

  return output;
}

function generatePassword(){
  var valid = false;
  var params;
  while(!valid){
    params = gatherParameters();
    if (!(params.availableTypes[0]||params.availableTypes[1]||params.availableTypes[2]||params.availableTypes[3]))
    {
      alert("You must include atleast one of the four options in your password. \n\n Please Try again.")
    }
    else
    {
      valid = true;
    }
  }
  
  var password = "";

  var availableCharTypes = [];

  charTypes = [
    {
      name: "lowercase",
      values: "abcdefghijklmnopqrstuvwxyz".split(""),
    },
    {
      name: "uppercase",
      values: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    },
    {
      name: "numbers",
      values: "0123456789".split(""),
    },
    {
      name: "specialCharacters",
      values: "!’()*+,-./:;< =>?@[]^_{|}~".split(""),
    }
  ];

  for (var i = 0; i < params.availableTypes.length;i++ ){
    
    if (params.availableTypes[i])
    {
      
      //add minimum of one of such valid characters

      var index = Math.floor( Math.random() * charTypes[i].values.length);
      password += charTypes[i].values[index];
      
      // appends this list of charTypes to availableCharTypes
      availableCharTypes = availableCharTypes.concat(charTypes[i].values);
      
    }
  }

  

  while (password.length < params.numCharacters)
  {
    var newChar = availableCharTypes[Math.floor( Math.random() * availableCharTypes.length)];
    password += newChar;
  }


  var randomizedPassword = [];
  password = password.split("");

  while (password.length > 0){
    var index = Math.floor(Math.random() * password.length);
    randomizedPassword.push(password[index]);
    password.splice(index,1);
  }

  return randomizedPassword.join("");
}

// Write password to the #password input
function writePassword() {
  

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
