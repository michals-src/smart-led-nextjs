import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
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

import { default as popupContext } from '../../context/popup/popupContext';
import { Box, Palette, Slider, LoaderCircle, Switch, List, Accordion } from '@components';
import Coolors from 'src/components/Colors/coolors';
import { colors } from '@utils';

import classNames from 'classnames';

import { PlusIcon } from '@heroicons/react/24/solid';
import { Carousel, Button, WithLoading } from '@components';
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
