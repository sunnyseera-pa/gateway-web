import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import './CommonComponents.scss';

const baseURL = require('./BaseURL');
const cmsURL = baseURL.getCMSURL();
const env = baseURL.getURLEnv();
const local = 'local';

class Footer extends React.Component {
	// state = {
	//     footer: '',
	//     isLoading: true,
	// };

	// async componentDidMount() {
	//     let url = env === local ? "https://uatbeta.healthdatagateway.org" : cmsURL;
	//     axios
	//         .get(url+'/footer', { withCredentials: false })
	//         .then((res) => {
	//             this.setState({
	//                 footer: res.data,
	//                 isLoading: false
	//             });
	//         })
	//         .catch((error) => {
	//             this.setState({
	//                 isLoading: false
	//             });
	//         })
	// }

	render() {
		// const { isLoading, footer } = this.state;

		// if (isLoading) {
		//     return (
		//         <Loading />
		//     );
		// }

		const footer =
			'<footer class="footer" role="contentinfo">\n' +
			'        <div class="footer-container">\n' +
			'          <div class="row footer-top">\n' +
			'            <div class="footer-top col-md-12">\n' +
			'                         \n' +
			'              <div class="footer-bar row">\n' +
			'                                <a href="https://icoda-research.org/researchers/" class="col-md-4 col-sm-4 col-xs-12 footer-bar-box text-center d-flex flex-column align-items-center">\n' +
			'                    <img  width="32"  alt="Icon of Researchers" data-src="https://icoda-research.org/wp-content/themes/ICODA/img/researchers_icon.svg" class=" mb-2 lazyload" src="https://icoda-research.org/wp-content/themes/ICODA/img/researchers_icon.svg" /><noscript><img class=" mb-2" width="32" src="https://icoda-research.org/wp-content/themes/ICODA/img/researchers_icon.svg" alt="Icon of Researchers" /></noscript>\n' +
			'                    <span class="title">Researchers</span>\n' +
			'                  </a>\n' +
			'                                <a href="https://icoda-research.org/partners/" class="col-md-4 col-sm-4 col-xs-12 footer-bar-box text-center d-flex flex-column align-items-center">\n' +
			'                    <img  width="32"  alt="Icon of Partners" data-src="https://icoda-research.org/wp-content/themes/ICODA/img/data_icon.svg" class=" mb-2 lazyload" src="https://icoda-research.org/wp-content/themes/ICODA/img/data_icon.svg" /><noscript><img class=" mb-2" width="32" src="https://icoda-research.org/wp-content/themes/ICODA/img/data_icon.svg" alt="Icon of Partners" /></noscript>\n' +
			'                    <span class="title">Partners</span>\n' +
			'                  </a>\n' +
			'                                <a href="https://icoda-research.org/public/" class="col-md-4 col-sm-4 col-xs-12 footer-bar-box text-center d-flex flex-column align-items-center">\n' +
			'                    <img  width="32"  alt="Icon of Public" data-src="https://icoda-research.org/wp-content/themes/ICODA/img/public_icon.svg" class=" mb-2 lazyload" src="https://icoda-research.org/wp-content/themes/ICODA/img/public_icon.svg" /><noscript><img class=" mb-2" width="32" src="https://icoda-research.org/wp-content/themes/ICODA/img/public_icon.svg" alt="Icon of Public" /></noscript>\n' +
			'                    <span class="title">Public</span>\n' +
			'                  </a>\n' +
			'                            </div>\n' +
			'          \n' +
			'            </div>\n' +
			'          </div>\n' +
			'\n' +
			'          <div class="footer-middle row">\n' +
			'\n' +
			'                <div class="footer-left text-left col-md-3 col-sm-6">\n' +
			'              <h5 class="footer-title">Useful information</h5>\n' +
			'              <div class="footer-menu">\n' +
			'                <ul id="menu-footer-menu" class="menu nav" itemscope itemtype="http://www.schema.org/SiteNavigationElement"><li  id="menu-item-28" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-28 nav-item"><a itemprop="url" href="https://icoda-research.org/contact/" class="nav-link"><span itemprop="name">Contact us</span></a></li>\n' +
			'<li  id="menu-item-359" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-359 nav-item"><a itemprop="url" href="https://icoda-research.org/terms-conditions/" class="nav-link"><span itemprop="name">Terms &#038; Conditions</span></a></li>\n' +
			'<li  id="menu-item-356" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-356 nav-item"><a itemprop="url" href="https://icoda-research.org/privacy-policy/" class="nav-link"><span itemprop="name">Privacy Policy</span></a></li>\n' +
			'<li  id="menu-item-357" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-357 nav-item"><a itemprop="url" href="/cookies" class="nav-link"><span itemprop="name">Cookies</span></a></li>\n' +
			'<li  id="menu-item-360" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-360 nav-item"><a itemprop="url" href="https://covid-19-alliance.github.io/Terms_of_Use.html" class="nav-link"><span itemprop="name">Workbench Terms of Use</span></a></li>\n' +
			'</ul>              </div>\n' +
			'            </div>\n' +
			'\n' +
			'            <div class="footer-middle-col-one footer-logo text-center   col-md-3 col-sm-6 ">\n' +
			'              <a target="_blank" class="footer-logo-link" href="https://www.hdruk.ac.uk/" target="_self">\n' +
			'                <img  alt="HDR UK white logo" data-src="https://icoda-research.org/wp-content/uploads/2020/11/hdruk-logo.svg" class="lazyload" src="https://icoda-research.org/wp-content/uploads/2020/11/hdruk-logo.svg"src="https://icoda-research.org/wp-content/uploads/2020/11/hdruk-logo.svg" /><noscript><img src="https://icoda-research.org/wp-content/uploads/2020/11/hdruk-logo.svg" alt="HDR UK white logo" /></noscript>\n' +
			'              </a>\n' +
			'              <p><p>ICODA &#8211; convened by <a href="https://www.hdruk.ac.uk/" target="_blank" rel="noopener">HDR UK</a>.</p>\n' +
			'</p>            </div>\n' +
			'\n' +
			'            <div class="footer-middle-col text-center  col-md-3 col-sm-6 ">\n' +
			'              <h5 class="footer-titles">Stay in touch</h5>                            <a href="https://icoda-research.org/contact/" class="arrow-link mailing-link" target="_self"><span>Contact</span><span class="arrow-svg"><svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"\n' +
			'  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 251.275 171.925"\n' +
			'  style="enable-background:new 0 0 251.275 171.925;" xml:space="preserve">\n' +
			'<metadata>\n' +
			' <sfw  xmlns="&ns_sfw;">\n' +
			'   <slices></slices>\n' +
			'   <sliceSourceBounds  bottomLeftOrigin="true" height="-32766" width="-32766" x="8592" y="24274"></sliceSourceBounds>\n' +
			' </sfw>\n' +
			'</metadata>\n' +
			'<g id="arrow-right_24x24_1x" transform="translate(-2.5 -5.293)">\n' +
			' <path id="Path_159" class="st0" d="M167.812,11.906l79.35,79.35l-79.35,79.35"/>\n' +
			' <path id="Path_160" class="st0" d="M247.163,91.256H9.113"/>\n' +
			'</g>\n' +
			'</svg></span>\n' +
			'</a>\n' +
			'            </div>\n' +
			'\n' +
			'                        <div class="footer-right text-md-right text-sm-left col-md-3 col-sm-6 ">\n' +
			'              <h5 class="footer-title">Follow us</h5>\n' +
			'                <div class="socials-container d-flex align-items-center justify-content-md-end justify-content-sm-start">\n' +
			'                                      <a target="_blank" href="https://www.youtube.com/channel/UCIYkd-AkokHbgVSo9FXB_JA" class="social youtube rounded-circle d-flex align-items-center justify-content-center">\n' +
			'                    <img  alt="youtube icon" data-src="https://icoda-research.org/wp-content/themes/ICODA/img/youtube_icon.svg" class="lazyload" src="https://icoda-research.org/wp-content/themes/ICODA/img/youtube_icon.svg" /><noscript><img src="https://icoda-research.org/wp-content/themes/ICODA/img/youtube_icon.svg" alt="youtube icon"/></noscript>\n' +
			'                    </a>\n' +
			'                                                        <a target="_blank" href="https://www.linkedin.com/company/international-covid-19-data-alliance" class="social linkedin rounded-circle d-flex align-items-center justify-content-center">\n' +
			'                    <img  alt="linkedin icon" data-src="https://icoda-research.org/wp-content/themes/ICODA/img/linkedin_icon.svg" class="lazyload" src="https://icoda-research.org/wp-content/themes/ICODA/img/linkedin_icon.svg" /><noscript><img src="https://icoda-research.org/wp-content/themes/ICODA/img/linkedin_icon.svg" alt="linkedin icon"/></noscript>\n' +
			'                    </a>\n' +
			'                                                        <a target="_blank" href="https://twitter.com/ICODA_research" class="social twitter rounded-circle d-flex align-items-center justify-content-center">\n' +
			'                      <img  alt="twitter icon" data-src="https://icoda-research.org/wp-content/themes/ICODA/img/twitter_icon.svg" class="lazyload" src="https://icoda-research.org/wp-content/themes/ICODA/img/twitter_icon.svg" /><noscript><img src="https://icoda-research.org/wp-content/themes/ICODA/img/twitter_icon.svg" alt="twitter icon"/></noscript>\n' +
			'                    </a>\n' +
			'                                  </div>\n' +
			'            </div>\n' +
			'                      </div>\n' +
			'\n' +
			'          <div class="footer-bottom row">\n' +
			'            <div class="col-md-6 col-sm-12 text-left">\n' +
			'              <p><p>©HDR UK 2020. All rights reserved.</p>\n' +
			'<p>&nbsp;</p>\n' +
			'</p>\n' +
			'            </div>\n' +
			'            <div class="col-md-6 col-sm-12 text-right text-sm-left">\n' +
			'              <div class="legal-menu">\n' +
			'                <ul id="menu-legal-menu" class="menu nav" itemscope itemtype="http://www.schema.org/SiteNavigationElement"><li  id="menu-item-44" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-44 nav-item"><a itemprop="url" href="https://icoda-research.org/cookies/" class="nav-link"><span itemprop="name">Cookies</span></a></li>\n' +
			'<li  id="menu-item-45" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 nav-item"><a itemprop="url" href="https://icoda-research.org/terms-conditions/" class="nav-link"><span itemprop="name">Terms &#038; Conditions</span></a></li>\n' +
			'<li  id="menu-item-47" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-47 nav-item"><a itemprop="url" href="https://icoda-research.org/privacy-policy/" class="nav-link"><span itemprop="name">Privacy Policy</span></a></li>\n' +
			'</ul>              </div>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'\t\t\n' +
			'\t\t\t</footer>';

		return <>{footer !== '' ? <div dangerouslySetInnerHTML={{ __html: footer }} /> : <div className='footerBottom' />}</>;
	}
}

export default Footer;
