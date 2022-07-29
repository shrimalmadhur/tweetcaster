import { FC, useContext, useEffect, useState } from 'react';

import { authenticate } from '@/services/twitter';
import useStorage from 'hooks/useStorage'
import { redirect } from 'next/dist/server/api-utils';

const Twitter: FC = () => {

    const { setItem } = useStorage();

    async function handleClick(event: any) {
        event.preventDefault();
        const response = await authenticate();

        console.log("response?.data.codeVerifier ", response?.data.codeVerifier);
        if (response?.data.codeVerifier)
            setItem('codeVerifier', response?.data.codeVerifier);

        if (response?.data.state)
            setItem('state', response?.data.state);

        window.location.href = response?.data.redirect_url
    }
    return (
        <div>
            <div>
                <button onClick={handleClick}>Sign In With Twitter</button>
            </div>
        </div>
    )
}

export default Twitter