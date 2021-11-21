const Messages = {
    SERVER_COMMUNICATION_FAILURE: "Communication failure with remote server",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    FIELD_FORMAT_ERROR: "Formatting erro or mandatory fields",
    SERVER_ERROR: "Server error:",

    treatMessage(response) {
        if (response && response.data && response.data.errors && response.data.errors.length > 0 && response.data.errors[0].message) {
            return response.data.errors[0].message;
        } else if (response && response.data && response.data.error) {
            return response.data.error
        }

        return Messages.SERVER_COMMUNICATION_FAILURE;
    }
}

export default Messages