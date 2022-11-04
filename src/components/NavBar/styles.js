import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

const NavBar = styled(Container)`
  align-items: center;

  .logo {
    font-size: 2rem;
  }

  .text-bold {
    font-weight: 500;
    margin: 0 5px;
  }

  .input-search {
    width: auto;
  }

  .nav-link {
    &:not(.active) {
      &:hover {
        &.favorite {
          color: var(--bs-danger) !important;
        }
        &.new {
          color: var(--bs-primary) !important;
        }        
      }
    }

    &.active {
      &.favorite {
        color: var(--bs-danger) !important;
      }
      &.new {
        color: var(--bs-primary) !important;
      }       }
  }
`;

export default NavBar;
