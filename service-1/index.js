const express = require("express")
const app = express()
const amqp = require("amqplib")
const bodyParser = require('body-parser');
var channel, connection


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();
async function connect() {
    try{
    const amqpServer = "amqp://rabbitmq:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");
    } catch(err) {
        console.log(err);
    }
}


app.get("/send", async (req, res) => {


    const { name , email } = req.body;


    const fakedata = {
        name,
        email
    };

    await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(fakedata)))
    return res.send("done");
})


app.listen(5001, () => {
    console.log(`Service-1 is running at 5001`)
})