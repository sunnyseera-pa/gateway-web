import ReactGA from 'react-ga';

var disableGA = true;

const initialise = trackingID => {
	// // Disable tracking if the opt-out cookie exists.
	// var disableStr = 'ga-disable-UA-166025838-1';
	// if (document.cookie.indexOf(disableStr + '=true') > -1) {
	// 	window[disableStr] = true;
	// 	disableGA = true;
	// }
	// if (disableGA === false) {
	// 	ReactGA.initialize(trackingID);
	// }
};

const recordPageView = () => {
	// if (disableGA === false) {
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// }
};

const recordVirtualPageView = pageTitle => {
	let dataLayer = window.dataLayer;

	if (dataLayer) {
		dataLayer.push({ 'gtm.newHistoryState': pageTitle, event: 'virtual-page-view' });
	}
};

const recordEvent = (category, action, label) => {
	// if (disableGA === false) {
	// 	ReactGA.event({
	// 		category: category,
	// 		action: action,
	// 		label: label,
	// 	});
	// }
};

export default {
	initialise,
	recordPageView,
	recordVirtualPageView,
	recordEvent,
};
