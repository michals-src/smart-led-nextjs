import React, { Ref } from 'react';

type Props = {};

import { useContext, useState, forwardRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { update, ref } from 'firebase/database';
import dv from '@firebase';

import { CheckCircleIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon, ArrowLongRightIcon, ArrowUpIcon, ClockIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ArrowDown, ArrowUp, Type } from 'react-bootstrap-icons';

import { BottomSheet, Box, Switch } from '@components';
import popupContext from '@context/popup/popupContext';

//import { popupSceneChildView, popupSceneChildCreate } from "../";

import { colors, timeAstimestamp, timestampAstime, timeAsText } from '@utils';

const SceneSettings = forwardRef((props: any, ref: Ref<any>) => {
	const { id: ID = 0, childrenId: childrenID, name, related: relatedDefault } = props;
	const popupCtx = useContext(popupContext);

	const [related, setRelated] = useState(relatedDefault);
	const [openChangeTitle, setOpenChangeTitle] = useState(false);
	const sceneChildren = useSelector((state: any) => state.scenes.children[state.scenes.items[ID].childrenID]);

	const handleClick_Item = (index: any) => {
		// popupCtx.onUpdatePopupScreenIndex(2);
	};

	const handleClick_Switch = () => {
		setRelated(!related);
	};

	const handleClick_newItem = (time_previous = '0:00', time_next = '24:00') => {
		// popupCtx.onUpdatePopupScreenData([
		//   {
		//     time_prev: "18:00",
		//     time_next: "20:00",
		//   },
		// ]);
		// popupCtx.onUpdatePopupScreenIndex(3);
	};

	useEffect(() => {
		console.log(sceneChildren);
		return () => {};
	}, [sceneChildren]);

	return (
		<>
			<BottomSheet.Content
				title={name}
				onClose={() => props.close()}>
				<div ref={ref}>
					<div className='mb-8'>
						<div className='flex flex-row flex-nowrap items-center'>
							<div className='w-1/12'>
								<CheckCircleIcon className='w-6 h-6 text-white' />
							</div>
							<div className='w-7/12'>
								<div className='px-3'>
									<p className='text-sm'>Status</p>
									{/* <p className='text-xs text-zinc-500'>Indywidualne kanału</p> */}
								</div>
							</div>
							<div className='w-4/12'>
								<div className='ml-auto table'>
									<Switch
										value={related}
										onClick={() => handleClick_Switch()}
										size='lg'
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='my-8'>
						<div>
							<div className='rounded-md'>
								<div className='relative flex flex-row flex-nowrap items-center w-full h-auto'>
									<div className='absolute inset-y-0 pl-3 flex flex-col flex-nowrap justify-center'>
										<Type
											size={32}
											className='w-6 h-6 text-white mx-auto'
										/>
									</div>
									<div className='w-full'>
										<form
											onSubmit={(e) => {
												e.preventDefault();
											}}>
											<input
												className='w-full h-auto py-2 pl-16 pr-3 bg-zinc-800 text-sm placeholder:text-zinc-500 outline-none rounded-md'
												type='text'
												placeholder='Nazwa sceny'
												value={name}
											/>
										</form>
									</div>
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

					{!!(
						sceneChildren !== null &&
						sceneChildren !== 'undefined' &&
						typeof sceneChildren !== 'string' &&
						typeof sceneChildren === 'object' &&
						sceneChildren.length > 0
					) && (
						<>
							<div className='mt-8 pb-12'>
								<div className='relative z-10 flex flex-row flex-nowrap items-center justify-center mb-4 px-4'>
									<button
										className='relative z-30 w-full p-3 rounded-full bg-zinc-800'
										onClick={() => handleClick_newItem('00:00', sceneChildren[0].timestamp)}>
										<div className='flex flex-row flex-nowrap items-center justify-center'>
											<div className='px-3'>
												<PlusIcon className='text-white mx-auto w-3 h-3' />
											</div>
											<div className='pr-3'>
												<p className='text-xs text-zinc-400'>Dodaj</p>
											</div>
										</div>
									</button>
								</div>
								{/* <div className='relative z-10 flex flex-row flex-nowrap items-center justify-center mb-4'>
                <button className='relativ z-30 w-auto p-1 rounded-full bg-zinc-800'>
                  <div className='flex flex-row flex-nowrap items-center'>
                    <div className='px-3'>
                      <PlusIcon className='text-white mx-auto w-3 h-3' />
                    </div>
                    <div className='pr-3'>
                      <p className='text-xs'>Dodaj</p>
                    </div>
                  </div>
                </button>
              </div> */}
								<div className='flex flex-col w-full space-y-3 bg-[#FFFFFF10] py-3 px-6 rounded-3xl'>
									{sceneChildren.map((item: any, index: any) => {
										console.log(index);
										return (
											<>
												<div
													className='cursor-pointer py-3 '
													onClick={() => handleClick_Item(index)}>
													<div className='w-full flex flex-row flex-nowrap items-center'>
														<div className='w-1/12'>
															<ClockIcon className='w-6 h-' />
														</div>
														<div className='w-10/12'>
															<div className='px-3'>
																<div className='text-sm'>{timeAsText(timestampAstime(item.timestamp))}</div>
																{/* <div className='text-xs text-zinc-500'>30 minut</div> */}
															</div>
														</div>
														<div className='w-1/12'>
															<div>
																<ArrowLongRightIcon className='w-4 h-4 text-zinc-400' />
															</div>
														</div>
													</div>
												</div>

												{index !== sceneChildren.length - 1 && (
													<div className='relative z-10 flex flex-row flex-nowrap items-center justify-center'>
														<div
															className='absolute z-20 w-full h-auto top-[50%]'
															style={{ transform: 'translateY(-50%)' }}>
															<div className='w-full h-[1px] bg-zinc-900'></div>
														</div>
														<button className='relativ z-30 w-auto p-1 rounded-full bg-zinc-900'>
															<div className='flex flex-row flex-nowrap items-center'>
																<div className='px-3'>
																	<PlusIcon className='text-white mx-auto w-3 h-3' />
																</div>
																<div className='pr-3'>
																	<p className='text-xs'>Dodaj</p>
																</div>
															</div>
														</button>
													</div>
												)}
											</>
										);
									})}
								</div>
								<div className='relative z-10 flex flex-row flex-nowrap items-center justify-center mt-4 px-4'>
									<button
										className='relative z-30 w-full p-3 rounded-full bg-zinc-800'
										onClick={() => handleClick_newItem(sceneChildren[sceneChildren.length - 1].timestamp)}>
										<div className='flex flex-row flex-nowrap items-center justify-center'>
											<div className='px-3'>
												<PlusIcon className='text-white mx-auto w-3 h-3' />
											</div>
											<div className='pr-3'>
												<p className='text-xs text-zinc-400'>Dodaj</p>
											</div>
										</div>
									</button>
								</div>
							</div>
						</>
					)}

					{/* <div className='flex flex-col w-full space-y-3 bg-[#FFFFFF10] py-3 px-6 rounded-3xl'>
            <div
              className='cursor-pointer py-3 '
              onClick={() => handleClick_Item()}>
              <div className='w-full flex flex-row flex-nowrap items-center'>
                <div className='w-1/12'>
                  <ClockIcon className='w-6 h-' />
                </div>
                <div className='w-10/12'>
                  <div className='px-3'>
                    <div className='text-sm'>20:00</div>
                    <div className='text-xs text-zinc-500'>30 minut</div>
                  </div>
                </div>
                <div className='w-1/12'>
                  <div>
                    <ArrowLongRightIcon className='w-4 h-4 text-zinc-400' />
                  </div>
                </div>
              </div>
            </div>

            <div className='relative z-10 flex flex-row flex-nowrap items-center justify-center'>
              <div
                className='absolute z-20 w-full h-auto top-[50%]'
                style={{ transform: "translateY(-50%)" }}>
                <div className='w-full h-[1px] bg-zinc-900'></div>
              </div>
              <button className='relativ z-30 w-auto p-1 rounded-full bg-zinc-900'>
                <div className='flex flex-row flex-nowrap items-center'>
                  <div className='px-3'>
                    <PlusIcon className='text-white mx-auto w-3 h-3' />
                  </div>
                  <div className='pr-3'>
                    <p className='text-xs'>Dodaj</p>
                  </div>
                </div>
              </button>
            </div>

            <div className='cursor-pointer py-3'>
              <div className='w-full flex flex-row flex-nowrap items-center'>
                <div className='w-1/12'>
                  <ClockIcon className='w-6 h-' />
                </div>
                <div className='w-10/12'>
                  <div className='px-3'>
                    <div className='text-sm'>20:00</div>
                    <div className='text-xs text-zinc-500'>30 minut</div>
                  </div>
                </div>
                <div className='w-1/12'>
                  <div>
                    <ArrowLongRightIcon className='w-4 h-4 text-zinc-400' />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

					{!!(
						sceneChildren === null ||
						sceneChildren === 'undefined' ||
						typeof sceneChildren === 'string' ||
						(typeof sceneChildren === 'object' && sceneChildren.length <= 0)
					) && (
						<>
							{/* <div className='mt-10 pt-12 text-zinc-400'>
								<MegaphoneIcon className='text-inherit mx-auto w-10 h-10' />
								<div className='mt-4 mb-2 text-center'>
									<p className='text-xs text-inherit'>Brak przejść</p>
								</div>
							</div>
							<div className='py-12'>
								<button
									className='w-6/12 block mx-auto py-2 px-3 rounded-full bg-zinc-800 '
									onClick={() => handleClick_newItem()}>
									<div className='flex flex-row flex-nowrap items-center'>
										<div className='w-1/12'>
											<PlusIcon className='text-zinc-300 ml-auto w-3 h-3' />
										</div>
										<div className='w-11/12'>
											<p className='ml-3 text-sm text-zinc-400'>Dodaj</p>
										</div>
									</div>
								</button>
							</div> */}
						</>
					)}
				</div>
			</BottomSheet.Content>
		</>
	);
});

SceneSettings.displayName = 'SceneSettings';

export default SceneSettings;
