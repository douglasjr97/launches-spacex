import React, { useEffect, useState } from "react";
import { Title } from "./styles";

import api from "../../services/api";

import MyDatable, { Launch } from "../../components/MyDatable/MyDatatable";
import Favorites from "../../components/Favorites/Favorites";
const Dashboard: React.FC = () => {
  const [launch, setLaunch] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Launch[]>([]);

  useEffect(() => {
    api
      .get("/launches")
      .then((response) => {
        response.data.map((release: Launch) => {
          release.launch_success = release.launch_success ? "Success" : "Fail";
          return null;
        });
        setLaunch(response.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
    localStorage.clear();

    if (localStorage.getItem("@spaceXFalcon:favorites") !== null) {
      setFavorites(
        JSON.parse(localStorage.getItem("@spaceXFalcon:favorites")!)
      );
    }
  }, []);

  const setField = (val: any, key: any) => {
    var _launch = { ...launch };
    _launch[key] = val;
    setLaunch(_launch);
  };
  return (
    <>
      <Title>SpaceX | Falcons</Title>

      <MyDatable
        releases={launch}
        lastSave={launch}
        setReleases={setLaunch}
        loaded={isLoading!!}
        isSearch
        rows={launch}
        setFavorites={setFavorites}
        columns={[
          {
            id: 1,
            name: "Flight Number",
            value: "flight_number",
            onChange: (e: any) => {
              setField(e.target.value, "cod_user");
            },
          },
          {
            id: 2,
            name: "Mission Name",
            value: "mission_name",
            onChange: (e: any) => {
              setField(e.target.value, "mission_name");
            },
          },
          {
            id: 3,
            name: "Launch Year",
            value: "launch_year",
            onChange: (e: any) => {
              setField(e.target.value, "launch_year");
            },
          },
          {
            id: 4,
            name: "Status",
            value: "launch_success",
            type: "boolean",
            onChange: (e: any) => {
              setField(e.target.value, "launch_success");
            },
          },
          {
            id: 5,
            name: "Rocket Name",
            value: "rocket.rocket_name",
            onChange: (e: any) => {
              setField(e.target.value, "rocket.rocket_name");
            },
          },
        ]}
      />

      {favorites[0] && <Favorites releases={favorites} loaded={true} />}
    </>
  );
};

export default Dashboard;
