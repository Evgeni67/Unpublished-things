import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { createPortal } from "react-dom";
import "./Movies.css";

class Movies extends React.Component {
  state = {
    movieArray: [],
    search: "",
    shouldMeFetch: false,
  };
  handleAddComment = async () => {
    let getModal = document.querySelector(".modal");
    getModal.classList.remove("d-none");
    console.log(getModal);
  };
  handleSearch = async () => {
    let getForm = document.querySelector(".inputForm");
    await this.setState({ search: getForm.value });
    console.log(getForm.value);
    if (this.state.search != undefined)
      try {
        let response = await fetch(
          `http://www.omdbapi.com/?apikey=1846c79&s=${this.state.search}`
        );
        let paresdResponse = await response.json();
        this.setState({ movieArray: paresdResponse.Search }, () => {
          console.log(this.state.movieArray);
        });
      } catch (e) {
        console.log(e);
      }
  };

  render() {
    return (
      <>
        <Row class="searchThing">
          <Col sm={4} className="offset-4">
            <Form.Group>
              <Form.Control
                className="inputForm"
                type="text"
                placeholder="Search For a Movie"
              />
              <Button
                className="addCommentBtn"
                variant="primary"
                type="submit"
                onClick={() => this.handleSearch()}
              >
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {this.state.movieArray &&
            this.state.movieArray.map((movie) => (
              <Col sm={3}>
                <Container className="movie">
                  <p>
                    <strong>{movie.Title}</strong>{" "}
                  </p>
                  <img src={movie.Poster} />
                  <p>
                    Year: <strong>{movie.Year}</strong>{" "}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => this.handleAddComment()}
                  >
                    Add Comment
                  </Button>
                </Container>
              </Col>
            ))}
        </Row>
      </>
    );
  }
}

export default Movies;
