/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';

import { ReactComponent as LockIcon } from '../../../images/icons/lock.svg';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import { ReactComponent as EyeIcon } from '../../../images/icons/eye.svg';
import LayoutBox from '../../../components/LayoutBox';
import IconButton from '../../../components/IconButton/IconButton';

const inputTypes = ['textInput', 'textInputCustom'];

const SchemaCreator = ({ type }) => {
    const [schema, setSchema] = React.useState([
        {
            title: 'Section',
            id: 'people',
            subsections: [
                {
                    title: 'Sub section',
                    id: 'primaryapplicant',
                    fields: [
                        {
                            type: 'textInput',
                            label: 'Full name',
                            required: 1,
                            lockedQuestion: 0,
                            defaultQuestion: 1,
                        },
                    ],
                },
            ],
        },
    ]);

    const handleAddField = React.useCallback(
        (schemaIndex, subsectionIndex) => {
            const updatedSchema = _.update(schema, `[${schemaIndex}].subsections[${subsectionIndex}].fields`, fields => {
                return fields.concat({
                    type: 'textInput',
                    label: '[Label]',
                    required: 1,
                    lockedQuestion: 0,
                    defaultQuestion: 1,
                });
            });

            setSchema([...updatedSchema]);
        },
        [schema]
    );

    console.log('updatedSchema', schema);

    return (
        <LayoutBox m={4}>
            {schema.map(({ title, subsections }, schemaIndex) => (
                <div>
                    <h2>{title}</h2>
                    {subsections.map(({ title, fields }, subsectionIndex) => (
                        <div>
                            <h3>
                                {title}{' '}
                                <IconButton
                                    icon={<Icon color='purple500' svg={<PlusIcon />} />}
                                    onClick={() => handleAddField(schemaIndex, subsectionIndex)}
                                />
                            </h3>
                            {fields.map(({ label, type, lockedQuestion, defaultQuestion }) => (
                                <LayoutBox display='flex' alignItems='flex-end' mb={4}>
                                    {type === 'textInput' && <Input label={label} mr={6} minWidth='400px' />}

                                    <Dropdown options={inputTypes} value={type} mr={2} />
                                    <LayoutBox display='flex' flexDirection='column'>
                                        <Icon svg={<LockIcon />} size='xl' mb={1} />
                                        <Checkbox mb={0} checked={lockedQuestion} />
                                    </LayoutBox>
                                    <LayoutBox display='flex' flexDirection='column'>
                                        <Icon svg={<EyeIcon />} size='xl' mb={1} fill='purple500' />
                                        <Checkbox mb={0} checked={defaultQuestion} />
                                    </LayoutBox>
                                </LayoutBox>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </LayoutBox>
    );
};

SchemaCreator.propTypes = {
    type: PropTypes.oneOf(['DAR']),
};

SchemaCreator.defaultProps = {
    type: 'DAR',
};

export default SchemaCreator;
