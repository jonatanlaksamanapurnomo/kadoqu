import React from "react";
import { Form } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./WrappingLabGreetingCard.css";

const DesktopGreetingCard = props => (
  <div className="wrapping-lab-greeting-card-container">
    <div className="wrapping-lab-section-title">Tambah kartu ucapan</div>
    <Form.Group>
      <Form.Check
        custom
        label="Tanpa kartu ucapan"
        name="boolean"
        type="checkbox"
        className="kadoqu-checkbox-button"
        checked={props.withoutGreetingCard}
        id="wrapping-lab-greeting-card-checkbox"
        onChange={e =>
          props.setState({ withoutGreetingCard: e.target.checked })
        }
      />
    </Form.Group>
    {!props.withoutGreetingCard && (
      <table>
        <tbody>
          <tr>
            <td>Jenis acara</td>
            <td>
              <Form.Control
                name="eventType"
                placeholder="masukkan jenis acara"
                value={props.greetingCard.event}
                onChange={e =>
                  props.setState({
                    greetingCard: {
                      event: e.target.value,
                      content: props.greetingCard.content
                    }
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Isi ucapan</td>
            <td>
              <Form.Control
                as="textarea"
                name="content"
                placeholder="masukkan isi ucapan (max 25 kata)"
                value={props.greetingCard.content}
                onChange={e =>
                  props.setState({
                    greetingCard: {
                      event: props.greetingCard.event,
                      content: e.target.value
                    }
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    )}
  </div>
);

const MobileWriteCard = ({ currentGreetingCard, setGreetingCard, goBack }) => {
  const { event, content } = currentGreetingCard;
  return (
    <div>
      <div className="wrapping-lab-greeting-card-mobile-title-container">
        <i
          onClick={goBack}
          className="fas fa-chevron-left kadoqu-primary-color cursor-pointer mr-2"
        />
        Tulis Kartu Ucapan
      </div>
      <form
        className="wrapping-lab-greeting-card-mobile-form"
        onSubmit={e => {
          e.preventDefault();
          setGreetingCard({
            event: e.target.event.value,
            content: e.target.content.value
          });
        }}
      >
        Jenis Acara
        <Form.Control name="event" defaultValue={event} />
        Isi Ucapan
        <Form.Control
          as="textarea"
          name="content"
          placeholder="Max 25 kata"
          defaultValue={content}
        />
        <button className="kadoqu-primary-button long" type="submit">
          Selesai
        </button>
      </form>
    </div>
  );
};

const MobileGreetingCard = ({
  withoutGreetingCard,
  setState,
  setMobilePage,
  greetingCard,
  goBack
}) => (
  <div className="wrapping-lab-greeting-card-mobile-container">
    <Form.Group>
      <Form.Check
        custom
        label={
          <span className="kadoqu-primary-color font-weight-normal">
            Tambah kartu ucapan
          </span>
        }
        name="boolean"
        type="checkbox"
        className="kadoqu-checkbox-button"
        checked={!withoutGreetingCard}
        id="wrapping-lab-greeting-card-checkbox"
        onChange={e => setState({ withoutGreetingCard: !e.target.checked })}
      />
    </Form.Group>
    {!withoutGreetingCard && (
      <button
        className="kadoqu-primary-button long wrapping-lab-greeting-card-mobile-button"
        onClick={() =>
          setMobilePage(
            <MobileWriteCard
              currentGreetingCard={greetingCard}
              setGreetingCard={({ event, content }) => {
                setState({
                  greetingCard: {
                    event,
                    content
                  }
                });
                setMobilePage();
              }}
              goBack={goBack}
            />
          )
        }
      >
        Tulis
      </button>
    )}
  </div>
);

const WrappingLabGreetingCard = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop =>
      isDesktop ? (
        <DesktopGreetingCard {...props} />
      ) : (
        <MobileGreetingCard {...props} />
      )
    }
  </MediaQuery>
);

export default WrappingLabGreetingCard;
