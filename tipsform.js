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



// Variables
var user_email, email_un, nickname  // Grabbed from the page loading and checking Firebase
var Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Tot, Trans, Trans_price, Use_email, Send_em, Taxes, Dep_d, Dep_t, Ret_d, Ret_t, arr // Assigned from Firebase asynchronous returns
var user_rec_update, loc_under_db
var update_arr = [];


// Begin - Check for user login
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;

        if (user != null) {
            user_email = user.email;
            email_un = user_email.substr(0, user_email.indexOf('@'));
            // Strip the nickname from the URL
            nickname = window.location.href
            nickname = nickname.substring(nickname.lastIndexOf('/') + 1);
            //console.log("Your email is: " + user_email + " stripped name of: " + email_un);
            pull_data_Expenses(email_un);
        }
    } else {
        // If no user
        window.alert("You are not signed in. Please exit this tab. Sign in and Add a trip again.");
    }
});
// End - Check for user login

// Pull data from database
function pull_data_Expenses(email_front) {
    // Display to console
    //console.log("The global result is: " + email_front);

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
        Send_em = snapshot.child('Send_email').val();      // send_email
        arr = snapshot.child('Recommendation').val();        // Get the array of recommendations chosen for trip
        
        //console.log("Airline" + Air_price);
        //console.log("Before: " + Dep_d);
        //console.log("Before: " + Ret_d);

        // Get updated location name
        loc_under_db = get_updated_loc_for_db(Loc);
        console.log("Updated location name: " + loc_under_db);

        // Get date and time for each date seperately.
        Dep_d = Dep.substr(0, 10);
        Ret_d = Ret.substr(0, 10);
        Dep_t = Dep.substr(12);
        Ret_t = Ret.substr(12);

        // Get variables assigned for hotel info (pic and name)
        //get_loc_data(Hot);

        // Update placeholder image
        //document.getElementById('image_hotel').src = get_image_path;

        // Tax percentage conversion for user viewing
        //tax_percentage = (Taxes * 100);
        //tax_percentage.toFixed(2);

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
        //console.log("Array: " + arr);

        // Gather location data for recommendations
        var ref = firebase.database().ref('Recommendation');
        ref.on('value', snapshot => {
            user_rec_update = snapshot.child(loc_under_db).val();      // Airline_Price
            console.log("The array we pulled is: " + user_rec_update);

        /* Todo */
            // Use this array --> user_rec_update <-- to parse and display to page.
            // Note: Do not leave this field. You will be messing with the asynchronous nature of the db and it will become undefined.
            
        });
    });
}


//Function that gathers the data when the form is submitted
function dataGather() {
//grab the data inputs from forms on page
var front_ = document.getElementsByName('front');
var name_ = document.getElementsByName('name');
var find_ = document.getElementsByName('find');
var keeping_ = document.getElementsByName('keeping');
var ambiance_ = document.getElementsByName('ambiance');
var restaurants_ = document.getElementsByName("restaurant's");
var rate_ = document.getElementsByName('rate');
var Spa_ = document.getElementsByName('Spa');
var hotel_ = document.getElementsByName('hotel');

//window.alert(find_[0].checked); test ignore

//create two arrays. one the first holds the values for 'Yes'
//the second holds the values for 'no'
var array = [front_[0], name_[0], find_[0], keeping_[0], ambiance_[0], 
                    restaurants_[0], rate_[0], Spa_[0], hotel_[0]];
var array1 = [front_[1], name_[1], find_[1], keeping_[1], ambiance_[1], 
                    restaurants_[1], rate_[1], Spa_[1], hotel_[1]];
var dataArray = []; //initialize empty array


//
    //window.alert(array[0].checked); test case ignore
   // window.alert(array[0].value); test case ignore
    
//loop over the length of the arrays (nine times). 
    for (var k = 0; k < array.length; k++){
        if(array[k].checked == true){   //checks to see if the 'Yes' is clicked
            dataArray.push(array[k].value);// if true, push value '1' into dataArray
        }else if (array1[k].checked == true){   //checks to see if 'No' is clicked
            dataArray.push(array1[k].value);// if true, push value '0' into dataArray
        }else{
            dataArray.push('0');
        }
        
    }
    //window.alert(dataArray); test case ignore
    //localStorage.setItem("dbArray",dataArray);//save locally
    //window.alert(localStorage.getItem("dbArray"));//test retrieval of saved array

    // Write recommended items to database - append to Add Trip data
    writeNewPost(Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Taxes, Tot, Trans, Trans_price, email_un, "temp", dataArray);

    // Gather current count for location and increment based off of user's recommendations. Push back to database with updated values.
    // Attempt to get data by calling a reference once
    //console.log("Our current location: " + Loc);
    //console.log("Location name update: " + loc_under_db);
    var ref = firebase.database().ref('Recommendation');
    ref.on('value', snapshot => {
        user_rec_update = snapshot.child(loc_under_db).val();      // Airline_Price

        //console.log("The value is (inner): " + user_rec_update);

        // Get the current values of form and update the counts in the global count
        //console.log("Fourth value in array: " + dataArray[3]);

        // Update counts in global array and push to array
        for (var i = 0; i < dataArray.length; i++) {
            var global, update

            // Get current global value
            global = Number(user_rec_update[i]);

            // Get current update value
            update = Number(dataArray[i]);

            // Calculate the total value
            var int_val = (global + update);

            // Convert val to string
            str_val = int_val.toString();

            //console.log("Current string val being pushed into array: " + str_val);

            // Push values to update array
            update_arr.push(str_val);

            //Number(user_rec_update[i]) += Number(dataArray[i]);
        }
        // Push data to the Expenses Page
        // Display test results
        //console.log("The new array is: " + update_arr);

        // Push new array into global array
        writeNewPostRec(loc_under_db, update_arr);

        // Test
        //console.log("We are before the array clearing");

        // Clear the array
        update_arr = [];

        // Test location in program
        //window.alert("Write updated in both locations succeeded?\nCheck Firebase!");

        // Navigate to the Expenses page and append the nickname to the end of the URL
        //console.log("Expenses.html?/" + nickname);
        document.location.href = ("Expenses.html?/" + nickname);
    });

    //console.log("The value is (outer): " + user_rec_update); - outer doesn't work because of asynchronous nature: undefined
}

// Update variables - Add Trip
function writeNewPost(ap, a, d, h, hp, l, nn, r, sub, tax, tot, tr, trap, ue, se, rec) {
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
        Send_email: se,
        Recommendation: rec
    };

    // Get the same key for the update.
    var newPostKey = nn;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['Add_Trip/' + email_un + "/" + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

// Update variables - Recommendations
function writeNewPostRec(loc, arr) {
    // A post entry.
    var postData = {
        // Push data back to Firebase
        0: arr[0],
        1: arr[1],
        2: arr[2],
        3: arr[3],
        4: arr[4],
        5: arr[5],
        6: arr[6],
        7: arr[7],
        8: arr[8]
    };
    // Get the same key for the update.
    var newPostKey = 'Recommendation';

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[newPostKey + '/' + loc] = postData;

    return firebase.database().ref().update(updates);
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
