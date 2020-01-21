import { schema } from '../../configServer';
import { getInstance } from '../helper/ModelInstanceHandler';

let USERS = getInstance(schema.USERS);

export const Get_Users = ( payload, transaction = null ) => {

    if(!USERS) USERS = getInstance(schema.USERS);

    return new Promise ((resolve, reject) => {
        let offset = payload.page * 20;
        let limit = 20;

        let options = {}
        if(transaction)
        {
            options["transaction"] = transaction
        }
        options["offset"] = offset
        options["limit"] = limit

        USERS.findAndCountAll(options)
        .then( result => {
            
            const remain = result.count - (offset+10);
            console.log(remain, offset+ "/" + result.count)
            resolve({remain: remain>0?true:false, arr: result.rows})
        })
        .catch( err => {
            console.log(err)
            reject(err)
        })
    })
    

}