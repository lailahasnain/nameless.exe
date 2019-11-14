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



var user_email, email_un, nickname
var Air_price, Air, Dep, Hot, Hot_Price, Loc , Nickname , Ret, Sub_Tot, Tot, Trans , Trans_price, Use_email, Send_em, Taxes


// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
            email_un = user_email.substr(0, user_email.indexOf('@'));
            //console.log("Your email is: " + user_email + " stripped name of: " + email_un);
            pull_data_Expenses(email_un);
        }
    } else {
        // If no user
        window.alert("You are not signed in. Please exit this tab. Sign in and Add a trip again.");
    }
});
// End - Check for user login

// Shorthand function for calling values by Ids.
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Pull data from database
function pull_data_Expenses(email_front)
{
    // Display to console
    //console.log("The global result is: " + email_front);

    // Strip the nickname from the URL
    nickname = window.location.href
    nickname = nickname.substring(nickname.lastIndexOf('/') + 1);

    // Reference to database
    var database = firebase.database();

    // Get elements
    const preobject = document.getElementById('Add_Trip/' + email_un + "/" + nickname);

    // Convert %20 into strings - should they exist
    nickname = nickname.replace(/%20/g, " ");
    //console.log("New nickname: " + nickname);

    // Attempt to get data by calling a reference once
    var ref = firebase.database().ref('Add_Trip/' + email_un + "/" + nickname);
    ref.on('value', snapshot => {
        Air_price = snapshot.child('Airline_Price').val();      // Airline_Price
        Air = snapshot.child('Airplane').val();      // Airplane
        Dep = snapshot.child('Departure').val();      // Departure
        Hot = snapshot.child('Hotel').val();      // Hotel
        Hot_Price = snapshot.child('Hotel_Price').val();      // Hotel_Price
        Loc = snapshot.child('Location').val();      // Location
        Nickname = snapshot.child('Name').val();      // Name
        Ret = snapshot.child('Return').val();      // Return
        Sub_Tot = snapshot.child('Sub_total').val();      // Sub_total
        Taxes = snapshot.child('Tax').val();      // Tax
        Tot = snapshot.child('Total').val();      // Total
        Trans = snapshot.child('Transportation').val();      // Transportation
        Trans_price = snapshot.child('Transportation_Price').val();      // Transportation_Price
        Use_email = snapshot.child('User_Email').val();      // User_Email
        Send_em = snapshot.child('send_email').val();      // send_email
        //console.log("Airline" + Air_price);

        // Change dates so they are more readable
        Dep = Dep.replace("T", " Time: ");
        Ret = Ret.replace("T", " Time: ");
        //window.alert("Depart: " + Dep);

        // Display test
        //console.log("Path we are entering: " + 'Add_Trip/' + email_un + "/" + nickname);
        //console.log("Airline Price: " + Air_price);
        //console.log("Airplane: " + Air);
        //console.log("Departure: " + Dep);
        //console.log("Hotel: " + Hot);
        //console.log("Hotel_Price: " + Hot_Price);
        //console.log("Location: " + Loc);
        //console.log("Name: " + Nickname);
        //console.log("Return: " + Ret);
        //console.log("Sub_total: " + Sub_Tot);
        //console.log("Tax: " + Taxes);
        //console.log("Total: " + Tot);
        //console.log("Transportation: " + Trans);
        //console.log("Transportation_Price: " + Trans_price);
        //console.log("User_Email: " + Use_email);
        //console.log("send_email: " + Send_em);

        // Send data to disp_Expenses
        disp_Expenses(Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Taxes, Tot, Trans, Trans_price, Use_email)
    });
}

// Display values on Expenses Page
function disp_Expenses(ap, a, d, h, hp, loc, nn, re, st, tax, tot, tra, trap, em) {
    //window.alert("Success with Email" + email + "; Nickname: " + name + "; Location: " + loc + "; Departure: " + dep + "; Return: " + ret + "; Hotel: " + hot + "; Airline: " + air + "; Transportation: " + tra);

    // ----------------------------------------------------------
    //   Replace values on Expenses page with values from Trip
    // ----------------------------------------------------------

    // Set title nickname and email
    document.getElementById("nn").innerHTML = nn;
    document.getElementById("emailaddress").innerHTML = em;

    // Set a base row consisting of location, departure, and return dates/times
    document.getElementById('loca').innerHTML = loc;
    document.getElementById('depa').innerHTML = ("Depart: " + d);
    document.getElementById('retu').innerHTML = ("Return: " + re);

    // Replace Hotel Name and price
    document.getElementById('Hotel_name').innerHTML = h;
    document.getElementById('Hotel_price').innerHTML = ("$" + hp);

    // Replace Airline Name and price
    document.getElementById('Airline_name').innerHTML = a;
    document.getElementById('Airline_Price').innerHTML = ("$" + ap);

    // Replace Transportation method and price
    document.getElementById('Trans_method').innerHTML = tra;
    document.getElementById('Trans_price').innerHTML = ("$" + trap);

    // Update Tax Rate and Sub-Total
    document.getElementById('sub_total').innerHTML = ("$" + st);
    document.getElementById('Tax_rate').innerHTML = ("+" + tax + "% tax rate");

    // Update Total
    document.getElementById('Actual_total').innerHTML = ("$" + tot);
}

function update_email_send() {
    var up = getInputVal('e_r');

    if (up == "") {
        window.alert("Please select a valid option.");
        //console.log("No option selected");
    }
    else if (up == "Yes") {
        // Update record in Firebase
        window.alert("You have chosen to have a copy emailed to you. Please be patient. An email will be sent shortly to: " + Use_email);

        // Update the database with new value - Yes
    }
    else if (up == "No") {
        window.alert("An email will not be sent out for this trip. You may navigate away from this window at your convenience.");

        // Update the database with the new value - No
    }
}

// Update variables
function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}