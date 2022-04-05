import { apiURL } from '../../configs/url.config';
import { patchRequest, useMutationWithTranslations } from '../../utils/requests';

const patchModalContent = (_id, data, options) => {
    return patchRequest(`${apiURL}/publishers/dataRequestModalContent/${_id}`, data, options);
};

const usePatchModalContent = (requestOptions, mutateOptions) => {
    return useMutationWithTranslations(
        data => {
            const { _id, ...outerProps } = data;

            return patchModalContent(_id, outerProps, requestOptions);
        },
        {
            mutationKey: 'publishers.patchModalContent',
            ...mutateOptions,
        }
    );
};

export default {
    patchModalContent,
    usePatchModalContent,
};
