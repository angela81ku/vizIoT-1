import {useSocket} from '../components/BeanUILibrary/hooks/useSocket';
import {usePersistentSocket} from '../components/BeanUILibrary/hooks/usePersistentSocket';

// override exists in the event that socketResourceCheck is called asynchronously, causing inUse to be false
// when resource is checked in two places, causing double capture
export const socketResourceCheck = (resources, override = false) => {
    // console.log('calling resource check')
    // console.log(resources)
    if (!resources.inUse || override) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        usePersistentSocket(resources.apiSource, resources.packetPusher)
        resources.inUse = true;
    }
}