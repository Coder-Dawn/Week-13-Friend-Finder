// Routes
// ===========================================================

app.get('/', function(req, res){
	res.send("FriendFinder")
})

app.get('/data1', function(req, res){
	res.json(data1);
});

app.get('/data2', function(req, res){
	res.json(data2);
})