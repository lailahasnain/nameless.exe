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

// JavaScript source code for gathering data for Expense pages




// Display values on Expenses Page
function disp_Expenses(email, name, loc, dep, ret, hot, air, tra) {
    window.alert("Success with Email" + email + "; Nickname: " + name + "; Location: " + loc + "; Departure: " + dep + "; Return: " + ret + "; Hotel: " + hot + "; Airline: " + air + "; Transportation: " + tra);

    // Variables for pricing
    var hot_price, air_price, trans_price, sub_tot, total, tax_rate

    // Assign values to prices
    hot_price = getRandomArbitrary(80, 125, date_diff_indays(dep, ret));
    air_price = getRandomArbitrary(120, 380, 1);
    trans_price = getRandomArbitrary(5, 30, date_diff_indays(dep, ret));

    // Get subtotal and total
    tax_rate = getRandomArbitrary(0.07, 0.0958, 1);
    sub_tot = (hot_price + air_price + trans_price);
    total = ((sub_tot * tax_rate) + sub_tot);

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

// Get pricing by passing in three variables. A lower bound, upper bound, and number of days.
function getRandomArbitrary(min, max, days) {
    return ((Math.random() * (max - min) + min) * days);
}

function date_diff_indays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}