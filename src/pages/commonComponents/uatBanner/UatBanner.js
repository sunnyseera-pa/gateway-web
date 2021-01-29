import React from 'react';
import './UatBanner.scss';

const UatBanner = () => {
	return (
		<div class='uatBanner uatBannerText'>
			<span>
				UAT / This is a copy of the live website for the purposes of testing. Some features may not work as expected, such as institutional
				login.
			</span>
			<a class='floatRight uatBannerText' href='https://discourse.healthdatagateway.org/t/using-the-uat-environment/451' target='_blank'>
				Read more
			</a>
		</div>
	);
};

export default UatBanner;
