# TricountRat Front

Cette appplication est basée sur les fonctionnalités simplifiés de [Tricount](https://www.tricount.com/fr/faire-les-comptes-entre-amis).

## Pré-requis

Le projet utilise docker comme environnement de travail.
Il vous faudra donc au préalable avoir [docker](https://docs.docker.com/engine/install/) et [docker-compose](https://docs.docker.com/compose/install/) installés sur sur votre machine pour pouvoir lancer le projet

## Installation

La commande suivante va lancer le conteneur `node` nécéssaires au projet à partir des images référencés dans le fichier `docker-compose.yml`.

```bash
docker-compose up --build -d
```

Vous pouvez maintenant accèder au front sur le port suivant : 

- `front` : [http://localhost:4000](http://localhost:4000)

## Informations utiles

- Installer des dépendances directement depuis le conteneur : 

```bash
docker exec tricount-rat-front npm install {package-name}
```

## Warning sur le typage

De nombreux warning sont présent dans le front du au faible typage TS du projet. Le manque de temps sur la fin du développement m'a empêcher de les solutionner  en configurant proprement le typage du projet

## Liens utiles

Next.js : 
 - [Documentation](https://nextjs.org/docs)
 - [Github Repository](https://github.com/vercel/next.js/)