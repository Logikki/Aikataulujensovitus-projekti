const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    let token = ''
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
    }
    request.token = token
    next()
}
  
module.exports = { tokenExtractor }