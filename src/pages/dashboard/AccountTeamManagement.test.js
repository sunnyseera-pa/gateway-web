import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountTeamManagement from './AccountTeamManagement';
import { userState } from './__tests__/mockData';

const forwardRefMock = jest.fn();
const onTeamManagementSaveMock = jest.fn();
const onTeamManagementTabChangeMock = jest.fn();
const onClearInnerTabMock = jest.fn();

test('should not render Member,Notifications and Teams Tab', async () => {
	render(
		<AccountTeamManagement
			userState={userState}
			team='5fc12be363eaab9e68dae76e'
			innertab=''
			forwardRef={forwardRefMock}
			onTeamManagementSave={onTeamManagementSaveMock}
			onTeamManagementTabChange={onTeamManagementTabChangeMock}
			onClearInnerTab={onClearInnerTabMock}
		/>
	);

	expect(screen.queryByTestId('members')).toBeNull();
	expect(screen.queryByTestId('notifications')).toBeNull();
	expect(screen.queryByTestId('teams')).toBeNull();
});

test('should render Member,Notifications and Teams Tab', async () => {
	render(
		<AccountTeamManagement
			userState={userState}
			team='6107fd7d7cceaa24a67eefe8'
			innertab=''
			forwardRef={forwardRefMock}
			onTeamManagementSave={onTeamManagementSaveMock}
			onTeamManagementTabChange={onTeamManagementTabChangeMock}
			onClearInnerTab={onClearInnerTabMock}
		/>
	);

	expect(screen.getByTestId('members')).toBeInTheDocument();
	expect(screen.getByTestId('notifications')).toBeInTheDocument();
	expect(screen.getByTestId('teams')).toBeInTheDocument();

	fireEvent.click(screen.getByTestId('notifications'));
	expect(onTeamManagementTabChangeMock).toHaveBeenCalledTimes(1);
});
