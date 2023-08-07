import classNames from 'classnames';
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';

export type RangeProps = {
	//value?: number;
	// value?: React.Dispatch<React.SetStateAction<number>>;
	//onChange?: React.ChangeEventHandler<HTMLInputElement>;
	//onClick?: React.MouseEventHandler<HTMLInputElement>;
	step?: number;
	thumb?: boolean;
	track?: boolean;
	variant?: 'sm' | 'md' | 'lg';
};

const Range = forwardRef<HTMLInputElement, RangeProps & React.HTMLProps<HTMLInputElement>>(
	({ value = 0, onChange, onClick, step, thumb = true, variant = 'md', track = true, ...other }, ref) => {
		const progressRef = useRef<HTMLDivElement>(null);
		const thumbRef = useRef<HTMLDivElement>(null);
		const [range, setRange] = useState<typeof value>(value ? value : 0);

		const cnPlaceholder = classNames('slider--placeholder', {
			'h-1': variant === 'sm',
			'h-3': variant === 'md',
			'h-6': variant === 'lg',
		});

		const cnThumb = classNames('slider--thumb', {
			'w-2 h-2': variant === 'sm',
			'w-4 h-4': variant === 'md',
			'w-7 h-7': variant === 'lg',
		});

		useEffect(() => {
			if (progressRef.current == null || thumbRef.current == null) return;

			progressRef.current.style.width = `${value}%`;
			thumbRef.current.style.width = `${value}%`;
		}, [value]);

		const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
			if (!e.currentTarget) return;
			onClick?.(e);
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!e.target) return;
			e.target.focus();
			setRange(parseInt(e.target.value, 10));
			// if (typeof onChange !== 'undefined')
			onChange?.(e);
		};

		return (
			<div className='slider w-full touch-none'>
				<div className={cnPlaceholder}>
					<div
						ref={progressRef}
						className={`slider--progress ${!track ? 'opacity-0' : ''}`}></div>
				</div>
				<div
					ref={thumbRef}
					className='slider--thumb--wrapper'>
					{thumb && (
						<div
							ref={thumbRef}
							className={cnThumb}></div>
					)}
				</div>

				<input
					type='range'
					className='slider--input w-full touch-pan-x'
					value={value}
					onClick={handleClick}
					onChange={handleChange}
					ref={ref}
					step={step}
					{...other}
				/>
			</div>
		);
	}
);

Range.displayName = 'Range';

export default Range;
