package fr.cpe.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
// @NamedQuery(name = "User.list", query = "select u from users u")
public class UserEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2492401250850569593L;

	@Id
	@Column
	private String login;
	@Column
	private String password;
	@Column
	private String name;
	@Column
	private String surname;
	@Column
	private boolean role;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public boolean isRole() {
		return role;
	}

	public void setRole(boolean role) {
		this.role = role;
	}

}
