# NodeJS + ExpessJS + MongoDB - Build an app like Trello (API)

## Requirement
* **nodejs >= v14.7.0**
* **npm >= v6.4.7**
* **yarn >= v1.19.1**

Clone project and run test.

```
$ git clone https://github.com/nvchau/meowlo
$ cd meowlo
$ yarn | npm install
$ yarn | npm start
```

# Description
## Absolute import (say goodbye relative imports)
* Use compiler `babeljs` and library `babel-plugin-module-resolver`
* `*/...`: go from root directory
* Read more here:
  - https://trungquandev.com/cau-hinh-babel-cho-mot-du-an-nodejs-thuan-javascript/
  - https://medium.com/weekly-webtips/say-good-bye-relative-imports-in-nodejs-projects-65513bcdae6c

## Eslint
#### Libraries
* eslint
#### Run
* Run: npm run eslint
## Database
### MongoDB
#### Choose ORM
* Use `mongoose npm` (MongoDB ORM - third-party libraries) or `mongodb npm` (MongoDB NodeJS Driver - released by mongodb itself)
* `mongoose npm` is easier to use, but performance lags behind `mongodb npm`
* I will choose `mongodb npm` - this is MongoDB native driver
#### Choose MongoDB Clusters
* Use `mongodb clusters free for dev`
#### Schema for MongoDB
* Use `joi npm` to `declare Schema` and `validate` input data
* Also can use `express-validator` to validate input data, but I only use one
#### Logic about deleting records
* Use `soft delete`, ie do not delete this record completely from the database, but update the field `_destroy` from `false` to `true`