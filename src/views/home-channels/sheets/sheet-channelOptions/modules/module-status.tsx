import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import db from '@firebase';
import { ref, child, get, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
	ArrowRightIcon,
	BoltIcon,
	ClockIcon,
	Cog6ToothIcon,
	HandRaisedIcon,
	LightBulbIcon,
	SunIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid';

import {
	Box,
	Palette,
	Slider,
	LoaderCircle,
	Switch,
	BottomSheet,
	List,
	Accordion,
	Picker,
	PickerSelect,
	PickerOption,
	Range,
	Coolors,
} from '@components';
import { colors } from '@utils';

import { useDispatch, useSelector } from 'react-redux';
import { channel } from '@store/slices/globalSlice';

export default function ModuleStatus(props) {
	const { value: valueProps, onClick } = props;

	const handleClick = (e) => {
		onClick?.(e);
	};

	return (
		<>
			<BoltIcon className='w-4 h-4 text-white' />
			<div className='flex-1 px-6'>
				<p className='text-sm'>Status</p>
			</div>
			<Switch
				value={valueProps}
				onClick={(e) => handleClick(e)}
				size='lg'
			/>
		</>
	);
}
