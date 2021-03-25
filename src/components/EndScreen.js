import React from 'react';

export default class EndScreen extends React.Component {
    render() {
        const submitButton = (
            <div>
                <p>
                    Click the button below to submit your results for analysis
                </p>
                <button type={'submit'} onClick={this.props.onSubmit}>
                    Submit
                </button>
            </div>
        );

        return (
            <div className="App">
                <h2>Thank you for participating</h2>
                <p>Your results are below</p>
                {this.props.showSubmitButton
                    ? submitButton
                    : this.props.submissionStatusObject}

                <table>
                    <thead>
                        <tr key={'header'}>
                            {Object.keys(this.props.results[0]).map(
                                (key, headerIndex) => (
                                    <th key={headerIndex}>{key}</th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((val, innerIndex) => (
                                    <td key={innerIndex}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
