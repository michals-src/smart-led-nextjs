import classNames from 'classnames';
import React, { forwardRef, ReactNode, Ref } from 'react';

type SwitchProps = {
	value?: boolean;
	onClick?: React.MouseEventHandler;
	onChange?: React.ChangeEventHandler;
	style?: React.CSSProperties;
	size?: 'sm' | 'md' | 'lg';
	orientation?: 'vertical' | 'horizontal';
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref): JSX.Element => {
	const { value, onClick, onChange, style, size = 'md', orientation = 'horizontal' } = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target) return;
		e.target.focus();
		if (typeof onChange !== 'undefined') onChange(e);
	};

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		if (!e.currentTarget) return;
		e.currentTarget.focus();
		if (typeof onClick !== 'undefined') onClick(e);
	};

	const wrapperCn = classNames('switch relative cursor-pointer bg-[#00000040]', {
		'w-6 h-3 rounded-md': size == 'sm',
		'w-8 h-4 rounded-lg': size == 'md',
		'w-12 h-6 rounded-xl': size == 'lg',
	});

	const thumbCn = classNames('switch-thumb rounded-full bg-white', {
		'w-3 h-3': size == 'sm',
		'w-4 h-4': size == 'md',
		'w-6 h-6': size == 'lg',
	});

	return (
		<div
			className={wrapperCn}
			attr-checked={`${value}`}>
			<div className={thumbCn}></div>
			<input
				ref={ref}
				type='checkbox'
				className='switch-checkbox'
				checked={value}
				onClick={handleClick}
				onChange={handleChange}
			/>
		</div>
	);
});

Switch.displayName = 'Switch';

export default Switch;
