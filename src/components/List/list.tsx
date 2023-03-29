import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Kid = (props: any) => {
	const { index, children } = props;
	const childId = React.useCallback(() => uuidv4(), [index]);

	return <></>;
};

const List = ({ children }: any) => {
	const items = children === undefined ? [] : Array.isArray(children) ? children : [children];

	const Separator: FC<React.HTMLProps<HTMLDivElement>> = function () {
		return (
			<div className='px-5'>
				<div className='w-full h-[1px] bg-white opacity-10'></div>
			</div>
		);
	};

	const kids = items.map((child: React.ReactNode, index: number) => {
		if (!React.isValidElement(child)) return;

		return (
			<React.Fragment key={index}>
				{index >= 1 && child.props?.children !== undefined && <Separator key={`separator-${index}`} />}

				{React.cloneElement(child, {})}
			</React.Fragment>
		);
	});
	return <div className='w-full h-auto bg-zinc-800 rounded-md'>{kids}</div>;
};

export default List;
