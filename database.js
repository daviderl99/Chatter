// const mongoose = require("mongoose");
// require("dotenv").config()

// const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.szs3x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// mongoose.connect(DB_URL, {
//   useNewUrlParser: true, 
//   useUnifiedTopology: true
// });

// const Message = mongoose.model(
// 	'Message', 
// 	{
// 		username: String,
//     message: String,
//     created: {
//       type: Date, 
//       default: Date.now
//     }
// 	}
// );

// module.exports = {
//   getAllMessages
// }