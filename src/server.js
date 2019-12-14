const app = require('./app')

const port = process.env.PORT || 3000
console.log(`listening on port ${port}`)
app.listen(port)