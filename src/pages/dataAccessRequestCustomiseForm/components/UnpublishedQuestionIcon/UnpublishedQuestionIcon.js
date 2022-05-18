import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import { ReactComponent as DotIcon } from '../../../../images/icons/dot.svg';
import { ReactComponent as TickIcon } from '../../../../images/icons/tick.svg';
import helpers from '../../../../utils/DarHelper.util';

const UnpublishedQuestionIcon = ({ question: { questionId, questionStatus }, unpublishedGuidance }) => {
    const { t } = useTranslation();

    let tooltipContent;
    let icon;

    if (unpublishedGuidance.includes(questionId)) {
        tooltipContent = t('guidance.editted');

        icon = <Icon svg={<TickIcon />} fill='green400' ml={2} data-testid='editted' />;
    } else if (!helpers.isQuestionLocked(questionStatus)) {
        tooltipContent = t('guidance.uneditted');

        icon = <Icon svg={<DotIcon />} fill='grey400' ml={2} data-testid='uneditted' />;
    }

    return icon ? (
        <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>{tooltipContent}</Tooltip>}>
            <div>{icon}</div>
        </OverlayTrigger>
    ) : null;
};

UnpublishedQuestionIcon.propTypes = {
    question: PropTypes.shape({
        questionId: PropTypes.string,
        questionStatus: PropTypes.number,
    }).isRequired,
    unpublishedGuidance: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UnpublishedQuestionIcon;
