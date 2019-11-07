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


//constructor for the Trip
function Trip(name , loc , dep , ret , hot , air , trans){
  this.tripName = name;
  this.location = loc;
  this.departure = dep;
  this.return = ret;
  this.hotel = hot;
  this.airline = air;
  this.transportation = trans;

}

//Testing function. No value
Trip.stringify = function(){
  return this.tripName + " " + this.location;
};

//Take data from html forms and create a new object
//with those values.
function submitter(){
  //var hello = document.getElementsByTagName('input');
  //var user = hello.options[hello.selectedIndex].text
  //window.alert(hello[2].value);

  var accessor = document.getElementsByClassName('form_input');

  var name1 = accessor[0].value;

  var loc = accessor[1].value;
  var dep = accessor[2].value;
  var ret = accessor[3].value;
  var hot = accessor[4].value;
  var air = accessor[5].value;
  var trans = accessor[6].value;

  window.alert(name1);

  var Tripper = new Trip(name1,loc,dep,ret,hot,air,trans);
  var myJson = JSON.stringify(Tripper);
  //localstorage.setItem("Trip", myJson);
  //window.alert(myJson);
  isBool = true;
  localStorage.setItem('boolean' ,isBool )
  localStorage.setItem('json' , myJson)
}
