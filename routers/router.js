const express = require("express")
const router = express.Router();
const fs = require('fs');
const util = require('util');
const path = require("path")
const uniqid = require("uniqid")

const dataBasePath = path.resolve(__dirname, '../db/db.json')


const datajson = fs.readFileSync(dataBasePath, "utf-8")
const data = JSON.parse(datajson)
const readFromFile = util.promisify(fs.readFile);

router.get("/", (req,res) => {
    readFromFile(dataBasePath).then((data) => res.json(JSON.parse(data)));
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
        let newJson = JSON.stringify(data)
        fs.writeFile(dataBasePath, newJson, (err) => {
            if (err) {
                console.log(err)
                const response = {error: "Error Occured"}
                return res.json(response);
            } 
            const response = {
                status: "Complete",
                body: newNote,
            };
            return res.json(response);
        })

    } else {
      return res.json("Error in making a note. (Fill in the notes title and add note text)");
    }
});

module.exports = router;