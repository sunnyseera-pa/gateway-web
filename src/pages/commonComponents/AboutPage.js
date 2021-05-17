import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
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
			.head('https://icoda-research.org/icoda-gatway/', { withCredentials: false })
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
			<div class='resource-card-row row'>
				<Col>
					{isAvailable ? (
						<div className='collection-rectangle'>
							<Row className='noMargin'>
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
							</Row>
						</div>
					) : (
						<div className='collection-rectangle'>
							<DefaultAboutPage />
						</div>
					)}
				</Col>
			</div>
		);
	}
}

export default AboutPage;
