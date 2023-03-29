import type { NextPage } from 'next';
import React, { useContext, useEffect, useRef, useState } from 'react';
// import Image from "next/image";

import { Layout } from '@components';
import HomeGeneral from '@views/home-general';
import HomeScenes from '@views/home-scenes';
import HomeChannels from '@views/home-channels';
//import { HomeChannels } from "@views/home";

// import LampImage from "../images/pietro-piovesan-9UR3Zafm328-unsplash.png";

const Home: NextPage = () => {
	return (
		<Layout>
			<div className='p-4'>
				<HomeGeneral />
				<HomeScenes />
				<HomeChannels />
			</div>
		</Layout>
	);
};

export default Home;
