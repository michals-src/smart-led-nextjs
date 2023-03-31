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
} from '@components';
import Coolors from 'src/components/Colors/coolors';
import { colors } from '@utils';

import { useDispatch, useSelector } from 'react-redux';
import { channel } from '@store/slices/globalSlice';

const ModuleStatus = function (props) {
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
};

const ModuleColor = function () {
	const [color, setColor] = useState(colors[0]);

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
							value={color}
							onClick={(e) => setColor((e.target as HTMLInputElement)?.value)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const ModuleOperationMode = function () {
	const [tryb, setTryb] = useState('ręczny');

	return (
		<div className='w-full flex-1'>
			<Accordion>
				<Accordion.Item>
					<Accordion.ItemHeader>
						<div className='mb-1 flex flex-row flex-nowrap'>
							<HandRaisedIcon className='w-4 h-4' />
							<div className='flex flex-col flex-nowrap flex-1 px-6'>
								<p className='text-xs 0'>Tryb pray</p>
							</div>
							<p className='text-xs text-zinc-400'>{tryb}</p>
						</div>
					</Accordion.ItemHeader>
					<Accordion.ItemCollapse>
						<div className='flex-1'>
							<Picker>
								<PickerSelect
									value={tryb}
									onChange={(e) => setTryb((e.target as HTMLInputElement).value)}>
									<PickerOption value='ręczny'>Ręczny</PickerOption>
									<PickerOption value='automatyczny'>Według sceny</PickerOption>
								</PickerSelect>
							</Picker>
						</div>
					</Accordion.ItemCollapse>
				</Accordion.Item>
			</Accordion>
		</div>
	);
};

const SheetChannelSettings = (props: any) => {
	const { status, value, color, brightness, num, onClick: onClickProps } = props;
	//const { num, onClick: onClickProps } = props;

	//const channelProps = useSelector((state) => state.global.nodes[num]);
	//const { status, value, color, brightness } = channelProps;

	const [abc, setAbc] = useState(false);

	const dispatch = useDispatch();

	const updateStatus = (e) => {
		setAbc(!abc);
		onClickProps?.(!abc);
		//dispatch(channel.update_status(num, !status));
	};

	return (
		<>
			<BottomSheet.Content
				title='Ustawienia kanału'
				onClose={props.close}>
				<List>
					<List.Item>
						<ModuleStatus
							value={abc}
							onClick={updateStatus}
						/>
					</List.Item>
					{!!color && (
						<List.Item>
							<ModuleColor />
						</List.Item>
					)}

					<List.Item>
						<ModuleOperationMode />
					</List.Item>
				</List>

				{/* <div className='mt-12 mb-4'>
        <div className='flex flex-row flex-nowrap items-top'>
          <div className='w-8/12'>
            <div className='mb-1'>
              <p className='text-4xl font-bold'>Konfiguracja</p>
            </div>
          </div>
          <div className='w-4/12 pl-8'>
            <div className='w-auto table ml-auto rounded-full'>
              <div>
                <Cog6ToothIcon className='text-zinc-100 ml-auto w-8 h-8' />
              </div>
            </div>
          </div>
        </div>
        <p className='text-xs text-zinc-500'>Konfigurowanie pracy ręcznej</p>
      </div> */}

				<div className='my-6'>
					<Box>
						<>
							<div className='p-4 flex flex-row nowrap items-center'>
								<div className='w-2/12'>
									<SunIcon className='w-6 h-6 text-white mx-auto' />
								</div>
								<div className='w-8/12 pl-4 pr-8'>
									<p className='text-sm'>Jasność</p>
								</div>
								<div className='w-2/12'>
									<p className='text-xs'>100 %</p>
								</div>
							</div>
							<div className='w-full'>
								<Slider
									size='lg'
									thumb={false}
								/>
							</div>
						</>
					</Box>
				</div>
			</BottomSheet.Content>
		</>
	);
};

export default SheetChannelSettings;
