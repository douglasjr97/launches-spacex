import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Pessoas from "../../services/dados";
// import { Container } from './styles';

const Launches: React.FC = () => {
  const [searchFilter, setSearchFiltrer] = useState("");
  console.log("Launches");
  useEffect(() => {
    api.get("/launches").then((response) => console.log(response.data));
  }, []);

  interface Pessoas {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  }
  return (
    <>
      <input
        type="text"
        placeholder="Pesquise aqui..."
        onChange={(event) => setSearchFiltrer(event.target.value)}
      />
      <ul>
        {Pessoas.map((item) => (
          <li key={item.id}>{item.first_name}</li>
        ))}
      </ul>
    </>
  );
};

export default Launches;
