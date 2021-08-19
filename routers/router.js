const router = require("express").Router();
const fs = require('fs');
const util = require('util');
const path = require("path")
const db = require("../db/db.json")
const uniqid = require("uniqid")
const datajson = fs.readFileSync("./db/db.json", "utf-8")
const data = JSON.parse(datajson)
const readFromFile = util.promisify(fs.readFile);
console.log(data)

router.get("/", (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})
router.post("/", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title, 
            text,
            id: uniqid(),
        }
        data.push(newNote)
        newJson = JSON.stringify(data)
        console.log(newJson)
        fs.writeFileSync('./db/db.json', newJson, "utf-8")
        const response = {
            status: "Complete",
            body: newNote,
        };
        res.json(response)
    } else {
      res.json("Error in making a note. (Fill in the notes title and add note text)")   
    }
});

module.exports = router;