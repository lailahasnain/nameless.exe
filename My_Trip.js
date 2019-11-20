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
            //pull_data_Expenses(email_un);

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

                for(var i = 0; i < keys.length; i++){
                    var k = keys[i];
                    var Airline_Price = dataval[k].Airline_Price;
                    var Airplane = dataval[k].Airplane;
                    var Departure = dataval[k].Departure;
                    var Hotel = dataval[k].Hotel;
                    var Hotel_Price = dataval[k].Hotel_Price;
                    var Location = dataval[k].Location;
                    var Name = dataval[k].Name;
                    var Return = dataval[k].Return;
                    var Sub_total = dataval[k].Sub_total;
                    var Total = dataval[k].Total;
                    var Transportation = dataval[k].Transportation;
                    var Transportation_Price = dataval[k].Transportation_Price;
                    var User_Email = dataval[k].User_Email;
                    
                    console.log(Hotel_Price);
                    console.log(Hotel);
                    console.log(Total);

                    document.getElementById('Hotel_name').innerHTML = Hotel;
                    document.getElementById('Hotel_price').innerHTML = ("$" + Hotel_Price);
                    document.getElementById('loca').innerHTML = Location;
                    document.getElementById('depa').innerHTML = Departure;
                    document.getElementById('retu').innerHTML = Return;
                    document.getElementById('Airline_name').innerHTML = Airplane;
                    document.getElementById('Airline_Price').innerHTML = Airline_Price;
                    document.getElementById('Trans_method').innerHTML = Transportation;
                    document.getElementById('Trans_price').innerHTML = Transportation_Price;
                    document.getElementById('sub_total').innerHTML = Sub_total;
                    document.getElementById('Actual_total').innerHTML = Total;
                    document.getElementById('nn').innerHTML = Name;
                    
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
// End - Check for user login
