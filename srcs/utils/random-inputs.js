module.exports = function() {

	/*
	** This function creates a random matrix with numbers from 0 to 16.
	** The size is defined in the function's call.
	*/
	this.creatingRandomMatrix = function(m, n) {
		let mat = [...Array(m)].map(x => Array(n).fill(0));
		return mat.map(row => row.map(col => Math.floor(Math.random() * 16)));
	};

	/*
	** This function creates a random vector with numbers from 0 to 16.
	** The size is defined in the function's call.
	*/
	this.creatingRandomVector = function(n) {
		let vet = Array(n).fill(0);
 		return vet.map(values => Math.floor(Math.random() * 16));
	};
}
