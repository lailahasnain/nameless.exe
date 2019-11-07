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
    console.log("Name: " + name);
    console.log("Location: " + loc);
    console.log("Depart: " + dep);
    console.log("Return: " + ret);
    console.log("Hotel: " + hot);
    console.log("Airplane: " + air);
    console.log("Transportation: " + tra);

    // Save Message
    saveMessage(name, loc, dep, ret, hot, air, tra);

    // Clears form
    document.getElementById('contact_form').reset();
}

// Shorthand function for calling values by Ids.
function getInputVal(id)
{
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, loc, dep, ret, hot, air, tra) {
    var newMessageRef = AddTrip.push();
    newMessageRef.set({
        Name: name,
        Departure: dep,
        Return: ret,
        Hotel: hot,
        Airplane: air,
        Transportation: tra
    });
}