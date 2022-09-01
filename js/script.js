
//Define Ui Element

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners

form.addEventListener('submit',addTask);


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

        //clear that input value
        taskInput.value = '';

    }
    e.preventDefault();
}


