# Aplicació node

## Executar ordres arbitràries dins d'un contenidor.

Com s'explica a l'arrel del projecte, l'aplicació node s'encarrega d'enviar nombres aleatoris cada segon per un ws al port 8080

Cada cop que l'aplicació s'inicia també fa servir sequelize per guardar una marca a la BBDD (així també mostrem com treballar)

Per afegir una dependència la forma típica de fer-ho és:
```bash
npm install --save sequelize 
```

Ara bé, això serviria per afegir sequelize al `package.json` SEMPRE I QUAN a la màquina real tinguem npm i node. 

Però si no tenim npm a la màquina real (o tenim una arquitectura diferent) tenim l'opció de fer-ho DINS del contenidor, utilitzant el fet que cadascun dels serveis del docker compose es poden aixecar/vincular per separat i que sobre qualsevol contenidor podem executar una ordre amb el paràmetre `exec`.
És a dir volem executar l'ordre dins del contenidor i com que el contenidor (configurat amb el dockerfle) ja té els volums ben montats, i ja ho tenim en marxa, podem fer, des d'un altre terminal: 
```bash
docker compose exec node npm install --save sequelize
```
Aquesta ordre li diu a docker que es connecti al contenidor de nom "node" (aixeca't amb docker compose) i a dins hi executi l'ordre `npm install --save sequelize`

Si tinguessim els contenidors aturats, també ho podriem fer amb:
```bash
docker compose run --rm node npm install --save sequelize
```
En aquest cas, del docker compose aixequem només el contenidor "node", executem l'ordre i en finalitzar esborrarà el contenidor (`--rm`)