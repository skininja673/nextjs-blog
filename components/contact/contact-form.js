import classes from './contact-form.module.css';
import { useEffect, useState } from 'react';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
    // fetch the url
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); //pending, success, error
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);
    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus('pending');

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });
            setRequestStatus('success');
            setEnteredMessage('');
            setEnteredEmail('');
            setEnteredName('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'sending message....',
            message: 'your message is on its way',
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'success !',
            message: 'message sent successfully',
        };
    }
    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'error !',
            message: requestError,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>Contact Me !</h1>
            <h6 style={{ textAlign: 'center' }}>
                The details will be stored in MongoDb
            </h6>
            <form
                action=''
                className={classes.form}
                onSubmit={sendMessageHandler}
            >
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name=''
                            id='email'
                            required
                            value={enteredEmail}
                            onChange={(event) =>
                                setEnteredEmail(event.target.value)
                            }
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name=''
                            id='name'
                            required
                            value={enteredName}
                            onChange={(event) =>
                                setEnteredName(event.target.value)
                            }
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='message'>Your Message: </label>
                        <textarea
                            name=''
                            id='message'
                            rows='5'
                            value={enteredMessage}
                            onChange={(event) =>
                                setEnteredMessage(event.target.value)
                            }
                        ></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button>Send Message</button>
                    </div>
                </div>
            </form>

            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}
export default ContactForm;
