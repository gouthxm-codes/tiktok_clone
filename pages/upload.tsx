import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import { SanityAssetDocument } from '@sanity/client'
import { client } from '../utils/client'
import { topics } from '../utils/constants'
const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState<SanityAssetDocument | undefined>()
    const [error, setError] = useState(false)
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)
    const router = useRouter()

    const { userProfile }: { userProfile: any } = useAuthStore()

    const uploadVideo = async (e: any) => {
        const file = e.target.files[0];
        const types = ['video/mp4', 'video/webm', 'video/ogg'];

        if (types.includes(file.type)) {

            client.assets.upload('file', file, {
                contentType: file.type,
                filename: file.name
            })
                .then((data) => {
                    setVideo(data);
                    setIsLoading(false)
                })

        } else {
            setIsLoading(false)
            setError(true)
        }
    }


    const handlePost = async () => {
        if (caption && video?._id && category) {
            setSavingPost(true);

            const doc = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: video?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`https://tiktok-clone-final-chi.vercel.app/api/post`, doc)
            router.push('/')
        }
    }

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center'>
            <div className="bg-white w-[60%] rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
                <div className="">
                    <div className="">
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post A video to your account</p>
                    </div>
                    <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div className="">
                                {video ? (
                                    <div className="">
                                        <video
                                            src={video.url}
                                            loop
                                            controls
                                            className='rounded-xl h-[450px] mt-16 bg-black'
                                        ></video>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer ">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className='font-bold text-xl '>
                                                    <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                                </p>
                                                <p className='text-xl font-semibold'>
                                                    Upload Video
                                                </p>
                                            </div>
                                            <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                MP4 or WebM or ogg <br />
                                                720,1280 or higher <br />
                                                upto 10 minutes <br />
                                                lestt than 2GB
                                            </p>
                                            <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                Select File
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name='upload-video'
                                            onChange={(e) => uploadVideo(e)}
                                            className='w-0 h-0'
                                        />
                                    </label>
                                )}
                            </div>
                        )}
                        {error && (
                            <p className='text-center text-xl text-red-400 text-semibold mt-4 w-[250px]'>please select a video file</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3 pb-10 ">
                    <label className='text-md font-medium'>Caption</label>
                    <input type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="rounded outline-none text-md border-2 border-gray-200 p-2"
                    />
                    <label className='text-md font-medium'>Choose a Category</label>
                    <select className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer' onChange={(e) => { setCategory(e.target.value) }} name="" id="">
                        {topics.map((topic) => (
                            <option value={topic.name} key={topic.name} className='cursor-pointer'>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-6 mt-10">
                        <button
                            onClick={() => { }}
                            type="button"
                            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                        >
                            Discard
                        </button>
                        <button
                            onClick={handlePost}
                            type="button"
                            className='bg-[#f51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload