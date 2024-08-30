import Image from "next/image";
import { createChart } from 'lightweight-charts';
import SelectedTab from "./lib/button";

export default function Home() {

  //const firstChart = createChart(window.document.getElementById('chat-container'));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id = "chat-container">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
      </p>
        <a
            className="pointer-events-none flex place-items-left gap-2 p-8 lg:pointer-events-auto lg:p-0"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="light:invert"
              width={100}
              height={24}
              priority
            />
          </a>
          <div>
          <SelectedTab />  
          </div>
      </div>  
    </main>
  );
}
