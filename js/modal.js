window.onload = function () {

    var modalWorkItem = document.getElementById("newWorkItem");
    var newWitButton = document.getElementById("newWorkItemButton");    
    var span = document.getElementsByClassName("close")[0];    

    newWitButton.onclick = function() {
        modalWorkItem.style.display = "block";
        var saveWitButton = document.getElementById("salvarWitButton");

        saveWitButton.onclick = function(){
            var wit = salvarObjeto()            
        }
    }    

    span.onclick = function() {
        modalWorkItem.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalWorkItem) {
            modalWorkItem.style.display = "none";
        }
    }
};

function salvarObjeto() {
    var witName = document.getElementById("witName");    
    var witstatus = document.getElementById("witName");    
    var modalWorkItem = document.getElementById("newWorkItem");
    modalWorkItem.style.display = "none";

    var witStorage = localStorage.getItem("wits");
    var wits = JSON.parse(witStorage);
    if(wits == undefined) {
        wits = [];
    }

    var wit = {
        name: witName.value,
        status: witName.value
    }
    wits.push(wit);
    localStorage.setItem("wits", wit);            
    // witName.value = "";
    refreshSprint();
}

function refreshSprint() {
    var wits = localStorage.getItem("wits");
}