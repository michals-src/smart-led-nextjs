import React from 'react';

import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import { Coolors } from '@components';

export default function ModuleColor(props: { value: string; onClick: React.MouseEventHandler<HTMLInputElement> }) {
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
