import Link from 'next/link'
import { Board } from '../components/Board'
import { MainLayout } from '../components/MainLayout'

export default function Index() {
  return (
    <MainLayout title='Home Page'>
      <h1>Hello Next!</h1>
      <div  className='screen'>
        <div className='leftbar'>
          <p>
            <Link href="/about">About</Link>
          </p>
          <p>
            <Link href="/posts">Posts</Link>  
          </p>
        </div>
        <div className='board__screen'>
          <Board />
        </div>
      </div>
      
        
      
  </MainLayout>
  )
}