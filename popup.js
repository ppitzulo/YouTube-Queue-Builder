console.log(document.getElementById("createQueue"));
// Make sure the DOM is loaded before adding event listeners

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed'); // Ensure DOMContentLoaded event is firing

  const createQueueButton = document.getElementById("createQueue");
  const createQueueWindowButton = document.getElementById("createQueueWindow");

  console.log(createQueueButton); // Log to see if the button is found
  console.log(createQueueWindowButton); // Log to see if the button is found

  if (createQueueButton) {
    createQueueButton.addEventListener("click", () => {
      console.log('CreateQueue button clicked');
      browser.runtime.sendMessage({ action: "createQueue" })
        .then(response => {
          console.log('Message sent successfully', response);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    });
  } else {
    console.error("createQueue button not found");
  }

  if (createQueueWindowButton) {
    createQueueWindowButton.addEventListener("click", () => {
      console.log('CreateQueueWindow button clicked');
      browser.runtime.sendMessage({ action: "createQueueWindow" })
        .then(response => {
          console.log('Message sent successfully', response);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    });
  } else {
    console.error("createQueueWindow button not found");
  }
});

