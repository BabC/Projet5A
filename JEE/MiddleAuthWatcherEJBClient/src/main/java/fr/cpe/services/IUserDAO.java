package fr.cpe.services;

import javax.ejb.Local;

import fr.cpe.model.UserEntity;
import fr.cpe.model.UserModel;

@Local
public interface IUserDAO {
	public UserEntity getUser(UserModel userM);

}
