import { Get_Users } from '../repository/UserRepository';

export const _get_Users = (app, payload) => {
    let transaction;
    return new Promise((resolve, reject) => {

        
        let result;

        app.sequelizeClient
        .transaction()
        .then((_transaction) => {
            transaction = _transaction
            return Get_Users(payload, _transaction);
        })
        .then((value) => {
            console.log(value)
            result= value;
            return value;
        })
        .then(() => transaction.commit())
        .then(() => resolve(result))
        .catch( err => {
            console.log(err)
            let promises = []
            promises.push(transaction.rollback())
            Promise.all(promises)
            .then(() => reject(err))
            .catch(reject)
        })

    })
}