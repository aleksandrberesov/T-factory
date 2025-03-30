"use client";

import useApplication, { IApplication } from "./controllers/Application";
import ApplicationView from "./views/Application";

export default function Home() {
  const ApplicationController: IApplication = useApplication();

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <ApplicationView
        controller={ApplicationController} 
      />
    </main>
  );
}