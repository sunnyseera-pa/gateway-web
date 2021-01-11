import React, { Fragment } from 'react';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../commonComponents/Loading';
import SearchBar from '../commonComponents/searchBar/SearchBar';

class AboutPage extends React.Component {
    
	state = {
        userState: [],
        footer: '',
        isLoading: true
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
    }

    async componentDidMount() {
        const { t } = this.props;
		axios
			.get(t('aboutPageUrl') , { withCredentials: false })
			.then(res => {
				this.setState({
					footer: res.data,
					isLoading: false,
				});
			})
			.catch(error => {
				this.setState({
					isLoading: false,
				});
			});
    }

	render() {
		const {
			userState,
            isLoading,
            footer
		} = this.state;

		if (isLoading) {
			return (
				<Row className='mt-4'>
					<Col xs={1}></Col>
					<Col xs={10}>
						<Loading data-testid='isLoading' />
					</Col>
					<Col xs={1}></Col>
				</Row>
			);
		}

		return (
			<div>
				<SearchBar
					ref={this.searchBar}
					doSearchMethod={this.doSearch}
					doUpdateSearchString={this.updateSearchString}
					doToggleDrawer={this.toggleDrawer}
					userState={userState}
				/>
				<Container>
                <>{footer !== '' ? <div dangerouslySetInnerHTML={{ __html: footer }} /> : <div  />}</>
				</Container>
			</div>
		);
	}
}

export default AboutPage;


