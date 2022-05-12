(function() {
var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-button");



var incompleteTasksHolder = document.getElementById("incomplete-tasks");
incompleteTasksHolder.innerHTML = localStorage.getItem("incompleteTasksHolder");

var completedTasksHolder = document.getElementById("completed-tasks");
completedTasksHolder.innerHTML = localStorage.getItem("completedTasksHolder");
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  completedTasksHolder.children[i].querySelectorAll("input[type=checkbox]")[0].click();
}

var setLocalStorage = function(ul,type) {
  if(type === 'incomplete'){
   localStorage.setItem("incompleteTasksHolder",ul.innerHTML);
   }
 if(type === 'complete'){
     localStorage.setItem("completedTasksHolder",ul.innerHTML);
     }
}

var createNewTaskElement = function(taskString) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  var listItemName = taskInput.value ;
  if( listItemName.trim() === ''){
    alert("Task can't be empty.");
    return;
  }
  listItem = createNewTaskElement(listItemName);
  incompleteTasksHolder.appendChild(listItem);
  tabIndexCleanUp(incompleteTasksHolder,completedTasksHolder);
  
  setLocalStorage(incompleteTasksHolder,'incomplete');
  setLocalStorage(completedTasksHolder,'complete');
 
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var checkBox = listItem.querySelectorAll("input[type=checkbox]")[0];
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
 
  if (containsClass) {
      label.innerText = editInput.value;
      if( editInput.value.trim() === ''){
        alert("Task can't be empty.");
        return;
      }
      button.innerText = "Edit";
  } else {
     editInput.value = label.innerText;
     button.innerText = "Save";
  }
  
  listItem.classList.toggle("editMode");
  
  if(checkBox.checked) {
    setLocalStorage(ul,'complete');
  } else {
    setLocalStorage(ul,'incomplete');
  }
};



var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);

  tabIndexCleanUp(incompleteTasksHolder,completedTasksHolder);

  setLocalStorage(incompleteTasksHolder,'incomplete');
  setLocalStorage(completedTasksHolder,'complete');

};

var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  tabIndexCleanUp(incompleteTasksHolder,completedTasksHolder);
  setLocalStorage(incompleteTasksHolder,'incomplete');
  setLocalStorage(completedTasksHolder,'complete');
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  tabIndexCleanUp(incompleteTasksHolder,completedTasksHolder);
  setLocalStorage(incompleteTasksHolder,'incomplete');
  setLocalStorage(completedTasksHolder,'complete');
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editInput = taskListItem.querySelectorAll("input[type=text]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  editInput.addEventListener("keypress", function(event) {
                     if(event.key === "Enter"){
                      event.preventDefault();
                      editButton.click();
                    }
                  })
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

//Event listeners
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
                                         if(event.key === "Enter"){
                                           event.preventDefault();
                                           addButton.click();
                                         }
                                      })


for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

var tabIndexCleanUp = function(ul1,ul2) {
  for (var i = 0; i < ul1.children.length; i++) {
 ul1.children[i].tabIndex = i + 1;
}
 for(var i = 0; i < ul2.children.length ; i++ ) {
  ul2.children[i].tabIndex = ul1.children.length + i + 1;
 }
};
})();