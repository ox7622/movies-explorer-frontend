export const clearErrors = (setMessage, sendError) => {
   
    const timeout = setTimeout(() => {
        setMessage('');
        sendError('');
    }, 50000);
    return clearTimeout(timeout);

}