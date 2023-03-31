import classNames from 'classnames';
import React, { useState, useCallback, useEffect, forwardRef, Ref } from 'react';

import { colors } from '../customizer/colors/palette';
import CoolorssColorant from './coolorsColorant';

export type PaletteProps = {
	value: string;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	align?: 'start' | 'center' | 'end';
	size?: 'sm' | 'md' | 'lg';
};

const radius = 80;
const Coolors = forwardRef<HTMLInputElement, PaletteProps & React.HTMLProps<HTMLInputElement>>((props, ref) => {
	const { value, onClick, align = 'center', size = 'md' } = props;

	const cnWrapper = classNames('flex flex-row flex-wrap mx-auto w-full h-auto relative', {
		'justify-start': align === 'start',
		'justify-center': align === 'center',
		'justify-end': align === 'end',
	});

	return (
		<>
			<div>
				<>
					<div className={cnWrapper}>
						{colors.map((color, ix) => {
							return (
								<CoolorssColorant
									key={ix}
									index={ix}
									isActive={color === value}
									value={color}
									onClick={onClick}
									size={size}
								/>
							);
						})}
					</div>
				</>
			</div>
		</>
	);
});

Coolors.displayName = 'Coolors';

export default Coolors;
