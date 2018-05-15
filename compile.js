const fs = require('fs')

let text = ''

const entity = fs.readFileSync('./classes/entity.js')
const renderer = fs.readFileSync('./classes/renderer.js')

text += entity + '\n' + renderer

fs.writeFileSync('build.js', text)