import { styled, TextField } from '@mui/material';

export const LightTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: '#fff',
        borderWidth: 2,
    },
    '& input + fieldset': {
        border: '2px solid #fff',
        borderRadius: '10px',
    },
    '& input': {
        color: '#fff',
        fontSize: '18px',
        background: '#101418',
        borderRadius: '10px'
    },
    '& label': {
        color: '#fff',
    },
    '& input:hover + fieldset': {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: '10px'
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#cacaca'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#718399',
        },
    }
});

export const LightTextArea = styled(TextField)({
    '& textarea:valid + fieldset': {
        borderColor: '#fff',
        borderWidth: 2,
    },
    '& textarea + fieldset': {
        border: '2px solid #fff',
        borderRadius: '10px',
    },
    '& textarea': {
        color: '#fff',
        fontSize: '18px',
        background: '#101418',
    },
    '& label': {
        color: '#fff',
    },
    '& textarea:hover + fieldset': {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: '10px',
    },
    '& textarea:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#cacaca'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#718399',
        },
    }
});
