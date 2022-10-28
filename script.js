

const form = document.querySelector("#form1");
const input = document.querySelector("#input1");
const btnAddNewTask = document.querySelector("#ekleBtn")
const btnDelete = document.querySelector("#btnDelete");
const taskList = document.querySelector("#task-list");
let todos;



eventListeners();
function eventListeners () {
    //submit eventi
    form.addEventListener("submit", addNewItem);
    taskList.addEventListener("click", deleteItem);
}

loadItems();

function loadItems(){
    todos = getItemsFromLS();
    todos.forEach(function(item){
        appendItem(item);
    })

}
//get items from local storage

function getItemsFromLS (){
if(localStorage.getItem("todos") === null){
    todos =[];
}
else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
return todos;

}

function setItemToLS(newTodo){
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


// function topla (x, y){
//     if(x>y){
//         return "x>y";
//     }else {
//         return "x y'den büyük değildir."
//     }
//     return x+y;
// }
// const sonuc = topla(7, 3);
// console.log(sonuc);


// let abc = addNewItem();
// console.log(abc);

function addNewItem (e) {
    e.preventDefault();
if (input.value === ''){
    $('#bosMsg').toast('show');
    
    //console.log("submit")
    return;
}

setItemToLS(input.value.replace(/[^a-zA-Z ]/g, ""));

//li oluşturma

const li =document.createElement("li");
li.className ="list-group-item list-group-item-secondary";
li.appendChild(document.createTextNode(input.value.replace(/[^a-zA-Z ]/g, "")));

// a oluşturma

const a = document.createElement("a");
a.classList = "delete-item float-right";
a.setAttribute("href", "#");
a.innerHTML= '<i class="fas fa-times"></i>';

li.appendChild(a);
taskList.appendChild(li);


const button = document.createElement("button");
button.classList = "close";
button.setAttribute("type", "button");
button.innerHTML= '<span class="delete-span" aria-hidden="true">&times;</span>';

li.appendChild(button);

input.value = ""
 
    e.preventDefault();
    $('#ekleMsg').toast('show');
}

//eleman silme

function deleteItem(e){
    console.log(e);
    if(e.target.className === "delete-span"){
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.textContent);
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.replace(/[^a-zA-Z ]/g, ""));  
    };
    
    // if(e.target.className === "fas fa-times"){
    //     if(confirm("Silmek istediğinize emin misiniz?")){
    // console.log(e.target);
    // e.target.parentElement.parentElement.remove();
    //     }
        
    // }


e.preventDefault();
}  

function deleteTodoFromStorage (deletetodos){
    let todos =getItemsFromLS();
    console.log("delete", deletetodos);
    todos.forEach(function(todo, index){
        console.log("t", deletetodos, todo);
        if(todo == deletetodos){
            console.log("inside for each", todo, deletetodos);

            todos.splice(index, 1);

        }
    });
    console.log("newTodos", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function appendItem(value) {
    if (value === ''){
        return;
    }

    
    //li oluşturma
    
    const li =document.createElement("li");
    li.className ="list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(value));
    
    // a oluşturma
    
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML= '<i class="fas fa-times"></i>';
    
    li.appendChild(a);
    taskList.appendChild(li);
    
    
    const button = document.createElement("button");
    button.classList = "close";
    button.setAttribute("type", "button");
    button.innerHTML= '<span class="delete-span" aria-hidden="true">&times;</span>';
    
    li.appendChild(button);
    }

