import React from 'react';
import { WithLoading } from '@components';
import Items from './items';

import { load_channels } from '@store/slices/globalSlice';
import { useDispatch } from 'react-redux';

const HomeChannels = (props: any) => {
	const dispatch = useDispatch();

	return (
		<>
			<div className='mt-8 mb-1'>
				<p className='text-xs font-bold'>Zarządzanie kanałami</p>
			</div>
			<WithLoading
				path='nodes'
				onLoad={(value: any) => dispatch(load_channels(value))}>
				<Items />
			</WithLoading>
		</>
	);
};

export default HomeChannels;
