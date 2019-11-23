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



var user_email, email_un, nickname  // Grabbed from the page loading and checking Firebase
var Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Tot, Trans, Trans_price, Use_email, Send_em, Taxes, Dep_d, Dep_t, Ret_d, Ret_t // Assigned from Firebase asynchronous returns
var h_n, h_url, get_image_path, tax_percentage

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
        //console.log("Before: " + Dep_d);
        //console.log("Before: " + Ret_d);

        // Get date and time for each date seperately.
        Dep_d = Dep.substr(0, 10);
        Ret_d = Ret.substr(0, 10);
        Dep_t = Dep.substr(12);
        Ret_t = Ret.substr(12);

        // Get variables assigned for hotel info (pic and name)
        get_loc_data(Hot);

        // Update placeholder image
        document.getElementById('image_hotel').src = get_image_path;

        // Tax percentage conversion for user viewing
        tax_percentage = (Taxes * 100);
        tax_percentage.toFixed(2);

        //alert("Windows is writing file path image: " + get_image_path);

        //console.log("Choice name: " + h_n + "\nChoice URL: " + h_url);
        //console.log("Hotel Choice: " + Hot);

        //window.alert("Depart: " + Dep);
        //console.log("After: " + Dep_d);
        //console.log("After: " + Dep_t);
        //console.log("After: " + Ret_d);
        //console.log("After: " + Ret_t);
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
        disp_Expenses(Air_price, Air, Dep_d, Dep_t, h_n, Hot_Price, Loc, Nickname, Ret_d, Ret_t, Sub_Tot, tax_percentage, Tot, Trans, Trans_price, user_email)
    });
}

// Display values on Expenses Page
function disp_Expenses(ap, a, d, dt, h, hp, loc, nn, re, re_t, st, tax, tot, tra, trap, em) {
    //window.alert("Success with Email" + email + "; Nickname: " + name + "; Location: " + loc + "; Departure: " + dep + "; Return: " + ret + "; Hotel: " + hot + "; Airline: " + air + "; Transportation: " + tra);

    // ----------------------------------------------------------
    //   Replace values on Expenses page with values from Trip
    // ----------------------------------------------------------

    // Set title nickname and email
    document.getElementById("nn").innerHTML = nn;
    document.getElementById("emailaddress").innerHTML = em;

    // Set a base row consisting of location, departure, and return dates/times
    document.getElementById('loca').innerHTML = loc;
    document.getElementById('depa').innerHTML = ("Depart: " + d + " @ " + dt);
    document.getElementById('retu').innerHTML = ("Return: " + re + " @ " + re_t);

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
        writeNewPost(Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Taxes, Tot, Trans, Trans_price, email_un, "Yes");

        // Send email
        Send_email(email_un, Nickname, h_n, Hot_Price, Air, Air_price, Trans, Trans_price, user_email, h_url, h_n, Dep_d, Dep_t, Ret_d, Ret_t, tax_percentage, Sub_Tot, Tot, Loc);
    }
    else if (up == "No") {
        window.alert("An email will not be sent out for this trip. You may navigate away from this window at your convenience.");

        // Update the database with the new value - No
        writeNewPost(Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Taxes, Tot, Trans, Trans_price, email_un, "No");
    }
}

