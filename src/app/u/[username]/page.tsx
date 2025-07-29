'use client';

import {useParams} from 'next/navigation';
import {useState} from 'react';
import axios , {AxiosError} from 'axios';

export default function SendMessagePage(){

    const params = useParams();
    const [content,setContent] = useState('');
    const[isSubmitting,setIsSubmitting]  = useState(false);

    const onSubmit = async () => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
        
        await axios.post('/api/send-message', {
            username: params.username,
            content,
        });

        alert('Message sent successfully');
        setContent('');
        
    } catch (error) {
        console.error('Error sending message:', error);
        const axiosError = error as AxiosError<any>;
        alert(axiosError.response?.data.message ?? 'An error occurred.');
    } finally {
        setIsSubmitting(false);
    }
};






    return (

        <div>
            <h1>Public Message Page for {params.username}</h1>
            <p>You can send an anonymouse message to {params.username}</p>
            <form onSubmit={onSubmit}>
                <label htmlFor="content">Your Message:</label>
                <br />
                <textarea id="content" rows={5} value={content} onChange={(e)=>setContent(e.target.value)}/>
                <br />
                <button type = "submit" disabled={isSubmitting}>{isSubmitting? 'Sending...please wait' : 'Send Message'}</button>
            </form>
        </div>



    )



};