export const events = 
{
    NewRandomGenerator: "event TicketsPurchase(address indexed, uint256 indexed, uint256)",
    NewOperatorAndTreasuryAndInjectorAddresses: "event NewOperatorAndTreasuryAndInjectorAddresses(address,address,address)"    
}

export const ABI = 
[
    "function setMinAndMaxTicketPriceInCake(uint256,uint256)",
    "function setMaxNumberTicketsPerBuy(uint256)"
]

export const PanCakeSwapLottery_Address = "0x5aF6D33DE2ccEC94efb1bDF8f92Bd58085432d2c"