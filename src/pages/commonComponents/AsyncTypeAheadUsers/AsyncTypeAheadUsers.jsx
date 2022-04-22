/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { find, remove, isEmpty, isUndefined } from 'lodash';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from 'react-bootstrap-typeahead';
import Typeahead from '../../../components/Typeahead/Typeahead';
import serviceUsers from '../../../services/users/users';
import serviceAuth from '../../../services/auth/auth';
import UploaderUtil from '../../../utils/Uploader.util';
import Icon from '../../../components/Icon';
import { ReactComponent as SearchIcon } from '../../../images/search.svg';
import { ReactComponent as GreenTick } from '../../../images/tick.svg';
import * as styles from './AsyncTypeAheadUsers.styles';

function AsyncTypeAheadUsers(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [recentlyAdded, setRecentlyadded] = useState([]);
    const [showRecentlyAdded, setShowRecentlyAdded] = useState(false);

    useEffect(() => {
        props.selectedUsers && props.getUsersInfo ? getUsersInfo(props.selectedUsers) : setSelected(props.selectedUsers);
    }, [props.selectedUsers]);

    const getUsersInfo = async contributors => {
        const selectedUsers = await Promise.all(
            contributors
                .filter(id => id !== props.currentUserId)
                .map(async id => {
                    const userInfo = await UploaderUtil.getUserInfo(id);
                    if (userInfo) {
                        return { id: userInfo.id, name: `${userInfo.firstname} ${userInfo.lastname}` };
                    }
                })
        );
        setSelected(selectedUsers);
    };

    const handleChange = options => {
        if (props.showAuthor) {
            props.changeHandler(options);
        } else {
            props.changeHandler(options);
            if (options.length) {
                setSelected(options);
                props.changeHandler(options);
            } else {
                setSelected([]);
                props.changeHandler([]);
            }
        }
    };

    const handleOnFocus = async e => {
        if (!isUndefined(e) && e.type === 'focus' && isEmpty(recentlyAdded)) {
            const response = await serviceUsers.getUsers();
            const { data } = response.data;
            const currentUserInfo = remove(data, { id: props.currentUserId });
            if (!isEmpty(currentUserInfo)) {
                data.unshift(currentUserInfo[0]);
            }
            setOptions(data);
            setRecentlyadded(data);
            setShowRecentlyAdded(true);
        } else {
            setShowRecentlyAdded(true);
            setOptions(recentlyAdded);
        }
    };

    const handleInputChange = async value => {
        if (value.length > 2) {
            setIsLoading(true);
            const users = await serviceUsers.searchUsers(value);
            setOptions(users.data.data);
            setShowRecentlyAdded(false);
            setIsLoading(false);
        } else if (value.length < 1) {
            handleOnFocus();
        }
    };
    const filterBy = () => true;

    return (
        <Typeahead
            css={styles.root()}
            filterBy={filterBy}
            data-testid='async-users'
            id='async-users'
            isLoading={isLoading}
            labelKey='name'
            placeholder={props.placeholder}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onFocus={handleOnFocus}
            options={options}
            selected={selected}
            iconPrepend={<Icon svg={<SearchIcon />} size='xl' fill='purple' />}
            multiple={props.multiple}
            renderMenu={(results, menuProps) => (
                <Menu {...menuProps}>
                    {showRecentlyAdded && !isEmpty(results) && (
                        <Menu.Header>
                            <span className='header'>Recently added:</span>
                        </Menu.Header>
                    )}
                    {results.map((result, index) => (
                        <MenuItem option={result} position={index}>
                            <span className='name' data-testid={`name-${index}`}>
                                {result.name}
                            </span>

                            {find(selected, { id: result.id }) && (
                                <span className='icon' data-testid={`icon-${index}`}>
                                    <Icon ml={1} size='xl' svg={<GreenTick />} />
                                </span>
                            )}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        />
    );
}

AsyncTypeAheadUsers.propTypes = {
    selectedUsers: PropTypes.array,
    showAuthor: PropTypes.bool,
    getUsersInfo: PropTypes.bool,
    changeHandler: PropTypes.func,
    currentUserId: PropTypes.number,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
};
AsyncTypeAheadUsers.defaultProps = {
    selectedUsers: [],
    showAuthor: false,
    getUsersInfo: false,
    multiple: true,
    placeholder: 'Recently added',
};

export default AsyncTypeAheadUsers;
