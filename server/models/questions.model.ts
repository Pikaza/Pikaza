import { Model, Optional, DataTypes,} from 'sequelize';
import { db } from '../db.js';

interface QuestionsAttributes {
  _id: number;
  question_body: string;
  frequency: string;
  company: string;
  role: string;
  tags: string;
}
console.log('im in question');

const Questions = sequelize.define('questions', {
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

export default Questions;
