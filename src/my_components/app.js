import React from 'react';
import './app.css';

import fetchWrapper from '../my_libraries/fetchWrapper.js';
import appStore from '../my_libraries/appStore.js';
import dataTransforms from '../my_libraries/dataTransforms.js';

import MyLoader from '../my_components/myLoader.js';
import ChartPage from '../my_components/chartPage.js';




class App extends React.Component {

  _getData = async(callback)=>{
    // get the data from the two csv files
    let call1 = fetchWrapper('./spots.csv', 'GET');
    let call2 = fetchWrapper('./rotations.csv', 'GET');
    appStore.original.spots = await call1;
    appStore.original.rotations = await call2;
    // run a transform so its usable
    dataTransforms.byCreative();
    dataTransforms.byDayAndRotation();
    callback();
  }

  componentDidMount(){
    this._getData(()=>{
      this.setState({});
    });
  }

  render(){
    let dataLoadedFlag = (appStore.transformed.creative && appStore.transformed.dayRotation);
    return (
      <div className="homeworkapp">
        {(dataLoadedFlag) ? <ChartPage/> : <MyLoader/>}
      </div>
    );
  }
}


export default App;
