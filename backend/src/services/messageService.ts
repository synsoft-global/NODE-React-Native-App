import * as fs from 'fs';
import * as path from 'path';

const messagesFilePath = path.resolve(__dirname, '../messages/message.json');
let messages = {};

const loadMessages = () => {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf8');
    messages = JSON.parse(data);
  } catch (error) {
    console.error('Error loading messages:', error);
  }
};

const getMessage = (key) => {
  return messages[key] || '';
};

// Load messages when the module is imported
loadMessages();

export { loadMessages, getMessage };
