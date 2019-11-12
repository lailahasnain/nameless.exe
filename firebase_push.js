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

// Reference Add Trip Collection
var AddTrip = firebase.database().ref('Add Trip');

// JavaScript source code
document.getElementById('contact_form').addEventListener('submit', submitForm);

var user_email = "Unknown User";

// Check for user login
// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
        }
    } else {
        // If no user
        window.alert("Please sign in before continuing with this form. Data will not be saved.");
        console.log("Please sign in before continuing with this form. Data will not be saved.");
    }
});
// End - Check for user login







// Submit Form
function submitForm(e) {
    e.preventDefault();

    var name = getInputVal('nickname');
    var loc = getInputVal('visiting_location');
    var dep = getInputVal('depart');
    var ret = getInputVal('return');
    var hot = getInputVal('hotel');
    var air = getInputVal('Airline');
    var tra = getInputVal('transp');

    // Test to see if the values are working
    console.log("User Email: " + user_email);
    console.log("Name: " + name);
    console.log("Location: " + loc);
    console.log("Depart: " + dep);
    console.log("Return: " + ret);
    console.log("Hotel: " + hot);
    console.log("Airplane: " + air);
    console.log("Transportation: " + tra);


    if ((user_email != "Unknown User") && (name != "") && (loc != "0") && (dep != "") && (ret != "") && (hot != "< Select an option >") && (hot != "< Please pick a location first >") && (air != "< Select an option >") && (tra != "< Select an option >"))
    {
        // Save Message
        saveMessage(user_email, name, loc, dep, ret, hot, air, tra);

        // Clears form
        document.getElementById('contact_form').reset();

        document.location.href = "/Expenses.html";

        // Pass values to be displayed on Expenses Page
        //disp_Expenses(user_email, name, loc, dep, ret, hot, air, tra);
    }
    else if (user_email == "Unknown User") {
        document.location.href = "/Add_Trip.html";
    }
    else
    {
        window.alert("Please fill out all information");
        document.location.href = "/Add_Trip.html";
    }

}

// Shorthand function for calling values by Ids.
function getInputVal(id)
{
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(user_email, name, loc, dep, ret, hot, air, tra) {
    var newMessageRef = AddTrip.push();
    newMessageRef.set({
        User_Email: user_email,
        Name: name,
        Location: loc,
        Departure: dep,
        Return: ret,
        Hotel: hot,
        Airplane: air,
        Transportation: tra
    });
}
