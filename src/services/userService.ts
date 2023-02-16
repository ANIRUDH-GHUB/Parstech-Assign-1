const userSVC = "http://www.mocky.io/v2/5ba8efb23100007200c2750c";

/**
 * Method to fetch users from server
 * @returns User Object
 */
export const fetchUsers = async () =>
  await fetch(userSVC)
    .then((res) => res.json())
    .then((data) => data);
