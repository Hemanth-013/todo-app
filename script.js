//selectors
const input=document.querySelector('.todo-input');
const button=document.querySelector('.todo-button');
const list=document.querySelector('.todo-list');
const option=document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
button.addEventListener('click',addTodo);
list.addEventListener('click',deleteCheck);
option.addEventListener('click',filterTodo);

//functions
function addTodo(event){
    //prevent from submitting
    event.preventDefault();
    //todo div
    const div=document.createElement("div");
    div.classList.add("todo");
    //create LI
    const ntodo=document.createElement('li');
    ntodo.innerText=input.value;
    ntodo.classList.add('todo-item');
    div.appendChild(ntodo);
    //add todo to local todos
    saveLocalTodos(input.value);
    //check mark button
    const but1=document.createElement('button');
    but1.innerHTML='<i class="fas fa-check"></i>';
    but1.classList.add("complete-btn");
    div.appendChild(but1);
    //trash button
    const but2=document.createElement('button');
    but2.innerHTML='<i class="fas fa-trash"></i>';
    but2.classList.add("trash-btn");
    div.appendChild(but2);
    //append to list
    list.appendChild(div);
    //clear todo input value
    input.value="";
}

function deleteCheck(e){
    const item=e.target;
    //delete todo
    if(item.classList[0]=="trash-btn"){
        const todo=item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitioned',function(){
            todo.remove();
        })
    }
    //check mark
    if(item.classList[0]=="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos=list.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                    todo.style.display="flex";
                else
                    todo.style.display="none";
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed"))
                    todo.style.display="flex";
                else
                    todo.style.display="none";
        }
    });
}

function saveLocalTodos(todo){
    //check for existing ones
    let todos;
    if(localStorage.getItem('todos')===null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    //check for previous inputs
    let todos;
    if(localStorage.getItem("todos")===null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem("todos"));
    todos.forEach(function(todo){
        //todo div
        const div=document.createElement("div");
        div.classList.add("todo");
        //create LI
        const ntodo=document.createElement('li');
        ntodo.innerText=todo;
        ntodo.classList.add('todo-item');
        div.appendChild(ntodo);

        //check mark button
        const but1=document.createElement('button');
        but1.innerHTML='<i class="fas fa-check"></i>';
        but1.classList.add("complete-btn");
        div.appendChild(but1);
        //trash button
        const but2=document.createElement('button');
        but2.innerHTML='<i class="fas fa-trash"></i>';
        but2.classList.add("trash-btn");
        div.appendChild(but2);
        //append to list
        list.appendChild(div);
    });
}

function removeLocalTodos(todo){
    //check for previous inputs
    let todos;
    if(localStorage.getItem("todos")===null)
        todos=[];
    else
        todos=JSON.parse(localStorage.getItem("todos"));
    const idx=todo.children[0].innerText;
    todos.splice(todos.indexOf(idx),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}