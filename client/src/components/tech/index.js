import React from 'react';
import Modal from '../common/Modal';

export default function index() {
  return (
    <Modal buttonText="Tech Info" heading="Tech Info">
      <p>
        The main chatbot functionality is primarily powered by{' '}
        <a href="https://www.wit.ai" target="_blank" rel="noopener noreferrer">
          Wit.ai
        </a>
        . Wit.ai works differently to most chatbot libraries, instead of
        returning a message, it instead returns the intent of the message. To
        provide a simplified explanation, if someone was to ask "Do you like
        football?" Wit.ai would tell us the intent is an <code>opinion</code>{' '}
        and the focus is <code>football</code>. This is because we've trained
        our Wit.ai model to detect these intents. We can then choose to do as we
        wish with this information. For this information, we would search
        Moogy's database for user messages stored on the football, we then
        calculate the overall sentiment from all of the stored replies and
        return a reply based on this sentiment as well as ask for your opinion
        on the topic to increase our data set. If there are no messages already
        stored on the topic, Moogy will ask you to add your opinion immediately.
      </p>

      <p>
        The whole application has been built on the MERN stack with some
        additional libraries. Our MERN stack includes a cloud hosted{' '}
        <a
          href="https://www.mongodb.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          MongoDB
        </a>{' '}
        database to store user responses,{' '}
        <a
          href="https://expressjs.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Express
        </a>{' '}
        to build our server and REST API,{' '}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>{' '}
        for the frontend and of course{' '}
        <a
          href="https://nodejs.org/en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Node
        </a>{' '}
        to power these libraries. Furthermore,{' '}
        <a href="https://socket.io/" target="_blank" rel="noopener noreferrer">
          socket.io
        </a>{' '}
        is used for real-time communications between our server and frontend, in
        order to push responses from our server. Finally, the application is
        hosted on{' '}
        <a href="https://heroku.com/" target="_blank" rel="noopener noreferrer">
          Heroku
        </a>
        .
      </p>

      <p>
        Moogy's sprite is a simple gif animation created in Photoshop, there are
        a few states depending on the sentiment of messages.
      </p>
    </Modal>
  );
}
