# TheoremOne backend

This is the backend for TheoremOne backend...

## Installation

Firstly run it in your root folder.
```
cp .env.example .env
```
then update your Mysql connection info.

## install node_modules
Use your favorite package manager to install node_module.

```bash
yarn install or npm install
```

## Run the app 
Use command to run the app. Make sure your node js version is 14 or newer 
```bash
node ace serve --watch
```


## Seed data
Use the command to seed data.
```bash
node ace db:seed
```

## EsLint
Use the command to seed data.
```bash
npm or yarn run lint
```


## Testing
To Test run the following command.

PS: when running the test. you need to provide a valid device `token` and a valid user `token`
```javascript
node ace test
```

