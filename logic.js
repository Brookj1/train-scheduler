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
  var dataRef = firebase.database();
//Setting variables for the train details we will need to use in the code
  var trainName = "";
  var destination = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";
// Capture Submit Button Click in Add Train entry form
  $("#add-train").on("click", function(event) {
  event.preventDefault();
  
  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();   
  firstTrainTime = $("#firstTrainTimeInput").val().trim();
  frequency = $("#frequencyInput").val().trim();
  
  
  
  
  });
  