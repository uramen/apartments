import React from 'react';
import ApartmentList from '../components/ApartmentList';
import FontAwesome from 'react-fontawesome';

export default ({loading}) => {
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
  )
};
