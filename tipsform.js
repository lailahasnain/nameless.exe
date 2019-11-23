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

//Function that gathers the data when the form is submitted
function dataGather(){
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
    localStorage.setItem("dbArray",dataArray);//save locally
    window.alert(localStorage.getItem("dbArray"));//test retrieval of saved array
}
