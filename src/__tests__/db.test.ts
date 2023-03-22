
import app from '../app';
import request from 'supertest';
import { db } from '../../server/db';
import {describe, expect, test} from '@jest/globals';

const sequelize = db;

describe('Test Sequelize Database', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new interview', async () => {
    const response = await request(app)
      .post('/')
      .send({
        question_body: "Do you like testing?",
        company: ["Microsoft"],
        role: ["Senior"],
        tags: ["recusion"]
      });
    expect(response.status).toBe(200);
    expect(response.body.question_body).toBe('Do you like testing?');
    expect(response.body.company).toBe('Microsoft');
    expect(response.body.role).toBe('Senior');
    expect(response.body.tags).toBe('recursion');
  });

  it('should get all questions', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBeGreaterThan(0); 
    expect(response.body[0]).toHaveProperty('id'); 
    expect(response.body[0]).toHaveProperty('question_body'); 
    expect(response.body[0]).toHaveProperty('frequency'); 
    expect(response.body[0]).toHaveProperty('company');
    expect(response.body[0]).toHaveProperty('role');
    expect(response.body[0]).toHaveProperty('tags');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
  });
});



// import app from '../app'; 
// import request from 'supertest';
// import path from 'path'

// // import questionsController from path.resolve(__dirname, '../server/controllers/questionsController');

// describe('GET /', () => {
//   it('Recieves all interview data from db', async () => {
//     const response = await request(app).get('/');
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true); 
//     expect(response.body.length).toBeGreaterThan(0); 
//     expect(response.body[0]).toHaveProperty('id'); 
//     expect(response.body[0]).toHaveProperty('question_body'); 
//     expect(response.body[0]).toHaveProperty('frequency'); 
//     expect(response.body[0]).toHaveProperty('company');
//     expect(response.body[0]).toHaveProperty('role');
//     expect(response.body[0]).toHaveProperty('tags');
//     expect(response.body[0]).toHaveProperty('createdAt');
//     expect(response.body[0]).toHaveProperty('updatedAt');
//   });
// });
