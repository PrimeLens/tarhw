
# Homework App Request, submission by J.D.

## For non-developers it is hosted on amazon's AWS

- Homework app <a target="_blank" href="https://tarhw.s3.amazonaws.com/index.html">tarhw.s3.amazonaws.com/index.html</a>
- CSV file <a target="_blank" href="https://tarhw.s3.amazonaws.com/spots.csv">tarhw.s3.amazonaws.com/spots.csv</a>
- CSV file <a target="_blank" href="https://tarhw.s3.amazonaws.com/rotations.csv">tarhw.s3.amazonaws.com/rotations.csv</a>

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
5. Transform the original data so its usable for the UI and save in `appStore`
6. Tell the UI displays the transformed data

## Debug state at runtime

- Type debug() in console to monitor `appStore`


