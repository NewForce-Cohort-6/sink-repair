import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js";

export const Requests = () => {

  const serviceRequests = getRequests();
  const plumbers = getPlumbers();


  let html = `
        <ul>
            ${serviceRequests
              .map((singleServiceRequest) => {
                return `
                    <li>${singleServiceRequest.description}</li>
                    <button class="request__delete"
                id="request--${singleServiceRequest.id}">
            Delete
        </button>
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
            ${plumbers.map(
                      plumber => {
                          return `<option value="${singleServiceRequest.id}--${plumber.id}">${plumber.name}</option>`
                      }
                  ).join("")
              }
          </select>
        `;
            })
              .join("")}
  
        </ul>`;

  return html;
};
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [serviceRequestId, plumberId] = event.target.value.split("--")
            const dateCompleted = Date.now()

            const completion = {
                serviceRequestId: parseInt(serviceRequestId),
                plumberId: parseInt(plumberId),
                date_completed: dateCompleted
             }
             saveCompletion(completion)
             getCompletions()
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)
