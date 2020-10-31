# Platziverse DB

Este es un modulo creado a partir del curso de Node Js Avanzado de Platzi.

## Usage

```js
const setUpDatabase = require("platziverse-db");

setUpDatabase(config)
  .then((db) => {
    const { Agent, Metric } = db;
  })
  .catch((err) => {
    console.log(err);
  });
```
