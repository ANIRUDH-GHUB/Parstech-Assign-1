import React, { useCallback } from "react";
import { USER } from "../../model/interface";
import { fetchUsers } from "../../services/userService";
import ResultCard from "./../resultcard/resultcard";
import "./resultlist.scss";

interface ResultListProps {
  text: string;
  pos: number;
  setPos: Function;
  listener: string;
  setListener: Function;
}
const Resultlist: React.FC<ResultListProps> = (props) => {
  const { text, pos, setPos, listener, setListener } = props;
  const [users, setUsers] = React.useState<USER[]>();
  const [filteredUsers, setFilteredUsers] = React.useState<USER[]>();

  /**
   * Function to find if search text is present in user object
   * @param user USER Object
   * @param text search query
   * @returns boolean
   */
  const isValidSearch = (user: USER, text: string) => {
    return (
      user.id.toLowerCase().includes(text.toLowerCase()) ||
      user.name.toLowerCase().includes(text.toLowerCase()) ||
      user.address.toLowerCase().includes(text.toLowerCase()) ||
      user.pincode.toLowerCase().includes(text.toLowerCase()) ||
      user.items.some((item) => item.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const isActive = (ind: number) => pos === ind;

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

  /**
   * Effect to get the Filtered users based on search query
   */
  React.useEffect(() => {
    setFilteredUsers(() => users?.filter((user) => isValidSearch(user, text)));
  }, [text]);

  /**
   * Effect to reset the active position on boundaries
   */
  React.useEffect(() => {
    if (filteredUsers && pos > filteredUsers?.length - 1) {
      setPos(filteredUsers?.length - 1);
    }
    if (pos < 0) {
      setPos(-1);
    }
    const ele = document.querySelector(".active") as HTMLElement;
    console.log(listener);
    if (listener === "keyboard")
      ele?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [pos]);

  return (
    <div className="card-container">
      <ul className="card-list">
        {filteredUsers?.map((user, index) => (
          <ResultCard
            key={user.id}
            user={user}
            text={text}
            active={isActive(index)}
            setPos={() => {
              setPos(index);
              setListener("mouse");
            }}
          />
        ))}
        {filteredUsers?.length === 0 && (
          <div className="card-item">
            <h4>No Results</h4>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Resultlist;
