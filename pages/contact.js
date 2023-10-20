import React, { Fragment } from 'react';
import ContactForm from '../components/contact/contact-form';
import Head from 'next/head';

const ContactPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Contact Me</title>
                <meta name='description' content='send me your messages' />
            </Head>
            <ContactForm />;
        </Fragment>
    );
};

export default ContactPage;
