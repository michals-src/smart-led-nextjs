import React, { FC } from 'react';

import { AccordionItemContext } from './accordion-context';
import { useAccordtionItem } from './use-accordtion';

export const AccordionItem: FC<React.HTMLProps<HTMLDivElement>> = (props) => {
	const { children } = props;
	const ctx = useAccordtionItem();

	return (
		<div className='flex flex-col flex-nowrap'>
			<AccordionItemContext.Provider value={React.useMemo(() => ctx, [ctx])}>{children}</AccordionItemContext.Provider>
		</div>
	);
};
