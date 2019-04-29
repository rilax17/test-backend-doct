const redis = require('redis')
const client = redis.createClient()

let redisMiddleware

if (process.env.NODE_ENV !== 'test') {
  redisMiddleware = (req, res, next) => {
    let key = "__expIress__" + req.originalUrl || req.url
    client.get(key, function(err, reply) {
      if (err) {
        console.log(err)
      }
      if (reply) {
        res.send(JSON.parse(reply))
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          client.set(key, JSON.stringify(body))
          res.sendResponse(body)
        }
        next()
      }
    })
  }
} else {
  redisMiddleware = (req, res, next) => {
    return next()
  }
}

module.exports = redisMiddleware
