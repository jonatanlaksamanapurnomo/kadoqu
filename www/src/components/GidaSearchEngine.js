import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import { withApollo, Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { isNullOrUndefined } from "util";
import uuidv4 from "uuid/v4";
// import ReactGA from 'react-ga';


import "./GidaSearchEngine.css";
import { QUERY_GET_GIDA_OPTIONS } from "../gql/gida-option";

const MUTATION_ADD_SURVEY_LOG = gql`
  mutation addSurveyLog($input: SurveyLogInput) {
    addSurveyLog(input: $input)
  }
`;

const GidaSearchEngineDropdown = props => (
  <select
    value={props.value}
    id={`gida-search-engine-select-${props.id}`}
    className="gida-search-engine-select cursor-pointer"
    name={props.id}
    onClick={e => {
      e.target.classList.add("chosen");
      e.target.classList.remove("error");
      document.getElementById("gida-search-engine-error-message").innerHTML =
        "";
    }}
  >
    {props.arr.map(choice => {
      return (
        <option key={choice} value={choice}>
          {choice}
        </option>
      );
    })}
  </select>
);

const GidaSearchEngineTitle = props => (
  <span className="gida-search-engine-title">
    <span className="kadoqu-primary-color">Mama GIdA </span>
    bisa tau
    <br />
    kado apa yang dicari
  </span>
);

const GidaSearchEngineInput = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop => (
      <Mutation mutation={MUTATION_ADD_SURVEY_LOG}>
        {(addSurveyLog, { loading, error, data }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              let allFieldCompleted = true;
              let traits = [];
              ["person", "event", "trait-1", "trait-2", "trait-3"].forEach(
                field => {
                  if (!e.target[field]) {
                    return;
                  }
                  if (field.includes("trait")) {
                    traits.push(e.target[field].value.toLowerCase());
                  }
                  if (!e.target[field].classList.contains("chosen")) {
                    e.target[field].classList.add("error");
                  }
                  allFieldCompleted =
                    allFieldCompleted &&
                    e.target[field].classList.contains("chosen");
                }
              );
              if (!allFieldCompleted) {
                document.getElementById(
                  "gida-search-engine-error-message"
                ).innerHTML =
                  "*Isi lengkap kriteria dulu ya sebelum tanya Mama";
                return;
              }

              if (isNullOrUndefined(localStorage.guestId))
                localStorage.setItem("guestId", uuidv4());
              localStorage.setItem("traits", JSON.stringify(traits));
              localStorage.setItem(
                "person",
                e.target.person.value.toLowerCase()
              );
              localStorage.setItem("event", e.target.event.value.toLowerCase());
              localStorage.setItem("usingGida", "yes");

              let SurveyLogInput = {
                guestId: localStorage.guestId,
                traits: localStorage.traits,
                person: localStorage.person,
                event: localStorage.event
              };

              let gidaOption={
                traits: localStorage.traits,
                person: localStorage.person,
                event: localStorage.event
              }
              addSurveyLog({ variables: { input: SurveyLogInput } }).catch(
                error => {
                  console.log("Error!: ", error);
                  return <p>Error!</p>;
                }
              );

              props.history.push("/gida-search-engine/result",gidaOption);
            }}
          >
            <Row>
              <Col xs={12}>
                <Query query={QUERY_GET_GIDA_OPTIONS}>
                  {({ loading, error, data }) => {
                    if (loading || error) return <p>Loading...</p>;
                    const PEOPLE = data.getGidaRelationshipOptions.map(
                      ({ value }) => value
                    );
                    const EVENTS = data.getGidaEventOptions.map(
                      ({ value }) => value
                    );
                    const TRAITS = data.getGidaPersonalityOptions.map(
                      ({ value }) => value
                    );
                    return (
                      <p className="gida-search-engine-content">
                        Saya {props.home ? "perlu" : "lagi cari"} kado buat
                        <GidaSearchEngineDropdown id="person" arr={PEOPLE} />
                        {props.break && <br />}
                        untuk acara
                        <GidaSearchEngineDropdown id="event" arr={EVENTS} />
                        {(props.break || !isDesktop) ? <br /> : ". "}
                        Dia itu {props.home ? "" : "tipe"} orangnya
                        {(props.break || !isDesktop) && <br />}
                        <GidaSearchEngineDropdown id="trait-1" arr={TRAITS} />
                        <GidaSearchEngineDropdown id="trait-2" arr={TRAITS} />
                        {/* {(isDesktop || !props.home) && ( */}
                          <GidaSearchEngineDropdown id="trait-3" arr={TRAITS} />
                        {/* )} */}
                        <br />
                        <span className="gida-search-engine-last-line">
                          Kasih kado apa ya,{" "}
                          <span className="kadoqu-primary-color">
                            Mama GIdA
                          </span>
                          ?
                        </span>
                      </p>
                    );
                  }}
                </Query>
              </Col>
              {!props.home && (
                <div id="gida-search-engine-error-message" className="w-100" />
              )}
              <Col
                md={12}
                lg={12}
                className="gida-search-engine-button-container"
              >
                <button
                  type="submit"
                  className={
                    "kadoqu-primary-button" + (props.home ? " short" : " long")
                  }
                >
                  Tanya Mama
                </button>
                {props.home && (
                  <div
                    id="gida-search-engine-error-message"
                    className="d-inline-block ml-1"
                  />
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Mutation>
    )}
  </MediaQuery>
);

export { GidaSearchEngineTitle };
export default withApollo(withRouter(GidaSearchEngineInput));
