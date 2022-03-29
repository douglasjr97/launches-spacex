import React, { useEffect, useState } from 'react';
import { Title } from './styles';

import api from '../../services/api';

import MyDatatable, { Launch } from '../../components/MyDatatable/MyDatatable';
import Favorites from '../../components/Favorites/Favorites';
import LoadingSpinner from '../../components/LoadingSpinner';
const Dashboard: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Launch[]>([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/launches')
      .then(response => {
        console.log(response);
        response.data.map((release: Launch) => {
          release.launch_success = release.launch_success ? 'Success' : 'Fail';
          return null;
        });
        setLaunches(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
    localStorage.clear();

    if (localStorage.getItem('@spaceXFalcon:favorites') !== null) {
      setFavorites(
        JSON.parse(localStorage.getItem('@spaceXFalcon:favorites')!),
      );
    }
  }, []);

  const setField = (val: any, key: any) => {
    var _launch = { ...launches };
    _launch[key] = val;
    setLaunches(_launch);
  };
  return (
    <>
      <Title>SpaceX | Falcons</Title>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MyDatatable
            releases={launches}
            lastSave={launches}
            setReleases={setLaunches}
            isSearch
            key={'DataTable'}
            setFavorites={setFavorites}
            columns={[
              {
                id: 1,
                name: 'Flight Number',
                value: 'flight_number',
                onChange: (e: any) => {
                  setField(e.target.value, 'cod_user');
                },
              },
              {
                id: 2,
                name: 'Mission Name',
                value: 'mission_name',
                onChange: (e: any) => {
                  setField(e.target.value, 'mission_name');
                },
              },
              {
                id: 3,
                name: 'Launch Year',
                value: 'launch_year',
                onChange: (e: any) => {
                  setField(e.target.value, 'launch_year');
                },
              },
              {
                id: 4,
                name: 'Status',
                value: 'launch_success',
                type: 'boolean',
                onChange: (e: any) => {
                  setField(e.target.value, 'launch_success');
                },
              },
              {
                id: 5,
                name: 'Rocket Name',
                value: 'rocket.rocket_name',
                onChange: (e: any) => {
                  setField(e.target.value, 'rocket.rocket_name');
                },
              },
            ]}
          />

          {favorites[0] && <Favorites releases={favorites} loaded={true} />}
        </>
      )}
    </>
  );
};

export default Dashboard;
