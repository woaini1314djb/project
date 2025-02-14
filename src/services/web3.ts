import { ethers } from 'ethers';
import type { TransferParams } from '@/types/wallet';

export class Web3Service {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;

  constructor() {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
    }
  }

  async connectWallet(): Promise<string> {
    try {
      const accounts = await this.provider.send('eth_requestAccounts', []);
      return accounts[0];
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async transferUSDT({ to, amount, tokenAddress }: TransferParams): Promise<string> {
    try {
      const contract = new ethers.Contract(
        tokenAddress,
        ['function transfer(address to, uint256 amount) returns (bool)'],
        this.signer
      );
      
      const tx = await contract.transfer(to, amount);
      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  }
} 