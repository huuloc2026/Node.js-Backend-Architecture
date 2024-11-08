'use strict'
const jwt = require('jsonwebtoken');
const createTokenPair = async (payload,publicKey,privateKey) => {
    try {
        const accessToken = await jwt.sign(payload,publicKey,{
            expiresIn: '2 days',
        })
        const refreshToken = await jwt.sign(payload,privateKey,{
            expiresIn: '7 days',
        })

        //JWT Verify

        jwt.verify(accessToken,publicKey, (err,decode)=>{
            if(err){
                console.log(`error verify:: ${err}`)
            } else {
                console.log(`decode:: ${decode}`)
            }
        })

        return { accessToken,refreshToken}
    } catch (error) {
        console.log("access_auth-util.js",error)
    }

}

module.exports = {createTokenPair}