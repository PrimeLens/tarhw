import React from 'react';

class MyLoader extends React.Component {
  render(){
    return (
      <div style={styles}>
        <div>Loading ...</div>
      </div>
    );
  }
}

const styles = {
  color: '#aaa',
  height: '100%', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
};

export default MyLoader;
