# TricountRat Front

This application is based on the simplified features of [Tricount](https://www.tricount.com/fr/faire-les-comptes-entre-amis).

## Prerequisites

![docker](https://img.shields.io/badge/docker-v27-2496ED?logo=docker&logoColor=white&labelColor=2496ED&color=white)
![docker-compose](https://img.shields.io/badge/docker--compose-v1-2496ED?logo=docker&logoColor=white&labelColor=2496ED&color=white)

## Installation

The following command will start the `node` container required for the project using the images referenced in the `docker-compose.yml` file.

```bash
docker-compose up --build -d
```

You can now access the frontend at the following port:

- `frontend`: [http://localhost:4000](http://localhost:4000)

## Useful Information

- Install dependencies directly from the container:

```bash
docker exec tricount-rat-front npm install {package-name}
```

## Back-end

The back-end of **TricountRat** is a web application built with **Nest.js**. You can find it here: [tricount-rat-api](https://github.com/MathieuBesson/tricount-rat-api).


## TODO

- Fix the many typing issues or lack of typing

## License

This project is licensed under the GPL License. See the [LICENSE](./LICENSE) file for more details.
