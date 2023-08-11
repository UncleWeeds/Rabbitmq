const express = require("express")
const app = express()
const amqp = require("amqplib")
var channel, connection

connect();
async function connect() {
    try{
    const amqpServer = "amqp://rabbitmq:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    //await channel.assertQueue("rabbit");

    channel.consume("rabbit", data => {
        console.log(`Received: ${Buffer.from(data.content)}`);
        channel.ack(data);
    })

    } catch(err) {
        console.log(err);
    }
}


app.get("/send", (req, res) => {

})


app.listen(5002, () => {
    console.log(`Service-2 is running at 5002`)
})