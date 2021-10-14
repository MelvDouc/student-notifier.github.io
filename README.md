## Setup

1. Open CMD as Admin.
```
npm i -g @google/clasp
```
2. Go to Script Editor.
3. Get Script ID from settings.
```
clas login
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

## Managing changes

```
clasp pull
```
```
clasp push
```