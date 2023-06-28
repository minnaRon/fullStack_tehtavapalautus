import { MessageProps } from '../types';

const Notification = ({ message }: MessageProps) => {

  if (!message) {
    return null;
  }

  return <div style={{ color: 'red' }} >{message}</div>;
};

export default Notification;
