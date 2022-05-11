/** @jsx jsx */
import { jsx } from '@emotion/react';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';

const SchemaCreatorConditionalQuestions = ({ questions, lockedQuestion }) => {
    return (
        <div style={{ borderLeft: '4px solid #ccc', paddingLeft: '16px' }}>
            {questions.map(({ input: { type }, question }) => {
                if (type === 'textInput') return <Input disabled={!!lockedQuestion} label={question} mb={3} />;
                if (type === 'textareaInput') return <Textarea disabled={!!lockedQuestion} label={question} mb={3} />;
                if (type === 'datePickerCustom') return <Input disabled={!!lockedQuestion} type='date' />;
            })}
        </div>
    );
};

export default SchemaCreatorConditionalQuestions;
