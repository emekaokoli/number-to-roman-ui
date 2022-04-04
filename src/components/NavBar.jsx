import React from 'react';
import { Navbar, NavbarBrand, Container } from 'reactstrap';

function NavBar() {
  return (
    <Container>
      <Navbar color='dark' expand='md' dark>
        <NavbarBrand href='/'>Number to roman</NavbarBrand>
      </Navbar>
    </Container>
  );
}
export default NavBar;
