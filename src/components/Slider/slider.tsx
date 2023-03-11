import classNames from 'classnames';
import React, { useState, forwardRef } from 'react';

export type SliderProps = {
	value: number;
	offset: number;
	offsetInView: number;
	offsetSize: number;
	offsetMin: number;
	offsetMax: number;
	direction: 'x' | 'y';
	onDown?: (a: React.MouseEvent & React.TouchEvent) => void;
	onMove?: (a: React.MouseEvent & React.TouchEvent, translate: number) => void;
	onLeave?: (a: React.MouseEvent & React.TouchEvent, offset: number, swapeDirection?: string) => void;
	className: string;
	children?: JSX.Element;
};

const Slider = forwardRef<any, SliderProps & any>(function Slider(props, ref) {
	const {
		value,
		offset: offsetProps,
		offsetInView,
		offsetSize,
		offsetMin,
		offsetMax,
		direction,
		onDown: onDownCallback,
		onMove: onMoveCallback,
		onLeave: onLeaveCallback,
		className: classNameProps,
		children,
		...other
	} = props;

	const [reference, setReference] = useState<number>(0);
	const [swapeDirection, setSwapeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);
	/**
	 *
	 * Determine dimenssions to specify amout of moved childrens
	 * offset -> width or height of element
	 *
	 * onDown
	 * onMove
	 * onLeave
	 *
	 * onSlide
	 * onChange
	 * direction
	 */

	/**
	 *
	 * offsetCount
	 * translateX
	 * translateY
	 *
	 */
	const handleTouchDown = (e: React.MouseEvent & React.TouchEvent) => {
		onDownCallback?.(e);
	};

	const handleTouchMove = (e: React.MouseEvent & React.TouchEvent) => {
		// Protection against movement without mouse left button
		if (e.type === 'mousemove' && e.buttons !== 1) {
			return;
		}

		const consumer = e.type === 'touchmove' ? e.touches[0] : e;
		const screen = direction === 'x' ? consumer.screenX : consumer.screenY;
		if (reference === 0) setReference(screen);

		let swipe: 'left' | 'right' | 'up' | 'down' | null = null;
		if (direction === 'x') {
			if (reference < screen) swipe = 'left';
			if (reference > screen) swipe = 'right';
		}
		if (direction === 'y') {
			if (reference < screen) swipe = 'up';
			if (reference > screen) swipe = 'down';
		}

		setSwapeDirection(swipe);

		let translate = reference === 0 ? 0 : reference - screen;

		onMoveCallback?.(e, translate);
	};

	const handleTouchLeave = (e: React.MouseEvent & React.TouchEvent) => {
		setReference(0);

		let offset = offsetProps;
		let computedOffset = !Number.isNaN(offsetSize) && offsetSize > 0 ? Math.round(value / offsetSize) : 0;

		if (value < -offsetInView || offsetInView < value) {
			// Jeżeli element został przesunięty o rządaną wartość, a wyliczona wartość wynosi 0
			computedOffset = computedOffset === 0 ? (swapeDirection === 'right' ? 1 : -1) : computedOffset;
			offset = offsetProps + computedOffset;
			//console.log(offset);
			if (offset > offsetMax) offset = offsetMax;
			if (offset < offsetMin) offset = offsetMin;
		}

		onLeaveCallback?.(e, offset, swapeDirection);
	};

	const Events = {
		// Mouse / Touch Down
		onMouseDown: handleTouchDown,
		onTouchStart: handleTouchDown,
		//Move
		onTouchMove: handleTouchMove,
		onMouseMove: handleTouchMove,
		//Leave
		onTouchEnd: handleTouchLeave,
		onTouchCancel: handleTouchLeave,
		onMouseUp: handleTouchLeave,
		onMouseLeave: handleTouchLeave,
	};

	return (
		<div
			className={classNames('cursor-pointer', `touch-pan-${direction}`, classNameProps)}
			ref={ref}
			{...Events}
			{...other}>
			{children}
		</div>
	);
});

Slider.displayName = 'Slider';

export default Slider;
