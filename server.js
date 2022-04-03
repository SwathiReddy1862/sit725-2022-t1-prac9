var express = require("express");
var app = express()
var port = process.env.port || 3000;
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
let projectCollection;


app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use(cors());

const uri = "mongodb+srv://admin:0AaXpfFB4ZmEFair@sit725prac.jlfk6.mongodb.net/SIT725_2022_t1?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });

const createCollection = (collectionName) => {
    client.connect((err, db) => {
        projectCollection = client.db().collection(collectionName);
        if (!err) {
            console.log("Successfully created or acquired collection.");
        } else {
            console.error("Database error: " + err);
            process.exit(1);
        }
    });
};

const insertProject = (project, callback) => {
    projectCollection.insert(project, callback);
};

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
};


const cardList = [
    {
        title: "Kuala 2",
        image: "images/kuala2.jpg",
        link: "About Kuala 2",
        description: "Demo description about kuala 2"
    },
    {
        title: "Kuala 3",
        image: "images/kuala3.jpg",
        link: "About Kuala 3",
        description: "Demo description about kitten 3"
    }
]

app.get('/api/projects',(req,res) => {
    // res.json({statusCode: 200, data: cardList, message:"Success"})
    getProjects((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err });
        } else {
            res.json({ statusCode: 200, message: "Success", data: result });
        }
    });
})

app.post('/api/projects', (req,res) => {
    let project = req.body;
    insertProject(project, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err });
        } else {
            res.json({ statusCode: 200, message: "Successfully added new project", data: result });
        }
    });
});

app.listen(port  , ()=>{
    console.log(" app listening to: "+port)
    createCollection(" pets ")
})
