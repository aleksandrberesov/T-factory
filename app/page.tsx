"use client";

import Image from "next/image";
import { FullScreen, GetUserData } from "./telegram/telegram_integration";
import React, { useEffect, useState, useId } from 'react';
import { TUser } from "./models/types"
import NavigationFrame from "./frames/frame_navigation";
import TradingFrame from "./frames/frame_trading";
import ProfileFrame from "./frames/frame_profile";
import StatisticFrame from "./frames/frame_statistic";

export default function Home() {
  let User: TUser; 
  User = GetUserData();

  //const User : TUser;
  //User = GetUserData();

  //const User = {
  //  first_name: "first_name",
  //  last_name: "last_name"
  //};

  const Frames = [
    {id: 0 , element: <ProfileFrame user = {User}/>},
    {id: 1 , element: <TradingFrame/>} ,
    {id: 2 , element: <StatisticFrame/>}   
  ];
  const [component, SetComponent] = useState(Frames[1].element); 

  const ChangeFrame = (id: number) => {
    SetComponent(Frames[id].element);
  };

  useEffect(() => {
    let ignore = false; 
    if (!ignore){
        FullScreen();
        return ()=>{
          ignore = true;
        };            
    }
  }, []);

  return (
    <main  
      className="h-dvh w-dvh bg-black"
    >
      <NavigationFrame
        onselected = {ChangeFrame}
      />
      {component}
    </main>
  );
}
