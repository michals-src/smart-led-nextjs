import React, { useRef, FC, HTMLInputTypeAttribute, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@components';

export type InputProps = {
	plain?: boolean;
	size?: 'sm' | 'md' | 'lg';
	onReset?: () => void;
};

const Input = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement> & InputProps>(function Input(props, ref) {
	const { plain = false, size, value: valueProps = undefined, onReset = null, ...other } = props;
	const refInput = useRef<HTMLInputElement>(null);

	return (
		<div className='flex flex-row flex-nowrap items-center relative'>
			<input
				ref={(element) => {
					(refInput as React.MutableRefObject<HTMLInputElement | null>).current = element;
					if (typeof ref === 'function') ref(element);
					else if (ref) ref.current = element;
				}}
				className={classNames('w-full h-auto placeholder:text-zinc-500 text-zinc-300 bg-zinc-800 text-sm outline-none flex-1', {
					'border border-zinc-600': !plain,
					'hover:border-zinc-500': !plain,
					'focus:border-zinc-400': !plain,
					'px-4 py-1 text-sm rounded-md': !plain && size === 'sm',
					'px-4 py-2 text-md rounded-lg': !plain && size === 'md',
					'px-4 py-3 text-lg rounded-lg': !plain && size === 'lg',
					'pr-12': onReset !== null,
				})}
				value={valueProps}
				{...other}
			/>
			{valueProps && onReset && (
				<div className='w-auto h-full absolute top-0 right-0'>
					<div className='w-full h-full flex flex-col flex-nowrap justify-center'>
						<Button
							onClick={() => {
								if (refInput.current !== null) refInput?.current.focus();
								onReset?.();
							}}
							plain={true}
							leftIcon={<XCircleIcon className='text-zinc-400' />}
						/>
					</div>
				</div>
			)}
		</div>
	);
});

Input.displayName = 'Input';

export default Input;
