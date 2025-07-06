// TEST CODE

// Starting point
console.log("web serverni boshlash");
const express = require("express");
const app = express();
const fs = require("fs");
const bcrypt = require('bcrypt');
const session = require('express-session');


// MongoDB chaqirish
const db = require("./server");
const mongodb = require("mongodb");




// 1: Kirish code   /////backend serverni qurdik Node.jsda express frame workdan foydalanib web serverni qurdik
app.use(express.static("public"));            
app.use(express.json());              
app.use(express.urlencoded({extended: true})); 



// 2: Session
app.use(session({
    secret: 'Nour@0432', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } 
  }));



// 3: Views code 
app.set("views", "views");
app.set("view engine", "ejs"); 


// 4: Routing code

// Register
app.get('/register', (req, res) => {
    res.render('register');
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// User register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, password: hashed });
  res.redirect('/login');
});

// User logIn
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user._id, username: user.username };
      res.redirect('/');
    } else {
      res.send('Login or password is wrong');
  }
});

// Home page
app.get('/', requireLogin, function(req, res){
    db.collection('plans')
        .find({userId: req.session.user.id})
        .toArray((err, data) => {
            if(err){
                console.log(err);
                res.end("something wnet wrong");
            } else {
                res.render('reja', {items: data, session: req.session});
            }
    });
});

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}



// create
app.post("/create-item", requireLogin, (req, res) => {
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


// CheckBox
app.post('/checkbox-item', requireLogin, (req, res) => {
    const id = req.body.id;
    const completed = req.body.completed;
    db.collection('plans').updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: { completed: completed } },
      (err) => {
        if (err) return res.status(500).json({ error: "Update failed" });
        res.json({ success: true });
      }
    );
  });


/// develop
// app.get('/develop', (req, res) => {
//     res.render("develop", { user: user });
// });

 // delete oper
app.post("/delete-item", requireLogin, (req, res) => {
    const id = req.body.id;   
    db.collection("plans").deleteOne({_id: new mongodb.ObjectId(id)}, function(err, data) {
        res.json({state: "success" });
    })
});

// API edit oper
app.post("/edit-item", requireLogin,(req, res) => {
    const data = req.body;
    console.log(req.body);

    console.log(data);
    db.collection("plans").findOneAndUpdate(
        {_id: new mongodb.ObjectId(data.id)}, 
        { $set: { reja: data.new_input } },
        function (err, data) {
            res.json({ state: "success" });
        }
    );
});

// delete all
app.post("/delete-all", requireLogin, (req, res) => {
    if(req.body.delete_all) {
        db.collection("plans").deleteMany(function() {
            res.json({state: "hamma rejalar ochirildi"});
        });
    }
});


// app.get("/", function requireLogin (req, res) {
//     console.log("user entered /");
//     db.collection("plans")
//     .find()
//     .toArray((err, data) => {
//         if(err) {
//             console.log(err);
//             res.end("something went wrong");
//         } else {
//             // console.log(data);
//             res.render("reja", {items: data });
//         }
//     });
// });

module.exports = app;

