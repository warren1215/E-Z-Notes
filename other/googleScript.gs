//THIS IS A GOOGLESCRIPT FILE
//THIS WILL NOT WORK IN JAVASCRIPT!!!!!!!!!!!!!!!!!!!!!

var doc;

//If a document is not open, create a new
//If it is open, close old and create a new one
function newDocument(name) {
  if(doc == null)
    doc = DocumentApp.create(name);
  else {
    closeDocument(doc.getId());
    doc = DocumentApp.create(name);
  }
}


//Following functions need a null checker
//Opens document by ID
function openDoc(id) {
  doc = DocumentApp.openById(id);
}

//Appends text
function appendText(id, text) {
    openDoc(id);
    doc.getBody().appendParagraph(text);
}

function closeDocument() {
    doc.saveAndClose(doc.getId());
}
