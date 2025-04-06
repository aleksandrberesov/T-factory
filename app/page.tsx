"use client";

import useApplication, { IApplication } from "./controllers/application";
import ApplicationView from "./views/Application";

export default function Home() {
  console.log("Home rendered");

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <ApplicationView
        controller={useApplication()} 
      />
    </main>
  );
}