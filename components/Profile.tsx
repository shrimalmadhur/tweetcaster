import { FC, useContext, useEffect, useState } from 'react';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'

import { getAllCasts } from '../src/services/farcaster'

const Profile: FC = () => {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()
    const [casts, setCast] = useState()

    useEffect(() => {
        getAllCasts(setCast)
    }, [])
    

    if (isConnected) {
        return (
            <div>
                {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector?.name}</div>
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )
    }

    return (
        <div>
            {connectors.map((connector) => (
                <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                    connector.id === pendingConnector?.id &&
                    ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
            {casts && casts[0].body.data.text}
        </div>
    )
}

export default Profile