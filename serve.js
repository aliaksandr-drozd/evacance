const fallback = require('express-history-api-fallback')
const history = require('connect-history-api-fallback')
const express = require('express')
const app = express()

const root = `${__dirname}/dist/`
const port = process.env.PORT || 3000

app.use(history({
  index: '/index.html',
  disableDotRule: true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}))
app.use(express.static(root))
app.use(fallback(root, { root }))

app.listen(port, () => console.log(`FreeSeat app listening on port ${port}`))
