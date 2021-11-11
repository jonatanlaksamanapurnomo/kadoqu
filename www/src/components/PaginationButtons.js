import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { validateNumeric } from "../utils/regexInputConverter";
import "./PaginationButtons.css";

class PaginationButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.paginationByUrl
        ? parseInt(this.props.match.params.page, 10)
        : this.props.currentPage
    };
  }

  componentDidUpdate = () =>
    this.props.paginationByUrl &&
    (() => {
      const pageInUrl = parseInt(this.props.match.params.page, 10);
      if (this.props.currentPage !== pageInUrl) {
        if (this.state.inputValue !== pageInUrl) {
          this.setState({
            inputValue: pageInUrl
          });
        }
      }
    });

  setPage = newPage => {
    this.setState({ inputValue: newPage }, this.props.setPage(newPage));
  };

  render() {
    const maxPage = Math.ceil(this.props.itemsLength / this.props.limitPerPage);
    return (
      <div className="pagination-buttons">
        {this.props.currentPage > 1 ? (
          <React.Fragment>
            <Button
              className="active"
              onClick={() => {
                this.setPage(1);
              }}
            >
              {"<<"}
            </Button>
            <Button
              className="active"
              onClick={() => this.setPage(this.props.currentPage - 1)}
            >
              {"<"}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button className="disabled">{"<<"}</Button>
            <Button className="disabled">{"<"}</Button>
          </React.Fragment>
        )}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (this.state.inputValue <= 0) {
              this.setPage(1);
              return;
            }
            if (this.state.inputValue > maxPage) {
              this.setPage(maxPage);
              return;
            }
            this.setPage(this.state.inputValue);
          }}
        >
          <input
            className="d-inline-block"
            type="text"
            value={this.state.inputValue}
            onChange={e => {
              this.setState({
                inputValue: validateNumeric(e.target.value)
              });
            }}
          />
        </form>
        {this.props.currentPage < maxPage ? (
          <React.Fragment>
            <Button
              className="active"
              onClick={() => this.setPage(this.props.currentPage + 1)}
            >
              {">"}
            </Button>
            <Button
              className="opacity-0"
              // onClick={() => {
              //   this.setPage(maxPage);
              // }}
            >
              {">>"}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button className="disabled">{">"}</Button>
            <Button className="opacity-0">{">>"}</Button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(PaginationButtons);
