package fr.cpe.services.impl;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import org.jboss.logging.Logger;

import fr.cpe.model.UserModel;
import fr.cpe.services.IMessageReceiverQueue;

@Stateless
@LocalBean
public class MessageReceiverQueue implements IMessageReceiverQueue {

	// Queue de réponse si oui ou non l'utilisateur est enregistré

	Logger log = Logger.getLogger(MessageReceiverQueue.class);

	@Inject
	JMSContext context;

	@Resource(mappedName = "java:/jms/watcherAuthJMSQueue")
	Queue queue;

	@Override
	public UserModel receiveMessage() {
		UserModel user = null;
		JMSConsumer receiver = context.createConsumer(queue);
		Message message = receiver.receive(1000);
		if (message instanceof ObjectMessage) {
			ObjectMessage msg = (ObjectMessage) message;
			try {
				if (msg.getObject() instanceof UserModel) {
					log.info("Réception par la Queue d'un UserModel ");
					user = (UserModel) msg.getObject();
				}
			} catch (JMSException e) {
				e.printStackTrace();
			}
		}
		receiver.close();
		return user;
	}

}
