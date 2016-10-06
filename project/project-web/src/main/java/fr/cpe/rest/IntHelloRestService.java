package fr.cpe.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/hello")
public interface IntHelloRestService {

	@GET
	@Produces("text/plain")
	@Path("/")
	public String hello();
}
