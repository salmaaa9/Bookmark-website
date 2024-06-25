
var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var search = document.getElementById("search");
var error = document.getElementById("error");

var closeError = document.getElementById("closeBtn");
var bookMarks = [];



// checking to see if local storage already contains items
if (JSON.parse(localStorage.getItem('bookMarks')))
  {
    bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
    display(bookMarks)
}

// regex
var nameRegex = /^[A-Za-z_]{3,}$/;
var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/;
function isNameValid(){
  if(nameRegex.test(nameInput.value)){ 
    console.log('true in is valid');
    return true
  }
  else{
    console.log('false in is valid');
    return false
  } 
}
function isUrlValid(){
  if(urlRegex.test(urlInput.value)){
    console.log('true in is valid');
    return true
  }
  else{
    console.log('false in is valid');
    return false
  }
}
// on closing the error pop up window 
closeError.onclick = function(){
  error.classList.replace('d-block','d-none');
}


// on clicking submit the following functionalities are excuted
submitBtn.onclick = function() {

  if (isNameValid()&&isUrlValid()){
    var bookMark = {
      bookName: nameInput.value ,
      bookUrl : urlInput.value
    }
  bookMarks.push(bookMark);
  localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
  display(bookMarks);
  
  }
  else{
    
    error.classList.replace('d-none','d-block');
  }
  clearData();
}

// displays the data 
function display(a){
  var marks = ' ';
  for (var i = 0; i < a.length; i++) {
    marks += `
    <tr>
    <td>${i+1}</td>
    <td>${a[i].bookName}</td>              
    <td>
      <button onclick = "visitBook(${i})" class="btn btn-visit" data-index="0">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </button>
    </td>
    <td>
      <button onclick = "deleteBook(${i})" class="btn btn-delete pe-2" data-index="0">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
    </tr> 
    `
  }

  tableContent.innerHTML = marks;
}
// clear data inputs
function clearData(){
  nameInput.value = '';
  urlInput.value = '';
}

//on clicking delete btn to delete bookmark
function deleteBook(index){
  bookMarks.splice(index,1);
  localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
  display(bookMarks);
}

// visiting the website
function visitBook(index){
  var url = bookMarks[index].bookUrl;
  window.open(url, '_blank');
}

// function search not needed here 
function searchBook(term){
  var wanted = [];
  for (var i = 0; i < bookMarks.length; i++) {
    if(bookMarks[i].bookName.toLowerCase().includes(term.toLowerCase())){
      wanted.push(bookMarks[i]); 
    }
  }
  display(wanted);
  console.log(wanted);
}

