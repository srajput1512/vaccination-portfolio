

#VACCINATION PROJECT

Technologies:
Front End :  Angualr, HTML, CSS, Bootstrap
Back End : Firebase (database)

What are Developed?:

Front User:
1. Employee Login screen with validation.
2. Employee Registration screen with Validation
3. Vaccination detail screen with validation
 
Admin User:
1. Admin Login screen with validation.
2. Employee details screen listing
   -> Search by employee name
   -> Filter by gender
   -> Access right update on dropdown selection
3. Vaccination detail screen listing
   -> delete specific records

AuthGard: Applied authgaurd not to access specific routes until user is loggedin

DATABASE:
-> Need to connect to fire base by providing specific firebase configuration (added in environment.ts  & environment.prod.ts file)
  
export const environment = {
  production: false,
  firebase: {
    apiKey: "xxxxxxxx-xxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxx",
    storageBucket: "xxxxxxxx",
    messagingSenderId: "xxxxxx",
    appId: "xxxxx",
    measurementId: "xxxxxxxxxxxxxxxx"
  }
};

-> All the databaseCollection would be created). Only for admin we need to add collection in firestore database because we do not have register page for admin.
   admin-login
  (USER_NAME,PASSWORD) 
   So create a collection name "admin-login" and add the above fields for username and password and set the values.

 Rest collection would be created automatically.

 Note : "npm install" is must 


 Whats not achived in project:
 1. Edit functionality 
 2. Setting user access functionality
