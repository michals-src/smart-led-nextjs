import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { LightBulbIcon, PaintBrushIcon, PlusIcon } from '@heroicons/react/24/solid';

import { Carousel, Button, Slider, WithLoading, BottomSheet, List, Accordion, Switch } from '@components';
import { SheetChannelSettings } from './sheets';
import { useDispatch, useSelector } from 'react-redux';

import { channel } from '@store/slices/globalSlice';

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

	const [selectedScene, setSelectedScene] = useState(0);
	const [open, setOpen] = useState(false);

	const nodes = Object.values(data).map((node: any, idx: number) => {
		return { ...node, num: idx };
	});
	const nodesColor = Object.values(nodes).filter((props: any) => props.color === true);
	const nodesMono = Object.values(nodes).filter((props: any) => props.color === false);

	const efg = useSelector((state) => state.global.nodes[selectedScene]);
	const channelProps = React.useMemo(() => efg, [selectedScene, efg]);

	//console.log(nodesColor);

	const dispatch = useDispatch();

	const updateStatus = (num, value) => {
		dispatch(channel.update_status(num, value));
	};

	return (
		<>
			<List>
				<Accordion>
					<Accordion.Item>
						<Accordion.ItemHeader>
							<div className='mb-1'>
								<List.Item>
									<div className='flex flex-row flex-nowrap flex-1'>
										<PaintBrushIcon className='w-4 h-4' />
										<div className="flex-1 px-6">
											<p className='text-xs'>Kolory</p>
										</div>
									</div>
								</List.Item>
							</div>
						</Accordion.ItemHeader>
						<Accordion.ItemCollapse>
							<List>
								{nodesColor.map((node: any, idx: number) => {
									return (
										<>
											<List.Item key={React.useMemo(() => uuidv4(), [])}>
												<div
													className='flex-1'
													onClick={() => {
														setSelectedScene(node.num);
														setOpen(true);
													}}>
													<p className='text-xs text-zinc-400'>Kanał {node.num}</p>
												</div>

												<Switch value={node.status} onClick={e => updateStatus(node.num, !node.status)} />
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
									<div className='flex flex-row flex-nowrap flex-1'>
										<LightBulbIcon className='w-4 h-4' />
										<div className="flex-1 px-6">
											<p className='text-xs'>Jednolite</p>
										</div>
									</div>
								</List.Item>
							</div>
						</Accordion.ItemHeader>
						<Accordion.ItemCollapse>
							<List>
								{nodesMono.map((node: any, idx: number) => {
									return (
										<>
											<List.Item key={React.useMemo(() => uuidv4(), [])}>
												<div
													className='flex-1'
													onClick={() => {
														setSelectedScene(node.num);
														setOpen(true);
													}}>
													<p className='text-xs text-zinc-400 '>Kanał {node.num}</p>
												</div>

												<Switch value={node.status} onClick={e => updateStatus(node.num, !node.status)} />
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
					<SheetChannelSettings
						{...channelProps}
						num={selectedScene}
					/>
				</BottomSheet.View>
			</BottomSheet>
		</>
	);
}

export default Items;
