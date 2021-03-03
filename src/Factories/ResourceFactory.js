export const resourceFactory = (apiSource, packetSelector, packetPusher) => {
    // resource requires all three values, if any one is not defined throw an error
    if (!apiSource) {
        throw new Error('apiSource resource cannot be null');
    }
    if (!packetSelector) {
        throw new Error('packetSelector resource cannot be null');
    }
    if (!packetPusher) {
        throw new Error('packetPusher resource cannot be null');
    }

    return {
        apiSource,
        packetSelector,
        packetPusher
    }
}