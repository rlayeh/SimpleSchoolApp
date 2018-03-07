export const THROW_MESSAGE = 'app/errorMessageContainer/THROW_MESSAGE';
export const CLEAR_MESSAGES_ARRAY = 'app/errorMessageContainer/CLEAR_MESSAGES_ARRAY';
export const THROW_BULK_MESSAGE = 'app/errorMessageContainer/THROW_BULK_MESSAGE';

export const throwMessage = (message, messageType, translate) => ({
  type: THROW_MESSAGE,
  message,
  messageType,
  translate,
});

export const throwBulkMessage = (messages) => ({
  type: THROW_BULK_MESSAGE,
  messages,
});

export const clearMessagesArray = () => ({
  type: CLEAR_MESSAGES_ARRAY,
});
