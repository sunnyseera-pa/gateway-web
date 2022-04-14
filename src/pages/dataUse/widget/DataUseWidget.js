import React from 'react';
import { LayoutContent } from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';

const DataUseWidget = () => {
    return (
        <LayoutContent>
            <div className='accountHeader'>
                <Typography variant='h5'>How to start using your widget</Typography>
                <Typography mb={3}>
                    Below is an interactive example of how your widget could look and be used. Please note that this design is compatible
                    with mobile devices and can be resized to fit anywhere on your website. To start using this widget please accept the
                    terms and conditions by clicking on the 'Get widget' button below.
                </Typography>
                <Button mb={3}>Get widget</Button>
                <Typography>By embedding content in your website or app, you are agreeing to the Terms and Conditions</Typography>
                <Checkbox
                    variant='primary'
                    label='I agree to the HDR Widget Terms and Conditions of use'
                    id='termConditions'
                    mb={4}
                    disabled
                />
                <Typography variant='h6'>Data use widget</Typography>
                <Typography color='grey600'>
                    <i>Click the button below to see your filtered data uses</i>
                </Typography>
            </div>
        </LayoutContent>
    );
};

export default DataUseWidget;
