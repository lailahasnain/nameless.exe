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
var Air_price, Air, Dep, Hot, Hot_Price, Loc , Nickname , Ret, Sub_Tot, Tot, Trans , Trans_price, Use_email, Send_em, Taxes, hotel_only


// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
            email_un = user_email.substr(0, user_email.indexOf('@'));
            
            get_user_past_data();
        }
    } else {
        // If no user
        window.alert("You are not signed in. Please exit this tab. Sign in and Add a trip again.");
    }

    
});
// End - Check for user login

function get_user_past_data() {
    // Attempt to get data by calling a reference once
    var i = 0;  // Keep count
    var ref = firebase.database().ref('Add_Trip/' + email_un);
    ref.on('child_added', snapshot => {
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

        // Strip the location off the hotel and display that
        hotel_only = Hot.substr(0, Hot.indexOf('('));

        // Increment count
        i += 1;

        // Push to body of html
        //$("#table_body").append("<tr><td>" + Air + "</td><td>" + Air_price + "</td></tr>")
        $("#table_body").append("<tr><td>" + i + "</td><td>" + Nickname + "</td><td>" + Loc + "</td><td>" + Dep + "</td><td>" + Ret + "</td><td>" + hotel_only + "</td><td>" + Air + "</td><td>" + Trans + "</td><td>$" + Tot + "</td></tr>")

    });
    //ref.on('value', gotData, errData);
}


function gotData(data) {
    //console.log(data.val());
    var trip_data = data.val();
    var trip_name = Object.keys(trip_data);
    //console.log(trip_name);

    if (trip_name.length > 0) {
        for (var i = 0; i < trip_name.length; i++) {
            var index = trip_name[i]

            // Get User trip data - w/o what they were bringing
            Air_price = trip_data[index].Airline_Price;      // Airline_Price
            Air = trip_data[index].Airplane;      // Airplane
            Dep = trip_data[index].Departure;      // Departure
            Hot = trip_data[index].Hotel;      // Hotel
            Hot_Price = trip_data[index].Hotel_Price;      // Hotel_Price
            Loc = trip_data[index].Location;      // Location
            Nickname = trip_data[index].Name;      // Name
            Ret = trip_data[index].Return;      // Return
            Sub_Tot = trip_data[index].Sub_total;      // Sub_total
            Taxes = trip_data[index].Tax;      // Tax
            Tot = trip_data[index].Total;      // Total
            Trans = trip_data[index].Transportation;      // Transportation
            Trans_price = trip_data[index].Transportation_Price;      // Transportation_Price
            Use_email = trip_data[index].User_Email;      // User_Email
            Send_em = trip_data[index].send_email;      // Send Email

            // Change to user's email address
            document.getElementById('email_addr').innerHTML = ("User email: " + Use_email);

            // Append user data
            var ele = document.createElement("p");
            var node_data = document.createTextNode((i + 1) + ") Trip Name: " + Nickname + "; Location: " + Loc + "; Departure: " + Dep + "; Return: " + Ret + "; Hotel: " + hotel_only + "; Airline: " + Air + "; Transportation: " + Trans);
            ele.appendChild(node_data);
            var element = document.getElementById("user_trips");
            element.appendChild(ele);
        }
    }
}

function errData(err) {
    console.log("Error!!!");
    console.log(err);
}