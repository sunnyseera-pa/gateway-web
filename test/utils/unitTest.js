export const DATA_SPEC_ATTRIBUTE_NAME = 'data-spec';

/**
 * Find all instances of components in the rendered 'componentWrapper' that are DOM components
 * with the 'data-spec' attribute matching 'name'
 * @param {ReactWrapper} componentWrapper - Rendered component wrapper
 * @param {string} specName - Name of 'data-spec' attribute value to find
 * @param {string|Function} typeFilter - (optional) Expected type of the wrappers
 * @return {ReactComponent} All matching DOM components
 */

 export const getSpecWrapper = (componentWrapper, specName, typeFilter) => {
   let specWrappers;

   if(!typeFilter) {
     specWrappers = componentWrapper.find(`[${DATA_SPEC_ATTRIBUTE_NAME}="${specName}"]`);
   } else {
     specWrappers = componentWrapper.findWhere((wrapper) => {
       wrapper.prop(DATA_SPEC_ATTRIBUTE_NAME) === specName && wrapper.type() === typeFilter
     });
   }
   return specWrappers;
 }