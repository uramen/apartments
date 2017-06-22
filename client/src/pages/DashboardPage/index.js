import React from 'react';
import ApartmentList from '../../components/ApartmentList';
import FontAwesome from 'react-fontawesome';

import './assets/component.css';


export default ({data, loading}) => {
  return (
    <div className="apartments">
      <div className="info">
        <div>
          <h2>Доступні квартири</h2>
          <p>Оновлення бази відбувається через кожних 60хв</p>
        </div>
        <a href="" className="blue-btn">
          Додати нову
          <FontAwesome name="pencil" />
        </a>
      </div>
      {loading ? <p>Loading ...</p> : <ApartmentList data={data}/>}
    </div>
  )
};
