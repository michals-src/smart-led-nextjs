import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { ChatBubbleBottomCenterIcon, HashtagIcon, MapPinIcon, PuzzlePieceIcon, StarIcon } from '@heroicons/react/24/outline';
import { ArrowsUpDownIcon, LightBulbIcon, PlusIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { Layout, Picker, PickerOption, PickerSelect, Switch, List, Accordion, Input, Button, Slider } from '@components';
import CarouselIndicators from './carousel-indicators';

export default function Carousel(props: any) {
	const { children, indicators } = props;

	const [moving, setMoving] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(0);
	const [translation, setTranslation] = useState<number>(0);
	//const [offsetLength, setOffsetLength] = useState<number>(0);

	const [transformation, setTransformation] = useState<boolean>(false);

	const refChildren = useRef<any>({ current: [] });
	const refWrapper = useRef<any>(null);

	const items = Array.isArray(children) ? children : [children];
	const kids = useCallback(() => {
		return items.map((child, idx) => {
			return React.cloneElement(child, {
				key: idx,
				ref: (el: any) => {
					if (refChildren.current !== undefined) refChildren.current[idx] = el;
				},
				moving,
				//onClick: (e: any) => {
				//if (!moving && child.props.onClick !== undefined) child?.props?.onClick(e)
				//}
			});
		});
	}, [moving, children]);

	useEffect(() => {
		if (refWrapper.current === null) return;
		const abc = function () {
			setMoving(false);
		};

		refWrapper.current.addEventListener('transitionend', abc);

		return function () {
			if (refWrapper.current !== null) refWrapper.current.removeEventListener('transitionend', abc);
		};
	}, [refWrapper]);

	const offsetX = useCallback(() => {
		let value = 0;
		for (let i = 0; i < index; i++) {
			value += refChildren.current[i].offsetWidth;
		}
		return value;
	}, [index]);

	return (
		<div className='touch-pan-x'>
			<div
				ref={refWrapper}
				className='w-full h-auto flex flex-col flex-nowrap flex-1 overflow-hidden relative'>
				<Slider
					value={translation}
					offset={index}
					//offsetInView={offsetLength / 4}
					offsetInView={refChildren.current[index] !== undefined ? refChildren.current[index].offsetWidth / 3 : 10}
					//offsetSize={offsetLength}
					offsetSize={
						refChildren.current[index + 1] !== undefined && index < items.length - 1
							? refChildren.current[index + 1].offsetWidth
							: refChildren.current[index].offsetWidth
					}
					offsetMin={0}
					offsetMax={items.length - 1}
					direction='x'
					onDown={(e: any) => {
						//setMoving(true)
					}}
					onMove={(e: any, translate: number) => {
						if (!moving) setMoving(true);
						if (!transformation) setTransformation(true);
						setTranslation(translate);
					}}
					onLeave={(e: any, offset: number, swipeDir: string) => {
						//setMoving(false);
						setTransformation(false);
						setIndex((state) => {
							if (state === offset) {
								setMoving(false);
							}
							return offset;
						});
						setTranslation(0);
					}}>
					<div
						className='flex flex-row flex-nowrap'
						style={{
							transitionProperty: 'transform',
							//transitionDuration: moving ? '0s' : '0.3s',
							transitionDuration: transformation ? '0s' : '0.3s',
							transitionTimingFunction: 'ease',
							//transform: `translateX(-${offsetLength * index + translation}px)`,
							transform: `translateX(-${offsetX() + translation}px)`,
						}}>
						{kids()}
						{/* {children} */}
					</div>
					<div
						className='absolute top-0 right-0 w-[15%] h-full'
						style={{
							background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(24,24,27) 100%)',
						}}></div>
				</Slider>
				{indicators && (
					<CarouselIndicators
						onChange={(e: any) => setIndex(e.target.value)}
						value={index}
						length={items.length}
					/>
				)}
			</div>
		</div>
	);
}
