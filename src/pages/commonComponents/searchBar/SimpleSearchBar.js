import React from 'react';
import SVGIcon from '../../../images/SVGIcon';
import './SearchBar.scss';

class SimpleSearchBar extends React.Component {
	changeText = e => {
		if (this.props.doUpdateSearchString) {
			this.props.doUpdateSearchString(e.target.value);
		}
	};

	render() {
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
								onKeyUp={this.props.doClearIndexesOnSearch}
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
