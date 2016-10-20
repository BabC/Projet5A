package fr.cpe.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import fr.cpe.model.UserModel;

@Path("/WatchAuth")
public interface IWatcherAuth {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String doPost(UserModel user);
/*
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void sendUserToTopic(UserModel user);
	*/
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public String doGet();
}
