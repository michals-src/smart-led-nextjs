import React from 'react';

import { BoltIcon } from '@heroicons/react/24/solid';

import { Switch } from '@components';
import { colors } from '@utils';

export default function ModuleStatus(props: { value: boolean; onClick: React.MouseEventHandler<HTMLInputElement> }) {
	const { value: valueProps, onClick } = props;

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
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
				onClick={(e: React.MouseEvent<HTMLInputElement>) => handleClick(e)}
				size='lg'
			/>
		</>
	);
}
