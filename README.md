
# My Portfolio Site with React
- React
  - react-route
  - Redux
    - typescript-fsa & typescript-fsa-reducers
    - rxjs & redux-obserbable
- Typescript
- UIkit
- Firebase
  - Hosting
  - Cloud FireStore
  - Cloud Storage

## Create Project
```
// create projeckut with typescript
$ create-react-app portfolio-react --typescript
$ npm install --save-dev node-sass

// react-route & redux 
$ npm install --save react-router-dom redux react-redux
$ npm install --save-dev @types/react-redux @types/react-router-dom

// typescript-fsa & typescript-fsa-reducers
$ npm install --save typescript-fsa typescript-fsa-reducers

// rxjs & redux-observable
$ npm install --save rxjs
$ npm install --save redux-observable
```

## Develop
```
$ npm start
```

## Deploy By CI
```
$ git push origin m
```
- GitHub Actions
  - https://github.com/nobux42/portfolio-react/actions


## Deploy from local
```
$ npm run build
$ firebase deploy
```
access -> https://portfolio-react-3d680.firebaseapp.com