'use strict'

const { findbyID } = require("../services/apiKey.service");

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization' 
}

const apiKey = async (req,res,next) =>{
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key && !objKey){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        // check object 
        const objKey = await findbyID(key)
        req.objKey = objKey
        return next()
    } catch (error) {
        console.error('Error in apiKey middleware:', error);
        
    }
}
const checkPermission = (permission) =>{ 
    return (req,res,next) => {
        if (!req.objKey || !req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission Denied: No permissions found.'
            });
        }
        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({
                message: `Permission Denied: Missing ${permission} permission.`
            });
        }
        return next()
    }

  
}
module.exports = {
    apiKey,
    checkPermission
}