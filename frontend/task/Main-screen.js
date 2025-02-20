import { API_URL } from "../config.js";

var date = Date.now();
var userEmail = "qq@qq.com";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logout").addEventListener("click", logoutUser);

    async function logoutUser(event) {
        event.preventDefault();
        let response = await fetch(API_URL + "logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });  
    }

    async function fetchNumberOfStar() {
        const params = new URLSearchParams({
            email: userEmail
        });
        fetch(API_URL + "stars" + `?${params.toString()}`)
        .then(result => result.json())
        .then(data => {
            const stars = document.getElementById("starsText");
            stars.innerText = data.message;
        });
    }

    async function toggleTodo(event) {
        event.preventDefault();
        const isChecked = event.target.checked;
        const todoElement = event.target.closest(".task"); // Znalezienie klikniętego zadania
        let todoID = todoElement.id;
        
        const response = await fetch(API_URL + "updateTodoStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: todoID, completed: isChecked, email: userEmail})
        });
        fetchNumberOfStar();
    }

    async function deleteToDos(event){
        event.preventDefault();
        const todoElement = event.target.closest(".task"); // Znalezienie klikniętego zadania
        let todoID = todoElement.id;
        const response = await fetch(API_URL + "deleteToDos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: todoID, userEmail})
        });
        fetchTodos();
        fetchNumberOfStar();
    }

    function fetchTodos(){
        const params = new URLSearchParams({
            currentDay: date
        });
    
        const taskContainer = document.querySelector(".task-container");
    
        fetch(API_URL + "ToDoList" + `?${params.toString()}`)
        .then(result => result.json())
        .then(data => {
            document.querySelectorAll(".task").forEach(oldTask => oldTask.remove());
            data.message.forEach(element => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.id = element.id;
    
                const btn = document.createElement("button");
                const img = document.createElement("img");
                img.src = "data/minus.png";
                img.alt = "minus";
                btn.appendChild(img);
                btn.addEventListener("click",deleteToDos);
                
    
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("isDoneCheckbox");
                checkbox.checked = element.isChecked;
                checkbox.addEventListener("change", toggleTodo);
    
                const label = document.createElement("label");
                label.textContent = element.name;
    
                taskDiv.appendChild(btn);
                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(label);
    
                taskContainer.insertBefore(taskDiv, document.querySelector(".add-task"));
            });
        });
    }

    async function createToDo(event) {
        event.preventDefault();
        const isChecked = document.getElementById("idCheckbox").checked;
        const todoValue = event.target.value;
        
        const response = await fetch(API_URL + "createToDos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isChecked, todoValue, date, userEmail})
        });
        fetchTodos();
        fetchNumberOfStar();
    }
    
    document.getElementById("adding").addEventListener("click", addToDos);
    function addToDos(){
        const taskContainer = document.querySelector(".task-container");
        
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("isDoneCheckbox");
        checkbox.id = "idCheckbox";

        const input = document.createElement("input");
        input.classList.add("isInput");
        input.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                createToDo(event);
            }
        });

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(input);
        taskContainer.insertBefore(taskDiv, document.querySelector(".add-task"));        
    }

    function getHumanReadableDate(milliseconds){
        let date = new Date(milliseconds);
        let day = date.getUTCDate();
        let monthName = date.toLocaleString("en-US", {month: "long", timeZone: "UTC"});
        return `${day} ${monthName}`;
    }


    function setHeaderDate(){
        const dayElement = document.getElementById("daynow");
        dayElement.innerText = getHumanReadableDate(date);
    }
    
    const leftArrow = document.getElementById("img2");
    const rightArrow = document.getElementById("img3");
    
    function decrementDay(){
        date -= 24*60*60*1000;
        setHeaderDate();
        fetchTodos();
    }
    
    function incrementDay(){
        date += 24*60*60*1000;
        setHeaderDate();
        fetchTodos();
    }
    leftArrow.addEventListener("click", decrementDay);
    rightArrow.addEventListener("click", incrementDay);

    fetchNumberOfStar();
    setHeaderDate();
    fetchTodos();
});