import {
    Container, 
    Nav,
    Navbar, 
    NavDropdown
} from 'react-bootstrap';

const NavBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="./home" className="text-primary"><h1>PeerPrep</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="./home">Feature1</Nav.Link>
                            <Nav.Link href="./home">Feature2</Nav.Link>
                        </Nav>
                        <Nav>
                            <Navbar.Text className="text-light"><i class="bi bi-person-circle"> Timmy</i></Navbar.Text>
                            <NavDropdown title="Options" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="./login">Change Password</NavDropdown.Item>
                                <NavDropdown.Item href="./login">Delete Account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="./login">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}    
export default NavBar;