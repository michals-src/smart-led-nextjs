import React, { useContext, useState, Ref, forwardRef } from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Type } from 'react-bootstrap-icons';

import { ref as refDB, update } from 'firebase/database';
import db from '@firebase';
import { useDispatch } from 'react-redux';
import { SCENE_APPEND } from '@store/slices/scenesSlice';
import popupContext from '@context/popup/popupContext';
import { LoaderCircle, BottomSheet } from '@components';

const Field = forwardRef(function (props: any, ref: Ref<any>) {
	const handleChange = function (e: any) {
		props?.onChange(e);
	};

	return (
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
								onChange={(e) => handleChange(e)}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
});

Field.displayName = 'Field';

function SceneNew(props: any) {
	const popupCtx = useContext(popupContext);
	const disptach = useDispatch();

	const [name, setName] = useState<string>('');
	const [proceding, setProceding] = useState<boolean>(false);

	const handleClick_Submit = () => {
		if (name === '' || name === 'undefined' || name === null) throw 'sceneCreate - nazwa bug';

		setProceding(true);

		const timestamp = Date.now();
		const sceneID = `S${timestamp}`;
		const childrenID = `SC${timestamp}`;

		const sceneData = {
			name,
			childrenID,
		};

		const update_done = () => {
			//popupCtx.onUpdatePopupVisible(false);
			setProceding(false);
		};

		disptach(SCENE_APPEND({ [`${sceneID}`]: sceneData }));
		update(refDB(db), {
			[`/scenes/${sceneID}`]: sceneData,
			[`/scenesChildren/${childrenID}`]: '', // Godziny wyzolenia
		}).then(() => {
			update_done();
		});

		// popupCtx.onUpdatePopupScreenData([
		//   {
		//     costam: "okno edycji przejścia",
		//   },
		// ]);
		// popupCtx.onUpdatePopupScreenIndex(1);

		return () => {};
	};

	return (
		<BottomSheet.Content
			title='Nowa scena'
			onClose={() => props.close()}
			onSave={() => alert(name)}>
			<div>
				<div className='mb-8'>
					{/* <div className='flex flex-row flex-nowrap items-center cursor-pointer'>
						<div className='w-1/12'>
							<Type
								size={32}
								className='w-6 h-6 text-white'
							/>
						</div>
						<div className='w-11/12'>
							<div className='px-3'>
								<p className='text-sm'>Nadaj scenie nazwę</p>
							</div>
						</div>
					</div> */}

					<div>
						<Field onChange={(e: any) => setName(e.target.value)} />
						{/* <input
							type='name'
							id='sceneName'
							className='w-full h-auto py-2 px-4 bg-zinc-900 border border-zinc-600 placeholder:text-zinc-500 rounded-lg text-xs  shadow-lg focus:outline-none focus:shadow-sm focus:shadow-orange-900 focus:border-orange-800'
							placeholder='Nazwa sceny'
							//autocomplete='off'
							//autofill='off'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/> */}
					</div>

					<div className='mt-6'>
						<div>
							<div className='flex flex-row flex-nowrap items-center w-full'>
								<div className='w-1/12'>
									<InformationCircleIcon className='w-6 h-6 text-zinc-400' />
								</div>
								<div className='w-11/12 pl-3'>
									<p className='text-md text-zinc-100'>Przejścia</p>
									<p className='text-xs text-zinc-400'>Dodanie przejść będzie możliwe w ustawieniach sceny.</p>
								</div>
							</div>
						</div>
					</div>

					{/* <div className='mt-3 w-full'>
						<button
							className='w-full h-auto block py-3 rounded-lg bg-zinc-800 text-xs shadow-xl'
							//onClick={(e) => handleClick_Submit(e)}
						>
							<div className='relative'>
								<div className='flex flex-row flex-nowrap px-25 items-center justify-center'>
									<p className='text-sm'>Zapisz</p>
								</div>
								{!!proceding && (
									<div className='w-12 h-full absolute top-0 right-0'>
										<div className='flex flex-col items-center justify-center'>
											<LoaderCircle size='sm' />
										</div>
									</div>
								)}
							</div>
						</button>
					</div> */}
				</div>
			</div>
		</BottomSheet.Content>
	);
}

SceneNew.displayName = 'SceneNew';

export default SceneNew;
