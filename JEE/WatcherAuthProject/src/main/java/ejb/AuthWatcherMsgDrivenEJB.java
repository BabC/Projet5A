package ejb;

import java.time.LocalDateTime;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import org.jboss.logging.Logger;

import fr.cpe.model.Role;
import fr.cpe.model.UserEntity;
import fr.cpe.model.UserModel;
import fr.cpe.services.IMessageSenderQueue;
import fr.cpe.services.IUserDAO;

@MessageDriven(activationConfig = {
		@ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic"),
		@ActivationConfigProperty(propertyName = "destination", propertyValue = "java:/jms/watcherAuthJMSTopic") })
public class AuthWatcherMsgDrivenEJB implements MessageListener {

	// private DataContainer dataContainer;
	Logger log = Logger.getLogger(AuthWatcherMsgDrivenEJB.class);

	@Inject
	IMessageSenderQueue senderQueue;
	// @Inject
	// DataContainer dataContainer;
	@Inject
	IUserDAO dao;

	/**
	 * Reception d'un message par le topic
	 */
	@Override
	public void onMessage(Message message) {
		try {
			if (message instanceof TextMessage) {
				log.info("Reception d'un Message par le topic à " + LocalDateTime.now());
				TextMessage msg = (TextMessage) message;
				log.info("Message : " + msg.getText());

			} else if (message instanceof ObjectMessage) {
				ObjectMessage msg = (ObjectMessage) message;

				if (msg.getObject() instanceof UserModel) {
					UserModel user = (UserModel) msg.getObject();
					log.info("Reception par le Topic d'un UserModel " + LocalDateTime.now());
					log.info("Details: " + user.getUser());

					// Appel BDD
					UserEntity userE = dao.getUser(user);
					if (userE != null) {
						user.setRole(userE.isRole() ? Role.ADMIN : Role.WATCHER);
					} else {
						user.setRole(Role.NONE);
					}
					user.setValidAuth(user.getRole() != Role.NONE);

					// Repond par la Queue
					senderQueue.sendMessage(user);

				}
			} else {
				log.info("Message invalid pour la Queue");
			}
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
