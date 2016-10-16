package fr.cpe.services.impl;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.jboss.logging.Logger;

import fr.cpe.model.UserEntity;
import fr.cpe.model.UserModel;
import fr.cpe.services.IUserDAO;

@Stateless
public class UserDAO implements IUserDAO {

	Logger log = Logger.getLogger(UserDAO.class);

	@PersistenceContext
	EntityManager em;

	private final String qry = "SELECT u FROM UserEntity u WHERE u.login=:login AND u.password=:password";

	@Override
	public UserEntity getUser(UserModel userM) {
		UserEntity userE = null;
		try {
			userE = (UserEntity) em.createQuery(qry).setParameter("login", userM.getUser())
					.setParameter("password", userM.getPassword()).getSingleResult();
		} catch (NoResultException e) {
			//e.printStackTrace();
		}

		return userE;
	}
}
