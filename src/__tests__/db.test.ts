import app from '../app'; 
import request from 'supertest';
import path from 'path'

// import questionsController from path.resolve(__dirname, '../server/controllers/questionsController');

describe('GET /', () => {
  it('Recieves all interview data from db', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
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
