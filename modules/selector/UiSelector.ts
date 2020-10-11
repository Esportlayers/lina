import { User } from "@streamdota/shared-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../reducer/Ui";
import { State } from "../Store";

export const currentUserSelector = (state: State): User | null => state.ui.currentUser;

export function useCurrentUser(auth?: string): User | null {
	const user = useSelector(currentUserSelector);
	const dispatch = useDispatch();

	useEffect(
        () => {
			if (!user) {
				dispatch(loadCurrentUser(auth));
			}
		},
		[ auth, user ]
	);

	return user;
}
