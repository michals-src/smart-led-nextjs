import React, { useState } from 'react';

import { HandRaisedIcon } from '@heroicons/react/24/solid';

import { Accordion, Picker, PickerSelect, PickerOption } from '@components';
import { colors } from '@utils';

export default function ModuleOperationMode() {
	const [tryb, setTryb] = useState('ręczny');

	return (
		<div className='w-full flex-1'>
			<Accordion>
				<Accordion.Item>
					<Accordion.ItemHeader>
						<div className='mb-1 flex flex-row flex-nowrap'>
							<HandRaisedIcon className='w-4 h-4' />
							<div className='flex flex-col flex-nowrap flex-1 px-6'>
								<p className='text-xs 0'>Tryb pracy</p>
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
}
