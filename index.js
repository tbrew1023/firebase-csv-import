import firebase from 'firebase';
import csv from 'csvtojson';
import { firebaseConfig } from 'firebase-config.js'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
  
var db = firebase.firestore();

// csv to json

console.log('converting from json to csv...');

csv().fromFile('./csv-input/project-staffings.csv').then((jsonArray) => {
  //id,name,title,client,project,percentHours,latestMonth

  console.log('jsonOutput: ', jsonArray);

  jsonArray.forEach(function(obj) {
      db.collection("test").add({
          id: obj.id,
          name: obj.name,
          title: obj.title,
          client: obj.client,
          project: obj.project,
          percentHours: obj.percentHours,
          latestMonth: obj.latestMonth
      }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  });
});