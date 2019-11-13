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



var user_email = "Unknown User";
var email_un = "";
var nickname = "Unknown";

// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
            var email_un = user_email.substr(0, user_email.indexOf('@'));
            
        }
    } else {
        // If no user

    }
});
// End - Check for user login


function pass_loc() {
    nickname = getInputVal('nickname');

    window.alert("Successfully entered this page with nickname" + nickname);
    console.log("Nickname retrieved: " + nickname);
}

// Shorthand function for calling values by Ids.
function getInputVal(id) {
    return document.getElementById(id).value;
}








// Reference to database
var database = firebase.database();

// Get elements
const preobject = document.getElementById('Add_Trip/' + email_un + "/" + nickname);

// Create references
const dbRefObject = firebase.database().ref().child('Add_Trip/' + email_un + "/" + nickname);

// Sync object changes
dbRefObject.on('value', snap => console.log(snap.val()));

console.log("Path we are entering: " + 'Add_Trip/' + email_un + "/" + nickname);






































// Display values on Expenses Page
function disp_Expenses(email, name, loc, dep, ret, hot, air, tra) {
    window.alert("Success with Email" + email + "; Nickname: " + name + "; Location: " + loc + "; Departure: " + dep + "; Return: " + ret + "; Hotel: " + hot + "; Airline: " + air + "; Transportation: " + tra);

    // ----------------------------------------------------------
    //   Replace values on Expenses page with values from Trip
    // ----------------------------------------------------------

    // Set title nickname and email
    document.getElementById("nn").innerHTML = name;
    document.getElementById("emailaddress").innerHTML = email;

    // Set a base row consisting of location, departure, and return dates/times
    document.getElementById('loca').innerHTML = loc;
    document.getElementById('depa').innerHTML = dep;
    document.getElementById('retu').innerHTML = ret;

    // Replace Hotel Name and price
    document.getElementById('Hotel_name').innerHTML = hot;
    document.getElementById('Hotel_price').innerHTML = ("$" + hot_price);

    // Replace Airline Name and price
    document.getElementById('Airline_name').innerHTML = air;
    document.getElementById('Airline_Price').innerHTML = ("$" + air_price);

    // Replace Transportation method and price
    document.getElementById('Trans_method').innerHTML = tra;
    document.getElementById('Trans_price').innerHTML = ("$" + trans_price);

    // Update Tax Rate and Sub-Total
    document.getElementById('sub_total').innerHTML = ("$" + sub_tot);

    // Update Total
    document.getElementById('Actual_total').innerHTML = ("$" + total);
}