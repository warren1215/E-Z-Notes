
//Use Browser API Key from Google API Console
const apiKey = "";

//Client ID from api console
const clientID = "";

//Scope
const scope = ['https://www.googleapis.com/auth/drive'];

var pickerAPILoaded = false;
var OAuthToken;

var currentFileID;

//Load
function onApiLoad() {
	gapi.load('auth', {
		'callback' : onAuthApiLoad
	});

	gapi.load('picker', {
		'callback' : onPickerApiLoad
	});
}

function onAuthApiLoad() {
	window.gapi.auth.authorize(
	{
		'client_id' : clientID,
		'scope' : scope,
		'immediate' : false
	},
	handleAuthResult);
}

function onPickerApiLoad() {
	pickerAPILoaded = true;
	createPicker();
}

function handleAuthResult(authResult) {
	oAuthToken = authResult.access_token;
	createPicker();
}

funciton createPicker() {
	if(pickerAPILoaded && OAuthToken) {
		var picker = new google.picker.PickerBuilder().
			addView(google.picker.ViewId.DOCUMENTS);
			setOAuthToken(oauthToken).
			setDeveloperKey(apiKey).
			setCallback(pickerCallback).
			build();
		picker.setVisible(true);
	}
}

function pickerCallback(data) {
	if(data.action == google.picker.Action.PICKED) {
		var currentFileID = data.docs[0].id;
		alert('The user selected: ' + currentFileID);
	}
}

















