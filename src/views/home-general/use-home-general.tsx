import React from 'react';
import db from '@firebase';
import { getDatabase, ref, child, get, update, set, onValue } from 'firebase/database';

type Props = {};

export default function useHomeGeneral({}: Props) {
	const [status, setStatus] = React.useState<'success' | 'loading' | 'error' | 'idle'>('idle');

	React.useEffect(() => {
		return function () {
			setStatus('idle');
		};
	}, []);

	const fetchDb = React.useCallback(async function () {
		const database = getDatabase();
		const snapshot = await get(ref(database, '/power'));

		get(ref(database, '/power'))
			.then((snapshot) => {
				if (snapshot.exists()) {
					//
				} else {
					//
				}
			})
			.catch((e) => console.log(e));

		return [];
	}, []);

	const fetchCache = React.useCallback(function () {
		// read redux

		return [];
	}, []);

	const fetchData = React.useCallback(
		function () {
			const cache = fetchCache();
			let data = cache;

			if (cache.length <= 0) fetchDb();

			return {
				data,
				loading: status === 'loading',
				erro: status === 'error',
			};
		},
		[status]
	);
}
