import React from 'react';
import axios from 'axios';
import { baseURL } from '../../configs/url.config';
let cmsURL = require('../commonComponents/BaseURL').getCMSURL();

class Footer extends React.Component {

    constructor(props) {
        super(props)
    }
    
    state = { 
        html: 'hello world'
    };

    async componentDidMount(){
        // axios.get(baseURL + '/api/v1/footer') //call to new API end point
        axios.get('https://latest.healthdatagateway.org/footer')
            .then((res) => {
                console.log('res is ',res);
                this.setState({html: res.data.data})
            })
            .catch((err) => {
                console.log('err is ',err);
            });
    }

    render() {
        return (
            <div>
                { <div dangerouslySetInnerHTML={{ __html: this.state.html}} /> }
            </div>
        )
    }
}

export default Footer;
    




