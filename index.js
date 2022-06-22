const express = require("express");

const app = express();
const port = 5000;


app.get("/", (req, res) => {
    res.send("hello world");
})

function send(res) {
    res.write("data:" + "message from clint \n\n")
}

app.get("/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",

        // enabling CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    });

    setInterval((res) => send(res), 3000, res);
})

app.listen(port, () => {
    console.log(`port is running ${port}`);
});

