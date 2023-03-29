import React, { FC, forwardRef, Ref } from 'react';

export type ListItemProps = {
	children: React.ReactNode;
	key?: number | string | null;
};

const ListItem = forwardRef<HTMLDivElement, ListItemProps & React.HTMLProps<HTMLDivElement>>(function ListItem(props, ref) {
	const { children, ...other } = props;
	return (
		<div
			ref={ref}
			className='py-3 px-6 flex flex-row flex-nowrap items-center'
			{...other}>
			{children}
		</div>
	);
});

ListItem.displayName = 'ListItem';

export default ListItem;
