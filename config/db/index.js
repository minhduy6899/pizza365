const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://minhduy1:minhduy1@pizza365.z50nln2.mongodb.net/?retryWrites=true&w=majority&appName=pizza365",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connect successfully!!!!");
  } catch (error) {
    console.log("connect failed!!!!");
  }
}

module.exports = { connect };
