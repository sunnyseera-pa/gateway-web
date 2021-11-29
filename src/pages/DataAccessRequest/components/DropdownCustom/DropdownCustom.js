import React from 'react'; 
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import './DropdownCustom.scss';
 
let baseURL = require('../../../commonComponents/BaseURL').getURL();

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        className='noTextDecoration'
        href='javascript:void(0)'
        ref={ref}
        onClick={e => {
            e.preventDefault();
                onClick(e);
        }}>
        {children}
    </a>
)); 

class DropdownCustom extends React.Component {
       // initialize our state
	state = { 
        darApplicationId: '', 
		contributorsInfo: [],
	};

    constructor(props) {
        super(props); 
        this.state = {
            value: this.props.value,
            readOnly: props.readOnly || false,
        };
        this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
        this.state.darApplicationId = props.applicationId;
    }

    async componentDidMount() {
		await this.getContributorsInfo();
	}

    async getContributorsInfo() {
        await axios.get(baseURL + `/api/v1/data-access-request/prepopulate-contributors/${this.state.darApplicationId}`).then(res => {
            this.setState({
                contributorsInfo: res.data.data
            });
        });
    }

    setContributorValue(contributor) {
        let contributorValue = `${contributor.firstname} ${contributor.lastname}`

        this.setState(
            {
                value: contributorValue,
            },
            this.props.onChange.bind(null, contributor)
        );

    }

    handleChange(e) {
        this.setState(
            {
                value: e.target.value,
            },
            this.props.onChange.bind(null, e.target.value)
        );
    }

    handleFocus(e) {
		this.props.onFocus();
	}
	handleBlur(e) {
		this.props.onBlur(this.props.value);
	}

    render() {
        const { contributorsInfo } = this.state;
        
        return (      
           <Dropdown >
					<Dropdown.Toggle as={CustomToggle}> 
                        <input 
                            name={this.props.name}
                            id={this.props.id}
					        disabled={this.state.readOnly}
                            aria-labelledby={this.props.labelId}
					        className={this.props.classes.input}
					        required={this.props.required ? 'required' : undefined}
                            type="text" 
							onChange={e => this.handleChange(e)} 
                            onBlur={this.handleBlur}
				            onFocus={this.handleFocus}
                            value={this.state.value}  
                            data-test-id='darContributorTextInput'
                        ></input> 
					</Dropdown.Toggle>
					<Dropdown.Menu className='darContributorsDropdown' >
                    <span className='gray800-14-bold'> Suggestions: </span>
						{!_.isUndefined(contributorsInfo) && contributorsInfo.map((contributor, index) => { 
							return (
                                <div 
                                    className='margin-top-8 cursorPointer' 
                                    data-test-id='darContributorDropdownItem' key={index}
                                    onClick={() => {
                                        this.setContributorValue(contributor)
                                    }}
                                >
                                    <span className='gray800-14'>{contributor.firstname} {contributor.lastname} {!_.has(contributor, 'user.email') && ' (contributor)'}</span>
                                    <br />
                                    <span className='gray-600-14' data-test-id={`darContributorDropdownEmail${index}`}>
                                        {_.has(contributor, 'user.email') ? contributor.user.email : 'Email address cannot be shared'}
                                    </span>
                                    <span className='gray-600-14 floatRight' data-test-id={`darContributorDropdownOrganisation${index}`}>
                                        {!_.has(contributor, 'user.email') && contributor.showOrganisation === false ? 'Organisation is hidden' : contributor.organisation}
                                    </span>
                                </div>
							); 
						})}
					</Dropdown.Menu>
				</Dropdown>
        );
    }
}

DropdownCustom.defaultProps = {
    value: '',
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default DropdownCustom;
