// import React from "react";
import Stats from "../ui/stats";
import Feature from "../ui/feature";
import Hero from "./hero";
import Slider from "./Slider";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <>
      <Slider />
      <Hero />
      <Stats />
      <Feature />
      <Testimonials />
    </>
  );
}
