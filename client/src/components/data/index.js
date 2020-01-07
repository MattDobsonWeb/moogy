import React, { Component } from 'react';

// import components
import DataGrid from './DataGrid';
import People from './People';
import Inanimate from './Inanimate';

export default class index extends Component {
  render() {
    return (
      <div className="data-page">
        <DataGrid heading={`Opinions - People`} type="people"></DataGrid>
        <DataGrid heading={`Opinions - Inanimate`} type="inanimate"></DataGrid>
        <DataGrid heading={`Favourites`} type="favourites"></DataGrid>
      </div>
    );
  }
}
