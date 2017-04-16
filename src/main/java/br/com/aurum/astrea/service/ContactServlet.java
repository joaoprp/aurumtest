package br.com.aurum.astrea.service;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.aurum.astrea.dao.ContactDao;

@SuppressWarnings("serial")
public class ContactServlet extends HttpServlet {

	private static final ContactDao DAO = new ContactDao();

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		BufferedReader reader = req.getReader();
		Gson gson = new Gson();

		Contact c = gson.fromJson(reader, Contact.class);

		DAO.save(c);

		resp.setStatus(200);
		resp.setContentType("application/json");
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		Gson gson = new Gson();
		String id = req.getParameter("id");
		String json;

		if (id != null && !id.isEmpty()) {
			json = gson.toJson(DAO.get(Long.parseLong(id)));
		} else {
			json = gson.toJson(DAO.list());
		}

		resp.setStatus(200);
		resp.setContentType("application/json");

	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		DAO.delete(Long.parseLong(req.getParameter("id")));

		resp.setStatus(200);
		resp.setContentType("application/json");
	}
}
