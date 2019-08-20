
# Homework App Request, submission by J.D.

## For developer to run locally

- Assumption is that your machine has node and npm
- clone the repo and cd into repo
- do `npm install` and `npm run start`
- use browser to check `http://localhost:3000/`

## Approach

1. Use create-react-app to get up and running quickly
2. Show `Loading` in UI while app makes GET calls for CSV files 
3. Parse file data to json
4. Save json in its original form in `appStore`
5. Transform data so its usable for the UI, save in `appStore` see <br/>
   [/src/my_libraries/dataTransforms.js](./src/my_libraries/dataTransforms.js)
6. Tell the UI displays the transformed data

## Debug state at runtime

- Type debug() in console to monitor `appStore`


