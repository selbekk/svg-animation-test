import React, { Component } from 'react';

class SVGContainer extends Component {
    componentDidMount() {
        this.fadeIn();
    }

    componentDidUpdate() {
        switch(this.props.step) {
            case 'parcel':
                return this.showParcel();
            case 'letter':
                return this.showLetter();
        }
    }

    fadeIn() {
        const { letter, parcel, loop, arrow } = this.refs;

        const timeline = new TimelineMax();
        timeline.set([letter, parcel, arrow], { opacity: 0, scale: 0, transformOrigin: '50% 50%' })
            .to(parcel, 0.3, { delay: 0.2, scale: 1, opacity: 1, ease: Back.easeOut, easeParams: [1] })
            .set(loop, { transformOrigin: 'bottom center' })
            .from(loop, 0.7, { scaleY: 0.8, ease: Elastic.easeOut })
            .to(letter, 0.3, { scale: 1, opacity: 1, ease: Back.easeOut, easeParams: [1] }, '-=0.8')
            .to(arrow, 0.3, { opacity: 1, scale: 1, ease: Back.easeOut, easeParams: [1] }, '-=0.3')
            .add(this.arrowBump.bind(this));

        this.setState({activeTimeline: timeline});
    }

    arrowBump() {
        const { letter, parcel, loop, arrow } = this.refs;

        const timeline = new TimelineMax({ repeat: -1 })
            .to(arrow, 0.1, { x: '+=5', delay: 0.3 }) // bump arrow right after .1s
            .to(letter, 0.1, { x: '+=5', scaleX: '0.9' }, '-=0.1') // bump letter right at the same time as arrow
            .to(arrow, 0.1, { x: '-=5' }) // return arrow to original position
            .to(letter, 0.1, { x: '-=5', scaleX: '1' }, '-=0.1') // return letter to original position as the same time as arrow
            .to(arrow, 0.1, { rotation: -180, delay: 0.5 }) // wait .3s and turn the arrow
            .to(arrow, 0.1, { x: '-=5', delay: 0.5 }) // wait .3s and bump arrow left
            .to(parcel, 0.1, { x: '-=5', scaleX: '0.9' }, '-=0.1') // bump parcel left at the same time as arrow
            .to(arrow, 0.1, { x: '+=5' }) // return arrow to original position
            .to(parcel, 0.1, { x: '+=5', scaleX: '1' }, '-=0.1') // return parcel to original position at the same time as arrow
            .to(loop, 0.1, { rotation: -15, transformOrigin: 'bottom center' }, '-=0.2') // move loop in order to spring it back
            .to(loop, 0.5, { rotation: 0, ease: Elastic.easeOut }) // bounce the loop back into position
            .to(arrow, 0.1, { rotation: 0, delay: 0.5 }, '-=0.5'); // Wait .3s and turn the arrow back again

            this.setState({activeTimeline: timeline});
    }


    showParcel() {
        this.state.activeTimeline.kill();

        const { letter, parcel, loop, arrow } = this.refs;

        const tl = new TimelineMax();
        tl.to([arrow, letter], 0.2, { scale: 0 })
            .to(parcel, 0.3, { x: '100' })
            .to(loop, 0.1, { rotation: -15, transformOrigin: 'bottom center' }, '-=0.3')
            .to(loop, 1, { rotation: 0, ease: Elastic.easeOut })
            .to(parcel, 0.3, { scale: 1.2, ease: Back.easeOut });
    }

    showLetter() {
        this.state.activeTimeline.kill();

        const { letter, parcel, loop, arrow } = this.refs;

        const tl = new TimelineMax();
        tl.to([arrow, parcel], 0.2, { scale: 0 })
            .to(letter, 0.3, { x: '100' })
            .to(letter, 0.2, { delay: 0.2, scale: 1.2, ease: Back.easeOut })
    }

