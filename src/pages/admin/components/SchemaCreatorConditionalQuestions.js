/** @jsx jsx */
import { jsx } from '@emotion/react';
import Input from '../../../components/Input';

const SchemaCreatorConditionalQuestions = ({ questions, lockedQuestion }) => {
    return (
        <div style={{ borderLeft: '4px solid #ccc', paddingLeft: '16px' }}>
            {questions.map(({ input: { type }, question }) => {
                return type === 'textInput' && <Input disabled={!!lockedQuestion} label={question} mb={3} />;
            })}
        </div>
    );
};

export default SchemaCreatorConditionalQuestions;
