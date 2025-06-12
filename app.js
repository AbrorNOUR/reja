// TEST CODE

// Starting point
console.log("web serverni boshlash");
const express = require("express");
const app = express();
const fs = require("fs");


// MongoDB chaqirish
const db = require("./server").db();
const mongodb = require("mongodb");




// let user;
// fs.readFile("database/user.json", "utf8", (err, data) => {
//     if(err) {
//         console.log("ERROR:", err);
//     } else {
//         user = JSON.parse(data)
//     }
// });

// 1: Kirish code   backend serverni qurdik Node.jsda express frame workdan foydalanib web serverni qurdik
app.use(express.static("public"));            
app.use(express.json());                 // JSON uchun
app.use(express.urlencoded({extended: true}));  // formalar uchun

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
    console.log("user entered /create-item");
    // console.log(req.body);
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
        // console.log(data.ops);
        res.json(data.ops[0]);
    });

    // res.end("success");
    // res.json({test: "success" })
});


app.get('/develop', (req, res) => {
    res.render("develop", { user: user });
});

 // delete oper
app.post("/delete-item", (req, res) => {
    const id = req.body.id;   
    db.collection("plans").deleteOne({_id: new mongodb.ObjectId(id)}, function(err, data) {
        res.json({state: "success" });
    })
});

// API edit oper
app.post("/edit-item", (req, res) => {
    const data = req.body;
    console.log(data);
    db.collection("plans").findOneAndUpdate
    res.end("Done");
})


app.get("/", function (req, res) {
    console.log("user entered /");
    db.collection("plans")
    .find()
    .toArray((err, data) => {
        if(err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            // console.log(data);
            res.render("reja", {items: data });
        }
    });
});

module.exports = app;


