/**
 * ************************************
 * @module  db
 * @description Database file that will connect to the localhost postgreSQL
 * ************************************
//  */
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// import { test } from './test.js';
// import Questions from './models/questions.model.js';

const banana = 'postgres://ksfjiqbz:Gg4_sm2S12I1MS0FCB3QW-ESIPFAQzoB@ruby.db.elephantsql.com/ksfjiqbz'


const sequelize = new Sequelize(banana, { logging: false });

const db: any = {
  sequelize,
  // Questions,
};

// exported for use on the frontend
export interface QuestionsAttributes {
  _id: number;
  most_recent: string;
  question_body: string;
  frequency: number;
  company: string[];
  role: string[];
  tags: string[];
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
  most_recent: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: false,
  },
  frequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: 1,
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
    validate: {
      isSpecificLength(value: []) {
        if (value.length > 3) {
          throw new Error('industryOfFocus must only have three items');
        }
      },
    },
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: false,
    validate: {
      isSpecificLength(value: []) {
        if (value.length > 5) {
          throw new Error('industryOfFocus must only have three items');
        }
      },
    },
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

sequelize
  .sync({
    /*force: true */
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
  });
export { db };
