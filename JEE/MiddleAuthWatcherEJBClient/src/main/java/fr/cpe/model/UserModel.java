package fr.cpe.model;

import java.io.Serializable;

import org.jboss.logging.Logger;

public class UserModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1507094490012374267L;

	private String user;
	private String password;
	private Role role;
	private String name;
	private String surname;
	private boolean validAuth;

	Logger log = Logger.getLogger(UserModel.class);

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public boolean isValidAuth() {
		return validAuth;
	}

	public void setValidAuth(boolean validAuth) {
		this.validAuth = validAuth;
	}

	public void showUser() {
		log.info("User : " + user + " " + password);

		// return this;
	}

	public String toJSON() {
		return "{\"user\":\"" + user + "\"," +
				 "\"validAuth\":\"" + validAuth + "\","+
				"\"role\":\"" + role +"\"}";
	}

}
