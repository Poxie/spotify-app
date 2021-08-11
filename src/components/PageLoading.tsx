import { Flex } from './Flex';
import './PageLoading.scss';
export const PageLoading = () => {
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