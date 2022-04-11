import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Container from "react-bootstrap/Container";

export const AppHeader = () => (

    <header className='app-header'>
        <Container>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <div className='app-header--heading'>
                        <Link passHref={true} href='/'><a className='app-header--logo'>GraphSky</a></Link>
                        <div className='app-header--description'>An ApolloJs demo app running on NextJs</div>
                    </div>
                    <hr/>
                </Col>
            </Row>
        </Container>
    </header>

);