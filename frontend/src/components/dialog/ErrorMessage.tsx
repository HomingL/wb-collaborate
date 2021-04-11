import React from 'react';
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

interface ErrorMessageProps {
    occur: boolean,
    onClose?: () => void,
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, occur, onClose }) => {
    return (
        <Collapse in={occur}>
            <Alert action={
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClose}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
            } severity="error">
                {children}
            </Alert>
        </Collapse>
    );
};

export default ErrorMessage;