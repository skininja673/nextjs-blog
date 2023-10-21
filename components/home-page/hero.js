import React from 'react';
import classes from './hero.module.css';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src='/images/site/myImage.jpg'
                    alt='my image '
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi there !</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquam unde illo accusamus.
            </p>
        </section>
    );
};

export default Hero;
