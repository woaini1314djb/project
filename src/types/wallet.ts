export interface WalletState {
  address: string;
  balance: string;
  connected: boolean;
  chainId: number;
}

export interface TransferParams {
  to: string;
  amount: string;
  tokenAddress: string;
} 