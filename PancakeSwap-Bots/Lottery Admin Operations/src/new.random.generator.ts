import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from "forta-agent";

import { EVENTS, PANCAKE_SWAP_LOTTERY_ADDRESS } from "./bot.config";

function providerHandleTransaction(contractAddress: string): HandleTransaction {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];

    // filter the transaction logs for NewRandomGenerator events
    const newRandomGeneratorEvents = txEvent.filterLog(EVENTS.NewRandomGenerator, contractAddress);

    newRandomGeneratorEvents.forEach((newRandomGeneratorEvent) => {
      // extract NewRandomGenerator event arguments
      const { randomGenerator } = newRandomGeneratorEvent.args;

      findings.push(
        Finding.fromObject({
          name: "New Random Generator",
          description: "PancakeSwapLottery: Random Number Generator changed",
          alertId: "CAKE-8-1",
          protocol: "PancakeSwap",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            randomGenerator,
          },
        })
      );
    });

    return findings;
  };
}

export default {
  providerHandleTransaction,
};
