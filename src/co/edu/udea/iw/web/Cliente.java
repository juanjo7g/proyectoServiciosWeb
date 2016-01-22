package co.edu.udea.iw.web;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import co.edu.udea.iw.bl.ClienteBL;
import co.edu.udea.iw.bl.UsuarioBL;
import co.edu.udea.iw.exception.MyException;
import co.edu.udea.iw.web.dto.ClienteWS;

@Component
@Path("Cliente")
public class Cliente {

	@Autowired
	ClienteBL clienteBL;

	// @GET
	@POST // No funciona en el navegador, pero es la forma correcta
	@Produces(MediaType.TEXT_PLAIN)
	public String crearCliente(@QueryParam("cedula") String cedula, @QueryParam("nombres") String nombres,
			@QueryParam("apellidos") String apellidos, @QueryParam("email") String email,
			@QueryParam("usuarioCrea") String usuarioCrea) {
		try {
			clienteBL.guardar(cedula, nombres, apellidos, email, usuarioCrea);
		} catch (MyException e) {
			return e.getMessage();
		}
		return "Cliente creado correctamente";
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ClienteWS> crearCliente() {

		List<ClienteWS> lista = new ArrayList<>();
		try {
			for (co.edu.udea.iw.dto.Cliente cliente : clienteBL.listarClientes()) {
				ClienteWS clienteWS = new ClienteWS();
				clienteWS.setCedula(cliente.getCedula());
				clienteWS.setNombres(cliente.getNombres());
				clienteWS.setApellidos(cliente.getApellidos());
				clienteWS.setEmail(cliente.getEmail());
				lista.add(clienteWS);
			}
		} catch (MyException e) {
			return null;
		}
		return lista;
	}
}
