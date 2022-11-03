import Alert from 'react-bootstrap/Alert'

const AlertMessage = ({ onClose, message }) => {
    if (message) {
        return (
            <Alert variant="danger" onClose={onClose} dismissible>
              <Alert.Heading className="text-center">Oh snap! You got an error!</Alert.Heading>
              <h5 className="text-center">{message}</h5>
            </Alert>
        );
    }
}

export default AlertMessage