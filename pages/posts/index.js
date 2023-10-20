// targeting /posts
import React, { Fragment } from 'react';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import Head from 'next/head';

const AllPostsPage = (props) => {
    return (
        <Fragment>
            <AllPosts posts={props.posts} />;
            <Head>
                <title>All Posts</title>
                <meta
                    name='description'
                    content='a list of all programming projects'
                />
            </Head>
        </Fragment>
    );
};

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
}

export default AllPostsPage;
