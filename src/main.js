const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

// Check if the directory exists, create it if not
if (!fs.existsSync(pathName)) {
  fs.mkdirSync(pathName);
}

btnCreate.addEventListener('click', function(){  //creating text file when user click CREATE button
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;
  fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file
    if(err){
      return console.log(err);
    }
    var txtfile = document.getElementById("fileName").value;
    alert(txtfile + " text file was created");   
    console.log("The file was created");
  
  });
  
});

btnRead.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);

  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    fileContents.value = data;
    console.log('The file was read!');
  });
});


btnUpdate.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  fs.writeFile(file, contents, function (err) {
    if (err) {
      return console.log(err);
    }
    var txtfile = document.getElementById('fileName').value;
    alert(txtfile + ' text file was updated successfully');
    console.log('The file was updated');
  });
});

btnDelete.addEventListener('click', function () {
  var txtfile = document.getElementById('fileName').value;
  var confirmation = confirm('Are you sure you want to delete ' + txtfile + '?');
  if (confirmation) {
    let file = path.join(pathName, fileName.value);

    fs.unlink(file, function (err) {
      if (err) {
        return console.log(err);
      }
      alert(txtfile + ' text file was deleted successfully');
      fileName.value = "";
      fileContents.value = "";
      console.log('The file was deleted!');
    });
  }
});
