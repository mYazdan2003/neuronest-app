import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import Table from '@/components/ui/Table';

interface SocialProps {
  posts: any[];
  onCreatePost: (content: string, image?: File) => void;
  onLikePost: (id: number) => void;
  onCommentPost: (id: number, comment: string) => void;
  onSharePost: (id: number) => void;
}

export default function Social({ 
  posts, 
  onCreatePost, 
  onLikePost, 
  onCommentPost, 
  onSharePost 
}: SocialProps) {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<{[key: number]: string}>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPostImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      onCreatePost(newPostContent, newPostImage || undefined);
      setNewPostContent('');
      setNewPostImage(null);
      setImagePreview(null);
    }
  };

  const handleCommentChange = (postId: number, text: string) => {
    setCommentText({
      ...commentText,
      [postId]: text
    });
  };

  const handleSubmitComment = (postId: number) => {
    if (commentText[postId]?.trim()) {
      onCommentPost(postId, commentText[postId]);
      setCommentText({
        ...commentText,
        [postId]: ''
      });
    }
  };

  return (
    <div>
      <Header 
        title="Social Feed" 
        subtitle="Connect with your team and share updates"
      />
      
      <Card className="mb-6">
        <div className="space-y-4">
          <FormTextarea
            id="newPost"
            label="Create a new post"
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={3}
          />
          
          {imagePreview && (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 rounded-md"
              />
              <button
                onClick={() => {
                  setNewPostImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="image-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-500 flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add Image
              </label>
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
            
            <Button 
              variant="primary"
              onClick={handleCreatePost}
              disabled={!newPostContent.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.post_id} className="overflow-hidden">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-lg font-semibold">
                  {post.author.substring(0, 1).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
              
              <div className="prose max-w-none mb-4">
                <p>{post.content}</p>
              </div>
              
              {post.image_url && (
                <div className="-mx-6 -mb-6 mt-4">
                  <img 
                    src={post.image_url} 
                    alt="Post" 
                    className="w-full"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => onLikePost(post.post_id)}
                    className={`flex items-center text-sm ${post.liked ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg className="h-5 w-5 mr-1" fill={post.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                  </button>
                  
                  <button 
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
                  </button>
                  
                  <button 
                    onClick={() => onSharePost(post.post_id)}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
              
              {post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Comments</h4>
                  <div className="space-y-3">
                    {post.comments.map((comment: any, index: number) => (
                      <div key={index} className="flex">
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm font-semibold">
                          {comment.author.substring(0, 1).toUpperCase()}
                        </div>
                        <div className="ml-3 bg-gray-50 p-3 rounded-lg flex-1">
                          <p className="text-xs font-medium text-gray-900">{comment.author}</p>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm font-semibold">
                  U
                </div>
                <div className="ml-3 flex-1">
                  <FormInput
                    id={`comment-${post.post_id}`}
                    label=""
                    placeholder="Write a comment..."
                    value={commentText[post.post_id] || ''}
                    onChange={(e) => handleCommentChange(post.post_id, e.target.value)}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleSubmitComment(post.post_id)}
                      disabled={!commentText[post.post_id]?.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating the first post.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
