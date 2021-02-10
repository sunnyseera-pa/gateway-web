import _ from 'lodash';

export const isEditMode = (url = '') => {
  if(!_.isEmpty(url)) {
    let src = url.toLowerCase();
    if(src.includes('edit'))
      return true;

      return false
  }
  return false;
}

export const isDOILink = link => {
  return /^(?:(http)(s)?(:\/\/))?(dx.)?doi.org\/([\w.\/-]*)/i.test(link);
};