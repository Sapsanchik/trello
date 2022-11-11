import {useState, useEffect} from 'react'
import { MainLayout } from '../../components/MainLayout';
import Router, { useRouter } from 'next/router'

export default function Post({ post: serverPost }) {

  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:4200/posts/${router.query.id}`)
      const data = await response.json()
      setPost(data)
    }

    if (!serverPost) {
      load()
    }

  },[])

  if (!post) {
    return <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  }

  return (
    <MainLayout title='Post Page'>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <button onClick={() => Router.push('/posts')}>Back to posts</button>
    </MainLayout>
  );
}

Post.getInitialProps = async (query, req) => {
  if (!req) {
    return {post: null}
  }
  const response = await fetch(`http://localhost:4200/posts/${query.id}`)
  const post = await response.json()

  return {
    post
  }
}


// export async function getServerSideProps({ query, req }) {
//   // if (!req) {
//   //   return {post: null}
//   // }
//   const response = await fetch(`http://localhost:4200/posts/${query.id}`)
//   const post = await response.json()

//   return {props: {post}}
// }
