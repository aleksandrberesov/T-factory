"use client";

import Image from "next/image";
import { FullScreen, GetUserData } from "./telegram/telegram_integration";
import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "./lib/button";
import ChartView from "./lib/chart";
import InputTab from "./lib/input";


const DoSellclick = () => {
  alert("button Sell clicked");
}
const DoBuyclick = () => {
  alert("button Buy clicked");
}

export default function Home() {
  const t_id = useId(); 

  useEffect(() => {
    let ignore = false; 
    if (!ignore){
        FullScreen();

        return ()=>{
          console.log(ignore);
          ignore = true;
        };            
    }
  }, [t_id]);

  return (
    <main  
      className="h-dvh w-dvh bg-green-500"
      //className="min-h-screen lg:flex text-lg flex-col"
    >

      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          telegram page
      </p>      
      <div>
        <p 
          id = {t_id}
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            chart name
        </p> 
        <ChartView />
      </div>  
      <div className ="flex flex-row items-left">
        <SelectedTab title="Sell" backgroundcolor="green" onclick={DoSellclick} /> 
        <InputTab title="1000"/>
        <SelectedTab title="Buy" backgroundcolor="red" onclick={DoBuyclick}/>  
        <SelectedTab title="Close" backgroundcolor="blue" onclick={DoBuyclick}/>      
      </div>  
      <div className="flex-row">
        <SelectedTab icon_image="/icons/play.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
        <SelectedTab icon_image="/icons/pause.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
        <InputTab title="1x"/>
        <SelectedTab icon_image="/icons/next.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
        <SelectedTab icon_image="/icons/stop.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
        <SelectedTab icon_image="/icons/settings.svg" backgroundcolor="gray" onclick={DoBuyclick}/>  
      </div>
    </main>
  );
}
