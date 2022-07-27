import { FC, useContext, useEffect, useState } from 'react';

import { authenticate } from '@/services/twitter';
import { redirect } from 'next/dist/server/api-utils';

const Twitter: FC = () => {

    async function handleClick(event: any) {
        event.preventDefault();
        const response = await authenticate();
        window.location.replace(response?.data.redirect_url)
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