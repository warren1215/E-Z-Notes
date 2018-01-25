

# E-Z Notes
**E-Z Notes** is a Google Chrome extension designed to help users easily gather information without leaving their web browser. E-Z Notes takes selected information and appends it to a Google Doc of the user's choice. Originally developed at ***SwampHacks '18***.

**Team Members:**

[Randy Tsui](https://github.com/jawyuhz)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spring '20

[Travis Raghubans](https://github.com/traghubans) &nbsp;&nbsp;&nbsp;&nbsp;Spring '20

[Warren Oliver](https://github.com/warren1215)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spring '19

### How:
E-Z Notes uses HTML and Javascript. Creates and appends text to files using Google Apps Script API and selects file with Google Picker API



 
 # Requirements
 - Google Account
 - Python SimpleHTTPServer
 
 # Installation

  1. Create a new project on [Google Cloud Developer Console](https://console.cloud.google.com/)
  
  2. Navigate to IAM & admin/settings and record your Project Number and Project ID.
  
  3. In the search bar, search for "Google Picker API" and enable it. Then navigate to credentials, create an API Key, and record it.
  
  4. In the search bar, search for "Google Apps Script API" and enable it. Navigate to credentials and create an OAuth Client ID for a Web Application. Under "Authorized JavaScript Origins" 
Enter `http://localhost:8000`. Record the OAuth2 client ID.
  
  5. Visit [Google Apps Script](https://www.google.com/script/start/) and create a script consisting of the code within the [googleScript.gs](https://github.com/warren1215/E-Z-Notes/blob/master/googleScript.gs).
  
  6. Navigate to the "Resources" tab in the Google Script, select Cloud Platform Project and enter your project ID (Step 2).

  7. Navigate to File>Project Properties and record your Script ID.

  8.  Within the config.js file, enter all the information you just gathered: developerKey (API Key), scriptID, appID (Project Number), clientID (OAuth Client ID).

  9.  Navigate to GAS.html and append API Key to the URL on line 16, so that it will be: https://www.google.com/jsapi?key=YOUR_KEY).
  
  
  # Launch
  1. Navigate to the directory of the project in command line and launch a python web server. `python -m SimpleHTTPServer 8000`
  2. In your browser, navigate to `http://localhost:8000/GAS.html`
  
  
  ## Current functionality
  - Currently, it only exectues as a web application, not a chrome extension. This is due to a conflict between OAuth2 and Google Chrome Extensions.
  - Can append selected information on the current page to document using hot key: `<Enter>`
  - Can create new files
  
  
  

 