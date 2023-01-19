const newTask = document.querySelector('.input-task');
const newTaskAddButton = document.querySelector('.btn-add-task');
const taskList = document.querySelector('.task-list');

newTaskAddButton.addEventListener('click',addTask);
taskList.addEventListener('click',removeDoneTask);
document.addEventListener('DOMContentLoaded',readFromLocalStorage);

function removeDoneTask(x){
    const clickingElement = x.target;

    if(clickingElement.classList.contains('task-btn-done')){

        clickingElement.parentElement.classList.toggle('task-done');
    }
    if(clickingElement.classList.contains('task-btn-removed')){
        if(confirm("You are about to remove this task. Are you sure?")){
            clickingElement.parentElement.classList.toggle('disappear');
            const taskToBeRemoved = clickingElement.parentElement.children[0].innerText;
            removeFromLocalStorage(taskToBeRemoved);
            clickingElement.parentElement.addEventListener('transitionend',function(){
                clickingElement.parentElement.remove();
            });
        }
       
    }
        
}
function addTask(x){
    if(newTask.value.length > 0){
        x.preventDefault();
        createTaskItem(newTask.value);
        saveLocalStorage(newTask.value);
        newTask.value= ''
    }
    else{
        alert('You can not enter empty task');
    }
    
}
function saveLocalStorage(newTask){
    let tasks;

    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function readFromLocalStorage(){
    let tasks;

    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        createTaskItem(task);
    })
}
function createTaskItem(task){
    //creating div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');

    //creating li
    const taskLi = document.createElement('li');
    taskLi.classList.add('task-description');
    taskLi.innerText = task;
    taskDiv.appendChild(taskLi);

    //adding done button
    const taskDoneButton = document.createElement('button');
    taskDoneButton.classList.add('task-btn');
    taskDoneButton.classList.add('task-btn-done');
    taskDoneButton.innerHTML = '<i class="fa-solid fa-square-check"></i>'
    taskDiv.appendChild(taskDoneButton);

    //adding remove button
    const taskRemoveButton = document.createElement('button');
    taskRemoveButton.classList.add('task-btn');
    taskRemoveButton.classList.add('task-btn-removed');
    taskRemoveButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    taskDiv.appendChild(taskRemoveButton);




    //adding div to the ul
    taskList.appendChild(taskDiv);
}
function removeFromLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //remove with splice
    const indexOfElementToBeRemoved = tasks.indexOf(task);
    tasks.splice(indexOfElementToBeRemoved, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}