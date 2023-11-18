const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

var obj;
fs.readFile('./soal.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
});

app.post('/', function (req, res) {
    const { no, answer } = req.body
    const ans = obj.filter(res => res.no == no)
    console.log(ans)
    if(answer == ans[0].answer) {
        res.send({status: 200, message: "benar"})
    } else {
        res.send({status: 400, message: "salah"})
    }
})

app.get('/:no', function(req,res) {
    const { no } = req.params;
    const data = [];
    const question = obj.filter(result => result.no == no)
    question.forEach(element => {
        data.push({no: element.no, soal: element.soal})
    });
    res.send(data).status(200);
})

app.listen(3001)