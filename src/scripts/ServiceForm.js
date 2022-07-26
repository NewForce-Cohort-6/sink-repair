import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" id="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" id="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" id="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" id="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("#serviceDescription").value
        const userAddress = document.querySelector("#serviceAddress").value
        const userBudget = document.querySelector("#serviceBudget").value
        const userDate = document.querySelector("#serviceDate").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: parseInt(userBudget),
            neededBy: userDate
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})