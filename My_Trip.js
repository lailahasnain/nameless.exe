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

var user_email, email_un, nickname, user_rec_update, high_string_loc
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
    var data_loc = [0];
    var data_air = [0];
    var data_hotel = [[],[0]];
    var data_tran = [0];
    var string_loc = ["Bellingham, Washington","Las Vegas, Nevada", "Los Angeles, California", 
                        "Phoenix, Arizona", "Portland, Oregon", "Reno, Nevada", 
                            "San Francisco, California", "Seattle, Washingtion"]
    var string_air = ["Allegiant Air", "American Airlines", "Delta Airlines", "Frontier Airlines"
                        , "JetBlue", "Southwest Airlines"];
    var string_hotel = [ ["Shamrock Motel ()", "Motel 6", "Chrysalis Inn and Spa", "GuestHouse Inn", "Holiday Inn"], 
                        ["Tru (Las Vegas)", "The LINQ (Las Vegas)", "Travelodge (Las Vegas)", "Four Queens (Las Vegas)"], 
                        [], 
                        [], 
                        [],
                        [],
                        [],
                        []
                     ];
    
    var string_tran = [];

    var length_loc = 8;
    var length_air = 6;
    var length_hotel_loc = 8;
    var length_hotel = 5;
    var length_tran = 5;
    
    //length of array = # of location
    for(var x = 0; x < length_loc; x++) {
        data_loc.push(0);
    }
    //length of array = # of airlines
    for(var x = 0; x < length_air; x++) {
        data_air.push(0);
    }
    
    //length of 2d array = # of hotels
    //height of 2d array = # of location
    // for(var x = 0; x < length_hotel_loc; x++) {
    //     data_hotel.push([0]);
    //     for(var j = 0; j < length_hotel; j++) {
    //         data_hotel[x].push(0);
    //     }
    // }
    
    //length of array = # of transportation options
    for(var x = 0; x < length_tran; x++) {
        data_tran.push(0);
    }

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

        // Get current location name
        console.log("Current location: " + Loc);

    /* To-do */
        // Javascript to grab each name that is executed for each trip a user has, then keep a count and push to an array [preferbly]
        // Note: This count must be accurate as the data being pulled using this is the recommended items from the database
        // Count the user's information and put into an array 
        
        // update locations
        for(var x = 0; x < length_loc; x++) {
            if (string_loc[x] == Loc){
                data_loc[x] += 1;
            }
        }

        //update airlines
        for(var x = 0; x < length_air; x++) {
            if (string_air[x] == Air){
                data_air[x] += 1;
            }
        }
        
        // // update hotel locations
        // // update hotel
        // for(var x = 0; x < length_hotel_loc; x++) {
        //     data_hotel.push([0]);
        //     for(var j = 0; j < length_hotel; j++) {
        //         data_hotel[x].push(0);
        //     }
        // }
        
        // update transportation
        for(var x = 0; x < length_tran; x++) {
            if (string_tran[x] == Trans){
                data_tran[x] += 1;
            }
        }

        //search for highest location count 
        var high_count_loc = 0;
        var high_index_loc = 0;
        high_string_loc = "";
        for(var x = 0; x < length_loc; x++) {
            if (data_loc[x] > high_count_loc){
                high_count_loc = data_loc[x];
                high_index_loc = x;
            }
        }
        high_string_loc = string_loc[high_index_loc];

        //search for highest airline count 
        var high_count_air = 0;
        var high_index_air = 0;
        var high_string_air = "";
        for(var x = 0; x < length_air; x++) {
            if (data_air[x] > high_count_air){
                high_count_air = data_air[x];
                high_index_air = x;
            }
        }
        high_string_air = string_air[high_index_air];
        console.log(high_string_air);
        
        //search for highest transporation count 
        var high_count_tran = 0;
        var high_index_tran = 0;
        var high_string_tran = "";
        for(var x = 0; x < length_tran; x++) {
            if (data_tran[x] > high_count_tran){
                high_count_tran = data_tran[x];
                high_index_tran = x;
            }
        }
        high_string_tran = string_tran[high_index_tran];
        console.log(high_string_tran);


        // Convert location to recommended database location
        var high_loc_db_name = get_updated_loc_for_db(high_string_loc);
        console.log("New name: " + high_loc_db_name);

        // Gather location data for recommendations
        var ref = firebase.database().ref('Recommendation');
        ref.on('value', snapshot => {
            user_rec_update = snapshot.child(high_loc_db_name).val();      // Airline_Price
            console.log("The array we pulled is: " + user_rec_update);
        });

        //window.alert("Last array: " + user_rec_update);

    }); //end ref

    //save highest count and  for location
    

    //ref.on('value', gotData, errData);

    // Pull array for highest location - recommended trip (location)


}
function noDisplay(){
    $('#table_body').hide();
    $('b').hide();
}
function display(){
    var values = document.getElementById('display_Trip').value;
    
    console.log(values);
    if(values == '0'){
        $('#table_body').hide();
        $('b').hide();
    }else if(values == '1'){
        console.log(values);
        //get_user_past_data();
        //gotData(data);
        $('#table_body').show();
        $('b').show();
       
    } else if(values == '2'){
        $('#table_body').hide();
        $('b').hide();
    }else if(values == '3'){
        $('#table_body').show();
        $('b').show();
    }
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

function get_updated_loc_for_db(loc) {
    //console.log("We are here with loc val: " + loc);
    // Find location for key value
    if (loc == "Bellingham, Washington") {
        return "Bellingham_Washington";
    }
    else if (loc == "Seattle, Washington") {
        return "Seattle_Washington";
    }
    else if (loc == "Portland, Oregon") {
        return "Portland_Oregon";
    }
    else if (loc == "San Francisco, California") {
        return "San_Francisco_California";
    }
    else if (loc == "Los Angeles, California") {
        return "Los_Angeles_California";
    }
    else if (loc == "Phoenix, Arizona") {
        return "Phoenix_Arizona";
    }
    else if (loc == "Las Vegas, Nevada") {
        return "Las_Vegas_Nevada";
    }
    else if (loc == "Reno, Nevada") {
        return "Reno_Nevada";
    }
    else {
        window.alert("Bad location: " + loc);
        return "Null";
    }
}

