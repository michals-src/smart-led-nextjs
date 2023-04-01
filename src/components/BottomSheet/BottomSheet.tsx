import React from 'react';
import { motion } from 'framer-motion';

import { BottomSheetContext } from '@context';
import { Portal } from '@components';
import BottomSheetView from './bottomsheet-view';
import BottomSheetHeader from './bottomsheet-header';
import BottomSheetContent from './bottomsheet-content';

let screens: any = {};

const BottomSheet = function ({ children, open, onClose }: { children?: any; open: boolean; onClose: () => void }) {
	const [sheets, setSheets] = React.useState<any>({});
	const [sheetID, setSheetID] = React.useState<string>('root');
	const [prevSheetID, setPrevSheetID] = React.useState<string>('');

	const [touchY, setTouchY] = React.useState<Array<number>>([0, 0]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [created, setCreated] = React.useState<boolean>(false);
	const parentRef = React.createRef<HTMLDivElement>();
	const windowRef = React.createRef<HTMLDivElement>();

	const childrenArr: any = React.useCallback(
		function () {
			if (children === null) return [];
			return !Array.isArray(children) || children.length <= 0 ? [children] : children;
		},
		[children]
	);

	React.useEffect(() => {
		if (open) setVisible(true);
	}, [open]);

	React.useEffect(() => {
		if (windowRef.current === null) return;

		const transitionEnd = function (e: any) {
			if (!open) {
				setCreated(false);
				setVisible(false);
				setTouchY([0, 0]);
			}
		}

		const abc = windowRef.current;
		const xde = setTimeout(function () {
			if (created) abc.style.transform = `translateY(${!open ? 100 : 0}%)`
		}, 40)
		windowRef.current.addEventListener('transitionend', transitionEnd);

		return function () {
			clearInterval(xde)
		}

	}, [windowRef, created]);

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

		/**
		 * transferprops
		 * Dodatkowe własności przekazywane przez element navigate
		 */
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

	if (!visible) return null;

	return (
		<>
			{/* {open && ( */}
			<Portal onCreate={() => setCreated(true)}>
				<div className='fixed left-0 right-0 bottom-0 w-full h-full touch-none z-[99999]'>
					<div
						className='w-[100vw] h-[100vh] absolute top-0 left-0'
						style={{
							background: 'rgba(0,0,0,0.8)',
							opacity: `${open ? 1 : 0}`,
							transition: 'opacity .1s ease'
						}}></div>

					<div ref={parentRef} className='w-full h-auto absolute bottom-0 left-0 touch-pan-x' style={{
						transform: `translateY(${touchY[0]}px)`,
					}}>
						<div ref={windowRef} className='max-w-lg mx-auto bg-zinc-900 text-white relative overflow-hidden rounded-t-xl' style={{
							transform: `translateY(100%)`,
							transition: 'transform .15s ease'
						}}

							onTouchMove={(e) => {
								setTouchY((state) => {
									const currY = e.touches[0].screenY;
									if (state[1] === 0) return [0, currY];

									let moveY = state[0] + (currY - state[1]);
									if (state[0] > moveY && state[0] <= 0) moveY = 0;
									return [moveY, currY];
								});
								parentRef.current.style.transition = "";
							}}
							onTouchEnd={(e) => {
								if (touchY[0] >= 100) {
									onClose?.();
									return;
								}
								setTouchY([0, 0]);
								parentRef.current.style.transition = "transform .1s ease";
							}}>
							{/* <BottomSheetContext.Provider value={ctxValue}>{<ContentItem />}</BottomSheetContext.Provider> */}
							<BottomSheetContext.Provider value={ctxValue}>{ContentItem}</BottomSheetContext.Provider>
						</div>
					</div>
				</div>
			</Portal>
			{/* )} */}
		</>
	);
};

BottomSheet.dispalyName = 'BottomSheet';

export default Object.assign(BottomSheet, {
	View: BottomSheetView,
	Header: BottomSheetHeader,
	Content: BottomSheetContent,
});
