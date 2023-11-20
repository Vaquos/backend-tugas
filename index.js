const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

var obj;
fs.readFile('./soal.json', 'utf8', function (err, data) {
    if (err) throw err
    obj = JSON.parse(data)
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

app.get('/', function(req,res) {
    res.send({result: obj.length, status:200})
})

app.post('/result', function(req,res){
    const data = req.body
    let count = 0
    let benar = 0
    let salah = 0
    for(const [key, value] of Object.entries(data)){
        const question = obj.filter(result => result.no == key)
        if(value == question[0].answer){
            benar++
            count++
        } else {
            salah++
        }
    }
    const nilai = count/obj.length * 100;
    res.send({benar, salah, nilai, status:200})
})

app.get('/:no', function(req,res) {
    const { no } = req.params
    const data = []
    const question = obj.filter(result => result.no == no)
    question.forEach(element => {
        data.push({
            no: element.no, 
            soal: element.soal,
            option: element.option
        })
    });
    res.send(data).status(200)
})

app.listen(3001)