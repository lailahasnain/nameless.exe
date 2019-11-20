firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
            email_un = user_email.substr(0, user_email.indexOf('@'));
            //console.log("Your email is: " + user_email + " stripped name of: " + email_un);
            var temp = String(email_un);
            console.log(temp);
            database = firebase.database();

            var ref = database.ref('Add_Trip');
            var ref1 = ref.child(temp);
            ref1.on('value', Data , Err);
            
            function Data(data){
                console.log(data.val());

                var dataval = data.val();
                var keys = Object.keys(dataval);

                var k = keys[1]
                var Location = dataval[k].Location;
                console.log(Location);
                if(Location == 'Seattle, Washington' || Location == "Bellingham, Washington" 
                                        || Location == 'Portland, Oregon'){
                    if(Location == 'Bellingham, Washington'){
                        document.getElementById('local').innerHTML = 'Seattle, Washington';
                        Location = 'Seattle, Washington';
                    }
                    if(Location == 'Seattle, Washington'){
                        document.getElementById('local').innerHTML = 'Bellingham, Washington';
                        Location = 'Bellingham, Washington';
                    }
                    if(Location == 'Portland, Oregon'){
                        document.getElementById('local').innerHTML = 'Seattle, Washington';
                        Location = 'Seattle, Washington';
                    }
                }

                if(Location == "San Francisco, California" || Location == 'Los Angeles, California'){
                    if(Location == 'San Francisco, California'){
                        document.getElementById('local').innerHTML = 'Los Angeles, California';
                        Location = 'Los Angeles, California';
                    }
                    if(Location == 'Los Angeles, California'){
                        document.getElementById('local').innerHTML = 'San Francisco, California';
                        Location = 'San Francisco, California';
                    }
                    
                }

                if(Location == 'Reno, Nevada' || Location == 'Las Vegas, Nevada' 
                                        || Location == 'Phoenix, Arizona'){
                    if(Location == 'Reno, Nevada'){
                        document.getElementById('local').innerHTML = 'Las Vegas, Nevada';
                        Location = 'Las Vegas, Nevada';
                    }
                    if(Location == 'Las Vegas, Nevada'){
                        document.getElementById('local').innerHTML = 'Reno, Nevada';
                        Location = 'Reno, Nevada';
                    }
                    if(Location == 'Phoenix, Arizona'){
                        document.getElementById('local').innerHTML = 'Las Vegas, Nevada';
                        Location = 'Las Vegas, Nevada';
                    }
                }
                
                
    //window.alert("Test");
    // Variables to update
    var dep_hr, dep_min, ret_hr, ret_min, rand_loc, rand_five, rand_air, use_hotel

    // Different arrays holding data
    
    var Phoenix = ["Vacation Inn (Phoenix)", "EZ 8 Motel (Phoenix)", "Premier Inn (Phoenix)", "Lux Uptown Apts. (Phoenix)", "Hotel Embassy (Phoenix)"];
    var LA = ["Samesun Venice Beach (Los Angeles)", "Value Inn (Los Angeles)", "Luxe City Center Hotel (Los Angeles)", "Motel 6 (Los Angeles)", "Hotel Crowne Plaza (Los Angeles)"];
    var SF = ["Holiday Express Inn Hotel and Suites (San Francisco)", "Hyatt Place (San Francisco)", "Stanford Court (San Francisco)", "Travelodge by Wyndham (San Francisco)", "Travelodge (San Francisco)"];
    var LV = ["Circus Circus (Reno)", "Motel 6 (Reno)", "Sands Regency (Reno)", "Baymont Inn (Reno)", "Nugget (Reno)"];
    var Reno = ["Tru (Las Vegas)", "The LINQ (Las Vegas)", "Travelodge (Las Vegas)", "Four Queens (Las Vegas)", "The Venetian (Las Vegas)"];
    var Portland = ["Howard Johnson (Portland)", "Mark Spencer Hotel (Portland)", "Portland Northwest Hotel (Portland)", "Ramada (Portland)", "Society Hotel (Portland)"];
    var Bellingham = ["Shamrock Motel (Bellingham)", "Motel 6 (Bellingham)", "Chrysalis Inn and Spa (Bellingham)", "GuestHouse Inn (Bellingham)", "Holiday Inn (Bellingham)"];
    var Seattle = ["Kimpton Hotel (Seattle)", "Sheraton Grand Seattle (Seattle)", "Grandy Hyatt Seattle (Seattle)", "Crowne Plaza (Seattle)", "Hyatt at Olive 8 (Seattle)"];
    var trip_name = ["My Awesome Trip", "Some fun in the Sun", "Beach Trip", "Ocean Visit", "Party Life"];
    var airline = ["Allegiant Air", "American Airlines", "Delta Airlines", "Frontier Airlines", "JetBlue", "Southwest Airlines"];
    var transportation = ["Car", "Motorbike", "Motorcycle", "Bus", "Train"];

    // Pick hotel
    var which_loc = Location;

    if (which_loc == "Seattle, Washington") {
        use_hotel = Seattle[getRandom_whole(0, 4)];
    }
    else if (which_loc == "Bellingham, Washington") {
        use_hotel = Bellingham[getRandom_whole(0, 4)];
    }
    else if (which_loc == "Portland, Oregon") {
        use_hotel = Portland[getRandom_whole(0, 4)];
    }
    else if (which_loc == "Los Angeles, California") {
        use_hotel = LA[getRandom_whole(0, 4)];
    }
    else if (which_loc == "Phoenix, Arizona") {
        use_hotel = Phoenix[getRandom_whole(0, 4)];
    }
    else if (which_loc == "San Francisco, California") {
        use_hotel = SF[getRandom_whole(0, 4)];
    }
    else if (which_loc == "Las Vegas, Nevada") {
        use_hotel = LV[getRandom_whole(0, 4)];
    }
    else if (which_loc == "Reno, Nevada") {
        use_hotel = Reno[getRandom_whole(0, 4)];
    }

    // Get data for the times
    dep_hr = getRandom_whole(0, 12);
    dep_min = getRandom_whole(0, 60);
    ret_hr = getRandom_whole(0, 12);
    ret_min = getRandom_whole(0, 60);

    // Check if the value of minutes is under 10, then append a 0
    if (dep_min < 10) {
        dep_min = ("0" + dep_min);
    }

    if (ret_min < 10) {
        ret_min = ("0" + ret_min);
    }

    //console.log("dep hr: " + dep_hr + "; min: " + dep_min);
    //console.log("ret hr: " + ret_hr + "; min: " + ret_min);

    // Assign values to placeholders
    document.getElementById('nnl').innerHTML = 'Recommended Trip'
    document.getElementById('local').innerHTML = which_loc;
   // document.getElementById('depal').innerHTML = ("2019/" + getRandom_whole(1, 12) + "/" + getRandom_whole(1,31) + "&nbsp;&nbsp;&nbsp;&nbsp;" + dep_hr + ":" + dep_min);
   // document.getElementById('retul').innerHTML = ("2019/" + getRandom_whole(1, 12) + "/" + getRandom_whole(1, 31) + "&nbsp;&nbsp;&nbsp;&nbsp;" + ret_hr + ":" + ret_min);
    document.getElementById('Hotel_namel').innerHTML = use_hotel;
    document.getElementById('Airline_namel').innerHTML = airline[getRandom_whole(0, 4)];
    document.getElementById('Trans_methodl').innerHTML = transportation[getRandom_whole(0, 4)];


// Get random number between 2 ranges
function getRandom_whole(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
}

                
                console.log(temp);
                
                console.log(keys);


                


            }

            function Err(err){
            console.log('Error!');
            console.log(err);
            }
            

        }
        
    } else {
        // If no user
        window.alert("You are not signed in. Please exit this tab. Sign in and Add a trip again.");
    }
});
