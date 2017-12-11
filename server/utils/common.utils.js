const 
    bcrypt = require('bcrypt'),
    saltRounds = 10, 
    { createReadStream } = require('fs');

class CommonUtils {

    constructor(){}

    generateHash(password) {
        console.log(`password about to encrypt: ${password}`);
        return new Promise((resolve, reject)=>{
            let genHashCb = (err, hash)=>{
                if(err)
                    reject(err)
                
                if(!err && hash)
                    resolve(hash)

            };
            
            bcrypt.hash(password, saltRounds, genHashCb)
        })
    }
    bcryptCompare(provided, stored){
        return bcrypt.compare(provided, stored)
    }
}

module.exports = new CommonUtils();