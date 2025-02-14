import { API_URL } from "../config.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", loginUser);
});

async function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("mail").value;
    let password = document.getElementById("psswd").value;

    let response = await fetch(API_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    let result = await response.json();
    console.log(result);
}