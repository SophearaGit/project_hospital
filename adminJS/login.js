document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(
            email === "admin@gmail.com" &&
            password === "123456"
        ){

            const user = {
                name: "Administrator",
                email: email
            };

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            window.location.href = "admin.html";

        }else{

            alert("Invalid Login");

        }

    });

});