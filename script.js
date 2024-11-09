function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


let clickCount = 0;
let setup, delivery;

async function fetchData(url) {
    try {
        let response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
        let data = await response.json();
        return data;       
    } catch (error) {
        console.error('Error Fetching data', error);
    }
}

function runFunction(){
    clickCount++;
    if  (clickCount === 1) {
        function1(setup, delivery);
    } else if (clickCount === 2) {
        function2(setup, delivery);
    } else if (clickCount === 3) {
        fetchData('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart').then(newData => {
           setup = newData.setup;
           delivery = newData.delivery;
           displayInitialData(setup, "New Data");
           clickCount = 1;         
        });
        document.getElementById("joke-btn").innerText = "Click here for the answer";

        document.getElementById("delivery").classList.add("hidden");
    }      
}

async function initialize() {
    let data = await fetchData('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
    setup = data.setup;
    delivery = data.delivery;
    console.log(setup);
    console.log(delivery);
}

function function1(setup, delivery) {
    console.log(setup);
    var setupText = document.getElementById("setup");
    setupText.innerHTML = setup

    document.getElementById("joke-btn").innerText = "Click here for the answer";
    // var buttonText = document.getElementById("joke-btn")
    // buttonText.innerHTML = "Click here for the answer"
    // document.body.appendChild(buttonText)

}

function function2(){
    console.log(setup);
    console.log(delivery);

    var deliveryText = document.getElementById("delivery");
    deliveryText.innerHTML = delivery

    document.getElementById("joke-btn").innerText = "Click here for another joke!";
    
    
    document.getElementById("delivery").classList.remove("hidden");
}

function displayInitialData (setup) {
    let resultsContainer = document.getElementById("setup");
    resultsContainer.innerHTML = `
    <p id="setup">${setup}</p>
    `;
}

function displayData(setup, delivery, label) {
    let resultsContainer = document.getElementById("setup");
    resultsContainer.innerHTML = `
        <p>${label}: setup - ${setup}, delivery - ${delivery}</p>
    `;
}

initialize();