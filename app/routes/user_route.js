
const path = require("path");
export const handlerFolderPath = path.join(__dirname, '../controller/userController')

export const routes = [
    {
        method: 'get',
        endpoint: '/getUsers',
        handler: 'getUsers',
    }
]