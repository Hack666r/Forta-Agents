interface NetworkData {
    liquidityModule: string;
}

const ETH_MAINNET_DATA: NetworkData = {
    liquidityModule: "0x5Aa653A076c1dbB47cec8C1B4d152444CAD91941",
};

const KOVAN_TESTNET_DATA: NetworkData = {
    liquidityModule: "0x9670277EcB0b56f52E113c9c3833681d2Af7d253",
};

const NETWORK_MAP: Record<number, NetworkData> = {
    1: ETH_MAINNET_DATA,
    42: KOVAN_TESTNET_DATA,
};

export default class NetworkManager implements NetworkData {
    public liquidityModule: string;

    constructor() {
      this.liquidityModule = "";
    }

    public setNetwork(networkId: number) {
      const { liquidityModule } = NETWORK_MAP[networkId];
      this.liquidityModule = liquidityModule;
    }
}
