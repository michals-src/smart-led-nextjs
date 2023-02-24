import React, { useContext, useEffect, useRef, useState, FC } from 'react';
// import Image from "next/image";

import { Layout, Switch } from '@components';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { LightBulbIcon, XCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

// import LampImage from "../images/pietro-piovesan-9UR3Zafm328-unsplash.png";

const List = ({ children }: any) => {
	const items = Array.isArray(children)
		? children.map((child, index) => {
				return (
					<>
						{index >= 1 && child.props?.children !== undefined && (
							<div className='px-5'>
								<div className='w-full h-[1px] bg-white opacity-10'></div>
							</div>
						)}
						{child}
					</>
				);
		  })
		: children;
	return <div className='w-full h-auto bg-zinc-800 rounded-md'>{items}</div>;
};

const ListItem = ({ children }: any) => {
	return <div className='py-3 px-6 flex flex-row flex-nowrap items-center'>{children}</div>;
};

const Input: FC<
	React.HTMLProps<HTMLInputElement> & {
		plain?: boolean;
		size?: 'sm' | 'md' | 'lg';
		onReset?: () => void;
	}
> = ({ plain = false, size = 'md', value: valueProps = null, onReset = null, ...other }: any) => {
	const refInput = useRef<HTMLInputElement>(null);

	return (
		<div className='flex flex-row flex-nowrap items-center relative'>
			<input
				ref={refInput}
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
						<button
							className='table px-3 rounded-full outline-none bg-transparent'
							onClick={() => {
								if (refInput.current) refInput?.current.focus();
								onReset?.();
							}}>
							<XCircleIcon className='w-5 h-5 text-zinc-400' />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const Button: FC<
	React.HTMLProps<HTMLButtonElement> & {
		plain?: boolean;
		size?: 'sm' | 'md' | 'lg';
		leftIcon?: JSX.Element;
		rightIcon?: JSX.Element;
		rounded?: boolean;
	}
> = ({ plain = false, className, children, size = 'md', leftIcon = null, rightIcon = null, rounded = false, ...other }: any) => {
	return (
		<button
			className={classNames(
				'w-auto h-full',
				{
					'bg-zinc-800': !plain,
					'px-3 py-1': !plain && size === 'sm',
					'px-3 py-2': !plain && size === 'md',
					'px-3 py-3': !plain && size === 'lg',
					'rounded-md': !rounded && !plain && (size === 'sm' || size === 'md'),
					'rounded-lg': !rounded && !plain && size === 'lg',
					'rounded-full': rounded,
				},
				className
			)}
			{...other}>
			{/* <button
className='w-full py-1 px-3 rounded-full bg-zinc-800'
onClick={() => handleClick_SceneCreate()}> */}
			<div className='flex flex-row flex-nowrap items-center justify-center relative'>
				{leftIcon && (
					<div className='w-auto h-auto flex flex-col flex-nowrap justify-center'>
						<ChatBubbleBottomCenterIcon
							className={classNames('text-zinc-400', {
								'w-5 h-5': size === 'sm' || size === 'md',
								'w-6 h-6': size === 'lg',
							})}
						/>
					</div>
				)}

				{/* <div className='w-3/12'>
                <PlusIcon className='text-zinc-300 ml-auto w-3 h-3' />
            </div> */}
				{!!children && (
					<div className='px-4'>
						<p className='text-xs text-zinc-400'>{children}</p>
					</div>
				)}
			</div>
		</button>
	);
};

function Dev({}: any) {
	const [switchValue, setSwitchValue] = useState<boolean>(false);
	const [value, setValue] = useState<any>('testg');

	return (
		<Layout>
			<div className='py-16'>
				<List>
					<ListItem>
						<ChatBubbleBottomCenterIcon className='w-6 h-6' />
						<div className='flex-1 px-6'>
							<p className='text-xs'>Przkładowa lista</p>
						</div>
						<Switch
							value={switchValue}
							onChange={(e) => setSwitchValue((s) => !s)}
						/>
					</ListItem>
					<ListItem>
						<LightBulbIcon className='w-6 h-6' />
						<div className='flex-1 pl-6'>
							<Input
								plain={true}
								type='text'
								size='sm'
								placeholder='Wartość'
								value={value}
								onChange={(e: any) => setValue(e.target.value)}
								onReset={() => setValue('')}
							/>
						</div>
					</ListItem>
				</List>
				<div className='mt-8'>
					<div className='w-full'>
						<Button
							leftIcon={<ChatBubbleBottomCenterIcon />}
							size='sm'></Button>
					</div>
					<div className='w-full mt-3'>
						<Button
							leftIcon={<ChatBubbleBottomCenterIcon />}
							size='sm'>
							Przycisk
						</Button>
					</div>
					<div className='w-full my-3'>
						<Button
							leftIcon={<ChatBubbleBottomCenterIcon />}
							size='md'>
							Przycisk
						</Button>
					</div>
					<div className='w-full'>
						<Button
							leftIcon={<ChatBubbleBottomCenterIcon />}
							size='lg'>
							Przycisk
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Dev;
