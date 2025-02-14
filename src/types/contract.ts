export interface ContractConfig {
  address: string;
  abi: any[];
}

export interface USDTContract extends ContractConfig {
  decimals: number;
  symbol: string;
} 