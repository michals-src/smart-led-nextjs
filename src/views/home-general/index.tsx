import React, { MouseEventHandler, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import db from "@firebase";
import { getDatabase, ref, get, update, set, onValue } from "firebase/database";

import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/solid";
import { List, Switch, WithLoading } from '@components';

import { updatePower, update_power } from '@store/slices/globalSlice';


const PowerManagment = function PowerManagment(props: any) {

	const { data: power } = props;
	const dispatch = useDispatch();

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePower(e.target.checked === true ? true : false));
	}

	return (
		<>
			<List>
				<List.Item>
					{!power && <BoltSlashIcon className={`h-6 text-zinc-100`} />
					}
					{power && <BoltIcon className={`h-6 text-[#d4c82d]`} />}
					<p className='text-sm flex-1 px-4'>Zasilanie</p>
					<Switch
						value={power}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitchChange(e)}
					/>
				</List.Item>
			</List>

		</>
	)
};

export default function HomeGeneral({ }: Props) {
	const dispatch = useDispatch();

	return (
		<>
			<p className='text-xs pt-3 text-zinc-400'>Mikrokontroler</p>
			<p className='text-xs font-bold pb-3'>Ustawienia główne</p>
			<WithLoading path="power" onLoad={(value: any) => dispatch(update_power(value))}>
				<PowerManagment />
			</WithLoading>
		</>
	);
}
