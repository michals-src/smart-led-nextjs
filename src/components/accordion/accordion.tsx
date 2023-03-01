import React from 'react';

import { AccordionContext } from './accordion-context';
import { useAccordion } from './use-accordtion';

export default function Accordion(props: any) {
	const { children, ...otherProps } = props;
	const ctx = useAccordion();

	return (
		<div {...otherProps}>
			<AccordionContext.Provider value={React.useMemo(() => ctx, [ctx])}>{children}</AccordionContext.Provider>
		</div>
	);
}
