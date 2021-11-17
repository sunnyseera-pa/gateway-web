import PropTypes from 'propTypes';
import { addCommonPropTypes } from '../../../configs/propTypes';
import SVGIcon from '../../../images/SVGIcon';
import * as styles from './Icon.styles.js';

const svgFragments = [
	'dataseticon',
	'projecticon',
	'searchicon',
	'cohorticon',
	'newnotificationicon',
	'newnotificationicon',
	'toolicon',
	'emptystar',
	'clear',
	'stock',
	'newprojecticon',
	'newtoolicon',
	'reviewsicon',
	'accounticon',
	'dataaccessicon',
	'rolesicon',
	'bell',
	'newestprojecticon',
	'personicon',
	'closeicon',
	'collections',
	'chevronbottom',
	'chevronright',
	'dashboard',
	'info',
	'infofill',
	'chat',
	'check',
	'workflow',
	'attention',
	'eye',
	'eyeCrossed',
	'educationicon',
	'members',
	'shield',
	'externallink',
	'checkicon',
	'loading',
	'cycle',
	'flag',
	'metadata-complete',
	'metadata-half-done',
	'metadata-empty',
	'plusChunky',
	'tick',
];

const Icon = ({ name, path, size, color, fill, ml, mr, mb, mt, ...outerProps }) => {
	return (
		<span css={styles.root({ size, color, fill, ml, mr, mb, mt })} className='ui-Icon' {...outerProps}>
			{svgFragments.includes(name) ? (
				<SVGIcon name={name} fill='inherit' color='inherit' stroke='none' />
			) : (
				React.lazy(() => import(`${path}/${name}.svg`))
			)}
		</span>
	);
};

Icon.propTypes = addCommonPropTypes({
	name: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'default', 'large']),
	path: PropTypes.string,
	color: PropTypes.string,
	fill: PropTypes.string,
});

Icon.defaultProps = {
	size: 'default',
	path: '../../../images',
	color: 'inherit',
	fill: 'inherit',
};

export default Icon;
