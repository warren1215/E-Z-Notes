    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1"];

    // If you ever doubt your scopes, just get all of them -badprogrammingtips
    var SCOPES = 'https://www.googleapis.com/auth/documents';

    var authorizeButton = document.getElementById('authorize-button');
    //var signoutButton = document.getElementById('signout-button');

    var inputLine;
    var documentId;

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive'];

    var pickerApiLoaded = false;
    var oauthToken;
    var fileId;

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad(){
      gapi.load('client:auth2', initClient);
    }

    $(document).ready(function(){
      $(document).keypress(function(e){
        if(e.which == 49 && e.ctrlKey){
            if (window.getSelection){
              inputLine = "\u2022 " + window.getSelection().toString();
              appendToDoc(fileId, inputLine);
            }
            else if (document.selection && document.selection.type != "Control"){
              inputLine = "\u2022 " +  document.selection.createRange().text;
              appendToDoc(fileId, inputLine);
            }
        }
      });
    });

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient()
    {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function ()
      {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
      });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        authorizeButton.style.display = 'none';
        // signoutButton.style.display = 'block';

        //TEST FUNCTION
        //callScriptFunction();
      } else {
        authorizeButton.style.display = 'block';
        //signoutButton.style.display = 'none';
      }
    }

    //Appends onto a new line in the file given the id of the document and
    //String wanted
    function appendToDoc(id, text) {
      //console.log(id);
      //console.log(text);
      gapi.client.script.scripts.run({
        'scriptId': scriptId,
        'resource': {
        'function': 'appendText',
        'devMode': true,
        'parameters': [
          id,
          text
          ]
        }
      }).then(function(resp) {
        return;
      });
    }

    $('#newDoc').click(function(){
      createDoc(document.getElementById('formInput').value);
    });

    function createDoc(name) {
      gapi.client.script.scripts.run({
        'scriptId': scriptId,
        'resource': {
        'function': 'newDocument',
        'devMode': true,
        'parameters': [
          name
          ]
        }
      }).then(function(resp) {
        return;
      });
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    $('#browse').click(function(){
      loadPicker();
    });


    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("application/vnd.google-apps.document");
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
        fileId = data.docs[0].id;
        //alert('The user selected: ' + fileId);
        console.log(fileId);
      }
    }
