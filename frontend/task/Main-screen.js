import { API_URL } from "../config.js";
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logout").addEventListener("click", logoutUser);

    async function logoutUser(event) {
        event.preventDefault();
        let response = await fetch(API_URL + "logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });  
    }

    const params = new URLSearchParams({
        currentDay: Date.now()
    });

    fetch(API_URL + "ToDoList" + `?${params.toString()}`).then((result) => {
        console.log(result);
    });


    console.log("Siema");

});