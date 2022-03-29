import React from 'react';
import { Rocket } from './Favorites';

// import { Container } from './styles';

export interface Launch {
  mission_name: string;
  rocket: Rocket;
  links: {
    mission_patch: string;
  };
}

const FavoriteItem = (item: Launch) => {
  return (
    <div className="product-item">
      <div className="image-container">
        <img
          src={item.links.mission_patch}
          alt={item.mission_name}
          data-testid="mission-img"
        />
      </div>
      <div className="product-list-detail">
        <h3 className="mb-2">{item.mission_name}</h3>
        <i className="pi pi-star product-category-icon"></i>
        <span className="product-category">{item.rocket.rocket_name}</span>
      </div>
    </div>
  );
};
export default FavoriteItem;
