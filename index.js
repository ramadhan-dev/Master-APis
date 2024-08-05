const app = require("./app.js");


app.get("/", (req, res) => {
    res.send("This is  Api")
})

app.listen(5000, () =>
    console.log("Server running")
);