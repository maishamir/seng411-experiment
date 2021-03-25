import React from "react";
import { Block, Format } from "./components/Block";
import Trial from "./components/Trial";
import Introduction from "./components/Introduction";
import EndScreen from "./components/EndScreen";
import "./App.css";
import axios from "axios";
import "dotenv";
require("dotenv").config();

export const DataSubmissionStatus = Object.freeze({
  NOT_SUBMITTED: 1,
  SUCCESFUL: 2,
  FAILED: 3,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTrial: 0,
      showInstruction: true,
      curentIteration: 1,
      results: [],
      showIntro: true,
      dataSubmitted: DataSubmissionStatus.NOT_SUBMITTED,
    };

    this.userID = Math.floor(Math.random() * 90000) + 10000;
    this.groupCode = 0;

    this.iterationPerTrial = 7;
    this.trialParameters = [
      { format: Format.TEXT, n: 3, instructType: 1 },
      { format: Format.TEXT, n: 5, instructType: 2 },
      { format: Format.TEXT, n: 9, instructType: 2 },
      { format: Format.TEXT, n: 25, instructType: 2 },
      { format: Format.BUBBLE, n: 3, instructType: 1 },
      { format: Format.BUBBLE, n: 5, instructType: 2 },
      { format: Format.BUBBLE, n: 9, instructType: 2 },
      { format: Format.BUBBLE, n: 25, instructType: 2 },
    ];
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onSpacebarClicked);
  }

  componentDidUpdate() {
    if (this.state.curentIteration > this.iterationPerTrial) {
      this.advanceTrial();
    }
  }

  beginExperiment = (event) => {
    if (event.keyCode === 13) {
      var elem = event.srcElement || event.target;
      this.groupCode = elem.value;
      this.setState({
        showIntro: false,
      });
    }
  };

  onSpacebarClicked = (event) => {
    if (
      this.state.showInstruction &&
      (event.key === "Spacebar" || event.key === " " || event.keyCode === 32)
    ) {
      this.setState({
        showInstruction: false,
      });
    }
  };

  advanceIteration = () => {
    this.setState({
      curentIteration: this.state.curentIteration + 1,
    });
  };

  advanceTrial = () => {
    this.setState({
      currentTrial: this.state.currentTrial + 1,
      curentIteration: 1,
      showInstruction: true,
    });
  };

  addResults = (newResult) => {
    this.setState({
      results: [...this.state.results, newResult],
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.results);

    axios
      .post(`${process.env.REACT_APP_GOOGLE_SHEETS}`, this.state.results)
      .then((response) => {
        console.log(response);
        this.setState({
          dataSubmitted: DataSubmissionStatus.SUCCESFUL,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          dataSubmitted: DataSubmissionStatus.FAILED,
        });
      });
  };

  whatToShow = () => {
    if (this.state.showIntro) {
      return <Introduction onBeginExperiment={this.beginExperiment} />;
    } else if (this.state.currentTrial === this.trialParameters.length) {
      var submissionStatusObject = null;

      if (this.state.dataSubmitted === DataSubmissionStatus.SUCCESFUL) {
        submissionStatusObject = (
          <div className={"submittedSuccessfully"}>
            Data submission complete
          </div>
        );
      } else if (this.state.dataSubmitted === DataSubmissionStatus.FAILED) {
        submissionStatusObject = (
          <div className={"submittedFailed"}>Data submission failed</div>
        );
      }

      return (
        <EndScreen
          results={this.state.results}
          showSubmitButton={
            this.state.dataSubmitted === DataSubmissionStatus.NOT_SUBMITTED
          }
          submissionStatusObject={submissionStatusObject}
          onSubmit={this.submitHandler}
        />
      );
    } else {
      return (
        <Trial
          format={this.trialParameters[this.state.currentTrial].format}
          n={this.trialParameters[this.state.currentTrial].n}
          showInstruction={this.state.showInstruction}
          instructType={
            this.trialParameters[this.state.currentTrial].instructType
          }
          curentIteration={this.state.curentIteration}
        >
          <Block
            format={this.trialParameters[this.state.currentTrial].format}
            n={this.trialParameters[this.state.currentTrial].n}
            startTime={Date.now()}
            curentIteration={this.state.curentIteration}
            advanceIteration={this.advanceIteration}
            experimentSeed={this.groupCode}
            userID={this.userID}
            addResults={this.addResults}
          />
        </Trial>
      );
    }
  };

  render() {
    return <div className="App">{this.whatToShow()}</div>;
  }
}
