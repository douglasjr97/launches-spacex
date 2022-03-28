import React, { useEffect, useState } from "react";
import { Title } from "./styles";
import { Calendar } from 'primereact/calendar';
import api from "../../services/api";
import ListOfLaunch from "../../components/Favorites/Favorites";
import MyDatable, { Launch } from "../../components/MyDatable/MyDatatable";
import Favorites from "../../components/Favorites/Favorites";
const Dashboard: React.FC = () => {
  const [date15, setDate15] = useState(new Date());
  const [launch, setLaunch] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites,setFavorites]= useState<Launch[]>([])
  const [user, setUser] = useState()

 
  //   {
  //     name_launch: "Lançamento 1",
  //     rocket: {
  //       rocket_id: "1",
  //       rocket_name: "Foguete 1",
  //       rocket_type: "Normal",
  //     },
  //   },
  //   {
  //     name_launch: "Lançamento 2",
  //     rocket: {
  //       rocket_id: "2",
  //       rocket_name: "Foguete 2",
  //       rocket_type: "Normal",
  //     },
  //   },
  //   {
  //     name_launch: "Lançamento 3",
  //     rocket: {
  //       rocket_id: "3",
  //       rocket_name: "Foguete 3",
  //       rocket_type: "Normal",
  //     },
  //   },
  //   {
  //     name_launch: "Lançamento 4",
  //     rocket: {
  //       rocket_id: "4",
  //       rocket_name: "Foguete 4",
  //       rocket_type: "Normal",
  //     },
  //   },
  //   {
  //     name_launch: "Lançamento 5",
  //     rocket: {
  //       rocket_id: "5",
  //       rocket_name: "Foguete 5",
  //       rocket_type: "Normal",
  //     },
  //   },
  // ]);

  useEffect(() => {
    api
      .get("/launches")
      .then((response) => {
        response.data.map((release: Launch) => {
          release.launch_success = release.launch_success ? "Success" : "Fail"
        })
        setLaunch(response.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
      localStorage.clear()

      if(localStorage.getItem("@spaceXFalcon:favorites")!==null){
        setFavorites(JSON.parse(localStorage.getItem("@spaceXFalcon:favorites")!));
      }
    

  }, []);

  const setField = (val:any,key:any)=>{
    var _launch = {...launch}
    _launch[key] = val
    setLaunch(_launch)
  }
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
          id:1,
          name:"Flight Number",
          value:"flight_number",
          onChange:(e:any)=>{
            setField(e.target.value,'cod_user')
          }
        },
        {
          id:2,
          name:"Mission Name",
          value:"mission_name",
          onChange:(e:any)=>{
            setField(e.target.value,'mission_name')
          }
        },
        {
          id:3,
          name:"Launch Year",
          value:"launch_year",
          onChange:(e:any)=>{
            setField(e.target.value,'launch_year')
          }
        },
        {
          id:4,
          name:"Status",
          value:"launch_success",
          type:'boolean', 
          onChange:(e:any)=>{
            setField(e.target.value,'launch_success')
          }
        },
        {
          id:5,
          name:"Rocket Name",
          value:"rocket.rocket_name",
          onChange:(e:any)=>{
            setField(e.target.value,'rocket.rocket_name')
          }
        },
       
      ]}
      
      />

     {
       favorites[0] &&(
          <Favorites releases={favorites} loaded={true} />
       )
     }
      
    </>
  );
};

export default Dashboard;
