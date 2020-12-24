import React from 'react'
import i18next from 'i18next';

function handleClick(lang) {
    i18next.changeLanguage(lang)
}
function FlagsTranslation() {
    return (
        <div className="languageBox" >
            <button className="flagsLanguage englishFlagLanguage" onClick={() => handleClick('en')} />
            <button className="flagsLanguage italianFlagLanguage" onClick={() => handleClick('it')} />
        </div>
    )
}

export default FlagsTranslation
