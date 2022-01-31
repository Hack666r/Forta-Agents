import {
  Finding,
  HandleTransaction,
  FindingSeverity,
  FindingType,
  TransactionEvent,
} from 'forta-agent';

import { utils } from 'ethers';

// The address of the Curve registry from curve.readthedocs.io
const SWAP_FACTORY_ADDRESS: string = '0x918d7e714243F7d9d463C37e106235dCde294ffC';

// The signature of the PairCreated event
export const PAIRCREATED_EVENT_SIGNATURE: string = 'event PairCreated(address indexed token0, address indexed token1, address pair, uint)';

// Swap Factory V1 interface with the event
export const SWAP_FACTORY_IFACE: utils.Interface = new utils.Interface([
  PAIRCREATED_EVENT_SIGNATURE,
]);

// Returns a list of findings (may be empty if no relevant events)
export const provideHandleTransaction = (
  alertId: string,
  address: string,
): HandleTransaction => {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    // Initialize the finding array
    let findings: Finding[] = [];

    // Get all PairCreated events
    const pairCreatedEvents = txEvent.filterLog(PAIRCREATED_EVENT_SIGNATURE, address);

    // For each PairCreated event create a finding
    for(let i = 0; i < pairCreatedEvents.length; i++) {
      findings.push(
        Finding.fromObject({
          name: 'New pair created',
          description: 'A new pair has been created in Swap Factory V1',
          alertId: alertId,
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          protocol: 'Impossible Finance',
          metadata: {
            token0: pairCreatedEvents[i].args.token0,
            token1: pairCreatedEvents[i].args.token1,
            pair: pairCreatedEvents[i].args.pair,
          }
        })
      );
    }

    // Return the finding array
    return findings;
  }
}

export default {
  handleTransaction: provideHandleTransaction(
    "IMPOSSIBLE-7",
    SWAP_FACTORY_ADDRESS,
  )
}
