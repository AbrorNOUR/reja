const http = require("http");
const app = require("./app");
const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://Nour:wgc5kKOs958n0VXB@cluster0.cqhoihe.mongodb.net/Reja";


mongodb.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, 
(err, client) => {
    if(err) console.log("ERROR onn connection MongoDB");
    else {
        console.log("MongoDB connection succeed")
        // console.log(client);
        const server = http.createServer(app);
        let PORT = 3000;        
        server.listen(PORT, function (){
            console.log(
        `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
    );
});


    }   
});
