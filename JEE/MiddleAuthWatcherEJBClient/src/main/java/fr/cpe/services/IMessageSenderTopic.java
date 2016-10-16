package fr.cpe.services;

import javax.ejb.Local;

import fr.cpe.model.UserModel;

@Local
public interface IMessageSenderTopic {

	public void sendMessage(String message);
	public void sendMessage(UserModel user);


}
