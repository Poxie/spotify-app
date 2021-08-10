import { Flex } from "../../components/Flex"
import { LoadingInfo } from "./LoadingInfo"
import { LoadingText } from "./LoadingText"

export const LoadingArtistStats = () => {
    return(
        <div className="loading loading-artist-stats">
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <LoadingInfo />
                <Flex flexDirection={'column'}>
                    <div style={{marginBottom: '6px'}}>
                        <LoadingText 
                            min={149}
                            max={150}
                        />
                    </div>
                    <Flex>
                        <LoadingInfo small={true} />
                        <LoadingInfo small={true} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex justifyContent={'space-between'}>
                <div className="loading-bg loading-box" />
                <div className="loading-bg loading-box" />
            </Flex>
        </div>
    )
}