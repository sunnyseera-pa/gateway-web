import ReactGA from 'react-ga';

var disableGA = true;

export const initGA = trackingID => {
	// Disable tracking if the opt-out cookie exists.
	var disableStr = 'ga-disable-UA-166025838-1';
	if (document.cookie.indexOf(disableStr + '=true') > -1) {
		window[disableStr] = true;
		disableGA = true;
	}
	if (disableGA === false) {
		ReactGA.initialize(trackingID);
	}
};

//'UA-166025838-1'

export const PageView = () => {
	if (disableGA === false) {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
};

export const VirtualPageView = pageTitle => {
	let dataLayer = window.dataLayer;

	if (dataLayer) {
		dataLayer.push({ 'gtm.newHistoryState': pageTitle, event: 'virtual-page-view' });
	}
};

//Can also add a numerical value to an event...
export const Event = (category, action, label) => {
	if (disableGA === false) {
		ReactGA.event({
			category: category,
			action: action,
			label: label,
		});
	}
};
