const Express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/sub?retryWrites=true&w=majority")
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 4000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 4000))
});