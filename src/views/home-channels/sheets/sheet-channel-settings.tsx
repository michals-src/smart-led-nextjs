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
	const { status, value, color, brightness: brightnessProps, num, onClick: onClickProps } = props;

	const [brightness, setBrightness] = useState(brightnessProps);

	const dispatch = useDispatch();

	const updateStatus = (e) => {
		dispatch(channel.update_status(num, !status));
	};

	const updateBrightness = (e) => {
		dispatch(channel.update_brightness(num, e.target.value));
	};

	return (
		<>
			<BottomSheet.Content
				title='Ustawienia kanału'
				onClose={props.close}>
				<List>
					<List.Item>
						<ModuleStatus
							value={status}
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
					<List>
						<List.Item>
							<div className='w-full flex-1'>
								<div className='py-3 flex flex-row nowrap items-center'>
									<SunIcon className='w-4 h-4 text-white' />
									<div className='flex-1 px-6'>
										<p className='text-sm'>Jasność</p>
									</div>
									<p className='text-xs text-zinc-400'>{brightness} %</p>
								</div>
								<div className='w-full flex-1'>
									<Range
										onMouseUp={(e) => updateBrightness(e)}
										onTouchEnd={(e) => updateBrightness(e)}
										onChange={(e) => setBrightness(e.target.value)}
										value={brightness}
										size='lg'
										thumb={false}
									/>
								</div>
							</div>
						</List.Item>
					</List>
				</div>
			</BottomSheet.Content>
		</>
	);
};

export default SheetChannelSettings;
