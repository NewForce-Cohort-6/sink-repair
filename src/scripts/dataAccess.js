const applicationState = {
  serviceRequests: [],
};

const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/serviceRequests`)
    .then((dirtyServiceRequests) => dirtyServiceRequests.json())
    .then((cleanServiceRequests) => {
      // Store the external state in application state
      applicationState.serviceRequests = cleanServiceRequests;
    });
};

export const sendRequest = (userServiceRequest) => {
	const fetchOptions = {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(userServiceRequest),
	};
  
	return fetch(`${API}/serviceRequests`, fetchOptions)
	  .then((response) => response.json())
	  .then(() => {
		document.dispatchEvent(new CustomEvent("stateChanged"));
	  });
  };
 
export const getRequests = () => {
  return applicationState.serviceRequests.map((singleServiceRequest) => ({...singleServiceRequest}));
};

export const deleteRequest = (id) => {
    return fetch(`${API}/serviceRequests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(dirtyPlumbers => dirtyPlumbers.json())
        .then(
            (cleanPlumbers) => {
                applicationState.plumbers = cleanPlumbers
            }
        )
}

export const getPlumbers = () => {
	return applicationState.plumbers.map((singlePlumber) => ({...singlePlumber}));
  };
 
  export const fetchCompletions = () => {
	return fetch(`${API}/completions`)
	  .then((dirtyCompletions) => dirtyCompletions.json())
	  .then((cleanCompletion) => {
		// Store the external state in application state
		applicationState.completions = cleanCompletion;
	  });
  };

 export const saveCompletion = (plumberCompleted) =>{
	const fetchOptions = {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(plumberCompleted),
	  };
	
	  return fetch(`${API}/completions`, fetchOptions)
		.then((response) => response.json())
		.then(() => {
		  document.dispatchEvent(new CustomEvent("stateChanged"));
		});
 } 

  export const getCompletions = () => {
	return applicationState.completions.map((singleCompletion) => ({...singleCompletion}));
  }