import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>NextCMS</h1>
                <nav>
                    <Link href="/admin">Admin Dashboard</Link>
                    <Link href="/posts">All Posts</Link>
                </nav>
            </header>
            <main style={styles.main}>
                <h2>Latest Posts</h2>
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length > 0 ? (
                    <div style={styles.postGrid}>
                        {posts.map((post) => (
                            <div key={post.id} style={styles.postCard}>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <Link href={`/posts/${post.id}`}>Read More</Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No posts available.</p>
                )}
            </main>
            <footer style={styles.footer}>
                <p>&copy; 2026 NextCMS. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        backgroundColor: '#282c34',
        color: 'white',
        padding: '20px',
        textAlign: 'center' as const,
    },
    main: {
        flex: 1,
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
    },
    postGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    postCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    footer: {
        backgroundColor: '#282c34',
        color: 'white',
        textAlign: 'center' as const,
        padding: '20px',
        marginTop: 'auto',
    },
};

export default Home;