import ReactGA from 'react-ga';

var disableGA = false;
const recordVirtualPageView = pageTitle => {
	if (window.dataLayer) {
		window.dataLayer.push({ 'gtm.newHistoryState': pageTitle, event: 'virtual-page-view' });
	}
};

const recordEvent = (category, action, label) => {
	if (window.dataLayer) {
		window.dataLayer.push({
			event: 'ga-event',
			eventCategory: category,
			eventAction: action,
			eventLabel: label
		});
	}
};

export const initGA = trackingID => {
	// Disable tracking if the opt-out cookie exists.
	var disableStr = 'ga-disable-UA-183238557-1';
	if (document.cookie.indexOf(disableStr + '=true') > -1) {
		window[disableStr] = true;
		disableGA = true;
	}
	if (disableGA === false) {
		ReactGA.initialize(trackingID);
	}
};

export const PageView = () => {
	if (disableGA === false) {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
};

export const Event = (category, action, label) => {
	if (disableGA === false) {
		ReactGA.event({
			category: category,
			action: action,
			label: label,
		});
	}
};

export default {
	recordVirtualPageView,
	recordEvent,
};
