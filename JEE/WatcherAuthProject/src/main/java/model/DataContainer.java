package model;

import javax.ejb.Stateless;
import javax.inject.Inject;

import fr.cpe.model.Role;
import fr.cpe.model.UserEntity;
import fr.cpe.model.UserModel;
import fr.cpe.services.IUserDAO;

@Stateless
public class DataContainer {

	@Inject
	IUserDAO dao;

	public UserModel user;

	public Role checkUser(UserModel user) {
		// appel BDD
		UserEntity userE = dao.getUser(user);

		if (userE != null) {
			return userE.isRole() ? Role.ADMIN : Role.WATCHER;
		}
		return Role.NONE;
	}
}
