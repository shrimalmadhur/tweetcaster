import { FC, useContext, useEffect, useState } from 'react';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useSigner
  } from 'wagmi'

import { getAllCasts, getAllCastsAndSet, postCast, generatePkFromSeed, getUsernameFromAddress } from '../src/services/farcaster'
import { getUsername } from '../src/services/searchcaster'

const SEED = process.env.NEXT_PUBLIC_MNEMONIC
const ALCHEMY_ID=process.env.NEXT_PUBLIC_ALCHEMY_ID

const Profile: FC = () => {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()
    const [casts, setCast] = useState()
    const {data: signer} = useSigner()
    const [message, setMessage] = useState('');
    const [farcasterUsername, setFarcasterUsername] = useState('');

    const handleChange = event => {
        setMessage(event.target.value);

        console.log('value is:', event.target.value);
    };

    async function handleClick(event: any) {
        event.preventDefault();

        // 👇️ value of input field
        console.log('handleClick 👉️', message);
        const privateKey = generatePkFromSeed(SEED)

        const result = await postCast(privateKey, message, signer)
        console.log(result)
    };

    useEffect(() => {
        getAllCastsAndSet(setCast)
    }, [])

    useEffect(() => {
        if (isConnected && address) {
            getUsername(address, setFarcasterUsername)
        }
    }, [isConnected])
    

    if (isConnected) {
        return (
            <div>
                {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector?.name}</div>
                <div>Farcaster username: {farcasterUsername}</div>
                <button onClick={() => disconnect()}>Disconnect</button>
                {casts && casts[0].body.data.text}
                <div>
                    <input
                        type="text"
                        id="message"
                        name="message"
                        onChange={handleChange}
                        value={message}
                        autoComplete="off"
                    />

                    <h2>Message: {message}</h2>

                    <button onClick={handleClick}>Click</button>
                </div>
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
            <div>
                <input
                    type="text"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    value={message}
                    autoComplete="off"
                />

                <h2>Message: {message}</h2>

                <button onClick={handleClick}>Click</button>
            </div>
        </div>
    )
}

export default Profile