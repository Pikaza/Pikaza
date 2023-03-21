/**
 * ************************************
 * @module  db
 * @description Database file that will connect to the localhost postgreSQL
 * ************************************
//  */
import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
// import { test } from './test.js';
// import Questions from './models/questions.model.js';

const PG_URI: string =
  'postgres://ksfjiqbz:Gg4_sm2S12I1MS0FCB3QW-ESIPFAQzoB@ruby.db.elephantsql.com/ksfjiqbz';

const sequelize = new Sequelize(PG_URI, { logging: false });

sequelize.sync({}).then(() => {
  console.log('All models were synchronized successfully.');
});

const db: any = {
  sequelize,
  // Questions,
};

interface QuestionsAttributes {
  _id: number;
  question_body: string;
  frequency: string;
  company: string;
  role: string;
  tags: string;
}

const questions = db.sequelize.define('questions', {
  // Model attributes are defined here
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  question_body: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  frequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue:1
  },
  company: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: false,
  },
  role: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: false,
  },
});

db.questions = questions;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('error from db.js: ', err);
    console.log('i did not connect');
  });

export { db };
