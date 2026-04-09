import { NextApiRequest, NextApiResponse } from 'next';

// Sample data to represent the posts
let posts = [];

// GET method to return all posts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  // POST method to create a new post
  if (req.method === 'POST') {
    const newPost = req.body;
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  // Handle any other HTTP method
  return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
}