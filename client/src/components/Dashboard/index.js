import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import './assets/component.css';

import ApartmentList from './components/ApartmentList';

const Dashboard = ({ data: {loading, error, apartments }}) => {
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="apartments">
      <div className="info">
        <h2>Доступные квартиры</h2>
        <a href="" className="blue-btn">
          Добавить
          <FontAwesome name="pencil" />
        </a>
      </div>
      {loading ? <p>Loading ...</p> : <ApartmentList />}
    </div>
  );
}


export default Dashboard;
