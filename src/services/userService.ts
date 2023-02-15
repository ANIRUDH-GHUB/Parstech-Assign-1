import userlist from "./../json/userlist.json";

/**
 * Method to fetch users from server
 * @returns User Object
 */
export const fetchUsers = async () => await userlist;
