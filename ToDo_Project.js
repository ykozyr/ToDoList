// Referencing the html area where we are adding a new todo
const addForm = document.querySelector('.add');

// Referencing the todo list as a whole from the html (ul)
const list = document.querySelector('.todos');

// Referencing the input field within Search
// This is where the user will type search criteria
const search = document.querySelector('.search input');

// New function to add a new todo item to the webpage list
// We could tag it onto the function below, but this method makes it more reusable
// What we want to include here is one of the li tags, b/c this makes up the todo item
// Replace the list item text with the todo variable we created below
const generateTemplate = todo => {
const html = 
`    
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
`;

// We want to append the above as a new li within the html code (= would replace)
list.innerHTML += html;

};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    // Trim will get rid of the extra white spaces that a user might input
    const todo = addForm.add.value.trim();
    // We're calling the generateTemplate function we created above
    // This adds a newly submitted li item to the existing todo list
    // We want to additionally make sure that the user can't submit a blank item
    if(todo.length){
        generateTemplate(todo);
    // We also want to clear the form once we submit a new item
        addForm.reset();
    }
});

// Delete ToDos
// We want to add an event listener to the overall list (todos)
// This prevents us from having to manually add a listener to each trashcan

list.addEventListener('click', e => {
// Checking if the target element we click contains the delete class
    if(e.target.classList.contains('delete')){
// The li is the parentElement of the trashcan (delete)
// We're telling JS to remove the li upon clicking the trashcan
        e.target.parentElement.remove();
    }
});

// Searching ToDos

// Filtering the ToDos
// We want to compare the term entered against the text content of each li (todo)
const filterTodos = (term) =>{
// li is a child of the ul, hence we're grabbing list.children (list = ul)
// Original list.children is a html collection
// Methods CANNOT be performed on a html collection
// We convert the html collection to an Array
    Array.from(list.children)
    .filter((todo) =>
// We want to keep items that don't include the term
// We will not do ANYTHING to the ones that DO include the term
// Original includes method will return a boolean for matches
// Adding ! negates the boolean and gets us values that DON'T include the term
        !todo.textContent.toLowerCase().includes(term))
// Now we'll cycle through the array to add a class to todos that don't match term
    .forEach(todo => todo.classList.add('filtered'));
// We want to remove the class if it goes back to matching
// Copy above process to take off the 'filtered' class
    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
}; 

// We can update our CSS to hide the 'filtered' class from the webpage!

// We can use numerous ways to accomplish this..filter, keyup, etc.
search.addEventListener('keyup', () => {
// Here we're gettin the term a user types in and trim the white spaces
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

// We added 'toLowerCase' to ensure searching works
// If you search in ALL CAPS, it will not locate a lowercase item
// Also, if user adds in ALL CAPS, and we search lowercase, we would not find
// THUS, all textContent in the Arrays and the Search Values were set toLowerCase
