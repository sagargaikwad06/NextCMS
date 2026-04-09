import { NextApiRequest, NextApiResponse } from 'next';
import { posts } from '../../../data/posts'; // Assuming posts is an array of post objects

// Handler for single post API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const post = posts.find(p => p.id === id);

    switch (req.method) {
        case 'GET':
            if (post) {
                return res.status(200).json(post);
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        case 'PUT':
            if (post) {
                // Update post logic (assumes req.body has updated post data)
                const updatedPost = { ...post, ...req.body };
                return res.status(200).json(updatedPost);
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        case 'DELETE':
            if (post) {
                // Delete post logic (you will need to implement this)
                return res.status(204).end();
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
