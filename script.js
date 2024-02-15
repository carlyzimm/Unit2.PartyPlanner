// Setup

const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/carly-zimmerman";

let parties = [];

const partiesContainer = document.getElementById("parties");

// Event Listeners

const form = document.getElementById("add");
form.addEventListener("submit", addParty);

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

async function addParty(event, form) {
  try {
    event.preventDefault();

    const name = form.name.value;
    const date = form.date.value;
    const location = form.location.value;
    const description = form.description.value;

    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        date: date,
        location: location,
        description: description,
      }),
    });
    if (!response.ok) {
      throw new Error("Error creating party");
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

// Render Functions

function renderParties() {
  const htmlParties = parties.map((evt) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${evt.name}</h3>
                         <p>${evt.date}</p>
                         <p>${evt.location}</p>
                         <p>${evt.description}</p>`;
    return div;
  });

  partiesContainer.replaceChildren(...htmlParties);
}

async function startApp() {
  parties = await getParties();

  renderParties();
}

startApp();
