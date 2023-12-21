// link api
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-ET-WEB-PT/events';

// create state
const state = {
    events: [],
};

// link to DOM
const addPartyForm = document.querySelector("#addPartyForm");
const eventsList = document.querySelector("#events");
const eventsListItems = document.querySelector("li");
addPartyForm.addEventListener('submit', makeParty);


// render functions
async function render() {
    await getParties();
    renderParties(); // to be defined later
};

render();

// get parties function
async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
};

// create parties function
async function makeParty(e) {
    try {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location").value;
    let data = {
        name,
        description,
        date,
        location,
    };

    console.log(data);

    const response = await fetch(
        API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const json = await response.json();
    return json;

    } catch(error) {
        console.error(error);
    };
};

// delete parties function
async function deleteParty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('This item could not be delete.');
        }

        render();
    } catch(error) {
        console.log(error);
    };
}
// render parties function
function renderParties() {
    const eventsList = document.querySelector('#events');
    /*if (!state.events.length) {
        eventsList.innerHTML =  `<li>No recipes found.</li>`;
        return;
    } */

    const eventItems = state.events.map((event) => {
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `
        <h2>${event.name}</h2>
        <h5>${event.description}</h5>
        <h5>${event.date}</h5>
        <h5>${event.location}</h5>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        eventItem.append(deleteButton);

        deleteButton.addEventListener(
            'click',
            () => [deleteParty(event.id)]
        );

        return eventItem;
    });
    eventsList.replaceChildren(...eventItems);
}