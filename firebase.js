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
    }
});
// End - Check for user login

function logout() {
    firebase.auth().signOut();
    // Clears form
    document.getElementById('email_field').reset();
}

// Begin - This contains the code to make the a new user in Firebase (non-SQL) database
function sign_up() {
    // window.alert("Working!!!");

    var userEmail = getInputVal("email_field");
    var userPassword = getInputVal("password_field");

    // window.alert(userEmail + " " + userPassword)

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("Error: " + errorMessage);
    });

    send_email();
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
        window.alert("Verification sent!");
    }).catch(function (error) {
        // An error happened.
        window.alert("An error occurred!" + error.message);
    });
}