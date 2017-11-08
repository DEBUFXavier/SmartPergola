## Welcome to SmartPergola
### Corentin BALLOT Xavier DEBUF Hanane HABIRECHE
Après avoir cloné le projet, 

-changer le port serie /dev/tty??? par le chemin du port utilisé par l'arduino dans base.js
-remplacer 'var mySerialPort = new serialport("/dev/ttyACM0", {
   baudRate: 9600,
   dataBits: 8,
   parity: 'none',
   'stopBits: 1,
   flowControl: false,
});'

-par 'var mySerialPort = new serialport("/dev/chemin/vers/le/port", {'

-Puis executer les commandes suivantes:

--construire le container:
'docker build -t debuf/smartpergolas .'

--lancer le container en remplacant
'docker run -t -i --privileged --device=/dev/chemin/vers/le/port -p 3004:3004 debuf/smartpergolas'
