const crypto = require('crypto')
function makeEmail() {
    
    var strValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 6; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@huuloc.com";
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail 
    return strEmail;
}
function randomString(length,type='') {
    let result = `${type}`;
    const characters = '#$%^^%$$%^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const generateRandomUser = (numberUser) => {
    const users = []
    let i = 0;
    while (i<numberUser){
        users.push({
            "name": randomString(10,"USERNAME:++"),
            "email": makeEmail(),
            "password": randomString(10,"@@@++"),
            "test": crypto.randomBytes(10).toString('hex'),
            
        })
        i++
    }
    return JSON.stringify(users, null, 2)
};
// console.log(generateRandomUser(5));
console.log(randomString(100))

