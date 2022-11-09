import { Container, Nav, Navbar } from 'react-bootstrap'

const NavBar = ({ user }) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="./home" className="text-primary"><h1>PeerPrep</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="./home">Home</Nav.Link>
                            <Nav.Link href="./history">History</Nav.Link>
                            <Nav.Link href="./settings">Settings</Nav.Link>
                        </Nav>
                        <Navbar.Text className="text-light" style={{marginRight: "0.5rem"}}><span style={{fontSize:"1.5rem"}}>{user} </span><i style={{fontSize:"1.5rem"}} className="bi bi-person-circle"></i></Navbar.Text>
                        <Nav>
                            <Nav.Link href="./login">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}    
export default NavBar