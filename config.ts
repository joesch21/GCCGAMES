import { http, createConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'; // Replace with your WalletConnect Project ID

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),       // Integrates MetaMask
    safe(),
    walletConnect({
      projectId,      // Integrates WalletConnect-compatible wallets, including Rainbow
      options: {
        rpc: {
          [mainnet.id]: http(),
          [base.id]: http(),
        },
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
