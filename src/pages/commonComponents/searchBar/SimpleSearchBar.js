import React from 'react';
import SVGIcon from '../../../images/SVGIcon';
import './SearchBar.scss';

let baseURL = require('../BaseURL').getURL();
let cmsURL = require('../BaseURL').getCMSURL();

class SimpleSearchBar extends React.Component {
	state = {
		textValue: '',
		userState: [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
			},
		],
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
	}

	changeText = e => {
		this.setState({ textValue: e.target.value });
		if (this.props.doUpdateSearchString) {
			this.props.doUpdateSearchString(e.target.value);
		}
	};

	render() {
		const { userState } = this.state;

		return (
			<div className='searchBarBackground'>
				<div>
					<span className='searchBarInputGrey'>
						<span className='searchInputIconGrey'>
							<SVGIcon name='searchicon' width={20} height={20} fill={'#2c8267'} stroke='none' type='submit' />
						</span>
						<span>
							<input
								data-test-id='simple-search-bar'
								type='text'
								placeholder='Search'
								id='searchInputSpanGrey'
								onChange={this.changeText}
								onKeyDown={this.props.doSearchMethod}
								value={this.props.searchString}
							/>
						</span>
					</span>
				</div>
			</div>
		);
	}
}

export default SimpleSearchBar;
