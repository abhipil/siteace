/////
// accounts-ui
/////
// accounts ui config
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// comments-ui
/////
// comments ui config
Comments.ui.config({
   template: 'bootstrap' // or ionic, semantic-ui
});

/////
// Iron routing
/////
//routing configure
Router.configure({
  layoutTemplate: "ApplicationLayout"
});