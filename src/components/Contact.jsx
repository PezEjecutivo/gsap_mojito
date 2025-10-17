import React from 'react';
import { openingHours, socials } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

const Contact = () => {
    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: 'words' });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: 'power1.inOut'
        });

        timeline.from(titleSplit.words, {
            opacity: 0, yPercent: 100, stagger: 0.02
        }).from('#contact h3, #contact p', {
            opacity: 0, yPercent: 100, stagger: 0.02
        }).to('#f-right-leaf', {
            y: '-50', duration: 1, ease: 'power1.inOut'
        }).to('#f-left-leaf', {
            y: '50', duration: 1, ease: 'power1.inOut'
        }, '<');
    }, []);

    return (
        <footer id='contact'>
            <img src="/images/footer-left-leaf.png" alt="left-leaf" id='f-left-leaf' />
            <img src="/images/footer-right-leaf.png" alt="right-leaf" id='f-right-leaf' />

            <div className='content'>
                <h2>This is not an offical website</h2>

                <div>
                    <h3>Just a clon made to learn</h3>
                    <p>This page is made by PabloVG</p>
                </div>

                <div>
                    <h3>Contact me</h3>
                    <p>+34 644 50 93 03</p>
                    <p>PValladaresG@proton.me</p>
                </div>

                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>

                <div>
                    <h3>Socials</h3>
                    <div className='flex-center gap-5'>
                        {socials.map((social) => (
                            <a key={social.name} href={social.url} target='_blank' rel='noopener noreferrer' aria-label={social.name}>
                                <img src={social.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;