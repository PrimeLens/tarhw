

import csv from 'csvtojson';


// polyfills for older browsers
// keep an eye on these tickets
// https://github.com/github/fetch/issues/357
// https://github.com/github/fetch/issues/275
import 'whatwg-fetch';
import Promise from 'promise-polyfill'; 
if (!window.Promise) {
  window.Promise = Promise;
}


/*
  My custom lib so if we stop using fetch 
  and use axios or something else
  we dont have multiple points in the code to edit
*/


function fetchWrapper(url, method, options){
  var request = new Request(url, {method});
  return fetch(request)
  .catch(err=>{
    alert('Connection failed, check your internet');
  })
  .then(response => {
    // django or whatever server sent client an error code
    if (!response.ok && response.headers) {
      var errObj = {
        serverError: true,
        status: response.status,
        statusText: response.statusText,
      }
      throw Error(JSON.stringify(errObj));
    }
    return response;
  })
  // added for .csv and the tartari test
  .then(response => {
    let textString = response.text();
    return textString;  
  })
  // added for .csv and the tartari test
  .then(CSVdata => {
    // we are done with the fetch promise chain 
    // so rotate to the promise from csv
    return csv().fromString(CSVdata);
  });
}

export default fetchWrapper;
