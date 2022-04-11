import {Row, Container, Col} from 'react-bootstrap';
import Link from 'next/link';
import FormModal from "./FormModal";
import {DocumentNode} from "graphql";
import {useState} from "react";

/*type OrbitedObjectType<T> = { name: string, slug: string, type: string, around?: any };
type OrbitingObjectType =
    { name: string, symbol: string, slug: string }

type CelestialObjectType = {
    mainObject: { name: string, type?: string, radius?: number, aphelion?: number, perihelion?: number, mass?: number, symbol?: string, around?: OrbitedObjectType<OrbitedObjectType<never>> },
    orbitingObjects?: { title: string, type: string, list: [OrbitingObjectType] }
    newObject?: { mutation: DocumentNode, initialFields: object, title: string },
    updateObject?: { mutation: DocumentNode, initialFields: object, title: string }
    deleteObject?:  () => Promise<void>
}*/


function CelestialObject(props) {

    const {mainObject, orbitingObjects, newObject, deleteObject, updateObject} = props;

    const [isShownNewModal, setIsShownNewModal] = useState(false);
    const [isShownUpdateModal, setIsUpdateNewModal] = useState(false);

    const toggleNewModal = () => {
        setIsShownNewModal(!isShownNewModal)
    };
    const toggleUpdateModal = () => {
        setIsUpdateNewModal(!isShownUpdateModal)
    };

    return (<Container className='app-page'>
        <Row>
            <Col md={{span:8, offset: 2}} lg={{span: 6, offset: 3}}>
                {mainObject && (<Row>
                        <Col className='main-item'>
                            <h2 className='main-item--name'>{mainObject.name}
                                {deleteObject && (
                                    <div className='main-item--panel'>
                                        <span onClick={() => toggleUpdateModal()}>Edit</span>
                                        <span onClick={() => deleteObject()}>Delete</span>
                                    </div>
                                )}
                            </h2>
                            {mainObject.type && (
                                <div className='main-item--features'>
                                    <div className='main-item--feature'>
                                        <span>type:</span> {mainObject.type || '//'}
                                    </div>
                                    <div className='main-item--feature'>
                                        <span>radius:</span> {mainObject.radius || '//'}
                                    </div>
                                    <div className='main-item--feature'>
                                        <span>mass:</span> {mainObject.mass || '//'}
                                    </div>
                                    <div className='main-item--feature'>
                                        <span>symbol:</span> {mainObject.symbol || '//'}
                                    </div>

                                    {mainObject.around && (<>
                                            <div className='main-item--feature'>
                                                <span>perihelion:</span> {mainObject.perihelion || '//'}
                                            </div>
                                            <div className='main-item--feature'>
                                                <span>aphelion:</span> {mainObject.aphelion || '//'}
                                            </div>
                                            <div className='main-item--feature'>
                                                <span>orbiting around:</span>
                                                {mainObject.around?.around && (
                                                    <>
                                                        <Link
                                                            href={`/${mainObject.around.around.type}/${mainObject.around.around.slug}`}>
                                                            {mainObject.around.around.name}
                                                        </Link>
                                                        <i>/</i>
                                                    </>
                                                )}
                                                <Link href={`/${mainObject.around.type}/${mainObject.around.slug}`}>
                                                    {mainObject.around.name}
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </Col>
                    </Row>
                )}
                {orbitingObjects && (
                    <Row>
                        <h3 className='orbiting-item--heading'>{orbitingObjects.title}:</h3>
                        {orbitingObjects.list.map(orbitingObject => (
                            <Col key={orbitingObject.slug} md={{span:6}} xl={{span: 4}}>
                                <Link href={`/${orbitingObjects.type}/${orbitingObject.slug}`}>
                                    <a className='orbiting-item card'>
                                        <p className='orbiting-item--name'>{orbitingObject.name}</p>
                                        <p className='orbiting-item--symbol'>{orbitingObject.symbol}</p>
                                    </a>
                                </Link>
                            </Col>
                        ))}
                        <Col md={{span:6}} xl={{span: 4}}>
                            <a className='orbiting-item orbiting-item__new card' onClick={() => toggleNewModal()}>
                                <p className='orbiting-item--name'/>
                                <p className='orbiting-item--symbol'>+</p>

                            </a>
                        </Col>

                    </Row>
                )}
                {newObject && <FormModal {...newObject} title={`New ${newObject.title}`} toggleModal={toggleNewModal} isShownModal={isShownNewModal}/>}
                {updateObject && <FormModal {...updateObject} title={`Update ${updateObject.title}`} toggleModal={toggleUpdateModal} isShownModal={isShownUpdateModal}/>}


            </Col>
        </Row>


    </Container>)
}

export default CelestialObject;
