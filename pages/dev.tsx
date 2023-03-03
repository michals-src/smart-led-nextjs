import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { ChatBubbleBottomCenterIcon, HashtagIcon, MapPinIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { ArrowsUpDownIcon, LightBulbIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { Layout, Picker, PickerOption, PickerSelect, Switch, List, Accordion, Input, Button, Slider } from '@components';
import { Translate } from 'react-bootstrap-icons';

const CarouselItem = function Carousel(props: any) {
	const { children } = props;
	return <div className='w-full h-full flex-[1_0_auto]'>{children}</div>;
};

const CarouselIndicator = function Carousel(props: any) {
	const { onClick: onClickCallback, isActive, ...other } = props;
	return (
		<button
			role='button'
			className='p-3 m-0'
			onClick={(e) => onClickCallback(e)}
			{...other}>
			<span
				className={classNames('block w-3 h-3 rounded-full', {
					'bg-orange-400': isActive,
					'bg-zinc-600': !isActive,
				})}
				style={{
					transitionProperty: 'background-color',
					transitionDuration: '0.4s',
					transitionTimingFunction: 'ease',
				}}></span>
		</button>
	);
};

CarouselIndicator.displayName = 'CarouselIndicator';

const CarouselIndicators = function Carousel(props: any) {
	const { onChange: onChangeCallback, length, value } = props;

	const handleChange = (event: any, child: any, childValue: number) => {
		//if (child.props === null || child.props === 'undefined' || !childValue) return;

		const newValue = childValue;
		if (!onChangeCallback || !event || newValue === value) return;

		const nativeEvent = event.nativeEvent || event;
		const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: { value: newValue },
		});

		onChangeCallback?.(clonedEvent, child);
	};

	const items = Array(length)
		.fill(<CarouselIndicator />)
		.map((child, b) => {
			return React.cloneElement(child, {
				onClick: (e: any) => handleChange(e, child, b),
				isActive: b === value,
			});
		});

	return <div className='mt-4 flex flex-row flex-nowrap justify-center'>{items}</div>;
};

CarouselIndicators.displayName = 'CarouselIndicators';

const Carousel = function Carousel(props: any) {
	const { children } = props;

	const [moving, setMoving] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(0);
	const [translation, setTranslation] = useState<number>(0);
	const [offsetLength, setOffsetLength] = useState<number>(0);

	const refWrapper = useRef<any>(null);

	const items = Array.isArray(children) ? children : [children];

	useEffect(() => {
		if (refWrapper.current === null) return;

		setOffsetLength(refWrapper.current.offsetWidth);
	}, [refWrapper]);

	return (
		<div className='touch-pan-x'>
			<div
				ref={refWrapper}
				className='w-full h-auto flex flex-col flex-nowrap flex-1 overflow-hidden'>
				<Slider
					value={translation}
					offset={index}
					offsetInView={offsetLength / 4}
					offsetSize={offsetLength}
					offsetMin={0}
					offsetMax={items.length - 1}
					direction='x'
					onDown={(e: any) => setMoving(true)}
					onMove={(e: any, translate: number) => {
						setTranslation(translate);
					}}
					onLeave={(e: any, offset: number) => {
						console.log(offsetLength * index);
						setMoving(false);
						setIndex(offset);
						setTranslation(0);
					}}>
					<div
						className='flex flex-row flex-nowrap border border-zinc-400'
						style={{
							transitionProperty: 'transform',
							transitionDuration: moving ? '0s' : '0.3s',
							transitionTimingFunction: 'ease',
							transform: `translateX(-${offsetLength * index + translation}px)`,
						}}>
						{children}
					</div>
				</Slider>
				<CarouselIndicators
					onChange={(e) => setIndex(e.target.value)}
					value={index}
					length={items.length}
				/>
			</div>
		</div>
	);
};

function Dev({}: any) {
	const [switchValue, setSwitchValue] = useState<boolean>(false);
	const [value, setValue] = useState<any>('testg');

	return (
		<Layout>
			<div className='py-16'>
				<Carousel>
					<CarouselItem>
						<div className='flex flex-row flex-wrap items-center justify-center'>
							<HashtagIcon className='w-32 h-32' />
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className='flex flex-row flex-wrap items-center justify-center'>
							<MapPinIcon className='w-32 h-32' />
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className='flex flex-row flex-wrap items-center justify-center'>
							<PuzzlePieceIcon className='w-32 h-32' />
						</div>
					</CarouselItem>
				</Carousel>

				<div className='my-16'></div>

				<List>
					<List.Item key={0}>
						<ChatBubbleBottomCenterIcon className='w-6 h-6' />
						<div className='w-full flex-1 px-6 select-none'>
							<p className='text-xs'>Przkładowa lista</p>
						</div>
						<div className='w-8'>
							<Switch
								size='md'
								value={switchValue}
								onChange={(e) => setSwitchValue((s) => !s)}
							/>
						</div>
					</List.Item>
					<List.Item key={1}>
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
					</List.Item>
					<Accordion key={2}>
						<Accordion.Item>
							<Accordion.ItemHeader>
								<List.Item>
									<ArrowsUpDownIcon className='w-6 h-6' />
									<div className='flex-1 pl-6'>
										<p className='text-sm'>List Accordion item</p>
									</div>
								</List.Item>
							</Accordion.ItemHeader>
							<Accordion.ItemCollapse>
								<List.Item>
									<div className='w-full flex-1'>
										<Picker>
											<PickerSelect
												value='0'
												onChange={(e: any) => console.log('wartość: ', e.target.value)}>
												<PickerOption value='0'>0</PickerOption>
												<PickerOption value='1'>1</PickerOption>
												<PickerOption value='2'>2</PickerOption>
												<PickerOption value='3'>3</PickerOption>
												<PickerOption value='4'>4</PickerOption>
												<PickerOption value='5'>5</PickerOption>
												<PickerOption value='6'>6</PickerOption>
											</PickerSelect>
										</Picker>
									</div>
								</List.Item>
							</Accordion.ItemCollapse>
						</Accordion.Item>
						<Accordion.Item>
							<Accordion.ItemHeader>
								<List.Item>
									<ArrowsUpDownIcon className='w-6 h-6' />
									<div className='flex-1 pl-6'>
										<p className='text-sm'>List Accordion item 2</p>
									</div>
								</List.Item>
							</Accordion.ItemHeader>
							<Accordion.ItemCollapse>Jamajca</Accordion.ItemCollapse>
						</Accordion.Item>
						<Accordion.Item>
							<Accordion.ItemHeader>
								<List.Item>
									<ArrowsUpDownIcon className='w-6 h-6' />
									<div className='flex-1 pl-6'>
										<p className='text-sm'>List Accordion item 3</p>
									</div>
								</List.Item>
							</Accordion.ItemHeader>
							<Accordion.ItemCollapse>Maruba</Accordion.ItemCollapse>
						</Accordion.Item>
					</Accordion>
				</List>
				<div className='mt-8'>
					<div className='w-full'>
						<Button
							rounded={true}
							leftIcon={<ChatBubbleBottomCenterIcon />}
							size='sm'></Button>
					</div>
					<div className='w-full mt-6'>
						<Button
							plain={true}
							leftIcon={<XCircleIcon className='text-zinc-400' />}
						/>
					</div>
					<div className='w-full mt-3'>
						<Button
							plain={true}
							rightIcon={<ChatBubbleBottomCenterIcon />}
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
