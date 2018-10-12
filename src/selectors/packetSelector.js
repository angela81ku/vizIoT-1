'use es6';

export const selectRecentPackets = ({
                                   packets: {
                                     packetListing,
                                   },
                                 }) => {
  return packetListing;
};