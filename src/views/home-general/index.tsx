import React, { MouseEventHandler } from 'react';
import db from "@firebase";
import { getDatabase, ref, get, update, set, onValue } from "firebase/database";

import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/solid";
import { List, Switch } from '@components';

type Props = {};

export default function HomeGeneral({ }: Props) {
	const [powerValue, setPowerValue] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<any>(null);

	const fetch = React.useCallback(async function () {

		const database = getDatabase();

		try {
			const snapshot = await get(ref(database, '/power'));
			if (snapshot.exists()) {
				setPowerValue(snapshot.val())
				setLoading(false);
			}
		} catch (err) {
			setError(err);
		}


	}, []);

	React.useEffect(() => {
		fetch();
	}, [])

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPowerValue((state) => {
			update(ref(db), {
				"/power": !state,
			});
			return !state;
		});
	}

	if (error) {
		return (
			<div>
				{error}
			</div>
		)
	}

	return (
		<div>
			<p className='text-xs pt-3 text-zinc-400'>Mikrokontroler</p>
			<p className='text-xs font-bold pb-3'>Ustawienia główne</p>
			{loading && <div>Loading ...</div>}
			<List>
				<List.Item>
					{!powerValue && <BoltSlashIcon className={`h-6 text-zinc-100`} />}
					{powerValue && <BoltIcon className={`h-6 text-[#d4c82d]`} />}
					<p className='text-sm flex-1 px-4'>Zasilanie</p>
					<Switch
						value={powerValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitchChange(e)}
					/>
				</List.Item>
			</List>
		</div>
	);
}
