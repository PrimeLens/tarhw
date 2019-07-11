import _ from 'lodash';
import moment from 'moment';
import appStore from '../my_libraries/appStore.js';

/*
  Here is the busines logic by which we apply transforms to the data
  Use debug() in the browser console to check during runtime
  Disable debug before production
*/



// The  idea with this one is to build up an object / dictionary where
// the unique key is the name of the creative and its value is an object
// containing the cumulative totals for spend, views and cpv 
function byCreative() {
  // final data for this transform will be stored here
  appStore.transformed.creative = [];
  // get creatives as an object / dictionary
  let creativesObj = {};
  _.each(appStore.original.spots  , item=>{
    if (!creativesObj[item.Creative]) {
      // if this creative has never been seen add it to the object
      creativesObj[item.Creative] = {
        spend : 0,
        views : 0,
        cpv : 0
      };
    }
    creativesObj[item.Creative].spend += Number(item.Spend);
    creativesObj[item.Creative].views += Number(item.Views);
    creativesObj[item.Creative].cpv = creativesObj[item.Creative].spend / creativesObj[item.Creative].views;
  });
  _.each(creativesObj, (v,k)=>{
    // create a new UI row out of v {spend, views, cpv} and add in the key which is the creative name
    var newRow = _.cloneDeep(v);
    newRow.creative = k;
    // push it into an array for the UI
    appStore.transformed.creative.push(newRow);
  });
  // lets also build up the header totals while we are here
  appStore.transformed.header = {
    totalViews: _.sumBy(appStore.transformed.creative, item=>item.views),
    totalSpend: _.sumBy(appStore.transformed.creative, item=>item.spend),
    totalSpots: appStore.original.spots.length,
  }
}



// Similar to above. The idea with this one is to build up an object / dictionary 
// where the unique key is a combo of Date plus the rotation name
// Its value is an object containing a sortKey, a label
// and the cumulative totals for spend, views and cpv 
// but before we can do this we need to assign rotation properties to the spots and
// look for overlaps where a spot should be counted in more than one rotation

const timeFormat = 'h:mm A';
function byDayAndRotation() {
  // final data for this transform will be stored here
  appStore.transformed.dayRotation = [];
  // we need a version of the spot where the spot has a rotation property added
  // we will store this under spotsWithRotation and drop it into the appStore so we
  // check it during runtime by typing debug() into the console
  appStore.transformed.spotsWithRotation = [];
  _.each(appStore.original.spots,  item=>{
      var itemTime = moment(item.Time, timeFormat);
      // now loop thru the rotations
    _.each(appStore.original.rotations, rot=>{
      let startTime = moment(rot.Start, timeFormat);
      let endTime = moment(rot.End, timeFormat);
      if (itemTime.isBetween(startTime, endTime)) {
        // store a new spot item that has rotation property Name eg 'Prime'
        var newItem = _.cloneDeep(item);
        newItem.rotation = rot.Name;
        appStore.transformed.spotsWithRotation.push(newItem);
      }
    });
  });
  // we need a day rotations objects where the unique keys are made up of day + rotation
  // but lets loop thru and gather the data as we do it
  let dayRotationObj = {};
  _.each(appStore.transformed.spotsWithRotation , item=>{
    // javascript object keys should not start with an integer so lets prepend a K
    // we must also be aware of the sort order with Morning coming before Afternoon 
    // a = Morning, b = Afternoon, c = Prime and this is the order we render in
    let sortCharacter = 'a';
    if (item.rotation==='Afternoon') sortCharacter = 'b';
    if (item.rotation==='Prime') sortCharacter = 'c';
    let itemKey = 'K'+item.Date+'_'+sortCharacter+'_'+item.rotation;
    if (!dayRotationObj[itemKey]) {
      // if this creative has never been seen add it to the object
      dayRotationObj[itemKey] = {
        label : item.Date+' '+item.rotation,
        spend : 0,
        views : 0,
        cpv : 0
      };
    }
    dayRotationObj[itemKey].spend += Number(item.Spend);
    dayRotationObj[itemKey].views += Number(item.Views);
    dayRotationObj[itemKey].cpv = dayRotationObj[itemKey].spend / dayRotationObj[itemKey].views;
  });
  // now build out the final output for the UI which we will store in appStore.transformed.dayRotation
  _.each(dayRotationObj, (item, k)=>{
      let newItem = _.cloneDeep(item);
      newItem.sortKey = k;
      appStore.transformed.dayRotation.push(newItem);
  });
  // make sure we sort it
  appStore.transformed.dayRotation = _.sortBy(appStore.transformed.dayRotation, 'sortKey');
}



export default {byCreative, byDayAndRotation};

