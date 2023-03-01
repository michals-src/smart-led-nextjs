import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AccordionContext } from './accordion-context';

export const useAccordion = function useAccordion() {
	const [index, setIndex] = React.useState<number>(-1);

	React.useEffect(() => {
		return function () {
			setIndex(-1);
		};
	}, []);

	const getAccordionItemProps = (idx: number) => {
		const isOpen = idx === index;
		const onChange = (isOpen: boolean) => {
			if (isOpen) setIndex(idx);
			else if (!isOpen) setIndex(-1);
		};

		return { isOpen, onChange };
	};

	return {
		index,
		getAccordionItemProps,
	};
};

export const useAccordtionItem = function useAccordtionItem() {
	const { getAccordionItemProps } = React.useContext(AccordionContext);
	const [itemId, setItemId] = React.useState<string>('');

	React.useEffect(() => {
		setItemId(uuidv4());
	}, []);

	const { isOpen, onChange } = getAccordionItemProps(itemId);

	const onClick = React.useCallback(() => {
		onChange?.(!isOpen);
	}, [itemId, isOpen, onChange]);

	const getButtonProps = useCallback(
		function getButtonProps(props: React.HTMLAttributes<HTMLElement> = {}) {
			return {
				...props,
				onClick,
				id: `accordtion-button-${itemId}`,
				'aria-expanded': !!isOpen,
			};
		},
		[onClick, isOpen, itemId]
	);

	return {
		itemId,
		isOpen,
		getButtonProps,
	};
};
