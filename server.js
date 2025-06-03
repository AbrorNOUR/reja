// TEST CODE

// Starting point
console.log("web serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if(err) {
        console.log("ERROR:", err);
    } else {
        user = JSON.parse(data)
    }
});

// 1: Kirish code   backend serverni qurdik Node.jsda express frame workdan foydalanib web serverni qurdik
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  

// 2: Session


// 3: Views code  backend server ichida  frontend ni qurish 2 xil usuli bor  BSSR
app.set("views", "views");
app.set("view engine", "ejs"); // 1: usul tradational usul htmlni qurib olib browserga jonatamz  2: usul single app react


// 4: Routing code
// app.get("/hello", function (req, res) {
//     res.end(`<h1 style="background: yellow">HELLO WORLD</h1>`);
// });
// app.get("/gift", function (req, res) {
//     res.end(`<h1>Siz sovgalar bolimidasiz</h1>`);
// });

app.post("/create-item", (req, res) => {
    console.log(req.body);
    res.json({test: "success" })
})

app.get('/develop', (req, res) => {
    res.render("develop", { user: user });
});


app.get("/", function (req, res) {
    res.render("harid");
});


const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function (){
    console.log(`The server is running successfully on port: ${PORT}`);
});


