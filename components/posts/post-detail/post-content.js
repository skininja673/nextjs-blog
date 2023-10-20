import React from 'react';
import PostHeader from './post-header';
import classes from './post-content.module.css';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';

const PostContent = (props) => {
    const { post } = props;

    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRend = {
        // image(image) {
        //     return (
        //         <Image
        //             // src={`/images/posts/getting-started-with-next/getting-started-with-next.png`}
        //             src={`/images/posts/${post.slug}/${image.src}`}
        //             alt={image.alt}
        //             width={200}
        //             height={200}
        //         />
        //     );
        // },
        paragraph(paragraph) {
            const { node } = paragraph;

            if (node.children[0].type === 'image') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            // src={`/images/posts/getting-started-with-next/getting-started-with-next.png`}
                            src={`/images/posts/${post.slug}/${image.url}`}
                            alt={image.alt}
                            width={200}
                            height={200}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },

        code(code) {
            const { language, value } = code;
            return (
                <Prism style={atomDark} language={language} children={value} />
            );
        },
    };
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRend}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
};

export default PostContent;
