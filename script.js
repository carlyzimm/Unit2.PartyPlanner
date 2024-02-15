// Setup

const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/carly-zimmerman";

let parties = [];

const partiesContainer = document.getElementById("parties");

// Fetch Calls

async function getParties() {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error(err);
  }
}

// Event Listeners

// const form = document.getElementById("add");

// form.addEventListener('submit', async (evt) => {
//     evt.preventDefault()

//     const
// })

// Render Functions

function renderParties() {
  const htmlParties = parties.map((event) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${event.name}</h3>
                         <p>${event.date}</p>
                         <p>${event.location}</p>
                         <p>${event.description}</p>`;
    return div;
  });

  partiesContainer.replaceChildren(...htmlParties);
}

async function startApp() {
  parties = await getParties();

  renderParties();
}

startApp();
