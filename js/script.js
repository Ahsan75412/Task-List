
//Define Ui Element

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners

form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup' , filterTask);
document.addEventListener('DOMContentLoaded' , getTasks);


//define add task function()
function addTask(e){
    if(taskInput.value === ''){
        alert('Please! Add a Task');
    } else{
        //create li-list element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        //link added to li element
        let link = document.createElement('a');
        link.setAttribute('href' , '#');
        link.innerHTML =  'X' ; 
        li.appendChild(link);

        taskList.appendChild(li);

        // task input value store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //clear that input value
        taskInput.value = '';

    }
    e.preventDefault();
}


// remove element or task

function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("are you sure to delete?")) {
            let ele = e.target.parentElement;
            ele.remove();

            //local storage value delete code
            removeFromLS(ele);
        }
    }
}


// all task clear

function clearTask(e){
    taskList.innerHTML = '';
    localStorage.clear();
}



// filter any task to search

function filterTask(e){
    let text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none' ; 
        }
    });
}




// store in local storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        //link added to li element
        let link = document.createElement('a');
        link.setAttribute('href' , '#');
        link.innerHTML =  'X' ; 
        li.appendChild(link);

        taskList.appendChild(li);

    });

}

// local storage value deleted 

function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // let str = taskItem.textContent.trim;
    let li  = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>

    tasks.forEach((task , index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index , 1);
        }
    });

    localStorage.setItem('tasks' , JSON.stringify(tasks));


}