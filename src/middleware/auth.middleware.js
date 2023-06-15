const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')

const secretKey = 'placeholder'

function genToken(userId) {
    const payload = { sub: userId }
    return jwt.sign(payload, secretKey, { expiresIn: '24h' })
}

async function checkAuth(req, res, next){
    const authHeader = req.get('Authorization') || ''
    const authHeaderParts = authHeader.split(' ')
    const token = authHeaderParts[0] == 'Bearer' ? authHeaderParts[1] : null

    try {
        if (token) {
            const payload = jwt.verify(token, secretKey)
            req.user = payload.sub
            const user = await User.findByPk(payload.sub)
            req.userRole = user.role
            if (user) {
                req.validAuthToken = true
            } else {
                req.validAuthToken = false
            }
        } else {
            req.user = null
            req.userRole = null
            req.validAuthToken = false
        }
        next()
    } catch (err) {
        req.validAuthToken = true
        res.status(401).json({ error: "Invalid authentication token.", msg: err.message })
    }
}

const invalidRoleMessage = { error: "Unauthorized to access this resource" }

exports.genToken = genToken
exports.checkAuth = checkAuth
exports.invalidRoleMessage = invalidRoleMessage
