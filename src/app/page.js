"use client"
import Image from "next/image";
import React from 'react';
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Noise = dynamic(() => import('./components/bg'), { ssr: false })
import GradientDivider from './components/gradientdivider';
import BrandButton from "./components/brandbutton";
import BigCircleImage from "./components/bigcircleimage";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      
      <Noise hue={Math.random()*360}/>
      <div className="flex justify-center items-center h-screen z-0">
        <div className="absolute w-[100%] h-16 self-start"><BrandButton href="https://www.github.com/LynixPlayz" brandicon={faGithub}/></div>
        <div className="flex flex-row justify-center gap-2 perspective-400 -translate-y-12 backdrop-blur-2xl w-[40%] aspect-square items-center rounded-full">
          <p className="w-auto mb-3 text-2xl transform -rotate-y-12 translate-x-12">hi im...</p><h1 className="text-[256px] font-bold w-auto transform rotate-y-12 translate-x-12">Alex</h1>
        </div>
      </div>
      <div className="bg-gradient-to-bl from-black to-slate-900 -z-10">
        <GradientDivider />
        <div className="flex flex-row items-center justify-center w-screen h-screen gap-36 perspective-800">
        <p className="w-auto mb-3 text-2xl transform -rotate-y-12 translate-x-12">and i make...</p>
        <div id="flip" className="h-[108px] overflow-hidden -translate-x-12 perspective-800">
          <div><div className="height-[72px] animate-show"><h1 className="text-[72px] font-bold w-auto transform rotate-y-30">Lighting</h1></div></div>
          <div><div className="height-[72px]"><h1 className="text-[72px] font-bold w-auto transform rotate-y-30">Apps</h1></div></div>
          <div><div className="height-[72px]"><h1 className="text-[72px] font-bold w-auto transform rotate-y-30">Games</h1></div></div>
          <div><div className="height-[72px]"><h1 className="text-[72px] font-bold w-auto transform rotate-y-30">Robots</h1></div></div>
          <div><div className="height-[72px]"><h1 className="text-[72px] font-bold w-auto transform rotate-y-30">Websites</h1></div></div>
        </div>
          <BigCircleImage />
        </div>
      </div>
    </main>
  );
}
