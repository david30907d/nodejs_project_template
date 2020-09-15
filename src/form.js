import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

export default class FormExampleFieldErrorLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        Application: "",
        Source: "",
        Codec: "",
        Width: "",
        Height: "",
      },
      filepath: "",
      successState: null,
      errorState: null,
    };
  }
  handleChange = (e, { name, value }) => {
    let state = this.state;
    state.payload[name] = value;
    const params = new URLSearchParams(this.props.search);
    const cameraId = params.get("cameraId");
    state.filepath = `./${cameraId}`;
    this.setState(state);
  };

  handleSubmit = () => {
    console.log(this.state);
    let url = "http://127.0.0.1:8000/settings";
    if (!this.checkBeforeSubmit()) {
      this.setState({ errorState: true });
      return;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({ successState: true });
      })
      .catch((err) => console.log("error:", err));
  };

  checkBeforeSubmit = () => {
    if (
      this.state.payload.Application !== "" &&
      this.state.payload.Source !== "" &&
      this.state.payload.Codec !== "" &&
      this.state.payload.Width !== "" &&
      this.state.payload.Height !== ""
    ) {
      return true;
    }
    return false;
  };
  render() {
    const { Application, Source, Codec, Width, Height } = this.state;
    return (
      <Form success={this.state.successState} error={this.state.errorState}>
        <Form.Input
          fluid
          label="Application"
          name="Application"
          value={Application}
          onChange={this.handleChange}
          placeholder="Name of camera"
          id="form-input-first-name"
        />
        <Form.Input
          fluid
          label="Source"
          name="Source"
          value={Source}
          onChange={this.handleChange}
          placeholder="rtsp://ip"
        />
        <Form.Input
          fluid
          label="Codec"
          name="Codec"
          value={Codec}
          onChange={this.handleChange}
          placeholder="rtsp://ip"
        />
        <Form.Input
          fluid
          label="Width"
          name="Width"
          value={Width}
          onChange={this.handleChange}
          placeholder="In width"
        />
        <Form.Input
          fluid
          label="Height"
          name="Height"
          value={Height}
          onChange={this.handleChange}
          placeholder="In cm"
        />
        <Message
          success
          header="Form Completed"
          content="You've finish all the settings of BerryNet!"
        />
        <Message
          error
          header="Form incomplete"
          content="All fields are required!"
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}
