package fr.cpe.services.impl;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.JMSProducer;
import javax.jms.ObjectMessage;
import javax.jms.Topic;

import org.jboss.logging.Logger;

import fr.cpe.model.UserModel;
import fr.cpe.services.IMessageSenderTopic;

@Stateless
@LocalBean
public class MessageSenderTopic implements IMessageSenderTopic {

	Logger log = Logger.getLogger(MessageSenderTopic.class);

	@Inject
	JMSContext context;

	@Resource(mappedName = "java:/jms/watcherAuthJMSTopic")
	Topic topic;

	@Override
	public void sendMessage(String message) {
		log.info("Envoie au Topic d'un Message");
		JMSProducer prod = context.createProducer();
		prod.send(topic, message);
	}

	@Override
	public void sendMessage(UserModel user) {
		log.info("Envoie au Topic d'un UserModel");
		try {
			JMSProducer prod = context.createProducer();
			ObjectMessage message = context.createObjectMessage();
			message.setObject(user);
			prod.send(topic, message);
		} catch (NullPointerException | JMSException e) {
			e.printStackTrace();
		}
	}
}
