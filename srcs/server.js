const app = require('./routes');
const port = process.env.PORT || 5050;

/*
** Defines the port to be used
*/
app.listen(port, function() {
	console.log(`Server is running at localhost:${port}`);
});

