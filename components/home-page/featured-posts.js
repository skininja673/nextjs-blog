import React from 'react';
import classes from './featured-posts.module.css';
import PostsGrid from '../posts/posts-grid';

const FeaturedProducts = (props) => {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            {/* a grid of posts */}
            <PostsGrid posts={props.posts} />
        </section>
    );
};

export default FeaturedProducts;
