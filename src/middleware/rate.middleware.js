const redis = requre('redis');
const e = require('cors');
const redisClient = require('../services/redisService');

const rateLimitWindowMillis = 60000
const rateLimitRefreshRate = rateLimitMaxRequests / rateLimitWindowMillis

async function rateLimit(req, res, next) {
  let rateLimitMaxRequests
  let key
  if(req.validAuthToken == true){
    rateLimitMaxRequests = 30
    key = 'userId.' + req.user.toString();
  }
  else{
    key = req.ip
    rateLimitMaxRequests = 10
  }
  
  let tokenBucket
  try {
    tokenBucket = await redisClient.hGetAll(req.ip)
  } catch (e) {
    next()
    return
  }

  tokenBucket = {
    tokens: parseFloat(tokenBucket.tokens) || rateLimitMaxRequests,
    last: parseInt(tokenBucket.last) || Date.now()
  }

  const timestamp = Date.now()
  const ellapsedMillis = timestamp - tokenBucket.last
  tokenBucket.tokens += ellapsedMillis * rateLimitRefreshRate
  tokenBucket.tokens = Math.min(tokenBucket.tokens, rateLimitMaxRequests)
  tokenBucket.last = timestamp

  if (tokenBucket.tokens >= 1) {
    tokenBucket.tokens -= 1
    await redisClient.hSet(req.ip, [
      [ "tokens", tokenBucket.tokens ],
      [ "last", tokenBucket.last ]
    ])
    next()
  } else {
    await redisClient.hSet(req.ip, [
      [ "tokens", tokenBucket.tokens ],
      [ "last", tokenBucket.last ]
    ])
    res.status(429).send({
      error: "Too many requests per minute"
    })
  }
}
exports.rateLimit = rateLimit