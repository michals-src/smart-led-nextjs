import React, { MouseEventHandler, useEffect } from 'react';
import db from "@firebase";
import { getDatabase, ref, get, update, set, onValue } from "firebase/database";

import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/solid";
import { List, Switch } from '@components';

type Props = {};

const withLoading = function withLoading(fetchPath){

	const [data, setData] = useState();
	const [error, setError] = useState();

	useEffect(() => {

		// Search store (caching)
		// Fetch from DB (else)

	}, [fetchPath])

	return function(Component){

		if(error) return <div>{error}</div>
		if(!data) return <div>Loading ...</div>

		return React.cloneElement(Component, {
			data,
			error
		})
	}
}

const PowerManagment = withLoading('power')(function PowerManagment(props){

	const { data } = props;

	return (
		{!powerValue && <BoltSlashIcon className={`h-6 text-zinc-100`} />}
		{powerValue && <BoltIcon className={`h-6 text-[#d4c82d]`} />}
		<p className='text-sm flex-1 px-4'>Zasilanie</p>
		<Switch
			value={powerValue}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitchChange(e)}
		/>
	)
});

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
					<PowerManagment />
				</List.Item>
			</List>
		</div>
	);
}
