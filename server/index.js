const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: false}));
// app.use(function (req, res, next) {
//     res.header("Content-Type",'application/json');
//     next();
// });

app.use("/authentication", require("./routes/jwtAuth"));
app.use("/", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});