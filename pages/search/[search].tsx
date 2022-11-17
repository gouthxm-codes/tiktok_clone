import React from 'react'
import { useState, useEffect } from "react"
import Image from "next/image"
import { GoVerified } from "react-icons/go"
import axios from "axios"
import { useRouter } from 'next/router'
import Link from 'next/link'
import VideoCard from "../../components/VideoCard"
import NoResult from "../../components/NoResult"
import { IUser, Video } from "../../types"

import useAuthStore from '../../store/authStore'


const Search = ({ videos }: { videos: Video[] }) => {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const { allUsers } = useAuthStore()
    const { search }: any = router.query;

    const video = show ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !show ? 'border-b-2 border-black' : 'text-gray-400'
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(search.toLowerCase()))
    return (
        <div className='w-full'>
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${video}`} onClick={() => { setShow(true) }}>Accounts</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => { setShow(false) }}>Videos</p>
            </div>
            {show ? (
                <div className="md:mt-16">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((account: IUser, indx: number) => (
                            <Link href={`/profile/${account._id}`} key={indx}>
                                <div className="flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3">
                                    <div>
                                        <Image
                                            src={account.image}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                            alt='user profile'
                                        />
                                    </div>
                                    <div className="hidden xl:block">
                                        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                                            {account.userName.replaceAll(' ', '')}
                                            <GoVerified className='text-blue-400' />
                                        </p>
                                        <p className='capitalize text-gray-400 text-sm'>
                                            {account.userName}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : <NoResult text={`No Results For ${search}`} />}
                </div>
            ) : <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {videos?.length ? (
                    videos.map((video: Video, index: number) => (
                        <VideoCard post={video} key={index} />
                    ))
                ) : <NoResult text={`No Results For ${search}`} />}
            </div>}
        </div>
    )
}

export const getServerSideProps = async ({
    params: { search }
}: {
    params: { search: string }
}) => {
    const res = await axios.get(`http://localhost:3000/api/search/${search}`)

    return {
        props: { videos: res.data }
    }
}

export default Search