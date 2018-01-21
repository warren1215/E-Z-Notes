   // Client ID and API key from the Developer Console
    var CLIENT_ID = '1008943154281-960bgik09dn9eg9n9hii1ddtg5ij2ofb.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyBbdVIJ6dhrRg6-8XsCygeei0lHJOzw79s';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1"];

    // If you ever doubt your scopes, just get all of them -badprogrammingtips
    var SCOPES = 'https://apps-apis.google.com/a/feeds https://apps-apis.google.com/a/feeds/alias/ https://apps-apis.google.com/a/feeds/groups/ https://mail.google.com/ https://sites.google.com/feeds https://www.google.com/calendar/feeds https://www.google.com/m8/feeds https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/documents.currentonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/dynamiccreatives https://www.googleapis.com/auth/forms https://www.googleapis.com/auth/forms.currentonly https://www.googleapis.com/auth/groups https://www.googleapis.com/auth/script.cpanel https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/script.scriptapp https://www.googleapis.com/auth/script.send_mail https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/script.webapp.deploy https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.currentonly https://www.googleapis.com/auth/sqlservice https://www.googleapis.com/auth/userinfo.email';

    var authorizeButton = document.getElementById('authorize-button');
    //var signoutButton = document.getElementById('signout-button');
    var scriptId =
      '1NLhUTcbWlqWH1rD5Dlq8ffXLFDOf9uRrSET2wIZmDKmWTYoPXK29hc1I';

    var inputLine;

    var documentId;

    var developerKey = 'AIzaSyCDJlHNYfTaYSzfLo11rUZdhPAowZ5l69U';

    // The Client ID obtained from the Google API Console. Replace with your own Client ID.
    var clientId = "1008943154281-960bgik09dn9eg9n9hii1ddtg5ij2ofb.apps.googleusercontent.com";

    // Replace with your own project number from console.developers.google.com.
    // See "Project number" under "IAM & Admin" > "Settings"
    var appId = "1008943154281";

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive'];

    var pickerApiLoaded = false;
    var oauthToken;

    var fileId;

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

    $(document).ready(function() {
      $(document).keypress(function(e) {
      if(e.which == 13) {
          if (window.getSelection) {
          inputLine = "\u2022 " + window.getSelection().toString();

          appendToDoc(fileId, inputLine);
          } else if (document.selection && document.selection.type != "Control") {
          inputLine = "\u2022 " +  document.selection.createRange().text;
          appendToDoc(fileId, inputLine);
        }
      }
      });
    });



    // chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    //   if (request.method == "getSelection")
    //     sendResponse({data: window.getSelection().toString()});
    //   else
    //     sendResponse({});
    // });
    //
    //
    // chrome.tabs.executeScript({
    //   code: "window.getSelection().toString();"
    // }, function(selection) {
    //   var x = selection[0];
    //   inputLine = document.getElementById('text');
    //   // This is where we need to send the string to google docs.
    // });

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
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
        callScriptFunction();
      } else {
        authorizeButton.style.display = 'block';
        //signoutButton.style.display = 'none';
      }
    }

    //Appends onto a new line in the file given the id of the document and
    //String wanted
    function appendToDoc(id, text) {
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

    // Example DOC ID 1Y9vt43piRGpcmPAgxfMTnPygx2QKWotoyTHCAMBhFfc
    function callScriptFunction() {
      appendToDoc('1Y9vt43piRGpcmPAgxfMTnPygx2QKWotoyTHCAMBhFfc', inputLine);
      createDoc("TestFILES");
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
        alert('The user selected: ' + fileId);
        console.log(fileId);
      }
    }
