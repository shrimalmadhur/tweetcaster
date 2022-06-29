import { FC } from 'react';
import { WagmiConfig, createClient, defaultChains, configureChains} from 'wagmi'
import Profile from './Profile'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const alchemyId = process.env.ALCHEMY_ID

const {chains, provider, webSocketProvider} = configureChains(defaultChains, [
    alchemyProvider({alchemyId}),
])

// Set up client
const client = createClient({ 
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    provider,
})

const Connect: FC = () => {

    return (
        <WagmiConfig client={client}>
            <Profile />
        </WagmiConfig>
    )
}

export default Connect;