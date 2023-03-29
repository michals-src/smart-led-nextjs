import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { PlusIcon } from '@heroicons/react/24/solid';

import { Carousel, Button, Slider, WithLoading, BottomSheet, List, Accordion, Switch } from '@components';
import { SheetChannelSettings } from './sheets';

const Item = function Item(props: any) {
	const {
		id,
		scene: { name, childrenID },
	} = props;

	return (
		<div className='select-none mr-1 w-auto table py-1 px-4 bg-zinc-800 rounded-3xl'>
			<div className=' text-xs text-zinc-300'>{name}</div>
		</div>
	);
};

function Items(props: any) {
	const { data } = props;

	const [selectedScene, setSelectedScene] = useState({});
	const [open, setOpen] = useState(false);

	const nodes = Object.values(data).map((node: any, idx: number) => {
		return { ...node, num: idx };
	});
	const nodesColor = Object.values(nodes).filter((props: any) => props.color === true);
	const nodesMono = Object.values(nodes).filter((props: any) => props.color === false);

	console.log(nodesColor);

	return (
		<>
			<List>
				<Accordion>
					<Accordion.Item>
						<Accordion.ItemHeader>
							<div className='mb-1'>
								<List.Item>
									<div className='flex flex-col flex-nowrap flex-1'>
										<p className='text-xs text-zinc-400'>Kolory</p>
										<p className='text-xs '>Odbiorniki rgb</p>
									</div>
								</List.Item>
							</div>
						</Accordion.ItemHeader>
						<Accordion.ItemCollapse>
							<List>
								{nodesColor.map((node: any, idx: number) => {
									return (
										<>
											<List.Item key={uuidv4()}>
												<div
													className='flex-1'
													onClick={() => {
														setSelectedScene(node);
														setOpen(true);
													}}>
													<p className='text-sm '>Kanał {node.num}</p>
												</div>

												<Switch />
											</List.Item>
										</>
									);
								})}
							</List>
						</Accordion.ItemCollapse>
					</Accordion.Item>
				</Accordion>

				<Accordion>
					<Accordion.Item>
						<Accordion.ItemHeader>
							<div className='mb-1'>
								<List.Item>
									<div className='flex flex-col flex-nowrap flex-1'>
										<p className='text-xs text-zinc-400'>Jednolite</p>
										<p className='text-xs '>Światło białe</p>
									</div>
								</List.Item>
							</div>
						</Accordion.ItemHeader>
						<Accordion.ItemCollapse>
							<List>
								{nodesMono.map((node: any, idx: number) => {
									return (
										<>
											<List.Item key={uuidv4()}>
												<p className='text-sm flex-1'>Kanał {node.num}</p>
												<Switch />
											</List.Item>
										</>
									);
								})}
							</List>
						</Accordion.ItemCollapse>
					</Accordion.Item>
				</Accordion>
			</List>

			<BottomSheet
				open={open}
				onClose={() => setOpen(false)}>
				<BottomSheet.View root='true'>
					<SheetChannelSettings {...selectedScene} />
				</BottomSheet.View>
			</BottomSheet>
		</>
	);
}

export default Items;
