"use client";

import useApplication from "./controllers/telegramAppication";
import ApplicationView from "./views/Application";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <ApplicationView
        controller={useApplication()} 
      />
    </main>
  );
}