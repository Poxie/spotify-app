import React, { useEffect } from 'react';
import { Flex } from './Flex';
import './PageLoading.scss';

interface Props {
    message?: any;
}
export const PageLoading: React.FC<Props> = ({ message='Loading...' }) => {
    return(
        <Flex className="page-loading" alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <div className="container">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
            <span className="loading">
                {message}
            </span>
        </Flex>
    )
}