import {useSocket} from '../components/BeanUILibrary/hooks/useSocket';

export const socketResourceCheck = resources => {
    if (!resources.inUse) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSocket(resources.apiSource, resources.packetPusher)
    }
}