import React from 'react';

import { List, Switch } from '@components';

type Props = {};

export default function HomeGeneral({}: Props) {
	return (
		<div>
			<p className='text-xs pt-3 text-zinc-400'>Mikrokontroler</p>
			<p className='text-xs font-bold pb-3'>Ustawienia główne</p>
			<List>
				<List.Item>
					{!powerValue && <BoltSlashIcon className={`h-6 text-zinc-100`} />}
					{powerValue && <BoltIcon className={`h-6 text-[#d4c82d]`} />}
					<p className='text-sm flex-1 px-4'>Zasilanie</p>
					<Switch
						value={powerValue}
						onChange={powerHandleChange}
					/>
				</List.Item>
			</List>
		</div>
	);
}
