# Welcome to SmartPergola

Projet réalisé par **Corentin BALLOT**, **Xavier DEBUF**, **Hanane HABIRECHE** dans le cadre du cours d'IoT.

## Configuration

- Changer le port serie `/dev/ttyXXXX` par le chemin du port utilisé par l'arduino dans le fichier `base.js`

```
var mySerialPort = new serialport("/dev/ttyXXXX", {
   baudRate: 9600,
   dataBits: 8,
   parity: 'none',
   'stopBits: 1,
   flowControl: false,
});
```
## Lancement

- Construire le container `docker build -t debuf/smartpergolas .`
- Lancer le container `docker run -t -i --privileged --device=/dev/chemin/vers/le/port -p 3004:3004 debuf/smartpergolas`
- Acceder à http://localhost:3004
