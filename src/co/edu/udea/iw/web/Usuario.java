package co.edu.udea.iw.web;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import co.edu.udea.iw.bl.UsuarioBL;
import co.edu.udea.iw.exception.MyException;

@Component
@Path("Usuario")
public class Usuario {

	@Autowired
	UsuarioBL usuarioBL;
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String autenticar(@QueryParam("login") String login, @QueryParam("password") String password) {
		try{
			if(!usuarioBL.validar(login, password)){
				return "No valido";
			}
			
		}catch(MyException e){
			return e.getMessage();
		}
		return "Valido";
	}
}
