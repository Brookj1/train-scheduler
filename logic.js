$(document).ready(function() {
// Firebase API information
var config = {
    apiKey: "AIzaSyASxOIDF2FqP5eLJXySL_f3izP0801QzLw",
    authDomain: "trainschedule201810.firebaseapp.com",
    databaseURL: "https://trainschedule201810.firebaseio.com",
    projectId: "trainschedule201810",
    storageBucket: "trainschedule201810.appspot.com",
    messagingSenderId: "175356375227"
  };
// Firebase initialization (starts the database up)
  firebase.initializeApp(config);

// Simplifying database name for future js use
  var database = firebase.database();

//Setting variables for the train details we will need to use in the code
//   var trainName = "";
//   var destination = "";
//   var frequency = "";
//   var nextArrival = "";
//   var minutesAway = "";

// Capture Submit Button Click in Add Train entry form
  $("#newTrainForm").on("submit", function(event) {
    
  
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();   
  var firstTrain = $("#firstTrain").val().trim();
  var freq = $("#interval").val().trim();
  console.log(trainName)
  
//Data push to Firebase
    database.ref().push ( {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
    });
    event.preventDefault();  
});

// $("#newTrainForm").submit(function (event){
//     event.preventDefault();
//     console.log ("submit clicked")
//     return false;
// })


//Firebase watcher and loader
database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

// First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

// Current Time
    var currentTime = moment();

// Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

// Time apart (remainder)
    var tRemainder = diffTime % newFreq;

 // Minute(s) Until Train
    var tMinutesTillTrain = newFreq - tRemainder;

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("hh:mm");

 // Display On Page
 $("#all-display").append(
    ' <tr><td>' + newTrain +
    ' </td><td>' + newLocation +
    ' </td><td>' + newFreq +
    ' </td><td>' + catchTrain +
    ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

        // Clear input fields
        $("#trainName, #destination, #firstTrain, #interval").val("");
        return false;
      },

 //Handle the errors
 function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

 //end document ready
});
