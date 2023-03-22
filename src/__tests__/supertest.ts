
// import { response } from 'express';
// import request from 'supertest';
// import db from '../server/server';

// const FEserver = 'http://localhost:5173';
// const BEserver = 'http://localhost:8080';

// describe('Route integration', () => {

//   describe('/', () => {
//     describe('GET', () => {
//       it('responds with 200 status and text/html content type', () => request(FEserver)
//         .get('/')
//         .expect('Content-Type', /text\/html/)
//         .expect(200));
//     });
//   });

//   describe('/', () => {
//     describe('GET', () => {
//       it('responds with 200 status and application/json content type', () => request(BEserver)
//         .get('/')
//         .expect('Content-Type', /json/)
//         .expect(200));
//     });

//     it('returns all questions', () => request(BEserver)
//       .get('/')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .expect(JSON.stringify(marketList)));


//     describe('PUT', () => {
//       it('responds with 200 status and application/json content type', () => request(server)
//         .put('/markets')
//         .send(marketList)
//         .expect('Content-Type', /json/)
//         .expect(200));
//     });


//     it('responds with the updated market list', () => request(server)
//       .put('/markets')
//       .send(marketList)
//       .expect(JSON.stringify(marketList)));


//     it('responds to invalid request with 400 status and error message in body', () => request(server)
//       .put('/markets')
//       .send([{ bad: 'data' }])
//       .expect(400)
//       .expect({ error: {} }));
//   });
// });
