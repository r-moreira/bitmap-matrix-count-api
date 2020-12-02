require('../srcs/utils/random-inputs')();
const { countMatrixNbrs } = require('../srcs/app');

describe('Testing API Inputs', () => {
	it('should be a vector with random values', () => {
		const len = 16;
		const vector = creatingRandomVector(len);
		let isValid = 1;
		vector.forEach((n) => {
			if (isNaN(n) || n < 0 || n > 15)
				is_valid = 0;
		})
		if (vector.length != len)
			is_valid = 0;
		expect(isValid).toBe(1);
	});
	it('should be a matrix with random values', () => {
		const m = 7;
		const n = 6;
		const matrix = creatingRandomMatrix(m, n);
		let isValid = 1;
		let len = 0;
		matrix
		.forEach(row => row
		.forEach((n) => {
			if (isNaN(n) || n < 0 || n > 15)
				isValid = 0;
			len++;
		}));
		if (m * n != len)
			isValid = 0;
		expect(isValid).toBe(1);
	});
});
describe('Testing the algorithm', () => {
	it('should be a map with correct values ', () => {
		const vector = [0, 4, 6, 7, 12];
		const matrix = [[0, 6, 12, 4], [0, 0, 4, 12], [12, 2, 12, 12]];
		let isValid = 1;
		let map = new Map();
		map = countMatrixNbrs(matrix, vector);
		if (map.get(0) != 3 && map.get(4) != 2 && map.get(6) != 1 &&
			map.get(7) != 0 && map.get(12) != 4) {
			isValid == 0;
		}
		expect(isValid).toBe(1);
	});
});
