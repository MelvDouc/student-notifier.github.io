## Setup

1. Open CMD as Admin.
```
npm i -g @google/clasp
```
2. Go to Script Editor.
3. Get Script ID from settings and save it to ENV variables.
```
clasp login
```
4. Visit provided url to log in.
5. Create project folder.
```
npm init
```
6. Create src folder in project folder.
```
clasp clone "scriptID" --rootDir src
```
7. Remove .clasp.json and re-create it dynamically by running:
```
npm run create-clasp
```

## Managing changes

```
clasp pull
```
```
clasp push
```

## TypeScript

```
npm i -D @types/google-apps-script
```