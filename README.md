# Contenidors

Exemple de com **conteniritzar** amb **docker** la vostra aplicació.

## Aplicació 

Aquest projecte conté diverses aplicacions per mostrar diverses configuracions i possiblitats

ATENCIÓ: Llegiu detingudament l'apartat Configuracions abans d'aixecar els contenidors (fitxer .env, migrates...)

*Ports i aplicacions*:

 * http://localhost (:80): NGINX servint ./front. És un simple HTML que té un botó "start" que obre un socket cap a 8080 i espera rebre'n números, i també té un botó "fetch a artisan" per obtenir un JSON de :8001/api (laravel amb artisan)
 * http://localhost:8080: Node (costat servidor) que obre en "Listening" un socket per on enviarà números aleatoris quan algú s'hi connecti. Generat per ./node i consumit per HTML stàtic
 * http://localhost:8001: Laravel (servit amb artisan serve)
* http://localhost:8001/api/fruites: Laravel (servit amb artisan serve) que retorna un JSON (sempre el mateix) amb un llistat de fruites.

I aleshores hem configurat també Nginx com a proxy invers, que ens ofereix les següents rutes (que son reenviades als respectius servidors):
 * http://localhost/api/fruites : Laravel 
 * http://localhost/socket : nodejs



# Configuracions
## Compose (aixecar-los tots de cop)

Per aixecar tot l'entorn de desenvolupament:

 1. Copiar el fitxer de Laravel .env.example a .env
 1. Editar-lo pq apunti a on toca, segurament amb les següents dades (tot i que ara mateix la BBDD no es fa servir encara)

```
DB_CONNECTION=mysql
# Gràcies a docker, podem accedir als contenidors pel nom
# que tenen al docker compose, per tant:
DB_HOST=db   #NOM del contenidor que té la BBDD, no cal saber IP's
DB_PORT=3306
DB_DATABASE=persones
DB_USERNAME=user
DB_PASSWORD=user
```
 3. Aixecar tot l'entorn
```
docker compose up
```
 4. Comprovar-ho accedint a l'aplicació
 1. php donarà problemes pq.
    1. No hem fet el migrate
    1. No hem generat la clau d'encriptació
 1. Ho podem solucionar "connectant-nos" al contenidor de Laravel i executant les ordres necessàries.
 1. També podem modificar el docker-compose.yml pq. ho faci cada cop que s'aixeca (mireu-ne els ccomentaris)
 1. Necessitarèm saber els ID dels contenidors. Amb l'ordre "docker ps" ho podrem saber. _No cal posar tot l'ID, només les 3 primeres lletres normalment_ 
 1. L'ordre és "docker exec -it ID_CONTENIDOR /bin/bash 
    1. Això obrirà un terminal DINS dels contenidor de Laravel i allà podrem executar les ordres que necessitem
       1. php artisan migrate
       1. php artisan key:generate
       1. ...
    


El fitxer que configura TOTS els contenidors i com s'han d'aixecar és:
```
docker-compose.yml
```
Aquí indiquem a com s'ha d'aixecar cadascun dels contenidors però el codi font estarà FORA dels contenidors (  [docker-compose.yml](docker-compose.yml) )

És a dir, a dins dels contenidors hi haurà el servei en marxa, però les dades estaran fora.
És molt còmode per entorns de **desenvolupament** ja que podem modificar els fitxers des de la nostra màquina, de fora estant.

* És molt important tenir present les rutes del paràmerte **"volumes"** que és el que aconsegueix aquest efecte.

## Executar ordres arbitràries dins d'un contenidor (`npm --install ...`)
A vegades necessitem afegir una dependència (`npm install...`) o executar una ordre qualsevol dins d'un contenidor per tal de poder tenir accés a les llibreries i binàries del contenidor. 

Amb el contenidor "node" en tenim un exemple, mireu la informació de [[./node/README.md]]



## Contenidors individuals (crear les imatges una a una, i aixecar-les una a una)
D'aquesta forma tenim un fitxer de creació de la imatge **per a cada servei** què volguem. El fitxer
```
Dockerfile
```
és específic per a cada servei que necessitem.
* Node  (  [node/Dockerfile](node/Dockerfile) )
* Front ( [front/Dockerfile](front/Dockerfile) )
* ...

En aquest cas, per a cada servei, hem de **construir** la nostra imatge, que contindrà a **DINS** el codi que volguem.
Quan executem el contenidor corresponent a la nostra imatge, aquest, com tots els contenidors, serà **immutable**

És molt còmode per entorns de **producció**, ja que en ser immutables, no es corrompen, i quan els serveis cauen, simplement s'ha de reaixecar el contenidor.

Aquestes imatges es poden publicar en repositoris d'imatges (públics o privats) i per tant, són molt fàcilment distribuibles (cap als servidors del client...)

* És molt important revisar el COPY i el CMD del final ja que són els que determinen quins fitxers es copien DINS de la imatge, i quin serà el programa que s'executarà en el contenidor.

## Hibrid
Sovint, a producció, es fa un emfocament hybrid, es creen les imatges específiques per a cadascun dels nostres serveis amb els seus fitxers, s'aixequen de forma conjunta amb compose i les bases de dades tenen un volum extern montat per fer la informació persistent.
