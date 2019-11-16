// JavaScript source code - Sample trip data

function get_sample_trip_data()
{
    //window.alert("Test");
    // Variables to update
    var dep_hr, dep_min, ret_hr, ret_min, rand_loc, rand_five, rand_air, use_hotel

    // Different arrays holding data
    var Location = ["Seattle, Washington", "Bellingham, Washington", "Portland, Oregon", "Los Angeles, California", "Phoenix, Arizona", "San Francisco, California", "Las Vegas, Nevada", "Reno, Nevada"];
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
    var which_loc = Location[getRandom_whole(0, 7)];

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
    document.getElementById('nn').innerHTML = trip_name[getRandom_whole(0, 4)];
    document.getElementById('loca').innerHTML = which_loc;
    document.getElementById('depa').innerHTML = ("2019/" + getRandom_whole(1, 12) + "/" + getRandom_whole(1,31) + "&nbsp;&nbsp;&nbsp;&nbsp;" + dep_hr + ":" + dep_min);
    document.getElementById('ret').innerHTML = ("2019/" + getRandom_whole(1, 12) + "/" + getRandom_whole(1, 31) + "&nbsp;&nbsp;&nbsp;&nbsp;" + ret_hr + ":" + ret_min);
    document.getElementById('Hotel_name').innerHTML = use_hotel;
    document.getElementById('Airline_name').innerHTML = airline[getRandom_whole(0, 4)];
    document.getElementById('Trans_method').innerHTML = transportation[getRandom_whole(0, 4)];
}

// Get random number between 2 ranges
function getRandom_whole(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
}