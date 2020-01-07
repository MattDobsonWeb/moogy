import React, { Component } from 'react';

// import components
import TotalData from './TotalData';
import DataGrid from './DataGrid';

export default class index extends Component {
  render() {
    return (
      <div className="data-page">
        <TotalData></TotalData>
        <DataGrid heading={`Opinions - People`} type="people"></DataGrid>
        <DataGrid heading={`Opinions - Inanimate`} type="inanimate"></DataGrid>
        <DataGrid
          heading={`Favourites`}
          type="favourites"
          hideSentiment={true}
        ></DataGrid>
      </div>
    );
  }
}
