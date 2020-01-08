import React from 'react';

// import components
import Modal from '../common/Modal';

export default function index() {
  return (
    <Modal
      show={true}
      buttonText="About"
      closeText="Get Started"
      heading="Welcome to Moogy Chat!"
    >
      <p>
        Moogy is an opinionated chatbot that builds it's responses directly from
        user interaction. You can ask Noogy whether he likes sport, or what he
        thinks of Donald Trump and he will return a message that has been
        provided by users during previous conversations and ask you for your
        opinion!
      </p>

      <p>
        Moogy's response to an opinion based question will mirror the overall
        sentiment of user interaction on that topic. For example, if 6 people
        have a positive sentiment and 4 people have a negative sentiment on
        sports, the overall sentiment will be positive. Moogy will then return
        one of the stored positive messages. Moogy's sprite will also react to
        the sentiment of messages and responses, watch carefully!
      </p>

      <p>
        Moogy is inspired by i-DAT's Noogy, an artwork that was displayed at
        Plymouth University back in 2006 and has been created by Matt Dobson as
        part of a univeristy project celebrating i-DAT's creations. Moogy is a
        redux of Noogy's old functionality and is heavily inspired by the user
        interaction that Noogy received. Read about Noogy{' '}
        <a
          href="https://i-dat.org/2006-noogy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        !
      </p>
    </Modal>
  );
}
