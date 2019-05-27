window.onload = function () {
    //refreshSprint();
    var modalWorkItem = document.getElementById("newWorkItem");
    var newWitButton = document.getElementById("newWorkItemButton");
    var span = document.getElementsByClassName("close")[0];

    newWitButton.onclick = function () {
        modalWorkItem.style.display = "block";
        var saveWitButton = document.getElementById("salvarWitButton");

        saveWitButton.onclick = function () {
            var wit = salvarObjeto()
        }
    }

    span.onclick = function () {
        modalWorkItem.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modalWorkItem) {
            modalWorkItem.style.display = "none";
        }
    }
};

function salvarObjeto() {
    var witName = document.getElementById("witName");
    var witstatus = 'new';
    var modalWorkItem = document.getElementById("newWorkItem");
    modalWorkItem.style.display = "none";
    
    var witStorage = localStorage.getItem("wits");
    var wits = JSON.parse(witStorage);
    if (wits == undefined) {
        wits = [];
    }

    var wit = {
        name: witName.value,
        status: witstatus
    }
    wits.push(wit);
    localStorage.setItem("wits", JSON.stringify(wits));
    // witName.value = "";
    refreshSprint();
}

function refreshSprint() {
    var wits = JSON.parse(localStorage.getItem("wits"));
    var bugs = document.getElementById('tasks-bugs');
    var taskNew = document.getElementById('tasks-new');
    var active = document.getElementById('tasks-active');
    var closed = document.getElementById('tasks-closed');

    bugs.childNodes = new Array();
    taskNew.childNodes = new Array();
    active.childNodes = new Array();
    closed.childNodes = new Array();

    wits.forEach(element, index => {
        createTaskHtml(element, index);            
    });
}

function createTaskHtml(task, count) {
    var task = document.createElement('div');    
    task.id = 'task' + count;
    task.className = 'task-' + task.status
    task.onDrop = drop;
    task.ondragover = allowDrop;

    task.childNodes     
}

function getWitHtml(taskWit){
    var taskDiv = document.createElement('div');
    var spanName = document.createElement('span');
    var imgStatus = document.createElement('img');
    spanName.value = taskWit.name;
    taskDiv.className = 'task-content';
    taskDiv.insertAdjacentHTML('beforeend', '<img src="img/bug.PNG" height="20" width="20">');
    task.childNodes.appendChild(spanName);
    taskDiv.insertAdjacentHTML('beforeend', '<span>Unassigned</span><span>State</span>');
    imgStatus.className = 'imgStatus';
    imgStatus.src = 'img/status-'+ taskWit.status + '.png';
    imgStatus.width = 27;
    imgStatus.height = 70;
    return taskDiv;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("id");
    var task = document.getElementById(data);
    task = changeStatus(task, ev.target);
    ev.target.appendChild(task);
}

function changeStatus(task, column) {
    var img = document.createElement('img');
    img.height = 27;
    img.width = 70;
    img.className = 'imgStatus';
    var imgToBeRemoved = task.getElementsByClassName("imgStatus")[0];
    task.childNodes[1].removeChild(imgToBeRemoved);

    if (column.id == 'tasks-active' || column.id == 'tasks-new')
        img.src = 'img/status-new.png';
    else
        img.src = 'img/status-closed.png';

    task.childNodes[1].appendChild(img);
    return task;
}