var circle = document.getElementById("circle");
var upBtn = document.getElementById("upBtn");
var downBtn = document.getElementById("downBtn");

var rotateValue = circle.style.transform;
var rotateSum;

upBtn.onclick = function ()
{
    rotateSum = rotateValue + "rotate(-90deg)";
    circle.style.transform = rotateSum;
    rotateValue = rotateSum;
}

downBtn.onclick = function ()
{
    rotateSum = rotateValue + "rotate(90deg)";
    circle.style.transform = rotateSum;
    rotateValue = rotateSum;
}
function showSignIn() {
    document.getElementById("signInForm").style.display = "block";
    document.getElementById("signUpForm").style.display = "none";
}

function showSignUp() {
    document.getElementById("signInForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";
}

function refreshPage() {
    location.reload();
}

function signIn() {
    // Assuming the user has successfully signed in
    showMessage("Welcome! Find your treasure.");
    // Hide the sign-in form after submission
    document.getElementById("signInForm").style.display = "none";
    // Prevent default form submission behavior
    event.preventDefault();
    console.log("Sign-in message displayed.");
}

function signUp() {
    // Assuming the user has successfully signed up
    showMessage("Welcome! Find your treasure.");
    // Hide the sign-up form after submission
    document.getElementById("signUpForm").style.display = "none";
    // Prevent default form submission behavior
    event.preventDefault();
    console.log("Sign-up message displayed.");
}


function showMessage(message) {
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.innerText = message;
    messageContainer.style.display = "block";
    setTimeout(function() {
        messageContainer.style.display = "none";
    }, 3000); // Hide the message after 3 seconds
}

document.getElementById("signInLink").addEventListener("click", showSignIn);
document.getElementById("signUpLink").addEventListener("click", showSignUp);

// Adding event listeners to form submit buttons
document.getElementById("signInForm").addEventListener("submit", signIn);
document.getElementById("signUpForm").addEventListener("submit", signUp);

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for the "Report Lost Items" button
    document.getElementById("reportLostBtn").addEventListener("click", function() {
        fetchItems("lostItems");
    });

    // Add event listener for the "Report Found Items" button
    document.getElementById("reportFoundBtn").addEventListener("click", function() {
        fetchItems("foundItems");
    });
});

function fetchItems(type) {
    fetch('db.json')
    .then(response => response.json())
    .then(data => {
        displayItems(data[type]);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayItems(items) {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        // Create card container
        const card = document.createElement('div');
        card.classList.add('card');

        // Create image element
        const image = document.createElement('img');
        image.src = item.imageURL;
        image.alt = item.name;
        card.appendChild(image);

        // Create details container
        const details = document.createElement('div');
        details.classList.add('details');

        // Create name element
        const name = document.createElement('h3');
        name.textContent = item.name;
        details.appendChild(name);

        // Create color element
        const color = document.createElement('p');
        color.innerHTML = `<strong>Color:</strong> ${item.color}`;
        details.appendChild(color);

        // Create description element
        const description = document.createElement('p');
        description.innerHTML = `<strong>Description:</strong> ${item.description}`;
        details.appendChild(description);

        // Append details container to card
        card.appendChild(details);

        // Append card to items container
        itemsContainer.appendChild(card);
    });
}
