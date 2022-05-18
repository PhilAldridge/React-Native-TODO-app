const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let itemCount = 0
let uncheckedCount = 0

function updateCount() {
    itemCountSpan.innerHTML = itemCount
    uncheckedCountSpan.innerHTML = uncheckedCount
}

function newTodo() {
    const newTask = prompt("What's your new todo?", "New Todo")
    
    //update counter
    itemCount++
    uncheckedCount ++
    updateCount()

    //add emtpy list item block
    const todoList = document.createElement("li")
    todoList.className = classNames.TODO_ITEM
    todoList.id = itemCount
    list.appendChild(todoList)

    //add checkbox
    const todoCheck = document.createElement("input")
    todoCheck.className = classNames.TODO_CHECKBOX
    todoCheck.type = "checkbox"
    todoCheck.id = "checkBox" + itemCount
    todoCheck.setAttribute("onClick", "checkTodo(this.id)")
    todoList.appendChild(todoCheck)

    //add text
    const todoText = document.createTextNode(newTask)
    todoList.appendChild(todoText)

    //add delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "todo-delete btn btn-danger btn-sm"
    deleteBtn.innerText = "delete"
    deleteBtn.id = "Delete" + itemCount
    deleteBtn.value = itemCount
    deleteBtn.setAttribute("onClick", "deleteTodo(this.value)")
    todoList.appendChild(deleteBtn)

}

function checkTodo(checkId) {
    if(document.querySelector("#"+checkId).checked){
        uncheckedCount--
    } else {
        uncheckedCount++
    }
    updateCount()
}

function deleteTodo(deleteId) {
    if(!document.querySelector("#checkBox"+deleteId).checked){
        uncheckedCount--
    }

    //remove item
    document.getElementById(deleteId).remove()

    //change the ids of subsequent items
    for(let i = deleteId*1+1; i<= itemCount; i++) {
        nextItem = document.getElementById(i.toString())
        nextItem.id = ""+i-1
        document.getElementById("checkBox" + i).id = "checkBox" + (i - 1)
        deleteBtn = document.getElementById("Delete" + i)
        deleteBtn.value = i-1
        deleteBtn.id = "Delete" + (i-1)
    }
    
    //update count
    itemCount--
    updateCount()
}
