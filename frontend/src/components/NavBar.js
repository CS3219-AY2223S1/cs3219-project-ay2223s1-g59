import {
    Container, 
    Nav,
    Navbar, 
    NavDropdown
} from 'react-bootstrap';

const NavBar = ({user}) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="./home" className="text-primary"><h1>PeerPrep</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="./home">Tab 1</Nav.Link>
                            <Nav.Link href="./settings">Settings</Nav.Link>
                        </Nav>
                        <Navbar.Text className="text-light" style={{marginRight: "0.5rem"}}><span style={{fontSize:"1.5rem"}}>{user} </span><i style={{fontSize:"1.5rem"}} className="bi bi-person-circle"></i></Navbar.Text>
                        <Nav>
                            <NavDropdown title="Options" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="./settings">Change Password</NavDropdown.Item>
                                <NavDropdown.Item href="./settings">Delete Account</NavDropdown.Item>
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