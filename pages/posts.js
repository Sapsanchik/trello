import {useState, useEffect} from 'react'
import Router from 'next/router'
import { MainLayout } from "../components/MainLayout";
import Link from 'next/link';
import React from 'react';


export default function Posts({ posts: serverPosts }) {

  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    async function load() {
      const response = await fetch('http://localhost:4200/posts')
      const json = await response.json()
      setPosts(json)
    }

    if (!serverPosts) {
      load()
    }

  },[])

  if (!posts) {
    return <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  }

  return (
    <MainLayout title='Posts Page'>
        <h1>Posts Page</h1>
        <button onClick={() => Router.push('/')}>Go back to home</button>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
    </MainLayout>
  )
}

Posts.getInitialProps = async ({ req }) => {
  if (!req) {
    return {posts: null}
  }
  const response = await fetch('http://localhost:4200/posts')
  const posts = await response.json()

  return {
    posts
  }
}