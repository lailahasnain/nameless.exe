// Begin - Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDeMIN3Pxd-G7dMsrfTvWaQfxrK1-RWdac",
authDomain: "nameless-exe-database.firebaseapp.com",
databaseURL: "https://nameless-exe-database.firebaseio.com",
projectId: "nameless-exe-database",
storageBucket: "nameless-exe-database.appspot.com",
messagingSenderId: "275124553602",
appId: "1:275124553602:web:abf30c6a1f81d56230719b"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// End - Your web app's Firebase configuration

// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("signup_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.email
            var email_verified = user.emailVerified;

            if (email_verified) {
                document.getElementById("verify_btn").style.display = "none";
            }
            else {
                document.getElementById("verify_btn").style.display = "block";
            }
            document.getElementById("user_para").innerHTML = "Welcome: " + email_id + "<br/>" + 
                                                             "Verified: " + email_verified;
        }
    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("signup_div").style.display = "block";
    }
});
// End - Check for user login

function logout() {
    firebase.auth().signOut();
    // Clears form
    document.getElementById('email_field').reset();
    document.getElementById('Pass1').reset();
    document.getElementById('Pass2').reset();
}

// Begin - This contains the code to make the a new user in Firebase (non-SQL) database
function sign_up() {
    // window.alert("Working!!!");

    // All data being pulled in from user creation form. Be careful with dates. They make things act weird. Original code from SignUp.html file broke this code.
    var email = getInputVal("emailaddress");
    var pass_one = getInputVal("Pass_one");
    var pass_two = getInputVal("Pass_two");

    // window.alert("Creating user: " + name + " " + userEmail + " " + pass1 + " " + pass2 + " " + date + " " + country + " " + gender);

    // Verify that the passwords match before trying to create an account.
    if (email != "" && (pass_one == pass_two)) {
        console.log("Email: " + email);
        console.log("Password: " + pass_one);

        firebase.auth().createUserWithEmailAndPassword(email, pass_one).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        // If no errors, this is the only modal that will appear
        window.alert("Account created succesfully!");
    }
    else
    {
        // If something is missing from any field, this modal will appear.
        window.alert("Account creation failed!\nPlease verify you have filled out all of the fields.");
    }

    // Reset values
    email = "";
    pass1 = "";
    pass2 = "";

    // Auto refresh the page
    document.location.href = "Sign_In.html";
}
// End - This contains the code to make the a new user in Firebase (non-SQL) database

// Begin - This contains the code to make the connection and functionality with Firebase (non-SQL) database
function login() {
    // window.alert("Working!!!");

    var userEmail = getInputVal("email_field");
    var userPassword = getInputVal("password_field");

    // window.alert(userEmail + " " + userPassword)

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        // ...
    });
}
// End - This contains the code to make the connection and functionality with Firebase (non-SQL) database

// Begin - Use this so you don't have to constantly write out 'document.getElementID [...]'
function getInputVal(id) {
    return document.getElementById(id).value;
}
// End - Use this so you don't have to constantly write out 'document.getElementID [...]'

function SendVerification()
{ 
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        window.alert("Verification sent!\nPlease check your email.\n\nOnce you verify, refresh this page!");
    }).catch(function (error) {
        // An error happened.
        window.alert("An error occurred!" + error.message);
    });
}

// ---------------------------------------------------------------------------
//         Everything above is for the user login. Below is Add Trip
// ---------------------------------------------------------------------------
function submit_Add_Trip() {
    var name = document.getElementById("nickname");
    var loc = document.getElementById("visiting_location");
    var dep = document.getElementById("depart");
    var ret = document.getElementById("return");
    var hot = document.getElementById("hotel");
    var air = document.getElementById("Airline");
    var trans = document.getElementById("transp");
    var submit = document.getElementById("Submit_button");

    // Test to see if they are being read
    console.display("Name: " + name);
    console.display("Location: " + loc);
    console.display("Deaprt: " + dep);
    console.display("Return: " + ret);
    console.display("Hotel: " + hot);
    console.display("Airline: " + air);
    console.display("Transportation: " + trans);
    

    //window.alert("Working!");
    var firebase = firebase.database().ref();

    firebaseRef.child("Text").set("Some Value");
}

function forgot_password() {
    var email = getInputVal("email_field");

    if (email != "") {
        var auth = firebase.auth();
        //var emailAddress = "user@example.com";
        console.log("Email passed: ", email);

        auth.sendPasswordResetEmail(email).then(function () {
            // Email sent.
            window.alert("Email has been sent. Please check your email.");
        }).catch(function (error) {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error: " + errorMessage);
        });
    }
    else {
        window.alert("Please enter your email address.");
        console.log("Email is invalid.");
    }
}