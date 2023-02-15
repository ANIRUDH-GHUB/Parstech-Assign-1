import React from "react";
import { USER } from "../../model/interface";
import { fetchUsers } from "../../services/userService";
import ResultCard from "./../resultcard/resultcard";

interface ResultListProps {
  text: string;
}
const Resultlist: React.FC<ResultListProps> = (props) => {
  const { text } = props;
  const [users, setUsers] = React.useState<USER[]>();

  /**
   * Get Userlist on Component Mount
   */
  React.useEffect(() => {
    const getUsers = async () => {
      const res = await fetchUsers();
      setUsers(res);
    };
    getUsers();
  }, []);

  return (
    <div className="card-list">
      <ul>
        {users?.map((user) => (
          <ResultCard key={user.id} user={user} text={text} />
        ))}
      </ul>
    </div>
  );
};

export default Resultlist;
