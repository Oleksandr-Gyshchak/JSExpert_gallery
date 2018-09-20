const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')

const users = require('./db.json').user;
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
    let user = users.find(item => (item.login === req.body.login) && (item.password === req.body.password));
    if (user) {
        res.jsonp({
            status: true
        })
    } else {
        res.sendStatus(401);
    }
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})