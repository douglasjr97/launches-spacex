import React from 'react';
import { OrderList } from 'primereact/orderlist';
import { ProgressSpinner } from 'primereact/progressspinner';

import './styles.css';
import FavoriteItem from './FavoriteItem';

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Launch {
  mission_name: string;
  rocket: Rocket;
  links: {
    mission_patch: string;
  };
}

interface LaunchProps {
  releases: Launch[];
  loaded: boolean;
}
const Favorites: React.FC<LaunchProps> = ({
  releases,
  loaded,
}: LaunchProps) => {
  return (
    <div>
      {loaded ? (
        <div className="orderlist-demo">
          <div className="card">
            <OrderList
              value={releases}
              itemTemplate={FavoriteItem}
              header="Favorites"
            ></OrderList>
          </div>
        </div>
      ) : (
        <div className="loading-spinner">
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

export default Favorites;
