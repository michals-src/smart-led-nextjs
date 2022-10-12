import type { NextPage } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
// import Image from "next/image";

import { Layout } from "@components";
import { HomeGeneral, HomeChannels } from "@views/home";

// import LampImage from "../images/pietro-piovesan-9UR3Zafm328-unsplash.png";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='p-4'>
        <HomeGeneral />
        <HomeChannels />
      </div>
    </Layout>
  );
};

export default Home;
