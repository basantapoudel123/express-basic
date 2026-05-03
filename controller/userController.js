import { usersList } from "../model/userModel.js";

export function handleUsers(req, res) {
    const userData = usersList();
    console.log("User Data:", userData);
    res.render("users", { users: userData });
}