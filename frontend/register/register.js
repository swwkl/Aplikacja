import { API_URL } from "../config.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registerForm").addEventListener("submit", registerUser);
});

async function registerUser(event) {
    event.preventDefault();

    let email = document.getElementById("login").value;
    let password = document.getElementById("psw").value;

    let response = await fetch(API_URL + "register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    let result = await response.json();
    console.log(result);
}