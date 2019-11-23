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
var h_n, h_url, get_image_path, tax_percentage



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

        // Send data to disp_Expenses
        //disp_Expenses(Air_price, Air, Dep_d, Dep_t, h_n, Hot_Price, Loc, Nickname, Ret_d, Ret_t, Sub_Tot, tax_percentage, Tot, Trans, Trans_price, user_email)
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
        }
    }
    //window.alert(dataArray); test case ignore
    //localStorage.setItem("dbArray",dataArray);//save locally
    //window.alert(localStorage.getItem("dbArray"));//test retrieval of saved array

    // Write recommended items to database - append to Add Trip data
    writeNewPost(Air_price, Air, Dep, Hot, Hot_Price, Loc, Nickname, Ret, Sub_Tot, Taxes, Tot, Trans, Trans_price, email_un, "temp", dataArray);

    // Gather current count for location and increment based off of user's recommendations. Push back to database with updated values.

}

// Update variables
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