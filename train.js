
$(document).ready(function(){
  var config = {
     apiKey: "AIzaSyCrNAldsQAUQgcgBaOabSX_ALpWhLvncfI",
      authDomain: "fir-demo-31273.firebaseapp.com",
      databaseURL: "https://fir-demo-31273.firebaseio.com",
      projectId: "fir-demo-31273",
      storageBucket: "fir-demo-31273.appspot.com",
      messagingSenderId: "324069312328",
};
firebase.initializeApp(config);

 


var database= firebase.database();
var name;
var destination;
var first;
var frequency = 0;


$("#add-train").on("click", function(){
event.preventDefault();
name = $("#name").val().trim();
destination = $("#destination").val().trim();
first = $("#first").val().trim();
frequency = $("#frequency").val().trim();

database.ref().push({
name:name,
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


$("#add-row").append("<tr><td>" + childSnapshot.val().name +
"</td><td>" + childSnapshot.val().destination +
"</td><td>" + childSnapshot.val().frequency +
"</td><td>" + nextTrain +
"</td><td>" + minutesAway + "</td></tr>");

}, function (errorObject){
    console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot){
      $("#name-display").html(snapshot.val().name);
      $("#email-display").html(snapshot.val().email);
      $("#age-display").html(snapshot.val().age);
      $("#comment-display").html(snapshot.val().comment);
    });
});
