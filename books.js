window.addEventListener("load", function()
{
let inputTitle = document.getElementById("inputTitle");
let inputAuthor = document.getElementById("inputAuthor");
let lista = document.getElementById("bookList");
let addBook = document.getElementById("btnAddBook");
let APIbtn = document.getElementById("btn");
let viewBooks = document.getElementById("btnViewBooks");
let li = document.getElementsByClassName("li");
let clicked = true; 
let apiKey = '39WRk';
let bookID = document.getElementById("deleteID");
let deleteButton = document.getElementById("deleteButton");
let statusText = document.getElementById("statusRad");
let statusAdd = document.getElementsByClassName("statusAdd");
let statusDelete = document.getElementsByClassName("statusDelete");

// statusText.innerHTML = "status text";



/*********** VISA BÖCKER **************/

function getBooks() {
    let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=" + apiKey;  
let req = new XMLHttpRequest();
req.onreadystatechange = function(event) { console.log("readyState:" + req.readyState);
  if( req.status == 200 && req.readyState == 4 ){
    var data = JSON.parse(req.responseText);
	
      console.log("Här visas dataobjektet innuti HTTPrequest: " + data);
      console.log("Här visas responseText : " + req.responseText);
	  if( data.data ) {
	  console.log('getBooks data id',data.data[0].id);
		lista.innerHTML = "";
		
		for (i = 0; i < data.data.length; i++) { 
			let newBook = document.createElement('li');
			newBook.innerHTML ="<span class='item'>ID: </span>" + data.data[i].id + "<span class='item'>Title: </span>" +  data.data[i].title + "<span class='item'>Author: </span>" +  data.data[i].author;
			lista.appendChild(newBook);
			
		}
	  } else {
		  getBooks();
	  }
	}
    
	console.log("Här visas dataobjektet: " + data);
 
};
req.open("GET", url);
req.send();

}


viewBooks.addEventListener("click", function(event){
 
 getBooks();
	
	
	if (clicked === false)
	{
			lista.style.display = "none";
			viewBooks.innerHTML = "SHOW MY LIBRARY";
			clicked = true;
	}
	else if (clicked === true)
	{
			lista.style.display = "block";
			viewBooks.innerHTML = "HIDE LIBRARY";
			clicked = false;
	}


});


/*************** SKAPA API- KEY ***********/


APIbtn.addEventListener('click', function(event) {
  //apiReceaved.innerHTML = 'No problemo';
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    apiReceaved.innerHTML = json;
    apiReceaved.innerHTML = json.key;
  })
});


/************* LÄGG TILL BOK ***************/


addBook.addEventListener('click', function(event) {
 

let pushAuthor = inputAuthor.value; 
let pushTitle = inputTitle.value;

if (pushAuthor == "" && pushTitle == ""){
	
	window.alert("Please enter a book!");
	
}
else {
let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=" + apiKey + "&title=" + pushTitle + "&author=" + pushAuthor;  
let req = new XMLHttpRequest();
req.onreadystatechange = function(event) { console.log("readyState:" + req.readyState);
  if( req.status == 200 && req.readyState == 4 ){
    var data = JSON.parse(req.responseText);
      console.log(req.responseText);
		getBooks();
	   if (data.status == "error")
	  {
		  statusAdd.innerHTML = data.message + ", please try again!";
		  console.log("Här kommer felmeddelandet: " + data.message)
		  
	  }
	  else
	  {
		  statusText.innerHTML = "Success!";
	  }
  
    }
 
};
req.open("post", url);
req.send();


inputTitle.value = "";
inputAuthor.value = ""; 
}


});    


/**************** TA BORT BÖCKER **********************/	


deleteButton.addEventListener("click", function(event){

let deleteID = bookID.value;

	let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + apiKey + "&id=" + deleteID;  
let req = new XMLHttpRequest();
req.onreadystatechange = function(event) { console.log("readyState:" + req.readyState);
  if( req.status == 200 && req.readyState == 4 ){
    var data = JSON.parse(req.responseText);
	console.log(req.responseText);
	  getBooks();
	  if (data.status == "error")
	  {
		  statusDelete.innerHTML = data.message + ", please try again!";
		  console.log("Här kommer felmeddelandet: " + data.message)
	  }
	  else
	  {
		  statusText.innerHTML = "Success!";
	  }
  }
  };
  
  req.open("post", url);
  req.send();

 bookID.value = "";

});

});
