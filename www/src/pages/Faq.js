import React from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Container } from "react-bootstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./Faq.css";
import ReactMarkdown from 'react-markdown';
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
const QUERY_GET_FAQ = gql`
  query getFaqCategory {
    getFaqCategory {
      id
      name
      faqSubCategory {
        id
        idFaqCategory
        name
        content
      }
    }
  }
`;

let temp = [];

class Faq extends React.Component {
  constructor() {
    super();

    this.state = {
      content: []
    };

    this.handleClickFaq = this.handleClickFaq.bind(this);
  }

  handleClickFaq(a, b) {
    if (temp[a] !== b) {
      temp[a] = b;
    } else {
      temp[a] = "";
    }

    this.setState({
      content: temp
    });
  }

  render() {
    return (
   <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
      <React.Fragment>
        <Helmet>
          <title>Kadoqu.com | FAQ</title>
        </Helmet>
        <div   className={
                      isMobile
                        ? "faq-title-mob"
                        : "faq-title"
                    }>
          <h1>Selamat Datang di Pusat Solusi</h1>

          <i  className={
                      isMobile
                        ? "fas fa-search fa-lg faq-icon-search-mob mt-4 mb-3"
                        : "fas fa-search fa-lg faq-icon-search mt-4 mb-3"
                    } />
          <input placeholder="Apa yang kamu cari?"   className={
                      isMobile
                        ? "faq-title-form-mob"
                        : "faq-title-form"
                    } />
        </div>
        <Container className="faq-content">
          <Query query={QUERY_GET_FAQ}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <React.Fragment>
                  {data.getFaqCategory.map(faq => {
                    return (
                      <Row className="mb-5">
                        <Col xs="12" md="3" className="faq-content-title">
                          <h4>{faq.name}</h4>
                        </Col>

                        <Col xs="12" md="9" className="faq-content-sub-title">
                          {faq.faqSubCategory.map(faqSub => {
                            return (
                              <div>
                                <button
                                  className="faq-clickable"
                                  onClick={() =>
                                    this.handleClickFaq(
                                      faqSub.id,
                                      faqSub.content
                                    )
                                  }
                                >
                                  <h4>{faqSub.name}</h4>
                                </button>
                                <ReactMarkdown escapeHtml={false} source={this.state.content[faqSub.id]}/>
                              </div>
                            );
                          })}
                        </Col>
                      </Row>
                    );
                  })}
                </React.Fragment>
              );
            }}
          </Query>
        </Container>
      </React.Fragment>
            );
    }}
      </MediaQuery>
    );
  }
}

export default Faq;
