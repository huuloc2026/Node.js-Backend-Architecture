
const AccessService = require('../services/access.service')
class AccessController {
    signUp = async (req,res,next) => {
        try {
            console.log(`[P]:::SignUp::`,req.body)
            const result = await AccessService.signUp(req.body)
            return res
            .status(201)
            .json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController()