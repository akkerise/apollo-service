import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import LaunchTile from '../components/launch-tile';
import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';

export const GET_LAUNCH = gql`
	query GetLaunch($launchId: ID!) {
		launch(id: $launchId) {
			...LaunchTile
		}
	}
`;

interface CartItemProps extends LaunchDetailTypes.LaunchDetailsVariables {}

const CartItem: React.FC<CartItemProps> = ({ launchId }) => {
	const { data, loading, error } = useQuery(GET_LAUNCH, { variables: { launchId } });
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	return data && <LaunchTile launch={data.launch} />;
};

export default CartItem;
