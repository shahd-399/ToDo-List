let theInput = document.querySelector(".add-task input");
let plus = document.getElementById('plus');
let tasksContainer = document.querySelector('.tasks-container');
let tasksCount = document.querySelector('.tasks-count span');
let tasksCompleted = document.querySelector('.tasks-completed span');

//focus on input field
window.onload = function(){
    theInput.focus();
}

let myTasks = [];
//adding tasks
plus.addEventListener('click',function(){
    if(theInput.value == ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Input Can't Be Empty!",
        });
    }
    else if(!chickIfTaskAlreadyExist(theInput.value)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This Task is Already Exist!",
        });
    }
    else{
        let msg = document.querySelector('.msg');
        if(document.body.contains(document.querySelector('.msg'))){
            msg.remove();
        }
        
        //push the task to my array "myTasks"
        myTasks.push(theInput.value);
        calculateTasks()
        


        let task = document.createElement('span')
        let deleteBtn = document.createElement('i')

        //add text on span
        let text =document.createTextNode(`${theInput.value}   `);

        task.appendChild(text);
        task.className = 'tasks-box';
        deleteBtn.className = 'fa-solid fa-trash delete'

        task.appendChild(deleteBtn);

        //add the task to the container
        tasksContainer.appendChild(task)
        
        //empty the input
        theInput.value='';
        theInput.focus();
    }
})
document.addEventListener("click" ,function(e){
    if(e.target.className == 'fa-solid fa-trash delete'){
        e.target.parentNode.remove();
        deleteCurrentTask(e.target.parentNode.innerHTML.split('   ')[0])
        calculateTasks()
        if(tasksContainer.childElementCount == 0){
            creatNoTasksMsg()
        }
    }
    if(e.target.classList.contains('tasks-box')){
        e.target.classList.toggle('finished')
        calculateTasks();
    }
})

function creatNoTasksMsg(){
    let msgSpan = document.createElement('span')
    let msgtext = document.createTextNode('No Tasks To Show')
    msgSpan.appendChild(msgtext);
    msgSpan.className = 'msg';
    tasksContainer.appendChild(msgSpan)
}
creatNoTasksMsg();

function chickIfTaskAlreadyExist(currentTask){
    var flag = true;
    for(var i=0;i<myTasks.length;i++){
        if(currentTask == myTasks[i]){
            flag =false;
            break;
        }
    }
    if(flag)
        return true;
    else
        return false;
}
function calculateTasks(){
    tasksCount.innerHTML = myTasks.length;
    tasksCompleted.innerHTML = (document.querySelectorAll(".finished")).length;
}


function deleteCurrentTask(deletedTask){
    for(let i=0 ; i < myTasks.length; i++){
        if(deletedTask == myTasks[i]){
            myTasks.splice(i,1);
            break;
        }
    }
}

let deleteAll = document.querySelector('.delete-all');
let finishAll = document.querySelector('.finish-all');

deleteAll.addEventListener('click' ,function(){
    if(document.body.contains(document.querySelector('.msg'))){
        return false
    }
    else{
        myTasks = [];
        let allTasks = document.querySelectorAll('.tasks-box')
        for(let i = 0 ; i < allTasks.length ; i++){
            allTasks[i].remove();
        }
        calculateTasks();
        creatNoTasksMsg();
    }
})

finishAll.addEventListener('click',function(){
    if(document.body.contains(document.querySelector('.msg'))){
        return false
    }
    else{
        let allTasks = document.querySelectorAll('.tasks-box')
        for(let i = 0 ; i < allTasks.length ; i++){
            allTasks[i].classList.add('finished');
        }
        calculateTasks();
    }
})