import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';
import LayoutBox from '../../../components/LayoutBox';

const SchemaCreatorCheckbox = ({ field, questionSetIndex, fieldIndex, checked, onChange, icon, type }) => {
    const handleOnChange = React.useCallback(() => {
        onChange(field, questionSetIndex, fieldIndex, type);
    }, [field, questionSetIndex, fieldIndex, type]);

    return (
        <LayoutBox display='flex' flexDirection='column' alignItems='center' mr={2}>
            <Icon svg={icon} mb={1} fill='purple500' size='xl' />
            <Checkbox mb={0} checked={checked} onChange={handleOnChange} />
        </LayoutBox>
    );
};

export default SchemaCreatorCheckbox;
