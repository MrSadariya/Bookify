const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect("mongodb://localhost:27017/", options)
  .then(() => {
    console.log("MongoDB Connected Successfully!!");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

module.exports = mongoose;