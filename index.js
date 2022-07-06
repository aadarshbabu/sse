const express = require("express");

const app = express();
const port = 5000;


app.get("/", (req, res) => {
    res.send("hello world");
})

// function send(res) {
//     res.write("data:" + "message from clint \n\n")
// }

// app.get("/stream", (req, res) => {
//     res.set({
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",

//         // enabling CORS
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers":
//             "Origin, X-Requested-With, Content-Type, Accept",
//     });

//     setInterval((res) => send(res), 3000, res);
// })
app.get("/locker_status", (req, res) => {

    let totalLocker = [];
    let openLocker = [];
    // openLocker.length = 0;
    // totalLocker.length = 0
    let i = 0
    let j = 1;
    while (++i && i <= 304) {
        if (i <= 152) {
            if (i == 5 || i == 7 || i == 9 || i == 3 || i == 33 || i == 43 || i == 20 || i == 30) {
                openLocker.push(`L${i}`)
                continue;
            }
            totalLocker.push(`L${i}`);

        }
        else {
            if (j == 3 || j == 4 || j == 7 || j == 12 || j == 55) {
                openLocker.push(`R${j}`);
                j++;
                continue;
            }
            totalLocker.push(`R${j}`)
            j++;
        }
    }


    res.json({ _data:{locker_status:{ closed_lockers:totalLocker, opened_lockers:openLocker} }});
})



// app.get("/openLocker/:lockerno/:side", (req, res) => {
//     const { lockerno, side } = req.params;
//     if (side === '0') {
//         totalLocker.splice(parseInt(totalLocker.indexOf(`L${lockerno}`)), 1);
//         openLocker.push(`L${lockerno}`);
//     }
//     else if (side === '1') {
//         const data = totalLocker.splice((totalLocker.indexOf(`R${lockerno}`)), 1);
//         console.log(data);
//         openLocker.push(data[0]);
//     }
//     res.json({ totalLocker, openLocker });
// })


app.listen(port, () => {
    console.log(`port is running ${port}`);
});



//  in Client side code.
// this code base is use client side. EventSourse() varify the connection.
// const sse = new EventSource("http://localhost:5000/stream");

// sse.onerror = (e) => {
//     console.log(e); // if error is occure.
// }
// sse.onmessage = (data) => {
//     console.log(data); // if data is present in responce. then the data is communate.
// }
// sse.onopen = (data) => {
//     // when connection is open the return the true otherwise false.
// }
// sse.close() // this is the function close the connectin in client to server.

// sse.CLOSED  // property which is return the bool true or false.
// sse.CONNECTING // property is the conncetion is connection status is 0 , 1 , 2
// sse.OPEN // property return the bool if connection is open the
// sse.url // property when you want the see the urls in EventSource().
// sse.withCredentials // its the true or false. if default value is false. if the true the data server validate the client request.