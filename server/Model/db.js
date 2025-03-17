const mongoose = require('mongoose');
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB_URL, options)
  .then(() => {
    console.log("MongoDB Connected Successfully!!");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

module.exports = mongoose;