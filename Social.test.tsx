import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Social from '@/components/social/Social';

describe('Social Component', () => {
  const mockPosts = [
    {
      post_id: 1,
      author: 'User 1',
      date: '2025-04-01',
      content: 'Just closed a deal on a beautiful property!',
      image_url: 'https://example.com/image1.jpg',
      likes: 5,
      liked: false,
      comments: [
        {
          author: 'User 2',
          content: 'Congratulations!',
          date: '2025-04-01'
        }
      ]
    },
    {
      post_id: 2,
      author: 'User 3',
      date: '2025-04-02',
      content: 'Looking forward to showing some amazing new listings this weekend!',
      image_url: null,
      likes: 3,
      liked: true,
      comments: []
    }
  ];
  
  const mockOnCreatePost = jest.fn();
  const mockOnLikePost = jest.fn();
  const mockOnCommentPost = jest.fn();
  const mockOnSharePost = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders social feed correctly', () => {
    render(
      <Social 
        posts={mockPosts}
        onCreatePost={mockOnCreatePost}
        onLikePost={mockOnLikePost}
        onCommentPost={mockOnCommentPost}
        onSharePost={mockOnSharePost}
      />
    );
    
    // Check if header is rendered
    expect(screen.getByText('Social Feed')).toBeInTheDocument();
    expect(screen.getByText('Connect with your team and share updates')).toBeInTheDocument();
    
    // Check if post creation form is rendered
    expect(screen.getByLabelText(/what's on your mind/i)).toBeInTheDocument();
    expect(screen.getByText('Add Image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
    
    // Check if posts are rendered
    expect(screen.getByText('Just closed a deal on a beautiful property!')).toBeInTheDocument();
    expect(screen.getByText('Looking forward to showing some amazing new listings this weekend!')).toBeInTheDocument();
    
    // Check if post metadata is rendered
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 3')).toBeInTheDocument();
    expect(screen.getByText('2025-04-01')).toBeInTheDocument();
    expect(screen.getByText('2025-04-02')).toBeInTheDocument();
    
    // Check if like counts are rendered
    expect(screen.getByText('5 Likes')).toBeInTheDocument();
    expect(screen.getByText('3 Likes')).toBeInTheDocument();
    
    // Check if comments are rendered
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('1 Comment')).toBeInTheDocument();
    expect(screen.getByText('0 Comments')).toBeInTheDocument();
    
    // Check if comment form is rendered
    expect(screen.getAllByPlaceholderText(/write a comment/i).length).toBe(2);
  });
  
  test('creates a new post', async () => {
    render(
      <Social 
        posts={mockPosts}
        onCreatePost={mockOnCreatePost}
        onLikePost={mockOnLikePost}
        onCommentPost={mockOnCommentPost}
        onSharePost={mockOnSharePost}
      />
    );
    
    // Enter post content
    fireEvent.change(screen.getByLabelText(/what's on your mind/i), {
      target: { value: 'This is a new post' },
    });
    
    // Submit the post
    fireEvent.click(screen.getByRole('button', { name: /post/i }));
    
    // Check that onCreatePost was called with correct parameters
    expect(mockOnCreatePost).toHaveBeenCalledWith('This is a new post', undefined);
  });
  
  test('likes a post', () => {
    render(
      <Social 
        posts={mockPosts}
        onCreatePost={mockOnCreatePost}
        onLikePost={mockOnLikePost}
        onCommentPost={mockOnCommentPost}
        onSharePost={mockOnSharePost}
      />
    );
    
    // Click on like button of first post
    fireEvent.click(screen.getAllByText(/likes/i)[0]);
    
    // Check that onLikePost was called with correct parameter
    expect(mockOnLikePost).toHaveBeenCalledWith(1);
  });
  
  test('comments on a post', async () => {
    render(
      <Social 
        posts={mockPosts}
        onCreatePost={mockOnCreatePost}
        onLikePost={mockOnLikePost}
        onCommentPost={mockOnCommentPost}
        onSharePost={mockOnSharePost}
      />
    );
    
    // Enter comment text for first post
    fireEvent.change(screen.getAllByPlaceholderText(/write a comment/i)[0], {
      target: { value: 'This is a new comment' },
    });
    
    // Submit the comment
    fireEvent.click(screen.getAllByRole('button', { name: /comment/i })[0]);
    
    // Check that onCommentPost was called with correct parameters
    expect(mockOnCommentPost).toHaveBeenCalledWith(1, 'This is a new comment');
  });
  
  test('shares a post', () => {
    render(
      <Social 
        posts={mockPosts}
        onCreatePost={mockOnCreatePost}
        onLikePost={mockOnLikePost}
        onCommentPost={mockOnCommentPost}
        onSharePost={mockOnSharePost}
      />
    );
    
    // Click on share button of first post
    fireEvent.click(screen.getAllByText('Share')[0]);
    
    // Check that onSharePost was called with correct parameter
    expect(mockOnSharePost).toHaveBeenCalledWith(1);
  });
  
  test('displays empty state when no posts', () => {
    render(
      <Social 
        posts={[]}
        onCreatePost={mockOnCreatePost}
        onLikePost={mockOnLikePost}
        onCommentPost={mockOnCommentPost}
        onSharePost={mockOnSharePost}
      />
    );
    
    // Check if empty state is displayed
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
    expect(screen.getByText('Get started by creating the first post.')).toBeInTheDocument();
  });
});
