import { useEffect } from 'react';
import { Flex } from './Flex';
import './PageLoading.scss';
export const PageLoading = () => {
    useEffect(() => {
        return () => {
            // @ts-ignore
            const style = document.querySelector('.App').style;
            style.overflow = 'none';

            setTimeout(() => {
                style.overflow = 'unset';
            }, 2300);
        }
    }, []);

    return(
        <Flex className="page-loading" alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <div className="container">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
            <span className="loading">
                Loading...
            </span>
        </Flex>
    )
}