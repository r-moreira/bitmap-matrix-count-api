const request = require("supertest");
const app = require('../srcs/routes');

describe('Testing API routes', () => {
	it('should get the main route', async () => {
		const res = await request(app).get('/')
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('sendNumbersList');
		expect(res.body).toHaveProperty('seeTheResult');
	});
	it('should get the send-list route and create the vector', async () => {
		const res = await request(app).post('/send-list').send([1, 2, -5, 12, 62])
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('status');
		expect(res.body).toHaveProperty('numbersList');
		expect(res.body).toHaveProperty('seeTheResult');
	});
	it('should get the send-list route and return an error', async () => {
		const res = await request(app).post('/send-list').send(["sadasdad", 1, 2, 3, 15, -4])
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error');
	});
	it('should get the send-list route and return an error', async () => {
		const res = await request(app).post('/send-list')
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error');
	});

	it('should get the send-matrix route and create the matrix', async () => {
		const res = await request(app).post('/send-matrix').send([[1, 2, 3], [4, 5, 6], [15, 14, 13]])
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('status');
		expect(res.body).toHaveProperty('matrix');
		expect(res.body).toHaveProperty('seeTheResult');
	});
	it('should get the send-matrix route and return an error', async () => {
		const res = await request(app).post('/send-matrix').send([["sad", "dsa", "tas"], [1, 2, 3], [2, 3, 15]])
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error');
	});
	it('should get the send-matrix route and return an error', async () => {
		const res = await request(app).post('/send-matrix')
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error');

	});

	it('should get the get-result route', async () => {
		const res = await request(app).get('/get-result')
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('result');
	});
});
