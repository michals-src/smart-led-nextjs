import React from 'react';
import classNames from 'classnames';

import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Button = function (props: {
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	text: string | JSX.Element;
	onClick?: () => void;
}) {
	const { leftIcon, rightIcon, text = 'Zamknij', onClick: handleClick = null } = props;

	const Icon = function ({ children }: { children: React.ReactNode }) {
		return (
			<div className='w-3/12'>
				<div className='flex flex-row flex-nowrap justify-cente px-1'>{children}</div>
			</div>
		);
	};

	return (
		<button
			className={classNames('text-zinc-400 table', 'hover:text-zinc-100')}
			onClick={(e) => (handleClick ? handleClick() : null)}>
			<div className='flex flex-row flex-nowrap items-center justify-center'>
				{leftIcon && <Icon>{leftIcon}</Icon>}
				<div
					className={classNames('mx-auto', {
						'w-9/12': leftIcon || rightIcon,
						'w-full': !leftIcon && !rightIcon,
					})}>
					<div className='block mx-2'>
						<p className='text-xs text-inherit '>{text}</p>
					</div>
				</div>
				{rightIcon && <Icon>{rightIcon}</Icon>}
			</div>
		</button>
	);
};

function BottomSheetHeader(props: {
	icon?: JSX.Element;
	title: string;
	separate: boolean;
	save?: boolean;
	onBack?: () => void;
	onSave?: () => void;
	onClose?: () => void;
}) {
	const { title, separate, save, onBack, onSave, onClose } = props;

	const styles = classNames('p-4 md:px-8 pb-6 border-b', {
		'bg-zinc-800': separate,
		'border-[#FFFFFF11]': separate,
		'border-b-transparent': !separate,
	});

	return (
		<div className={`popup-header ${styles}`}>
			<div className='flex flex-row flex-nowrap items-center select-none'>
				<div className='w-3/12'>
					<div className='flex flex-row flex-nowrap justify-start'>
						{/* <div className='px-3'> */}
						{onBack && (
							<Button
								leftIcon={<ChevronLeftIcon className='w-3 h-3 text-inherit mx-auto block' />}
								text='Powrót'
								onClick={onBack}
							/>
						)}

						{onClose && onSave && (
							<Button
								text='Anuluj'
								onClick={onClose}
							/>
						)}

						{/* <button
              className='text-zinc-400 table mx-auto'
              onClick={() => (onBack ? onBack() : "")}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-3/12'>
                  <ChevronLeftIcon className='w-3 h-3 text-inherit' />
                </div>
                <div className='w-9/12'>
                  <div className='px-1'>
                    <p className='text-xs text-inherit'>Powrót</p>
                  </div>
                </div>
              </div>
            </button> */}
						{/* </div> */}
					</div>
				</div>
				<div className='w-6/12'>
					<div className='px-8 text-center'>
						<p className='text-xs font-bold select-none'>{title}</p>
					</div>
				</div>
				<div className='w-3/12'>
					<div className='flex flex-row flex-nowrap justify-end'>
						{onClose && !onSave && (
							<Button
								text='Zamknij'
								rightIcon={<XMarkIcon className='w-3 h-3 text-inherit mx-auto block' />}
								onClick={onClose}
							/>
						)}
						{onSave && (
							<Button
								text='Zapisz'
								onClick={onSave}
							/>
						)}
					</div>

					{/* {!!(save === false) && (
                        <button
                            className='w-full p-0 m-0'
                            onClick={() => onClose ? onClose() : ''}>
                            <div className='w-auto ml-auto table p-1 bg-zinc-700 rounded-full'>
                            <XMarkIcon className='w-5 h-5 text-zinc-400' />
                            </div>
                        </button>
                    )} */}

					{/* {save && (
                        <button
                            className='text-zinc-400 table mx-auto'
                            onClick={() => onSave ? onSave : ''}>
                            <div className='flex flex-row flex-nowrap items-center justify-center'>
                                <div className='w-full'>
                                    <div className='px-1'>
                                        <p className='text-xs text-inherit'>Zapisz</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    )} */}
				</div>
			</div>
		</div>
	);
}

BottomSheetHeader.displayName = 'BottomSheetHeader';

export default BottomSheetHeader;
