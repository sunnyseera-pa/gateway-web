import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import Iframe from 'react-iframe';
import DefaultAboutPage from './DefaultAboutPage';
import './AboutPage.scss';

class AboutPage extends React.Component {
	state = {
		isAvailable: true,
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
	}

	render() {
		const { isAvailable } = this.state;

		return (
			<div className='searchTabsHolder'>
				<div className='about-page-header'>
					<div className='about-page-header-title'>About the International COVID-19 Data Alliance Gateway</div>
					<div className='about-page-header-subtitle'>
						Use this headline to give more details about the content of the page and what problems it solves
					</div>
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
						<Iframe
							url='https://icoda-research.org/icoda-gateway/'
							width='100%'
							height='900px'
							id='aboutIframe'
							frameBorder='0'
							display='initial'
							position='relative'
						/>
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
