import { FC, cloneElement } from 'react';
import classNames from 'classnames';

export type ButtonProps = {
	plain?: boolean;
	size?: 'sm' | 'md' | 'lg';
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	rounded?: boolean;
	className?: any;
	children?: React.ReactNode;
};

const Button: FC<React.HTMLProps<HTMLButtonElement> & ButtonProps> = (props: ButtonProps) => {
	const { plain = false, className, children, size = 'md', leftIcon = null, rightIcon = null, rounded = false, ...other } = props;

	const icon = (element: React.ReactElement) => {
		const cn = classNames(
			'text-zinc-400',
			{
				'w-5 h-5': size === 'sm' || size === 'md',
				'w-6 h-6': size === 'lg',
			},
			{ ...leftIcon?.props?.className }
		);
		const el = cloneElement(element, {
			className: cn,
		});

		return el;
	};

	return (
		<button
			className={classNames(
				'w-auto h-full',
				{
					'bg-zinc-800': !plain,
					'px-3 py-1': !plain && size === 'sm',
					'px-3 py-2': !plain && size === 'md',
					'px-3 py-3': !plain && size === 'lg',
					'rounded-md': !rounded && !plain && (size === 'sm' || size === 'md'),
					'rounded-lg': !rounded && !plain && size === 'lg',
					'rounded-full': rounded,
				},
				className
			)}
			{...other}>
			<div className='flex flex-row flex-nowrap items-center justify-center relative'>
				{leftIcon && <div className='w-auto h-auto flex flex-col flex-nowrap justify-center'>{icon(leftIcon)}</div>}
				{!!children && (
					<div
						className={classNames('flex-auto', {
							'pl-4': leftIcon,
							'pr-4': rightIcon,
						})}>
						<p className='text-xs text-zinc-400'>{children}</p>
					</div>
				)}
				{rightIcon && <div className='w-auto h-auto flex flex-col flex-nowrap justify-center'>{icon(rightIcon)}</div>}
			</div>
		</button>
	);
};

Button.displayName = 'Button';

export default Button;
