import type { NextPage } from 'next'
import axios from 'axios';
import { Video } from '../types';
import VideoCard from '../components/VideoCard'
import NoResult from '../components/NoResult'
interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  console.log(videos)
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResult text="No Videos" />
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  let res = null;
  if (topic) {
    res = await axios.get(`https://tiktok-clone-final-chi.vercel.app/api/discover/${topic}`)
  } else {
    res = await axios.get(`https://tiktok-clone-final-chi.vercel.app/api/post`)
  }


  console.log()

  return {
    props: {
      videos: res.data
    }
  }
}

export default Home
