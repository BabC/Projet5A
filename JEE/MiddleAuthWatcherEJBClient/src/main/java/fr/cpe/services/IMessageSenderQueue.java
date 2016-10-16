package fr.cpe.services;

import javax.ejb.Local;

import fr.cpe.model.UserModel;

@Local
public interface IMessageSenderQueue {

	void sendMessage(String user);
	void sendMessage(UserModel user);
}
