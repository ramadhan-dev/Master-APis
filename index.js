const app = require("./app.js");


app.get("/", (req, res) => {
    res.send("This is Diagnostics Api")
})

app.listen(5000, () =>
    console.log("Server running on port 5000.")
);