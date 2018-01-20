var doc;

function newDocument(name) {
  if(doc == null)
    doc = DocumentApp.create(name);
  else {
    closeDocument(id);
    doc = DocumentApp.create(name);    
  }
}

//Opens document by ID
function openDoc(id) {
  doc = DocumentApp.openById(id);
}

//Appends text
function appendText(text) {
  if(doc != null)
    doc.getBody().appendParagraph(text);
}

function closeDocument(id) {
  doc.saveAndClose();
}