    render() {
        return (
            <div className="svg-container">
                <svg viewBox="0 0 300 150">
                    <g ref="parcel" className="svg-fill" transform="translate(0, 10)">
                        <path d="M.7 93.2l-.5-1-.2-3c0-5.2 1.3-14 1.5-17.7.3-5.2 2-19.6 2.3-24.7.3-5.2 1.4-16 1.4-16l.3-.6s1-.8 2-2c1.2-1.2 2.4-2.7 3-4 .6-1.7 2.7-4 4.6-6l3.7-3.5c.2-.2.5-.3.8-.3 0 0 13.8 1 19.5 1h22.2c.3 0 .6.3.8.5l3 4.3c.2.6 2 3 4 5.2l3.3 4.2.2.5s1.7 11.7 1.7 15.4l.4 24.7.4 22.2c0 .3 0 .5-.3.7-.2.2-.5.3-.7.3 0 0-27.6-.6-35.7-1h-2.6c-10 0-31.7 1.3-34 1.3-.3 0-.8-.3-1-.6zm5-46.3c-.2 5-2 19.5-2.2 24.6C3.3 75.4 2 84.3 2 89.2c0 1.2 0 2.3.2 2.7 3.3-.2 24-1.3 33.6-1.3h2.6l21 .5c6 0 11.4.3 13.7.3 0-6.7-.7-42.7-.7-46 0-1.5-.4-5.3-1-8.7l-.7-6-3.2-4c-1.8-2.2-3.6-4.5-4-5.4l-2.6-3.8H39.2c-5.2 0-16.8-1-19.2-1-.6.4-2 1.7-3.2 3-1.8 2-3.8 4.4-4.2 5.5-1 3-4.2 5.7-5.2 6.5-.4 2-1.3 11-1.6 15.4zm13.7-30.5v-1 1z"/>
                        <path d="M5.3 31.3c-.2-.5 0-1 .6-1.3h.3c.5 0 30.6 0 40.8-.3 10.5-.3 24.6-.3 24.6-.3.6 0 1 .5 1 1 0 .6-.5 1-1 1 0 0-14 0-24.4.3-10.2.3-39.5.3-41 .3-.3 0-.7-.2-1-.7z"/>
                        <path d="M37.5 91.7V39.3c0-6-.8-9.5-1-11.5l-.2-6v-.2l.6-4.3c0-.6.5-1 1-1 .6.2 1 .7 1 1.2l-.7 4.2.3 6c0 1.5 1 5.4 1 11.5v52.4c0 .6-.6 1-1 1-.7.2-1-.3-1-1z"/>
                        <path d="M38.5 23.7H24c-5.3 0-9.7 0-11-.3-.6 0-1-.6-1-1 .2-.7.7-1 1.2-1H24c5 0 11 0 14.4.2H43c6.4 0 14-.3 15.2-.3L64 21c.5 0 1 .4 1 1 0 .5-.4 1-1 1l-5.7.3c-1 0-8.7.4-15.3.4h-4.5z"/>

                        <g ref="loop" id="package-loop" className="svg-fill">
                            <g transform="translate(23, 6)">
                                <path d="M15.2,22.5c-0.3-0.4-0.3-0.9,0-1.3l0,0c0,0,1-1.1,2.2-2.7l0,0c1.2-1.6,2.6-3.7,3.4-5.6l0,0
                                            c0.8-1.7,1.4-4.8,2.7-7.6l0,0C24.8,2.5,27.1,0,30.9,0l0,0c0.4,0,0.9,0,1.4,0.1l0,0v0c0.7,0.1,1.3,0.5,1.7,1.1l0,0
                                            c0.3,0.6,0.4,1.2,0.4,1.8l0,0c0,1.6-0.6,3.7-1.2,6.2l0,0c-0.4,1.5-1.7,2.8-3.3,4.3l0,0c-1.6,1.5-3.6,3-5.6,4.3l0,0
                                            c-3.9,2.7-7.7,4.9-7.7,4.9l0,0c-0.2,0.1-0.3,0.1-0.5,0.1l0,0C15.7,22.8,15.4,22.7,15.2,22.5L15.2,22.5z M25.4,6.1
                                            c-1.2,2.4-1.8,5.4-2.7,7.5l0,0c-0.7,1.5-1.6,3.1-2.6,4.5l0,0c0,0,0.1-0.1,0.1-0.1l0,0c2.7-1.7,5.9-4,8.2-6l0,0
                                            c1.5-1.3,2.6-2.7,2.7-3.4l0,0c0.7-2.4,1.2-4.5,1.2-5.6l0,0c0-0.4-0.1-0.7-0.1-0.8l0,0c-0.1-0.1,0-0.1-0.2-0.1l0,0l0.1-1l-0.1,1
                                            C31.6,2,31.2,2,30.9,2l0,0C28.1,2,26.6,3.7,25.4,6.1L25.4,6.1z"/>
                                <path d="M7.7,21c-2.2-1.4-4.1-3.6-5.5-6l0,0C0.9,12.6,0,10.2,0,8.2l0,0C0,7.1,0.3,6,1.4,5.4l0,0h0
                                            C2,5.1,2.6,4.9,3.2,4.9l0,0C5,5,6.5,6.2,8.8,8.1l0,0c1.8,1.5,3.7,4.8,5.3,7.8l0,0c1.6,2.9,2.7,5.6,2.7,5.6l0,0c0.2,0.5,0,1-0.4,1.3
                                            l0,0c-0.1,0.1-0.9,0.5-2.3,0.5l0,0c0,0,0,0,0,0l0,0C12.7,23.2,10.5,22.7,7.7,21L7.7,21z M2.3,7.2C2.2,7.2,2,7.4,2,8.2l0,0
                                            c0,1.3,0.7,3.6,2,5.7l0,0c1.2,2.1,3,4.2,4.8,5.3l0,0c2.6,1.6,4.4,1.9,5.5,1.9l0,0c0.1,0,0.2,0,0.3,0l0,0c-0.5-1-1.2-2.6-2.2-4.3l0,0
                                            c-1.5-2.9-3.5-6.1-4.8-7.1l0,0C5.2,7.7,3.9,6.9,3.2,7l0,0C2.9,7,2.7,7,2.3,7.2L2.3,7.2L1.9,6.3L2.3,7.2L2.3,7.2z"/>
                            </g>
                        </g>
                    </g>
                    <g ref="letter" className="svg-stroke" transform="translate(200, 40)">
                        <path d="M1.1,4.1C1.2,7.6,1.8,15.8,2,22c0.1,2.9,0.1,5.9-0.2,8.8c-0.2,2.1,0.1,4.1,0,6.1c-0.1,3.7-0.3,2.8-0.4,6.5
                            			l-0.2,8.7c0,3.1-0.5,2.9,2.6,2.8c1.3,0,4.6-0.2,5.9-0.2c20.5,0.3,36,1.2,53.9,0.4c4.1-0.2,9.6,0.2,14.4,0.1c5.2,0.1,4.2,1.3,3.9-7.9
                            			c0.2-9.2-0.6-14.3-1.1-23.5c-0.4-7.3,0.8-18.1,0.9-20.7c0.1-2.2,0.4-2-1.9-2l-5.2,0.1C56.7,1.7,41.5,2,23.5,1.8L11.8,1.5
                            			C9.8,1.4,6,1.1,3.5,1.1C0.5,1,1,0.4,1.1,4.1z"/>
                        <path d="M73.2,10.6c2.7-2.3,5.7-4.1,8.2-6.6"/>
                        <path d="M73.2,10.6c-5.5,4.4-11.6,9-12.4,9.7c-6.4,5-12.3,10.6-19,15.5c-2.2-1.5-4.4-3.1-6.7-4.6
                            			c-4.9-3.2-9.2-7.3-14.2-10.3C19.6,20.2,1.1,7.8,1.1,4.7"/>
                    </g>
                    <g ref="arrow" className="svg-stroke mod-rounded" transform="translate(120, 55)">
                        <path d="M1,9.9c0,0,4.2-0.2,9.6-0.1c3.3,0.1,17.5,0.5,21.2,0.4c3.1-0.1,6-0.3,8.6-0.7"/>
                        <path d="M32.9,1.4c0,0,9.2,7.4,9.2,8.1s-5.7,6.8-8.7,8.6"/>
                    </g>
                </svg>
            </div>
        );
    }
}

export default SVGContainer;
