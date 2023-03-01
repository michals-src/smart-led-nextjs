import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { AccordionItemContext } from './accordion-context';

export const AccordionItemCollapse: FC<React.HTMLProps<HTMLDivElement>> = (props) => {
	const { children } = props;
	const { isOpen } = useContext(AccordionItemContext);

	return (
		<div
			className={classNames({
				hidden: !isOpen,
			})}>
			{children}
		</div>
	);
};
