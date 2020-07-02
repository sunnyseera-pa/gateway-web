import React from 'react';
import axios from 'axios';
import Loading from './Loading'

var cmsURL = require('./BaseURL').getCMSURL();

class Footer extends React.Component {
    
    state = {
        footer: '',
        isLoading: true
    };


    async componentDidMount() {
        axios
            .get(cmsURL+'/footer', { withCredentials: false })
            .then((res) => {
                this.setState({
                    footer: res.data,
                    isLoading: false
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                });
            })
    }

    render() {
        const { isLoading, footer } = this.state;

        if (isLoading) {
            return (
                <Loading />
            );
        }

        return (
            <>
                {footer !== '' ? 
                    <div dangerouslySetInnerHTML={{__html:footer}} />
                    : <div className="footerBottom" />
                }
            </>
        );
    }
}

export default Footer;
