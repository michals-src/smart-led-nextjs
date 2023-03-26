import React, { Ref } from 'react';

type Props = {};

import { useContext, useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { load_scenery } from '@store/slices/globalSlice'

import { update, ref } from 'firebase/database';
import dv from '@firebase';

import { CheckCircleIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon, ArrowLongRightIcon, ArrowUpIcon, ClockIcon, LightBulbIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ArrowDown, ArrowUp, Type } from 'react-bootstrap-icons';

import { BottomSheet, Box, Input, List, Switch, WithLoading } from '@components';

//import { popupSceneChildView, popupSceneChildCreate } from "../";

import { colors, timeAstimestamp, timestampAstime, timeAsText } from '@utils';

const SceneItems = function SceneItems(props: any) {

	const { data } = props;

	return (
		<div>{data}</div>
	)
}

const SceneSettings = forwardRef((props: any, ref: Ref<any>) => {
	const { id: ID = 0, childrenID, name: nameProps, related: relatedDefault } = props;


	const [name, setName] = useState(nameProps);
	const [related, setRelated] = useState(relatedDefault);

	const dispatch = useDispatch();

	const handleClick_Switch = () => {
		setRelated(!related);
	};

	return (
		<>
			<BottomSheet.Content
				title={nameProps}
				onClose={() => props.close()}>
				<div ref={ref}>
					<div className='mb-8'>
						<List>
							<List.Item>
								<CheckCircleIcon className='w-6 h-6 text-white' />
								<div className="flex-1 px-6">
									<p className='text-sm'>Status</p>
								</div>
								<Switch
									value={related}
									onClick={() => handleClick_Switch()}
									size='lg'
								/>
							</List.Item>
							<List.Item>
								<Type
									size={20}
									className='w-6 h-6 text-white mx-auto'
								/>
								<div className='flex-1 pl-6'>
									<Input
										plain={true}
										type='text'
										size='sm'
										placeholder='Wartość'
										value={name}
										onChange={(e: any) => setName(e.target.value)}
										onReset={() => setName('')}
									/>
								</div>
							</List.Item>
						</List>
					</div>

					<div className='mt-8 mb-3'>
						<div className='mb-1 pl-3'>
							<p className='text-sm text-zinc-400'>Przejścia</p>
						</div>
						<div className='py-2 px-4 bg-zinc-800 rounded-md'>
							<div className='flex flex-row flex-nowrap items-center'>
								<div className='w-8/12'>
									<div>
										<p className='text-xs text-zinc-400'>Brak</p>
									</div>
								</div>
								<div className='w-4/12 pl-8'>
									<button className='w-auto table p-1 ml-auto rounded-full bg-zinc-700'>
										<div>
											<PlusIcon className='text-zinc-100 ml-auto w-3 h-3' />
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-8 mb-3'>
						<div className='mb-1 pl-3'>
							<p className='text-sm text-zinc-400'>Przejścia</p>
						</div>
						<div className='py-2 px-4 bg-zinc-800 rounded-md'>
							<div className='flex flex-row flex-nowrap items-center'>
								<div className='w-4/12'>
									<div>
										<p className='text-xs text-zinc-400'>19:00</p>
									</div>
								</div>
								<div className='w-8/12 pl-8'>
									<div className='flex flex-row flex-nowrap items-center justify-end'>
										<button className='w-auto table p-1 mx-4 rounded-md bg-zinc-700'>
											<div className='flex flex-row flex-nowrap items-center justify-center'>
												<ArrowDownIcon className='text-zinc-100 ml-auto w-3 h-3' />
											</div>
										</button>
										<button className='w-auto table p-1 rounded-md bg-zinc-700'>
											<div>
												<ArrowUpIcon className='text-zinc-100 ml-auto w-3 h-3' />
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<WithLoading path={`scenesChildren/${childrenID}`} onLoad={(value: any) => {
						dispatch(load_scenery({
							id: childrenID,
							data: value
						}))
					}}>
						<SceneItems />
					</WithLoading>

				</div>
			</BottomSheet.Content>
		</>
	);
});

SceneSettings.displayName = 'SceneSettings';

export default SceneSettings;
