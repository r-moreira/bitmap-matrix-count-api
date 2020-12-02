require('./utils/random-inputs')();

/*
** Input Handling Function
** - Values less than '0' and greater than '15' are removed..
** - The vector is ordered in ascending order to form a coherent string in the future..
** - Repeated values are automatically removed by the 'set' object, avoiding
** count the same number more than once in the bitmap arrayp.
*/
function creatingSetObject(vector) {
	let setNbrs = vector.filter(value => value >= 0 && value <= 15)
	setNbrs.sort((a, b) => a - b);
	return new Set(setNbrs);
}

/*
** This function counts the number of times each number appears in the matrix
** - Register as value in the 'map' object created earlier.
** - The 'map' object is used to store primitive numbers as a key, facilitating the process.
*/
function countMatrixNbrs(matrix, nbrs) {
	let countMap = new Map();
	let nCount;
	for (const n of nbrs) {
		nCount = 0;
		matrix
			.forEach(row => row
			.forEach(value => value === n ? nCount++ : nCount));
		countMap.set(n, nCount);
	}
	return countMap;
}

/*
** This function returns a formatted string using the values found in the map object.
*/
function makeString(countMap) {
	let str = '';
	for (const [key, value] of countMap.entries()) {
		str += `The number '${key}' was found ${value} time(s)\n`;
	}
	return (str);
}

/*
** Main API function:
** - Trata o input do servidor e cria um objeto set.
** - Conta cada 'An' do vetor que está presente na matriz gerada e guarda as informações no objeto 'map'.
** - Cria uma string JSON com os valores obtidos através do objeto map.
** - Retorna a string JSON para o servidor.
*/
function getResult(numbersList, bitmapMatrix) {

/*
** - Checks if a matrix was received from the server.
** -	if so: the matrix's value is stored in a variable,
** -	otherwise: A function is called to create a random matrix.
** - The same steps are done for the vector.
*/
	let matrix;
	if (bitmapMatrix) {
		matrix = Array.from(bitmapMatrix);
	} else {
		matrix = creatingRandomMatrix(8, 6);	//This functions's argument defines the (MxN) size of the random matrix
	}

	let vector;
	if (numbersList) {
		vector = Array.from(numbersList);
	} else {
		vector = creatingRandomVector(36);		//This function's argument defines the (N) size of the random vector
	}

/*
** - Call for auxiliary functions
*/
	const nbrsInSetObj = creatingSetObject(vector);
	const nbrsMapCount = countMatrixNbrs(matrix, nbrsInSetObj);
	const JSONstr = makeString(nbrsMapCount);

/*
** - Receives a string generated as a result of an auxiliary function.
** - Stores the string in an object along with the vector and an array used in algorithm.
*/
	const result = {
		str: JSONstr,
		vector: vector,
		matrix: matrix
	}

/*
** - Returns the object to the server.
*/
	return result;
}

module.exports = { getResult, countMatrixNbrs }
