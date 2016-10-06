package fr.cpe.ejb.imp;

import javax.ejb.*;

import fr.cpe.ejb.InterfaceEJB;

@Stateless 
public class ImpEJB implements InterfaceEJB{

	@Override
	public String displayString() {
		return "Hello World";
	}
	
}
