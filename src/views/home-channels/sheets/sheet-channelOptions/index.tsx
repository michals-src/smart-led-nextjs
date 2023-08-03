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

import { ModuleColor, ModuleOperationMode, ModuleStatus } from './modules';

const SheetChannelOptions = function (props: any) {
	const { status, value: valueProps, color, brightness: brightnessProps, num, onClick: onClickProps } = props;

	const [brightness, setBrightness] = useState(brightnessProps);

	const dispatch = useDispatch();

	const updateStatus = (e) => {
		dispatch(channel.update_status(num, !status));
	};

	const updateColor = (e) => {
		console.log(e.target.value);
		dispatch(channel.update_value(num, e.target.value));
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
							<ModuleColor
								value={valueProps}
								onClick={updateColor}
							/>
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

export default SheetChannelOptions;
