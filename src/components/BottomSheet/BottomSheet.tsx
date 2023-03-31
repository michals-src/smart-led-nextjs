import React from 'react';
import { motion } from 'framer-motion';

import { BottomSheetContext } from '@context';
import Portal from './portal';
import BottomSheetView from './BottomSheetView';
import BottomSheetHeader from './BottomSheetHeader';
import BottomSheetContent from './BottomSheetContent';

let screens: any = {};

const BottomSheet = function ({ children, open, onClose }: { children?: any; open: boolean; onClose: () => void }) {
	const [sheets, setSheets] = React.useState<any>({});
	const [sheetID, setSheetID] = React.useState<string>('root');
	const [prevSheetID, setPrevSheetID] = React.useState<string>('');

	const childrenArr: any = React.useCallback(
		function () {
			if (children === null) return [];
			return !Array.isArray(children) || children.length <= 0 ? [children] : children;
		},
		[children]
	);

	React.useEffect(() => {
		childrenArr().map((child: React.ReactNode, index: number) => {
			if (!React.isValidElement(child)) return;

			const item: React.ReactElement = React.cloneElement(child, Object.assign({ ...child.props }));
			const route = item.props.root ? 'root' : item.props.as;

			screens[route] = item;
			setSheets((state: any) => {
				return { ...state, [`${route}`]: item };
			});
		});

		return function () {
			setSheets({});
			//screens = {};
		};
	}, [childrenArr]);

	// const ContentItem = React.useCallback<any>(
	// 	function () {
	// 		//return screens[sheetID];
	// 		return sheets[sheetID];
	// 	},
	// 	[sheetID, sheets]
	// );

	const ContentItem = React.isValidElement(sheets[sheetID]) ? React.cloneElement(sheets[sheetID]) : null;

	const back = function () {
		navigate(prevSheetID);
	};

	const navigate = function (to: string, transferprops: object = {}) {
		if (Object.keys(sheets).indexOf(to) < 0) {
			throw Error('Bottm sheet [navigation]');
		}

		if (Object.keys(transferprops).length > 0) {
			const sheet = sheets[to];
			const screenWithTransferProps = React.cloneElement({ ...sheet }, Object.assign({}, { transferprops }));

			setSheets((state: any) => {
				return {
					...state,
					[`${to}`]: screenWithTransferProps,
				};
			});
		}

		//screens = { ...screens, [`${to}`]: screenWithTransferProps };
		//console.log(sheetID);
		//setPrevSheetID(sheetID);
		setSheetID((state) => {
			setPrevSheetID(state);
			return to;
		});
	};

	const close = function () {
		setSheetID('root');
		onClose?.();
	};

	const ctxValue = React.useMemo(
		() => ({
			close,
			navigate,
			back,
		}),
		[sheets]
	);

	return (
		<>
			{open && (
				<Portal>
					<div className='fixed left-0 right-0 bottom-0 w-full h-full touch-none z-[99999]'>
						<div
							className='w-[100vw] h-[100vh] absolute top-0 left-0'
							style={{ background: 'rgba(0,0,0,0.5)' }}></div>

						<div className='w-full h-auto absolute bottom-0 left-0 touch-pan-x'>
							<div className='max-w-lg mx-auto bg-zinc-900 text-white relative overflow-hidden rounded-t-xl'>
								{/* <BottomSheetContext.Provider value={ctxValue}>{<ContentItem />}</BottomSheetContext.Provider> */}
								<BottomSheetContext.Provider value={ctxValue}>{ContentItem}</BottomSheetContext.Provider>
							</div>
						</div>
					</div>
				</Portal>
			)}
		</>
	);
};

BottomSheet.dispalyName = 'BottomSheet';

export default Object.assign(BottomSheet, {
	View: BottomSheetView,
	Header: BottomSheetHeader,
	Content: BottomSheetContent,
});
