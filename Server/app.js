const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const app = express();
require("./db/conn");

const port = 8009

// app.get("/", (req, res)=>{
//     res.status(201).json("Server Created")
// })

// app.use(cors({ origin:"*" }));
// app.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept "
//     );
//     next(); 
//   })

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);

app.listen(port,()=>{
    console.log(`Server is running at Port no ${port}`);
})