import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React from 'react';

type TColorsColorant = {
	index?: number;
	isActive: boolean;
	value: string;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	size: 'sm' | 'md' | 'lg';
};

const ActiveSymbol = () => {
	return (
		<div className='absolute top-0 left-0 w-full h-full'>
			<div className='w-full h-full flex flex-col items-center justify-center'>
				<CheckCircleIcon className='w-6 h-6 text-white' />
			</div>
		</div>
	);
};

const ColorsColorant = ({ index, isActive, value, onClick, size }: TColorsColorant) => {
	// const handleClick = (hex: string) => {
	//   state(hex);
	// };

	const cnColorant = classNames('rounded-full text-transparent', {
		'w-3 h-3 ': size === 'sm',
		'w-5 h-5 ': size === 'md',
		'w-8 h-8 ': size === 'lg',
	});

	return (
		<>
			<div
				key={index}
				className='w-auto h-auto cursor-pointer relative mb-2 mr-3'>
				<div
					className={cnColorant}
					style={{ backgroundColor: value }}>
					<span className='absolute -top-[99999]'>{value}</span>
				</div>
				{isActive && <ActiveSymbol />}
				<input
					type='radio'
					onClick={onClick}
					value={value}
					className='absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer'
				/>
			</div>
		</>
	);
};

export default ColorsColorant;
