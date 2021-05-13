import React from 'react';
import './DefaultAboutPage.scss';

const DefaultAboutPage = () => {
	return (
		<section className='default-about-page'>
			<h1>International COVID-19 Data Alliance Gateway</h1>

			<article>
				<p class='text-black-50'>
					The International COVID-19 Data Alliance (ICODA) Gateway allows you to submit an application to access and analyse data in the
					ICODA COVID-19 Workbench.
				</p>
				<p>&nbsp;</p>
				<p>
					You can use the ICODA Gateway to search for datasets that are available through ICODA.&nbsp; Currently the ICODA Gateway is
					showing a subset of datasets related to ICODA’s{' '}
					<a href='https://icoda-research.org/project/driver-project-1/'>Driver Project 1,</a>&nbsp; but we will be extending this over
					time.
				</p>
				<p>&nbsp;</p>
				<p>Once you have identified data that you would like to request access to, you can submit an application.</p>
				<p>&nbsp;</p>
				<p>
					To submit an application, you will need to login to the ICODA Gateway using your LinkedIn ID, Google account or with OpenAthens
					(UK only).
				</p>
				<p>&nbsp;</p>
				<p>
					You will then be asked for information about yourself, your research team and your project proposal which will be reviewed to
					ensure that it meets the ‘five safes’ framework.&nbsp; ICODA has committed to this approach to ensure that all use of data on the
					COVID-19 Workbench is responsible, secure and demonstrates trustworthiness.
				</p>
				<p>&nbsp;</p>
				<p>If you have already started working on an application, it will be saved within your profile.</p>

				<div></div>

				<br />
			</article>
		</section>
	);
};

export default DefaultAboutPage;
