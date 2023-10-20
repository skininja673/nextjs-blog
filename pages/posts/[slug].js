import React, { Fragment } from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';
import Head from 'next/head';

const PostDetailPage = (props) => {
    return (
        <Fragment>
            <PostContent post={props.post} />;
            <head>
                <title>{props.post.title}</title>
                <meta name='description' content={props.post.excerpt} />
            </head>
        </Fragment>
    );
};

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, '')
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: 'blocking',
    };
}
export default PostDetailPage;
