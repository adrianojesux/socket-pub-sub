const socket = require("./pubsub");

const futebolSub = socket.subscribe("futebol", (message) => {
  console.log("Channel => futebol ::", message);
});

socket.subscribe("basquete", (message) => {
  console.log("Channel => basquete ::", message);
});

socket.publish("futebol", "Neymar Junior");

// futebolSub.unsubscribe();

socket.publish("futebol", "Di Bala");

// socket.unsubscribe();
socket.publish("basquete", "Lebron James");

socket.broadcast("Cristiano Ronaldo");
