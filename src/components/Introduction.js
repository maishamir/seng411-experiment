import React from 'react';

export default class Introduction extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to our visualization experiment</h1>
                <p>
                    For this experiment, you will be shown a series of numbers
                    represented as either text or circles of corresponding
                    sizes.
                </p>
                <p>
                    Your required task is to click the biggest number/circle as
                    fast as you can
                </p>
                <p>
                    To begin, please enter a group code, if you were given one.
                </p>
                <p>
                    This is to ensure everyone in your group, who performs the
                    experiment, receives the same trials.
                </p>
                <input
                    type="text"
                    placeholder="Please enter group code"
                    onKeyDown={this.props.onBeginExperiment}
                />
            </div>
        );
    }
}
