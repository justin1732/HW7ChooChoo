var moment = require('moment');

$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyBrdwrJyLKMnJUISCNJx-6gFFRItftYZ-Y",
    authDomain: "train-scheduler-demo-6163c.firebaseapp.com",
    databaseURL: "https://train-scheduler-demo-6163c.firebaseio.com",
    projectId: "train-scheduler-demo-6163c",
    storageBucket: "train-scheduler-demo-6163c.appspot.com",
    messagingSenderId: "208640302639",
    appId: "1:208640302639:web:6499f8202a81ca539bf0da",
    measurementId: "G-45WQRH8ZB2"
  };
 
  firebase.initializeApp(config);

var database= firebase.database();
var origin;
var destination;
var first;
var frequency = 0;


$("#add-train").on("click", function(){
event.preventDefault();
origin = $("#origin").val().trim();
destination = $("#destination").val().trim();
first = $("#first").val().trim();
frequency = $("#frequency").val().trim();

database.ref().push({
origin:origin,
destination: destination,
first: first,
frequency: frequency,
dateAdded: firebase.database.ServerValue.TIMESTAMP
});
$("form")[0].reset();

});
database.ref().on("child_added", function(childSnapshot){
var nextArr;
var minutesAway;
var firstTrain = moment(childSnapshot.val().first, "hh:mm").subtract(1, "years");
var diffTime = moment().diff(moment(firstTrain), "minutes");
var remainder = diffTime % childSnapshot.val().frequency;
var minutesAway = childSnapshot.val().frequency - remainder;
var nextTrain = moment().add(minutesAway, "minutes");
nextTrain = moment(nextTrain).format("hh:mm");


$("#add=row").append("<tr><td>" + childSnapshot.val().origin +
"</td><td>" + childSnapshot.val().destination +
"</td><td>" + childSnapshot.val().frequency +
"</td><td>" + nextTrain +
"</td><td>" + minutesAway + "</td></tr>");

}, function (errorObject){
    console.log("Errors handled: " + errorObject.code);
    });


});
