import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DefaultAboutPage from './DefaultAboutPage';
import './AboutPage.scss';

class AboutPage extends React.Component {
	state = {
		isAvailable: true,
		wpData: undefined,
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
	}

	async componentDidMount() {
		axios
			.head('', { withCredentials: false })
			.then(res => {
				this.setState({
					isAvailable: true,
				});
			})
			.catch(error => {
				this.setState({
					isAvailable: false,
				});
				console.error(error.message);
			});

		await axios
			.get('https://icoda-research.org/icoda-gateway/', { withCredentials: false })
			.then(res => {
				this.setState({
					wpData: res.data,
				});
			})
			.catch(error => {
				this.setState({ errorMessage: error.message });
				console.error('There was an error!', error);
			});
	}

	render() {
		const { isAvailable, wpData } = this.state;

		return (
			<div className='searchTabsHolder'>
				<div className='about-page-header'>
					<div className='about-page-header-title'>ICODA Gateway</div>
				</div>
				<div className='about-page-button text-center'>
					<Button
						className='addButton'
						onClick={e => {
							window.location.href = `/search?search=&tab=Collections`;
						}}>
						Search for datasets
					</Button>
				</div>
				{isAvailable ? (
					<div className='collection-rectangle about-page-body'>
						<div className='pad-left-24 pad-right-24 pad-top-24 pad-bottom-16 col-lg-12 col-sm-12' />
						<div dangerouslySetInnerHTML={{ __html: wpData }} />
					</div>
				) : (
					<div className='collection-rectangle about-page-body'>
						<DefaultAboutPage />
					</div>
				)}
			</div>
		);
	}
}

export default AboutPage;
