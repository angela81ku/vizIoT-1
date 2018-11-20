'use es6';

export const selectRecentPackets = ({
                                   packets: {
                                     packetListing,
                                   },
                                 }) => {
  return packetListing;
};

export const selectTodayPacketCount = ({ packets: { countToday }}) => {
  return countToday;
};