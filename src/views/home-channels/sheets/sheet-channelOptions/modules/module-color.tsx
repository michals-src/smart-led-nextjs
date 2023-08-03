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

export default function ModuleColor(props: { value: typeof colors; onClick: React.MouseEventHandler }) {
	const { value: valueProps, onClick: handleClick } = props;

	return (
		<>
			<Cog6ToothIcon className='w-4 h-4 text-white mx-auto' />
			<div className='flex-1 px-6'>
				<div className='flex flex-col flex-nowrap'>
					<div>
						<p className='text-sm'>Kolor</p>
						<p className='text-xs text-zinc-500'>Działanie tylko w trybie manualnym</p>
					</div>
					<div className='mt-4'>
						<Coolors
							align='start'
							value={valueProps}
							onClick={handleClick}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
