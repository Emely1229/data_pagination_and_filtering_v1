/*
Treehouse Techdegree: Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab
   Reach out in your Slack community if you have questions
*/
const itemsPerPage = 9;
//only 9 students per page max
const ulLinkList = document.querySelector('.link-list');
//selects list of page numbers
const studentList = document.querySelector('.student-list');
//selects list of students
const header = document.querySelector('.header');
//selects header
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  //creates the function to show each 9 students max on each page
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;
  studentList.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      let student = list[i];
      const studentItem = `
      <li class="student-item cf">
   <div class="student-details">
     <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
     <h3>${student.name.first} ${student.name.last}</h3>
     <span class="email">${student.email}</span>
   </div>
   <div class="joined-details">
     <span class="date">Joined ${student.registered.date}</span>
   </div>
 </li>`;

      studentList.insertAdjacentHTML('beforeend', studentItem);

    }
  }
}
showPage(data, 1);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  //creates function to create the page numbers based on how many students there are to display
  let numberOfPages = Math.ceil(list.length / itemsPerPage);
  ulLinkList.innerHTML = '';
  for (let i = 1; i <= numberOfPages; i++) {
    const button = `<li><button type="button">${i}</button></li>`;
    ulLinkList.insertAdjacentHTML('beforeend', button);
  }
  const firstButton = document.querySelector('button');
  firstButton.className = "active";
  ulLinkList.addEventListener('click', e => {
    if (e.target.tagName === "BUTTON") {
      const active = document.querySelector('.active');
      active.className = '';
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    }
  });
}

addPagination(data);

ulLinkList.addEventListener('click', e => {
  //creates event where it sets active class and takes away the tag on page click
  const pageButton = e.target;
  const pageButtonLi = ulLinkList.children;
  if (pageButton.tagName === 'BUTTON') {
    for (var btn of pageButtonLi) {
      btn.firstElementChild.className = '';
    }
    pageButton.className = "active";
  }
});


// Call functions

addPagination(data);


const search = `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
//creates the search image and input
header.insertAdjacentHTML('beforeend', search);
//inserts the html to make the image/input search onto header
document.querySelector('#search').addEventListener('keyup', e => {
  //allows user to see only what they have searched
  let value = e.target.value.toLowerCase();
  const newData = searchBar(value);
  addPagination(newData);
  showPage(newData, 1);
  if (newData.length === 0) {
    studentList.innerHTML = `<h1 style ="font-size: 2rem; font-style:bold; color:pink; margin: 0 auto;">Sorry...no match Found!</h1>`;
  }
});

function searchBar(value) {
  //matches a user's search with available students and pushes the matches forward onto a new list
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    let listName = data[i];
    if (listName.name.first.toLowerCase().includes(value) || listName.name.last.toLowerCase().includes(value)) {
      newData.push(listName);
    }
  }
  return newData;
}
