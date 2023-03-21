/**
 * ************************************
 * @module  db
 * @description Database file that will connect to the localhost postgreSQL
 * ************************************
//  */
import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const PG_URI: any = process.env.PG_URI;

const sequelize = new Sequelize(PG_URI, { logging: false });

const db = {
  Sequelize,
  sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.questions = require ('./models/questions.model')(sequelize, DataTypes )
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('error from db.js: ', err);
    console.log('i did not connect');
  });

export default db;
