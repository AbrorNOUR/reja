console.log("web serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");

// 1: Kirish code   backend serverni qurdik Node.jsda express frame workdan foydalanib web serverni qurdik
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  

// 2: Session


// 3: Views code  backend server ichida  frontend ni qurish 2 xil usuli bor  BSSR
app.set("views", "views");
app.set("view engine", "ejs"); // 1: usul tradational usul htmlni qurib olib browserga jonatamz  2: usul single app react


// 4: Routing code
app.get("/hello", function (req, res) {
    res.end(`<h1 style="background: yellow">HELLO WORLD</h1>`);
});
app.get("/gift", function (req, res) {
    res.end(`<h1>Siz sovgalar bolimidasiz</h1>`);
});


const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function (){
    console.log(`The server is running successfully on port: ${PORT}`);
});