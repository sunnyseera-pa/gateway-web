import { apiURL } from '../../configs/url.config';
import { getRequest, patchRequest, useMutationWithTranslations } from '../../utils/requests';

const getPublisher = (_id, options) => {
    return getRequest(`${apiURL}/publishers/${_id}`, options);
};

const patchModalContent = (_id, data, options) => {
    return patchRequest(`${apiURL}/publishers/dataRequestModalContent/${_id}`, data, options);
};

const useGetPublisher = (requestOptions, mutateOptions) => {
    return useMutationWithTranslations(
        _id => {
            return getPublisher(_id, requestOptions);
        },
        {
            mutationKey: 'publishers.getPublisher',
            ...mutateOptions,
        }
    );
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
    getPublisher,
    patchModalContent,
    useGetPublisher,
    usePatchModalContent,
};
