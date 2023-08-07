import React, { Dispatch, ReactElement, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import db from '@firebase';
import { ref, child, get, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

import { SunIcon } from '@heroicons/react/24/solid';

import { BottomSheet, List, Range } from '@components';

import { useDispatch } from 'react-redux';
import { channel } from '@store/slices/globalSlice';

import { ModuleColor, ModuleOperationMode, ModuleStatus } from './modules';
import { colors } from '@utils';

const SheetChannelOptions = function (props: {
	status: boolean;
	value: string;
	color: boolean;
	brightness: number;
	num: number;
	onClick: React.MouseEventHandler<HTMLInputElement>;
}) {
	const { status, value: valueProps, color, brightness: brightnessProps, num, onClick: onClickProps } = props;

	const [brightness, setBrightness] = useState<number>(brightnessProps);

	const dispatch = useDispatch();

	const updateStatus = (e: React.SyntheticEvent<HTMLInputElement>) => {
		dispatch<any>(channel.update_status(num, !status));
	};

	const updateColor = (e: React.SyntheticEvent<HTMLInputElement>) => {
		// console.log(e.target.value);
		dispatch<any>(channel.update_value(num, e.currentTarget.value));
	};

	const updateBrightness = (e: React.SyntheticEvent<HTMLInputElement>) => {
		dispatch<any>(channel.update_brightness(num, e.currentTarget.value));
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
										onMouseUp={(e: React.SyntheticEvent<HTMLInputElement>) => updateBrightness(e)}
										onTouchEnd={(e: React.SyntheticEvent<HTMLInputElement>) => updateBrightness(e)}
										onChange={(e: React.SyntheticEvent<HTMLInputElement>) => setBrightness(+e.currentTarget.value)}
										value={brightness}
										variant='lg'
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
