// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAfHLtFr53VgF5a6gppVA6dgn6y5HwOOfM",
    authDomain: "food-delivery-4fb82.firebaseapp.com",
    databaseURL: "https://food-delivery-4fb82.firebaseio.com",
    projectId: "food-delivery-4fb82",
    storageBucket: "food-delivery-4fb82.appspot.com",
    messagingSenderId: "381521107477",
    appId: "1:381521107477:web:0b73460df1877b87cfcc1c",
    measurementId: "G-BEJYH9E11S",
  },
  onesignal: {
    appId: "26263edf-7a2a-4d28-a742-0da688c923fa",
    googleProjectNumber: "381521107477",
    restKey: "OGJmZjgxMjEtNzBmMy00MWUxLTkzMjktYzFhODA0Mzc0NDYy",
  },
  stripe: {
    sk: "",
  },
  general: {
    symbol: "$",
    code: "USD",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
