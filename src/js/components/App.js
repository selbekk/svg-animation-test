import React, { Component } from 'react';
import SVGContainer from './SVGContainer';

const App = React.createClass({
    getInitialState: () => {
        return {
            heading: 'Hva skal du sende?',
            leftButton: 'Pakke',
            rightButton: 'Brev'
        };
    },
    render: function() {
        return (
            <div className="app">
                <h2 className="app-heading">{this.state.heading}</h2>
                <SVGContainer step={this.state.step} />
                <div className="buttons">
                    <div className="half">
                        <button className="button" onClick={this.chooseLeft}>{this.state.leftButton}</button>
                    </div>
                    <div className="half">
                        <button className="button" onClick={this.chooseRight}>{this.state.rightButton}</button>
                    </div>
                </div>
            </div>
        );
    },
    chooseLeft: function() {
        this.setState({ heading: 'Hvor stor er pakken?', leftButton: 'liten', rightButton: 'stor', step: 'parcel' });
    },
    chooseRight: function() {
        this.setState({ heading: 'Hvor tungt er brevet?', leftButton: 'lite', rightButton: 'stort', step: 'letter' });
    },
})

export default App;
