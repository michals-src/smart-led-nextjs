import React, { useContext, FC } from 'react';

import { AccordionItemContext } from './accordion-context';

export const AccordionItemHeader: FC<React.HTMLProps<HTMLDivElement>> = (props) => {
	const { children } = props;
	const { getButtonProps } = useContext(AccordionItemContext);
	const ctxProps = getButtonProps();

	return (
		<div
			className='cursor-pointer select-none'
			{...ctxProps}>
			{children}
		</div>
	);
};
