import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

const FormContainer = styled(Container)`
  padding: 7rem;

  .form-control {
    height: 100px !important;

    &[type="file"] {
      padding-top: 2.5rem;
      padding-left: 2rem;
    }

    &.select {
      padding-top: 2rem;
    }
  }
`;

export default FormContainer;