// Update variables
function writeNewPost(ap, a, d, h, hp, l, nn, r, sub, tax, tot, tr, trap, ue, se) {
    // A post entry.
    var postData = {
        // Push data back to Firebase
        Airline_Price: ap,
        Airplane: a, 
        Departure: d,
        Hotel: h,
        Hotel_Price: hp,
        Location: l,
        Name: nn,
        Return: r,
        Sub_total: sub,
        Tax: tax,
        Total: tot,
        Transportation: tr,
        Transportation_Price: trap,
        User_Email: ue,
        Send_email: se
    };

    // Get the same key for the update.
    var newPostKey = nn;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['Add_Trip/' + email_un + "/" + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

function send_email(un, nn, h, hp, a, ap, t, tp, email, image_url, image_name, dep_d, dep_t, ret_d, ret_t, tax, st, tot, loc) {
    // Seperate date from Time

    //window.alert("Dep Date: " + dep_d + "; dep_time: " + dep_t + "\nRet date: " + ret_d + "; ret time: " + ret_t);
    //console.log("email: " + un);
    Email.send({
        // Use a secure token or enter your host, username, and password for same functionality.
        SecureToken: "4292c953-97df-4b7d-bdc3-1f9ca7f31ffc",
        //Host: "smtp.yourisp.com",
        //Username: "user@youremail.com",
        //Password: "password",
        To: email,
        From: "email@email.com",   // Remove before push
        Subject: "Nameless.exe's Trip Planner",
        Body: ("Greetings " + un + ",<br><br>This email is in regards to your recent plans for: <b>" + nn + "</b><br>Below are the details for your trip, as per your request.<br><br><b>Location:</b> " + loc + "<br><b>Departure:</b> " + dep_d + " at " + dep_t + "&nbsp;&nbsp;&nbsp;&nbsp;<b>Return:</b> " + ret_d + " at " + ret_t + "<br><br><b>Hotel:</b> " + h + "&nbsp;&nbsp;&nbsp;&nbsp;<b>Hotel Price:</b> $" + hp + "<br><b>Airplane:</b> " + a + "&nbsp;&nbsp;&nbsp;&nbsp;<b>Airplane Price:</b> $" + ap + "<br><b>Transportation:</b> " + t + "&nbsp;&nbsp;&nbsp;&nbsp;<b>Transportation Price:</b> $" + tp + "<br><br><b>Sub-Total:</b> $" + st + "<br><b>Tax:</b> " + tax + "%<br><b>Total:</b> $" + tot + "<br><br><b>Note:</b> The attached image is of your chosen hotel, for your convenience.<br>You can also click here: " + h_url + "<br><br>Thank you for using our Travel Planner for your trip plannings. We hope to see you in future plannings soon.<br><br>Sincerely,<br><b>The Nameless.exe team</b>"),
        Attachments: [
            {
                // Update
                name: image_name,
                path: image_url
            }]
    }).then(
        message => alert(message)
    );

    //console.log("We are definitely here!");
}

// Used to identify the locations, filenames, and URL links to each image for the hotels
function get_loc_data(hotel_choice) {
// ========================================
//                Washington
// ========================================
    // Bellingham
    if (hotel_choice === "Shamrock Motel (Bellingham)") {
        h_n = "Shamrock Motel";
        h_url = "https://s3-ap-northeast-1.amazonaws.com/withtravel/uploads/hotel_detail/thumbnail/1542181/5f815b15-45e2-4a91-b8a5-d4984231c3fc.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Bellingham\\Shamrock_Motel.jpg";
    }
    else if (hotel_choice === "Motel 6 (Bellingham)") {
        h_n = "Motel 6";
        h_url = "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/6d/cc/c9/exterior.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Bellingham\\Motel_6.jpg";
    }
    else if (hotel_choice === "Chrysalis Inn and Spa (Bellingham)") {
        h_n = "Chrysalis Inn and Spa";
        h_url = "http://a.mktgcdn.com/p/hj81wE-ibUhWO23kGDpR9qWgfE9tOczgw6dtKhT3eug/3840x2903.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Bellingham\\Chrysalis_Inn_&_Spa.jpg";
    }
    else if (hotel_choice === "GuestHouse Inn (Bellingham)") {
        h_n = "GuestHouse Inn";
        h_url = "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/63/42/99/exterior.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Bellingham\\GuestHouse_Inn.jpg";
    }
    else if (hotel_choice === "Holiday Inn (Bellingham)") {
        h_n = "Holiday Inn";
        h_url = "https://foto-origin.hrsstatic.com/foto/7/6/8/4//teaser_768447.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Bellingham\\Holiday_Inn.jpg";
    }
    // Seattle
    else if (hotel_choice === "Kimpton Hotel (Seattle)") {
        h_n = "Kimpton Hotel";
        h_url = "https://www.cn.kayak.com/rimg/himg/92/c1/50/leonardo-1085929-SEASM_5344748822_S-image.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Seattle\\Kimpton_hotel.jpg";
    }
    else if (hotel_choice === "Sheraton Grand Seattle (Seattle)") {
        h_n = "Sheraton Grand Seattle";
        h_url = "https://q-xx.bstatic.com/xdata/images/hotel/840x460/178544209.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Seattle\\Sheraton_Grand_Seattle.jpg";
    }
    else if (hotel_choice === "Grandy Hyatt Seattle (Seattle)") {
        h_n = "Grandy Hyatt Seattle";
        h_url = "https://www.worldrainbowhotels.com/wp-content/uploads/2019/01/Grand-Hyatt-Seattle2-400x300.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Seattle\\Grandy_Hyatt_Seattle.jpg";
    }
    else if (hotel_choice === "Crowne Plaza (Seattle)") {
        h_n = "Crowne Plaza";
        h_url = "http://crowne-plaza-98101.hotelsofseattle.com/data/Photos/1060x610/6843/684349/684349782.JPEG";
        get_image_path = "\\Images\\hotels\\Washington\\Seattle\\Crowne_Plaza.jpg";
    }
    else if (hotel_choice === "Hyatt at Olive 8 (Seattle)") {
        h_n = "Hyatt at Olive 8";
        h_url = "http://dimg04.c-ctrip.com/images//220c14000000wndno4933_W_1600_1200_Q70.jpg";
        get_image_path = "\\Images\\hotels\\Washington\\Seattle\\Hyatt_at_Olive_8.jpg";
    }
    // ========================================
    //                  Oregon
    // ========================================
    // Portland
    else if (hotel_choice === "Howard Johnson (Portland)") {
        h_n = "Howard Johnson";
        h_url = "https://mobileimg.priceline.com/htlimg/55/55543/thumbnail-300-square.jpg";
        get_image_path = "\\Images\\hotels\\Oregon\\howard_johnson.jpg";
    }
    else if (hotel_choice === "Mark Spencer Hotel (Portland)") {
        h_n = "Mark Spencer Hotel";
        h_url = "https://dimg04.c-ctrip.com/images//220f0z000000n43ejCE83_W_1600_1200_Q70.jpg";
        get_image_path = "\\Images\\hotels\\Oregon\\Mark_Spencer_hotel.jpg";
    }
    else if (hotel_choice === "Portland Northwest Hotel (Portland)") {
        h_n = "Portland Northwest Hotel";
        h_url = "http://blog.hihostels.com/wp-content/uploads/2014/06/img50893-The-Elliston11.jpg";
        get_image_path = "\\Images\\hotels\\Oregon\\Portland_Northwest_hostel.jpg";
    }
    else if (hotel_choice === "Ramada (Portland)") {
        h_n = "Ramada";
        h_url = "https://www.wyndhamhotels.com/content/dam/property-images/en-us/ra/us/or/portland/01642/01642_exterior_view_1.jpg";
        get_image_path = "\\Images\\hotels\\Oregon\\Ramada.jpg";
    }
    else if (hotel_choice === "Society Hotel (Portland)") {
        h_n = "Society Hotel";
        h_url = "https://mk0kexerucovvhuo7ouw.kinstacdn.com/wp-content/uploads/2019/06/large-4.jpg";
        get_image_path = "\\Images\\hotels\\Oregon\\Society_hotel.jpg";
    }
    // ========================================
    //                California
    // ========================================
    // Los Angeles
    else if (hotel_choice === "Samesun Venice Beach (Los Angeles)") {
        h_n = "Samesun Venice Beach";
        h_url = "https://ac-q.static.booking.cn/images/hotel/max1280x900/152/152006381.jpg";
        get_image_path = "\\Images\\hotels\\California\\LA\\Samesun_Venice_Beach.jpg";
    }
    else if (hotel_choice === "Value Inn (Los Angeles)") {
        h_n = "Value Inn";
        h_url = "https://t-ec.bstatic.com/images/hotel/max1280x900/793/79337576.jpg";
        get_image_path = "\\Images\\hotels\\California\\LA\\Value_Inn_Hollywood.jpg";
    }
    else if (hotel_choice === "Luxe City Center Hotel (Los Angeles)") {
        h_n = "Luxe City Center Hotel";
        h_url = "https://www.hauteliving.com/wp-content/uploads/2012/11/Dusk_Exterior_Final.jpg";
        get_image_path = "\\Images\\hotels\\California\\LA\\Luxe_City_Center_Hotel.jpg";
    }
    else if (hotel_choice === "Motel 6 (Los Angeles)") {
        h_n = "Motel 6";
        h_url = "https://ac-q.static.booking.cn/images/hotel/max1280x900/535/53523159.jpg";
        get_image_path = "\\Images\\hotels\\California\\LA\\Motel_6.jpg";
    }
    else if (hotel_choice === "Hotel Crowne Plaza (Los Angeles)") {
        h_n = "Hotel Crowne Plaza";
        h_url = "https://d2xf5gjipzd8cd.cloudfront.net/available/385317789/385317789_WxH.jpg";
        get_image_path = "\\Images\\hotels\\California\\LA\\Crowne_Plaza.jpg";
    }
    // San Fransisco
    else if (hotel_choice === "Holiday Express Inn Hotel and Suites (San Francisco)") {
        h_n = "Holiday Express Inn Hotel and Suites";
        h_url = "https://foto-origin.hrsstatic.com/foto/1/3/6/7//teaser_136765.jpg";
        get_image_path = "\\Images\\hotels\\California\\San_Francisco\\Holiday_Inn_Express_Hotel_&_Suites.jpg";
    }
    else if (hotel_choice === "Hyatt Place (San Francisco)") {
        h_n = "Hyatt Place";
        h_url = "https://images.squarespace-cdn.com/content/v1/54f6399be4b0797b9cc7caeb/1554511725272-XBZ260HJHHBM9PPLA2VT/ke17ZwdGBToddI8pDm48kHb6ZtP8bM8H4r9xtOcdmtB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQxKYl7BbkfxGTI0ONLevLevDGW0jnLPNHnRdzSOjuIQ7dsz4i27n53EfqFOh7KSRA/Exterior.jpg";
        get_image_path = "\\Images\\hotels\\California\\San_Francisco\\Hyatt_Place.jpg";
    }
    else if (hotel_choice === "Stanford Court (San Francisco)") {
        h_n = "Stanford Court";
        h_url = "https://images.squarespace-cdn.com/content/v1/5c0c21d1aa49a1a5bf3567a3/1550844034832-BS9MZL0D910EXUNUPSTA/ke17ZwdGBToddI8pDm48kCHV4JP_uPLZT7_OEP-kOap7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwD1g8DYbkhCsgrhnj8CXa1Zg8jZYBINSSziGOZtOcoWY1hbQldi1Taq_XGc30oQQ/SC-Exterior-Day-1-REVISED_crop.jpg";
        get_image_path = "\\Images\\hotels\\California\\San_Francisco\\Stanford_Court.jpg";
    }
    else if (hotel_choice === "Travelodge by Wyndham (San Francisco)") {
        h_n = "Travelodge by Wyndham";
        h_url = "https://www.wyndhamhotels.com/content/dam/property-images/en-us/tl/us/ca/san-francisco/07015/07015_exterior_day_1.jpg";
        get_image_path = "\\Images\\hotels\\California\\San_Francisco\\Travelodge by Wyndham.jpg";
    }
    else if (hotel_choice === "Travelodge (San Francisco)") {
        h_n = "Travelodge";
        h_url = "https://s-ec.bstatic.com/images/hotel/max1280x900/531/53167394.jpg";
        get_image_path = "\\Images\\hotels\\California\\San_Francisco\\Travelodge.jpg";
    }
    // ========================================
    //                 Arizona
    // ========================================
    // Phoenix
    else if (hotel_choice === "Vacation Inn (Phoenix)") {
        h_n = "Vacation Inn";
        h_url = "https://pbs.twimg.com/media/DpmDI2FUwAEgB_C.jpg";
        get_image_path = "\\Images\\hotels\\Arizona\\Vacation_Inn.jpg";
    }
    else if (hotel_choice === "EZ 8 Motel (Phoenix)") {
        h_n = "EZ 8 Motel";
        h_url = "https://s-ec.bstatic.com/images/hotel/max1280x900/460/46028064.jpg";
        get_image_path = "\\Images\\hotels\\Arizona\\EZ 8 Motel.jpg";
    }
    else if (hotel_choice === "Premier Inn (Phoenix)") {
        h_n = "Premier Inn";
        h_url = "https://s-ec.bstatic.com/images/hotel/max1024x768/831/8318277.jpg";
        get_image_path = "\\Images\\hotels\\Arizona\\Premier_Inns.jpg";
    }
    else if (hotel_choice === "Lux Uptown Apts. (Phoenix)") {
        h_n = "Lux Uptown Apts.";
        h_url = "http://blog.urbanleasing.com/wp-content/uploads/2019/07/3.jpg";
        get_image_path = "\\Images\\hotels\\Arizona\\Luxury_Uptown_Apartments.jpg";
    }
    else if (hotel_choice === "Hotel Embassy (Phoenix)") {
        h_n = "Hotel Embassy";
        h_url = "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_650,q_auto,w_1000/itemimages/67/51/67516_v1.jpeg";
        get_image_path = "\\Images\\hotels\\Arizona\\Embassy_Suites.jpg";
    }
    // ========================================
    //                  Nevada
    // ========================================
    // Las Vegas
    else if (hotel_choice === "Tru (Las Vegas)") {
        h_n = "Tru";
        h_url = "http://a.mktgcdn.com/p/5Llz_7_fKXm4pYrkUHOftsQNFE9Rs-aN-CzfzOvZJJo/3840x2560.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Las Vegas\\Tru.jpg";
    }
    else if (hotel_choice === "The LINQ (Las Vegas)") {
        h_n = "The LINQ";
        h_url = "https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/37337776.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Las Vegas\\The_LINQ.jpg";
    }
    else if (hotel_choice === "Travelodge (Las Vegas)") {
        h_n = "Travelodge";
        h_url = "https://www.wyndhamhotels.com/content/dam/property-images/en-us/tl/us/nv/las-vegas/13700/13700_exterior_view_1.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Las Vegas\\Travelodge.jpg";
    }
    else if (hotel_choice === "Four Queens (Las Vegas)") {
        h_n = "Four Queens";
        h_url = "https://world-wide-web-servers.com/static/hotels/us/nevada/lasvegas/fourqueenscasinoandhotel_21514474938.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Las Vegas\\Four_Queens_Hotel_and_Casino.jpg";
    }
    else if (hotel_choice === "The Venetian (Las Vegas)") {
        h_n = "The Venetian";
        h_url = "https://i.pinimg.com/originals/cd/5e/9c/cd5e9c5485302a2ec44074e391a29040.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Las Vegas\\The_Venetian.jpg";
    }
    // Reno
    else if (hotel_choice === "Circus Circus (Reno)") {
        h_n = "Circus Circus";
        h_url = "https://www.judges.org/wp-content/uploads/CCR-exterior-image-High-Resolution-1.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Reno\\Circus_Circus.jpg";
    }
    else if (hotel_choice === "Motel 6 (Reno)") {
        h_n = "Motel 6";
        h_url = "https://dimg04.c-ctrip.com/images//22060f0000007i82s94D8_W_1600_1200_Q70.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Reno\Motel_6.jpg";
    }
    else if (hotel_choice === "Sands Regency (Reno)") {
        h_n = "Sands Regency";
        h_url = "https://dimg04.c-ctrip.com/images/220q12000000rlalu965E_R_1136_750_R5_D.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Reno\\Sands_Regency.jpg";
    }
    else if (hotel_choice === "Baymont Inn (Reno)") {
        h_n = "Baymont Inn";
        h_url = "https://d2xf5gjipzd8cd.cloudfront.net/available/259994410/259994410_WxH.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Reno\\Baymont.jpg";
    }
    else if (hotel_choice === "Nugget (Reno)") {
        h_n = "Nugget";
        h_url = "https://world-wide-web-servers.com/static/hotels/us/nevada/sparks/nuggetcasinoresort15_44350676261.jpg";
        get_image_path = "\\Images\\hotels\\Nevada\\Reno\\Nugget.jpg";
    }
}
