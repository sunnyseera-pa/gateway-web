/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash';
import googleAnalytics from '../../../../tracking';
import { stripMarkdown } from '../../../../utils/GeneralHelper.util';
import SVGIcon from '../../../../images/SVGIcon';
import RemoveButton from '../RemoveButton/RemoveButton';
import Title from '../Title/Title';
import Description from '../Description/Description';
import Tag from '../Tag/Tag';
import { ReactComponent as LockSVG } from '../../../../images/icon-security.svg';
import { dataset } from './constants';
import * as styles from './Dataset.styles';
import '../../CommonComponents.scss';
import '../RelatedObject.scss';

const Dataset = ({
    data,
    activeLink,
    publisherLogo,
    onSearchPage,
    showRelationshipQuestion,
    isCohortDiscovery,
    updateOnFilterBadge,
    removeButton,
    isLocked,
    onClick,
}) => {
    const [publisherDetails, setPublisherDetails] = useState({ name: '', label: '' });

    const getPublisherDetails = useCallback(() => {
        const publisher = { name: '', label: '', showShield: false };
        if (!isEmpty(data.datasetv2)) {
            const name = data.datasetv2.summary.publisher.name.toUpperCase();
            publisher.name = name;
            publisher.label = name;
            publisher.showShield = !isNil(data.datasetv2.summary.publisher.memberOf);
        } else {
            const name = data.datasetfields.publisher;
            const publisherName = name.includes('>') ? name.split(' > ')[1].toUpperCase() : name.toUpperCase();
            publisher.name = publisherName;
            publisher.label = publisherName;
            publisher.showShield = false;
        }
        return publisher;
    }, [data.datasetv2, data.datasetfields.publisher]);

    useEffect(() => {
        const publisherDetails = getPublisherDetails();
        setPublisherDetails(publisherDetails);
    }, [getPublisherDetails]);

    const getDescription = () => {
        if (!data.datasetfields.abstract || typeof data.datasetfields.abstract === 'undefined') {
            if (data.description) {
                return stripMarkdown(data.description, 255);
            }
        } else {
            return stripMarkdown(data.datasetfields.abstract);
        }
    };

    if (data.type === 'dataset' && data.activeflag === 'archive') {
        return (
            <Row className='noMargin pad-left-24'>
                <Col sm={10} lg={10} className='entity-deleted-edit gray800-14'>
                    The dataset '{data.name}' has been deleted by the publisher
                </Col>
                <Col sm={2} lg={2}>
                    <RemoveButton removeButtonHandler={removeButton} />
                </Col>
            </Row>
        );
    }

    const phenotypesSelected = queryString.parse(window.location.search).phenotypes
        ? queryString.parse(window.location.search).phenotypes.split('::')
        : [];
    const searchTerm = queryString.parse(window.location.search).search ? queryString.parse(window.location.search).search : '';
    const phenotypesSearched = data.datasetfields.phenotypes.filter(phenotype => phenotype.name.toLowerCase() === searchTerm.toLowerCase());
    return (
        <>
            <Row data-testid='related-dataset-object' className='noMargin'>
                <Col sm={10} lg={10} className='pad-left-24'>
                    <Title
                        id={data.pid}
                        name={data.name}
                        type={data.type}
                        activeLink={activeLink}
                        onClickHandler={() => {
                            googleAnalytics.recordEvent(`${dataset.TAB}`, 'Clicked on dataset to open', `Dataset name: ${data.name}`);

                            onClick();
                        }}
                    />
                    <br />
                    {publisherDetails.showShield && (
                        <span>
                            <SVGIcon name='shield' fill='#475da7' className='svg-16 mr-2' viewBox='0 0 16 16' />
                        </span>
                    )}
                    <span
                        className={activeLink ? 'gray800-14 underlined' : 'gray800-14'}
                        css={styles.pointer}
                        onClick={() =>
                            updateOnFilterBadge('publisher', {
                                label: publisherDetails.label,
                                parentKey: 'publisher',
                            })
                        }
                        data-testid={`publisher-${publisherDetails.name}`}
                    >
                        {' '}
                        {publisherDetails.name}{' '}
                    </span>
                </Col>
                <Col sm={2} lg={2} className={isLocked ? 'lockSVG pad-right-24' : 'pad-right-24'}>
                    {!isEmpty(publisherLogo) && (
                        <div
                            className='datasetLogoCircle floatRight'
                            css={styles.publisherLogoCSS(publisherLogo)}
                            data-testid='publisher-logo'
                        />
                    )}
                    {showRelationshipQuestion ? isLocked ? <LockSVG /> : <RemoveButton removeButtonHandler={removeButton} /> : ''}
                </Col>
                <Col sm={12} lg={12} className='pad-left-24 pad-right-24 pad-top-16'>
                    <Tag tagName={dataset.TAB} tagType={data.type} updateOnFilterBadgeHandler={updateOnFilterBadge}>
                        <SVGIcon name='dataseticon' fill='#113328' className='badgeSvg mr-2' viewBox='-2 -2 22 22' />
                    </Tag>
                    {isCohortDiscovery && (
                        <Tag
                            tagName='Cohort Discovery'
                            tagType='project'
                            updateOnFilterBadgeHandler={updateOnFilterBadge}
                            showTagType={false}
                        >
                            <SVGIcon
                                name='cohorticon'
                                fill='#472505'
                                className='badgeSvg mr-2'
                                width='22'
                                height='22'
                                viewBox='0 0 10 10'
                            />
                        </Tag>
                    )}

                    {phenotypesSearched && phenotypesSearched.length > 0 && (
                        <Tag
                            key='phenotypes-searched'
                            tagName={phenotypesSearched[0].name}
                            activeLink={activeLink}
                            onSearchPage={onSearchPage}
                            updateOnFilterBadgeHandler={updateOnFilterBadge}
                            showTagType
                            {...dataset.PHENOTYPES}
                        />
                    )}

                    {phenotypesSelected &&
                        phenotypesSelected.map((phenotype, index) => {
                            if (
                                data.datasetfields.phenotypes.find(
                                    phenotypeCheck => phenotypeCheck.name.toLowerCase() === phenotype.toLowerCase()
                                )
                            ) {
                                return (
                                    <Tag
                                        key={`phenotypes-selected-${index}`}
                                        tagName={phenotype}
                                        activeLink={activeLink}
                                        onSearchPage={onSearchPage}
                                        updateOnFilterBadgeHandler={updateOnFilterBadge}
                                        showTagType
                                        {...dataset.PHENOTYPES}
                                    />
                                );
                            }
                            return null;
                        })}

                    {data.tags.features &&
                        data.tags.features.map((feature, index) => (
                            <Tag
                                key={`tag-${index}`}
                                tagName={feature}
                                activeLink={activeLink}
                                onSearchPage={onSearchPage}
                                updateOnFilterBadgeHandler={updateOnFilterBadge}
                                {...dataset.FEATURES}
                            />
                        ))}
                </Col>
                {!showRelationshipQuestion && <Description type={data.type} description={getDescription()} />}
            </Row>
        </>
    );
};

Dataset.propTypes = {
    data: PropTypes.object.isRequired,
    activeLink: PropTypes.bool.isRequired,
    publisherLogo: PropTypes.string,
    showRelationshipQuestion: PropTypes.bool.isRequired,
    onSearchPage: PropTypes.bool.isRequired,
    isCohortDiscovery: PropTypes.bool.isRequired,
    updateOnFilterBadge: PropTypes.func.isRequired,
    removeButton: PropTypes.func.isRequired,
};

Dataset.defaultProps = {
    onClick: () => {},
};

export default Dataset;
