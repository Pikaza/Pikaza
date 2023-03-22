
import app from '../../server/server.js';
import request from 'supertest';
import { db } from '../../server/db.js';
import {describe, expect, test} from '@jest/globals';

const sequelize = db;

describe('Test Sequelize Database', () => {

  it('autenticates database', async () => {
    const { PG_URI } = process.env;
    expect(typeof PG_URI).toBe('string');
  })

  it('should create a new interview', async () => {
    const response = await request(app)
      .post('/')
      .send({
        question_body: "Do you like testing?",
        most_recent: '2023-03-22',
        company: ["Microsoft"],
        role: ["Senior"],
        tags: ["recursion"]
      });
    
    expect(response.status).toBe(201);
    expect(response.body.question_body).toBe('Do you like testing?');
    expect(response.body.company).toBe('Microsoft');
    expect(response.body.role).toBe('Senior');
    expect(response.body.tags).toBe('recursion');
    expect(response.body.most_recent).toBe('2023-03-22');
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
