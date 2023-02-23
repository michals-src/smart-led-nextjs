import React from 'react';
import { BottomSheetContext } from '@context';

function BottomSheetView(props: any): React.ReactElement {
	const bsCtxApi = React.useContext(BottomSheetContext);
	const { children, transferprops } = props;

	//const childrenArr = !Array.isArray(children) || children.length <= 0 ? [] : children;
	const Component = React.useCallback(
		function () {
			//console.log(children)
			//if (!React.isValidElement(children)) return;

			return React.cloneElement(children, Object.assign({}, bsCtxApi, transferprops));
		},
		[children]
	);

	return (
		<>
			<div {...props}>
				{' '}
				<Component />
			</div>{' '}
		</>
	);
}

export default BottomSheetView;
