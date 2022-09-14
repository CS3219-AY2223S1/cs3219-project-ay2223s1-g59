import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({onClose, message}) => {

    if (!message) {
        return (
            <></>
        )
    }
    
    return (
        <Alert variant="danger" onClose={onClose} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{message}</p>
        </Alert>
    );
}

export default AlertMessage;