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

export const isPDFLink = link => {
  return /\.pdf$/.test(link);
};

export const removeArrayItem = (arr, value) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}