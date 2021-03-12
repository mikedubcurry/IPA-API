const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sandbox.oyhve.mongodb.net/${process.env.MONGO_CLUSTER_URL}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err) => {
    if (err) {
        console.log("error connecting to database: ", err);
        return;
    }
    const collection = client.db("IPA-DB").collection("ipas");
    const cursor = collection.find({});
    cursor.toArray().then(doc => {
        console.log(doc);
        client.close();
    })
});
