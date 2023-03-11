import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { PlusIcon } from '@heroicons/react/24/solid';
import { Carousel, Button, Slider } from '@components';

export default function HomeScenes(props: any) {
	return (
		<>
			<div className='mt-10 mb-3'>
				<div className='flex flex-row flex-nowrap items-end justify-between w-full'>
					<div>
						<div className='text-xs text-zinc-400'>Widok</div>
						<div className='text-xs font-bold'>Scenariusze</div>
					</div>
					<div>
						<Button rounded={true}>
							<PlusIcon className='text-zinc-300 h-4' />
						</Button>
					</div>
				</div>
			</div>
			<Carousel>
				<Carousel.Item onClick={() => alert('a')}>
					<div className='select-none mr-1 w-auto table py-1 px-4 bg-zinc-800 rounded-3xl'>
						<div className=' text-xs text-zinc-300'>Ciepłe kolory</div>
					</div>
				</Carousel.Item>
				<Carousel.Item onClick={() => alert('b')}>
					<div className='select-none mr-1 w-auto table py-1 px-4 rounded-3xl'>
						<div className=' text-xs text-zinc-400'>wiosna</div>
					</div>
				</Carousel.Item>
				<Carousel.Item onClick={() => alert('c')}>
					<div className='select-none mr-1 w-auto table py-1 px-4 rounded-3xl'>
						<div className='text-xs text-zinc-400'>Lato</div>
					</div>
				</Carousel.Item>
				<Carousel.Item onClick={() => alert('d')}>
					<div className='select-none w-auto table py-1 px-4 rounded-3xl'>
						<div className='text-xs text-zinc-400'>jesień</div>
					</div>
				</Carousel.Item>
				<Carousel.Item onClick={() => alert('e')}>
					<div className='select-none w-auto table py-1 px-4 rounded-3xl'>
						<div className='text-xs text-zinc-400'>zima</div>
					</div>
				</Carousel.Item>
			</Carousel>
		</>
	);
}
