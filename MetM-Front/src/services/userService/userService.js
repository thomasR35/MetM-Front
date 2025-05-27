//src/services/userService/userService.js
//=====================================
import axios from "@/api/axiosConfig";

export async function getUsers() {
  const { data } = await axios.get("/users");
  return data; // [{ id, name, email, role, ... }, …]
}

export async function createUser({ username, email, password, role }) {
  // mapping username → name
  const payload = { name: username, email, password, role };
  const { data } = await axios.post("/users", payload);
  return data; // l'utilisateur créé, avec son id retourné par le back
}

export async function updateUser(id, { username, email, role }) {
  const payload = { name: username, email, role };
  const { data } = await axios.put(`/users/${id}`, payload);
  return data; // l'objet mis à jour
}

export async function deleteUser(id) {
  await axios.delete(`/users/${id}`);
  return true;
}
