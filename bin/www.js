require.main.require('../global');

var app = require(global.modulePath('app')); //Require our app
var models = require(global.modulePath('', 'model:structured'));

app.set('port', process.env.PORT || 8000);

models.sequelize.sync().then(function () {
    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });

    var io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
        console.log('io connected');

        socket.join("r1");
        socket.join("r2");
        socket.join("r3");
        socket.join("r4");
        socket.join("r5");


        //console.log(io.sockets.adapter.rooms);
        //console.log(socket.adapter.rooms);

        socket.on('get:contacts', function(){
            models.UserInfo.findOne({
                attributes: ["account_id", "first_name", "last_name"],
                raw: true
            }).then(function(userInfo){
                socket.emit('get:contacts', userInfo);
            });
        });

        // broadcast a user's message to other users
        socket.on('send:message', function (data) {
            socket.broadcast.to(data.room).emit('send:message', data);
        });

        socket.on('send:image', function (data) {
            socket.broadcast.to(data.room).emit('send:image', data);
        });

        socket.on('send:file', function (data) {
            socket.broadcast.to(data.room).emit('send:file', data);
        });

        socket.on('read:message', function(data){
            socket.broadcast.emit('read:message', data);
        });
    });
});

//var server = app.listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + server.address().port);
//});
