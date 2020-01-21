import sequelize from 'sequelize';
import { schema } from '../../configServer';
import { addInstance } from '../helper/ModelInstanceHandler'

const userSchema  = {
    firstname : {
        type: sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type:sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    }
}

export default function(app){
    const instance = app.sequelizeClient.define(schema.USERS, userSchema);
    addInstance(schema.USERS, instance)
}