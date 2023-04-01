import React from 'react';

import BottomSheetHeader from './bottomsheet-header';

function BottomSheetContent(props: any) {
	const {
		children,
		onClose: onCloseProps,
		onSave: onSaveProps,
		onBack: onBackProps,
		icon: iconProps,
		title: titleProp = '',
	} = props;

	return (
		<>
			<BottomSheetHeader
				title={titleProp}
				separate={false}
				icon={iconProps}
				onBack={onBackProps}
				onSave={onSaveProps}
				onClose={onCloseProps}
			/>
			<div className='relative z-10'>
				<div className='max-h-[calc(70vh)]'>
					<div
						className='popup-content-wrapper'
						//ref={refContentWrapper}
						style={{ height: 'auto' }}>
						<div
							//ref={ref}
							className='popup-content overflow-auto max-h-[calc(70vh)] p-4 md:px-8'>
							<div>
								<div
									//ref={refContent}
									style={{ maxHeight: '1000000px' }}>
									{/* {Component} */}
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BottomSheetContent;
