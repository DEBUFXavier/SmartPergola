//Define requires
//import * as control from ("regulation");
const express = require('express');
const serialport = require('serialport');
const fs = require('fs');
const vm = require('vm');
var http = require('http');
//vm.runInThisContext(fs.readFileSync(__dirname + "/regulation.js"))
//Store Arduino data
var myData = 0;

//Setup and start web server on :3003
const app = express();

/*app.get('/', function (req, res) {
	res.send('Pergolas - Valeur : ' + myData);
});*/

/*app.listen(3003, function () {
	console.log('Example app listening on port 3003!');
});*/

//Setup and start serial port reading
const Readline = serialport.parsers.Readline;
const parser = new Readline();

var mySerialPort = new serialport("/dev/ttyACM0", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});



var datEvents;

mySerialPort.pipe(parser);
parser.on('data', function(input) {
  //var d=new Date();
  //var temps = d.getTime();
          myData = JSON.parse(input);

//console.log(myData.id+" id mesure "+myData.mesure);
//const ev = new control();
this.datEvents= new eventLoad(myData.id,myData.mesure);
//console.log(ev);
});


//app.use(express.static(__dirname + '/'));
/*app.get('/index.html', function (req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});*/
app.get('/', function (req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

app.use(express.static('assets'));


const eventLoad = function(id,data){
//console.log("id="+id);
high=0;
low=0;
switch (id){/*case "light_on": // Lumière non implantée
console.log("nothing");
break;
case "clim_chaud_on": enableConditioningHOT();
console.log("enableConditioningHOT");
break;
case "clim_on": enableConditioningCOLD();
console.log("enableConditioningCOLD");
break;
case "clim_off": case "clim_chaud_off": disableConditioning();
console.log("disableConditioning");
*/
 case "1":
	high=150;
	if(data>=high){
		console.log("il pleut, on ferme la veranda?");
		io.emit('message', 'close_door');
		}
		break;
 case "2": high=80;
	if(data>=high){
	console.log("L'humidité est importante "+data+"doit on aerer ? ");
	io.emit('message', 'open_door');
	}
		break;

 case "3": high=24;
		low=18;
		if(data>=high){
	console.log("il fait "+data+", doit on activer l'air froid? F");
	io.emit('message', 'clim_on');
	 }else if (data<=low) {
	 console.log("il fait "+data+", doit on activer l'air chaud? C");
	 io.emit('message', 'clim_chaud_on');
				}
else{
console.log("il fait "+data+", on eteint la climatisation!");
	io.emit('message', 'clim_off');
}
		break;

 case "4":  high=100;
	low=90;
	if(data<=low){
	console.log("il fait nuit "+data+" doit on allumer les lampes led basse energie (Up)? U");
	io.emit('message', 'light_on');
	}else if (data>=high) {
	console.log("il fait jour "+data+" doit on eteindre les lampes (Down)? D");
	io.emit('message', 'light_off');
			}
	break;

	};

};


/***************************/
/*        WEBSOCKET        */
/***************************/

// Chargement de socket.io
var server = http.createServer(app).listen(3004);
//var server = http.createServer(app);
var io = require('socket.io').listen(server);  //pass a http.Server instance

// Quand un client se connecte, on le note dans la console
io.on('connection', function (socket) {
    console.log('Un client est connecté !');

socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
		socket.on('join',function(data){
			console.log(data);

		});
				
});
