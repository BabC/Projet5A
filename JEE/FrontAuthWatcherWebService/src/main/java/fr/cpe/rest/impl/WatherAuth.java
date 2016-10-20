package fr.cpe.rest.impl;

import javax.inject.Inject;

import fr.cpe.model.UserModel;
import fr.cpe.rest.IWatcherAuth;
import fr.cpe.services.IMessageReceiverQueue;
import fr.cpe.services.IMessageSenderTopic;

public class WatherAuth implements IWatcherAuth {

	@Inject
	IMessageSenderTopic messageSender;
	@Inject
	IMessageReceiverQueue receiverQueue;

	@Override
	public String doPost(UserModel user) {
		messageSender.sendMessage(user);
		return receiverQueue.receiveMessage().toJSON();
	}

	@Override
	public String doGet() {
		return "Hello GET";
	}

}
