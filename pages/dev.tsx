import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { ChatBubbleBottomCenterIcon, HashtagIcon, MapPinIcon, PuzzlePieceIcon, StarIcon } from '@heroicons/react/24/outline';
import { ArrowsUpDownIcon, LightBulbIcon, PlusIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { Carousel, Layout, Picker, PickerOption, PickerSelect, Switch, List, Accordion, Input, Button, Slider } from '@components';

function Dev({ }: any) {
	const [switchValue, setSwitchValue] = useState<boolean>(false);
	const [value, setValue] = useState<any>('testg');

	return (
		<Layout>
			<div className='py-16'>
				<div className="mb-10">
					<div className="flex flex-row flex-nowrap items-end justify-between w-full">
						<div>
							<div className="text-xs text-zinc-400">Widok</div>
							<div className="text-sm font-bold">Scenariusze</div>
						</div>
						<div>
							<Button
								plain={true}
							>
								<div className="bg-zinc-800 rounded-full p-1">
									<PlusIcon className='text-zinc-300 h-4' />
								</div>
							</Button>
						</div>
					</div>
				</div>
				<Carousel>
					<Carousel.Item onClick={() => alert('a')}>
						<div className='select-none mr-1 w-auto table py-1 px-4 border border-zinc-600 rounded-3xl'>
							<div className=" text-xs text-zinc-300">Ciepłe kolory</div>
						</div>
					</Carousel.Item>
					<Carousel.Item onClick={() => alert('b')} >
						<div className='select-none mr-1 w-auto table py-1 px-4 rounded-3xl'>
							<div className=" text-xs text-zinc-400">wiosna</div>
						</div>
					</Carousel.Item>
					<Carousel.Item onClick={() => alert('c')}>
						<div className='select-none mr-1 w-auto table py-1 px-4 rounded-3xl'>
							<div className="text-xs text-zinc-400">Lato</div>
						</div>
					</Carousel.Item>
					<Carousel.Item onClick={() => alert('d')}>
						<div className='select-none w-auto table py-1 px-4 rounded-3xl'>
							<div className="text-xs text-zinc-400">jesień</div>
						</div>
					</Carousel.Item>
					<Carousel.Item onClick={() => alert('e')}>
						<div className='select-none w-auto table py-1 px-4 rounded-3xl'>
							<div className="text-xs text-zinc-400">zima</div>
						</div>
					</Carousel.Item>
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
