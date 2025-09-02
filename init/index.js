const mongoose = require('mongoose');
const initData = require('./data')
const Listing = require('../models/listing')

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Coonnected too DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:"687b44ca66c26eac5363efb8"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialised");
}

initDB();