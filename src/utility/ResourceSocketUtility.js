import {useSocket} from '../components/BeanUILibrary/hooks/useSocket';

// override exists in the event that socketResourceCheck is called asynchronously, causing inUse to be false
// when resource is checked in two places, causing double capture
export const socketResourceCheck = (resources, override = false) => {
    if (!resources.inUse || override) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSocket(resources.apiSource, resources.packetPusher)
        resources.inUse = true;
    }
}