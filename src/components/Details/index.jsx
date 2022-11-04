import React from 'react';
import { useLocation } from "react-router-dom";
import { Col, Row, Card } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';

const Details = () => {
  const { state } = useLocation();

  if (isEmpty(state)) return null

  return (
    <div className="p-4 text-white">
      <Row className="g-4">
        <Col xs={4}>
          <Card.Img
            variant="top"
            className="rounded"
            src={state.img}
          />
        </Col>

        <Col xs={4}>
          <h2 className="display-2">{state.title}</h2>

          <p className="lead">{state.description}</p>

          <cite className="badge text-bg-info">{state.date}</cite>
        </Col>
      </Row>
    </div>
  )
};

export default Details;
