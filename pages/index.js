import React, { Fragment } from 'react';
import Hero from '../components/home-page/hero';
import FeaturedProducts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';
import Head from 'next/head';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Welcome to my blog</title>
                <meta
                    name='description'
                    content='I post about frontend web development.'
                />
            </Head>
            <Hero />
            <FeaturedProducts posts={props.posts} />
        </Fragment>
    );
};

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
    };
}

export default HomePage;
