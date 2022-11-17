import { useState, useEffect } from "react"
import Image from "next/image"
import { GoVerified } from "react-icons/go"
import axios from "axios"

import VideoCard from "../../components/VideoCard"
import NoResult from "../../components/NoResult"
import { IUser, Video } from "../../types"
const URL = process.env.BASE_URL
interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLiked: Video[]
    }
}

const Profile = ({ data }: IProps) => {

    const [show, setShow] = useState(true)
    const [list, setList] = useState<Video[]>([])

    const videos = show ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !show ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
        if (show) {
            setList(data?.userVideos)
        } else {
            setList(data?.userLiked)
        }
    }, [show, data?.userLiked, data?.userVideos])
    return (
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className="w-16 h-16 md:w-32 md:h-32">
                    <Image
                        src={data?.user?.image}
                        width={120}
                        height={120}
                        className="rounded-full"
                        alt='user profile'
                        layout='responsive'
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
                        {data?.user?.userName.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-xl text-gray-400 text-sm'>
                        {data?.user?.userName}
                    </p>
                </div>
            </div>

            <div className="">
                <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => { setShow(true) }}>Videos</p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => { setShow(false) }}>Liked Videos</p>
                </div>
                <div className="flex gap-6 flex-wrap md:justify-start">
                    {list.length > 0 ? (
                        list.map((item: Video, index: number) => (
                            <VideoCard post={item} key={index} />
                        ))
                    ) : <NoResult text={`No ${show ? '' : 'Liked'} Videos Yet`} />
                    }
                </div>
            </div>

        </div>
    )
}

export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const res = await axios.get(`${URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profile