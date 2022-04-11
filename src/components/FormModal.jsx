import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {integerize} from '../utils/dataHandling';
import {useRouter} from "next/router";

const FormModal = (props) => {
    const router = useRouter();
    const {mutation, initialFields, isShownModal, toggleModal, title} = props;

    const [fields, setFields] = useState(initialFields);

    const [mutationFn] = useMutation(mutation);
    const handleSubmit = (variables) => {
        let parsedVariables = {...variables};
        Object.keys(variables).forEach(fieldName => {
           parsedVariables = {...parsedVariables, [fieldName]: integerize(variables[fieldName])}
        });
        return mutationFn({variables: parsedVariables}).then((data) => {
            const response = Object.values(Object.values(data)[0])[0];

           if(response.code === 200) {
               const slug = response.data.slug;
               const routerParentPage = title.split(" ")[1].toLowerCase();
               router.push(`/${routerParentPage}s/${slug}`);
               if(title.split(" ")[0] === 'Update') {
                   setTimeout(() => location.reload(), 1);
               }
           }
        })
    };

    const excludedFields = ['starId', 'planetId', 'star' , 'planet', 'satellites', 'planets', 'id', '__typename' ]

    const handleInput = (fieldName, newValue) => {
        const newFields = {...fields, [fieldName]: newValue};
        setFields(newFields);
    }


    return (<>
        <Modal show={isShownModal} onHide={toggleModal} className='add-modal'
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {Object.keys(fields)
                        .filter(fieldName => excludedFields.indexOf(fieldName) < 0)
                        .map((fieldName) => (
                        <Form.Group key={fieldName} className="mb-3">
                            <Form.Label>{fieldName}</Form.Label>
                            <Form.Control type="text" value={(fields[fieldName]|| '')}
                                          onChange={(ev) => handleInput(fieldName, ev.target.value)}/>
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleSubmit(fields)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default FormModal;