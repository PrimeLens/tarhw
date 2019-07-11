import React from 'react';
import formatCurrency from 'format-currency';

import './chartPage.css';
import appStore from '../my_libraries/appStore.js';

var currencyConfig = { format: '%s%v', symbol: '$' };

// these are the widths of the columns on the Creative table
const w1 = 340;
const w2 = 180;
const w3 = 180;
const w4 = 180;

class CreativeRow extends React.Component {
  render(){
    return (
      <div className="creativeRow">
        <div style={{width: w1}}>{this.props.item.creative}</div>
        <div style={{width: w2}}>{formatCurrency(this.props.item.spend, currencyConfig)}</div>
        <div style={{width: w3}}>{this.props.item.views}</div>
        <div style={{width: w4}}>{formatCurrency(this.props.item.cpv, currencyConfig)}</div>
      </div>
    );
  }
}


// these are the widths of the columns on the Day Rotation table
const w5 = 490;
const w6 = 130;
const w7 = 130;
const w8 = 130;

class DayRotationRow extends React.Component {
  render(){
    return (
      <div className="creativeRow">
        <div style={{width: w5}}>{this.props.item.label.toUpperCase()}</div>
        <div style={{width: w6}}>{formatCurrency(this.props.item.spend, currencyConfig)}</div>
        <div style={{width: w7}}>{this.props.item.views}</div>
        <div style={{width: w8}}>{formatCurrency(this.props.item.cpv, currencyConfig)}</div>
      </div>
    );
  }
}


class ChartHeader extends React.Component {
  render(){
    let totalSpend = formatCurrency(this.props.data.totalSpend, currencyConfig);
    // remove the cents
    totalSpend = totalSpend.slice(0, -3);
    return (
      <div className="chartHeader">
        <div className="chartHeaderInner">
          <div>
            <span>Total Spots</span>
            {this.props.data.totalSpots}
          </div>
          <div>
            <span>Total Spend</span>
            {totalSpend}
          </div>
          <div>
            <span>Total Views</span>
            {this.props.data.totalViews}
          </div>
        </div>
      </div>
    );
  }
}

class ChartPage extends React.Component {
  render(){
    return (
      <div className="chartPage">
        <ChartHeader data={appStore.transformed.header}/>
        <div className="chartBox">
          <div className="chartBoxHeader">By Creative</div>
          <div className="creativeRow creativeRowWithLabel">
            <div style={{width: w1}}>Creative</div>
            <div style={{width: w2}}>Spend</div>
            <div style={{width: w3}}>Views</div>
            <div style={{width: w4}}>CPV</div>
          </div>
          {appStore.transformed.creative.map((item, i)=><CreativeRow key={i} item={item}/>)}
        </div>
        <div className="chartBox">
          <div className="chartBoxHeader">By Day - Rotation</div>
          <div className="creativeRow creativeRowWithLabel">
            <div style={{width: w5}}>Day - Rotation</div>
            <div style={{width: w6}}>Spend</div>
            <div style={{width: w7}}>Views</div>
            <div style={{width: w8}}>CPV</div>
          </div>
         {appStore.transformed.dayRotation.map((item, i)=><DayRotationRow key={i} item={item}/>)}
        </div>
      </div>
    );
  }
}


export default ChartPage;
