"use client";

import Image from "next/image";
import { FullScreen, GetUserData } from "./telegram/telegram_integration";
import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "./lib/button";
import ChartView from "./lib/chart";

const Doclick = () => {
  alert("button clicked");
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
          FullScreen();
        };            
    }
  }, [t_id]);

  return (
    <main>
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
      <div className = "flex min-h-screen flex-col items-left">
        <SelectedTab title="Sell" backgroundcolor="green" onclick={Doclick} /> 
        <SelectedTab title="Buy" backgroundcolor="red"/>  
      </div>  
    </main>
  );
}
