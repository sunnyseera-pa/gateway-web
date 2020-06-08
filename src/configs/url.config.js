import { regExpConfig } from './regex.config';

/**
 * [_buildUrl]
 *
 * @param  {urlType[string]}
 * @description Return full URL for either CMS or App
 */
const _buildUrl = (urlType) => {
    // 1. destructure window
    let { location: { href, origin }} = window;
    if (href.includes('appspot.com')) {
        return origin;
    } 
    else if (!href.includes('localhost')) {
        let regArray = _getRegexURL(urlType, href);
        if (regArray) {
            let [one, two, url] = regArray
            //add -api to the sub domain for API requests
            switch(urlType) {
                case 'cms':
                    return `https://${url}`;
                default :
                    return `https://api${url}`;
            }  
        }
    } else {
        return 'http://localhost:3001'
    }
}

/**
 * [_getRegex]
 * 
 * @param {urlType[string], href{[string]}}
 * @description Returns regex test based on url type 
 */
const _getRegexURL = (urlType, href) => {
    console.log(`GET REGEX URL ${urlType}`);
    switch(urlType) {
        case 'cms':
            return regExpConfig.cmsUrl.exec(href);
        default :
            return regExpConfig.httpUrl.exec(href);
    } 
}

export const baseURL = _buildUrl('http');
export const cmsURL = _buildUrl('cms');