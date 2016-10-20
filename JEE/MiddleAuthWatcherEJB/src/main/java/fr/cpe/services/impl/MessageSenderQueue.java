package fr.cpe.services.impl;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import org.jboss.logging.Logger;

import fr.cpe.model.UserModel;
import fr.cpe.services.IMessageReceiverQueue;
import fr.cpe.services.IMessageSenderQueue;

/**
 * Session Bean implementation class MessageSenderQueue
 */
@Stateless
public class MessageSenderQueue implements IMessageSenderQueue {

	Logger log = Logger.getLogger(MessageSenderQueue.class);

	@Inject
	JMSContext context;
	
	@Resource(mappedName = "java:/jms/watcherAuthJMSQueue")
	Queue queue;

	@Override
	public void sendMessage(String message) {
		context.createProducer().send(queue, message);
	}

	@Override
	public void sendMessage(UserModel user) {
		try {
			log.info("Envoie par la Queue d'un UserModel");
			ObjectMessage message = context.createObjectMessage();
			message.setObject(user);
			context.createProducer().send(queue, user);
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
