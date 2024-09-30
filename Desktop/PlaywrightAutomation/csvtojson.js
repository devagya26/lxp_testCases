const csvtojson = require('csvtojson')
const fs = require('fs')

const csvFile = '/Users/apple/Desktop/PlaywrightAutomation/lxpTestCases/TC-1';

csvtojson()
.fromFile(csvFile)
.then((json) => {
    console.log(json)

    fs.writeFileSync("testCase.json",JSON.stringify(json),'utf-8',(err) => {
        if(err) console.log(err)
    })
})




