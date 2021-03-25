import React from 'react';

export default class Trial extends React.Component {
    render() {
        const {
            format,
            n,
            showInstruction,
            instructType,
            curentIteration,
        } = this.props;

        const trialInstructionScreen = (
            <div>
                <h1>{`${format} phase`}</h1>
                <p>
                    {instructType === 1
                        ? `Perform the required task for a group of ${n} numbers`
                        : `Now do the same for a group of ${n} numbers`}
                </p>
                <p>{'Press Space to Continue'}</p>
            </div>
        );

        if (showInstruction) {
            return trialInstructionScreen;
        } else {
            return (
                <div>
                    <h1>{`Iteration ${curentIteration}`}</h1>
                    {this.props.children}
                </div>
            );
        }
    }
}
