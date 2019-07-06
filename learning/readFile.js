const Promise = require('./myPromise')
const fs = require('fs')
const path = require('path')

console.log(Promise)

const read = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}
read('./proxy.js').then(data => {
    console.log(data)
})



