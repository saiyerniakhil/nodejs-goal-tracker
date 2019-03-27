var express = require('express');
var bodyParser = require("body-parser");
var app = express();


var goal = ['Enter a goal!'];

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addgoal',function(req,res) {
	var newGoal = req.body.newgoal;

	goal.push(newGoal)

	res.redirect("/");
});

var complete = ['Jingle Bells!']

app.post("/removegoal",function(req,res) {
	var completeGoal = req.body.check;
	if (typeof completeGoal === "string") {
		complete.push(completeGoal);

		goal.splice(goal.indexOf(completeGoal),1);
	} else if (typeof completeGoal === "Object") {
		for (var i = 0; i < completeGoal.length;i++) {
			complete.push(completeGoal[i]);
			goal.splice(goal.indexOf(completeGoal[i]),1);
		}
	}
	res.redirect("/");
}); 

app.get('/',function(req,res) {
	res.render('index',{goal:goal,complete:complete});
});

app.listen(3000,function() {
	console.log('App is live and listening on port 3000!');
});

app.set('view engine','ejs');