package fr.cpe.rest.impl;

import java.util.logging.Logger;

import javax.inject.Inject;

import fr.cpe.ejb.imp.ImpEJB;
import fr.cpe.rest.IntHelloRestService;

public class HelloRestService implements IntHelloRestService{

	Logger log = Logger.getLogger(HelloRestService.class.getName());

	@Inject
	ImpEJB impEjb;
	
	@Override
	public String hello() {
		log.info("INTO HelloRestService");
		return impEjb.displayString();
	}
	
	
}
