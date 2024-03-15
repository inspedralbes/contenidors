import dades from './dades.js';

document.addEventListener('DOMContentLoaded', () => {
    // Reference to the status element
    const status = document.getElementById('status');

    // Reference to the label element
    const randomNumberLabel = document.getElementById('randomNumberLabel');

    // Reference to the start button
    const startButton = document.getElementById('startButton');

    // The WebSocket server to connect to
    const ws_server = dades.protocol+'://'+dades.servidor+':'+dades.port;
    // The WebSocket object
    let socket = null;

    // Event listener for the Start button click
    startButton.addEventListener('click', () => {
        status.innerText = 'Connecting...';

        // Create the WebSocket object only if it doesn't already exist
        if (socket == null) {
            socket = new WebSocket(ws_server);
        } else {
            status.innerText = 'Already connected';
        }


        socket.onerror = function (error) {
            console.log('WebSocket Error: ', error);
            status.innerText = 'Error: unable to connect to server: ' + ws_server;
        };


        // Open the WebSocket connection
        socket.addEventListener('open', (event) => {
            status.innerText = 'Connected';
            console.log('WebSocket connection opened:', event);

            // Listen for messages from the server
            socket.addEventListener('message', (event) => {
                // Update the label with the received random number
                randomNumberLabel.textContent = `Random Number: ${event.data}`;
            });
        });



        // Handle the connection being closed
        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
        });
    });
});