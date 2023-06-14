const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')

const secretKey = 'placeholder'

async function checkAuth(req, res, next){
    const authHeader = req.get('Authorization') || ''
    const authHeaderParts = authHeader.split(' ')
    const token = authHeaderParts[0] == 'Bearer' ? authHeaderParts[1] : null

    try {
        const payload = jwt.verify(token, secretKey)
        req.user = payload.sub
        const user = await User.findByPk(payload.sub)
        req.validAuthToken = true
        next();
    } catch(e) {
        req.validAuthToken = false
        next();
    }
}
exports.checkAuth = checkAuth