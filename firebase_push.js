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
//var AddTrip = firebase.database().ref('Add Trip/' + user_email);


// JavaScript source code
//document.getElementById('contact_form').addEventListener('submit', submitForm);

var user_email = "Unknown User";

// Check for user login
// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
            console.log("User has been identified with email: " + user_email);
        }
        else {
            console.log("User has not been identified with email: " + user_email);
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
    //e.preventDefault();

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


    if ((user_email != "Unknown User") && (name != "") && (loc != "0") && (dep != "") && (ret != "") && (hot != "< Select an option >") && (hot != "< Please pick a location first >") && (air != "< Select an option >") && (tra != "< Select an option >")) {
        // Save Message
        saveMessage(user_email, name, loc, dep, ret, hot, air, tra);

        // Clears form
        //document.getElementById('contact_form').reset();

        // Pass values to be displayed on Expenses Page
        //disp_Expenses(user_email, name, loc, dep, ret, hot, air, tra);
    }
    else if (user_email == "Unknown User") {
        document.location.href = "/Add_Trip.html";
    }
    else {
        window.alert("Please fill out all information");
        document.location.href = "/Add_Trip.html";
    }

}

// Shorthand function for calling values by Ids.
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(user_email, name, loc, dep, ret, hot, air, tra) {
    // Variables for pricing
    var hot_price, air_price, trans_price, sub_tot, total, tax_rate

    // Assign values to prices
    if (date_diff_indays(dep, ret) == 0) {
        hot_price = getRandomArbitrary(80, 125, 1);
        air_price = getRandomArbitrary(120, 380, 1);
        trans_price = getRandomArbitrary(5, 30, 1);
    }
    else {
        hot_price = getRandomArbitrary(80, 125, date_diff_indays(dep, ret));
        air_price = getRandomArbitrary(120, 380, 1);
        trans_price = getRandomArbitrary(5, 30, date_diff_indays(dep, ret));
    }


    // Get subtotal and total
    tax_rate = getRandomArbitrary(0.07, 0.0958, 1);
    sub_tot = (hot_price + air_price + trans_price);
    total = ((sub_tot * tax_rate) + sub_tot);

    // Round values to USD $ equivalent
    hot_price = hot_price.toFixed(2);
    air_price = air_price.toFixed(2);
    trans_price = trans_price.toFixed(2);

    tax_rate = tax_rate.toFixed(5);
    sub_tot = sub_tot.toFixed(2);
    total = total.toFixed(2);

    // Test results
    //window.alert("Your Results:\n\nDep: " + dep + "\nRet: " + ret + "\nTax Rate" + tax_rate + "\nSub Total: " + sub_tot + "\nTotal: " + total);

    var email_un = user_email.substr(0, user_email.indexOf('@'));

    console.log("Stripped email is: " + email_un);
    console.log("Nickname: " + name);
    firebase.database().ref('Add_Trip/' + email_un).child(name).set(
        {
            User_Email: user_email,
            Name: name,
            Location: loc,
            Departure: dep,
            Return: ret,
            Hotel: hot,
            Airplane: air,
            Transportation: tra,
            Hotel_Price: hot_price,
            Airline_Price: air_price,
            Transportation_Price: trans_price,
            Sub_total: sub_tot,
            Total: total,
            Tax: tax_rate,
            Send_email: "temp",
            Recommend: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, function (error) {
            if (error) {
                window.alert("Data could not be saved." + error);
            } else {
                window.alert("Data saved successfully.");

                // Navigate to the Expenses page and append the nickname to the end of the URL
                document.location.href = ("tipsform.html?/" + name);
            }
        });
}

// Get pricing by passing in three variables. A lower bound, upper bound, and number of days.
function getRandomArbitrary(min, max, days) {
    return ((Math.random() * (max - min) + min) * days);
}

function date_diff_indays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

