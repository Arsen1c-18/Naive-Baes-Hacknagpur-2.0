import React, { useState, useEffect } from 'react';
import PageShell from '../components/PageShell';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, ThumbsUp, AlertCircle, Plus } from 'lucide-react';
import FAQSection from '../components/FAQSection';

const MOCK_POSTS = [
    { id: 1, user: 'secure_user_1', content: 'Watch out for a new SMS scam asking for electricity bill payment!', type: 'Alert', likes: 12, date: '2023-10-24' },
    { id: 2, user: 'cyber_guard', content: 'Just blocked a suspicious number +91 98765XXXXX claiming to be FedEx.', type: 'Info', likes: 8, date: '2023-10-25' },
    { id: 3, user: 'anon_tips', content: 'Is anyone else getting calls about verify bank KYC? It seems fake.', type: 'Question', likes: 5, date: '2023-10-26' }
];

const Community = () => {
    const { user, supabaseConnected } = useAuth();
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [newPost, setNewPost] = useState('');
    const [postType, setPostType] = useState('Alert');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (supabaseConnected) {
            fetchPosts();
        }
    }, [supabaseConnected]);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setPosts(data);
        }
        setLoading(false);
    };

    const handlePost = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        const postData = {
            id: Date.now(),
            user: user?.email?.split('@')[0] || 'anonymous',
            content: newPost,
            type: postType,
            likes: 0,
            date: new Date().toLocaleDateString()
        };

        if (supabaseConnected) {
            const { error } = await supabase.from('posts').insert([{
                content: newPost,
                type: postType,
                user_email: user.email
            }]);
            if (!error) fetchPosts();
        } else {
            // Mock insert
            setPosts([postData, ...posts]);
        }
        setNewPost('');
    };

    return (
        <PageShell title="Community Alerts">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginTop: 0 }}>Share an Alert</h3>
                    <form onSubmit={handlePost}>
                        <textarea
                            className="textarea"
                            rows={3}
                            placeholder="Share a scam alert, question, or tip..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Alert', 'Info', 'Question'].map(t => (
                                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={postType === t}
                                            onChange={() => setPostType(t)}
                                        /> {t}
                                    </label>
                                ))}
                            </div>
                            <button className="btn btn-primary" type="submit">
                                <Plus size={18} style={{ marginRight: '0.25rem' }} /> Post
                            </button>
                        </div>
                    </form>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {posts.map((post) => (
                        <div key={post.id} className="card animate-fade-in" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>@{post.user || post.user_email?.split('@')[0]}</span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.1rem 0.5rem',
                                        borderRadius: '1rem',
                                        background: post.type === 'Alert' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                        color: post.type === 'Alert' ? 'var(--danger)' : 'var(--primary-color)'
                                    }}>
                                        {post.type}
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    {post.date || new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <p style={{ margin: '0 0 1rem 0', lineHeight: 1.5 }}>{post.content}</p>

                            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                    <ThumbsUp size={16} /> {post.likes || 0} Likes
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                    <MessageSquare size={16} /> Comment
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', marginLeft: 'auto' }}>
                                    <AlertCircle size={16} /> Report
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="my-12 border-t border-slate-200"></div>
                <FAQSection />
            </div>
        </PageShell>
    );
};

export default Community;
