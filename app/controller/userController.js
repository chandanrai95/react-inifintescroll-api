import { _get_Users } from '../service/UserService'

export const getUsers = (req, res, next) => {
    const app = req.app
    const payload = req.query;

    _get_Users(app,payload)
    .then( response => {
        res.send({success: true,result: response})
    })
    .catch( err => {
        res.send({ success: false, error: err})
    })
}