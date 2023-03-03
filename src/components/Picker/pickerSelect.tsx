import classNames from 'classnames';
import React, { useState, useEffect, forwardRef, useRef, Ref, TouchEventHandler, MouseEventHandler } from 'react';

import { Slider } from '@components';
/**
 *
 * <Picker>
 * <PickerSelect value="0" onChange>
 *   <PickerOption value="0">Nazwa</PickerOption>
 * </PickerSelect/>
 * </Picker>
 *
 */

export type PickerSelectProps = {
	children: React.ReactNode;
	onChange: any;
	value: any;
};

const PickerSelect = forwardRef<HTMLDivElement, PickerSelectProps>(function PickerSelect(props, ref) {
	const { children, onChange: onChangeCallback, value: defaultValue = 0, ...other } = props;

	const [index, setIndex] = useState<number>(0);
	const [translation, setTranslation] = useState<number>(0);

	const itemsRef = useRef<any>({});
	const selectRef = useRef<HTMLDivElement>(null);

	const childrenArr = !Array.isArray(children) || children.length <= 0 ? [] : children;

	useEffect(() => {
		if (itemsRef.current[index].current !== null && itemsRef.current[index] !== undefined)
			itemsRef.current[index].current.click();
	}, [index]);

	const handleChange = (event: any, child: any) => {
		if (child.props === null || child.props === 'undefined') return;

		const newValue = child.props.value;
		if (!onChangeCallback || !event || newValue === index) return;

		const nativeEvent = event.nativeEvent || event;
		const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: { value: child.props.value },
		});

		onChangeCallback(clonedEvent, child);
	};

	const items = childrenArr.map((child: React.ReactNode, index: number) => {
		if (!React.isValidElement(child)) return;

		let selected = false;
		if (child.props.value !== null && child.props.value !== 'undefined') {
			selected = String(defaultValue) === String(child.props.value);
		}

		return React.cloneElement<any>(child, {
			key: `picker-select-option-${index}`,
			'aria-selected': selected,
			'data-value': child.props.value,
			role: 'option',
			value: undefined,
			//onClick: handleOptionClick(child),
			onClick: (e: any) => handleChange(e, child),
			ref: (e: any) => {
				itemsRef.current[index] = {
					current: e,
				};
			},
		});
	});

	return (
		<div
			ref={ref}
			className='w-full relative select-none'>
			<div
				className='w-full h-[64px] absolute top-0 left-0 z-10'
				style={{
					background: 'linear-gradient(to bottom, #18181b 0%, rgba(0,0,0,0) 100%)',
				}}></div>
			<div className={`overflow-hidden h-[160px] px-3`}>
				<div
					className='pt-[64px] w-full'
					ref={selectRef}
					style={{
						transitionProperty: 'transform 0.3s ease',
						transitionDuration: '0.3s',
						transitionTimingFunction: 'ease',
						transform: `translateY(-${32 * index + translation}px)`,
					}}>
					{items}
				</div>
			</div>
			<div
				className='w-full h-[64px] absolute bottom-0 left-0 z-10'
				style={{
					background: 'linear-gradient(to top, #18181b 0%, rgba(0,0,0,0) 100%)',
				}}></div>
			<Slider
				value={translation}
				offset={index}
				offsetInView={16}
				offsetMin={0}
				offsetMax={childrenArr.length - 1}
				offsetSize={32}
				onMove={(e: React.MouseEvent & React.TouchEvent, translate: number) => {
					if (selectRef.current !== null) {
						selectRef.current.style.transitionDuration = '0s';
					}
					setTranslation(translate);
				}}
				onLeave={(e: React.MouseEvent & React.TouchEvent, offset: number) => {
					if (selectRef.current !== null) {
						selectRef.current.style.transitionDuration = '1.5s';
					}
					setIndex(offset);
					setTranslation(0);
				}}
				direction='y'
				className='w-full h-full absolute left-0 top-0 touch-pan-x z-30'
			/>
			{/* <div
				className='w-full h-full absolute left-0 top-0 touch-pan-x z-30 cursor-pointer'
				{...touchEvents}></div> */}
		</div>
	);
});

export default PickerSelect;
