import { set } from "date-fns/fp/set";
import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditUser from "./EditUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Team() {
  const [addUserIsOpen, setAddUserIsOpen] = useState(false);
  const [updateUserIsOpen, setUpdateUserIsOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [addTeamIsOpen, setAddTeamIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [userId, setUserId] = useState(false);
  const apiPrivate = useAxiosPrivate();
  const auth = JSON.parse(localStorage.getItem("Auth"));

  function openAddTeam() {
    setAddTeamIsOpen(true);
  }
  function closeAddTeam() {
    setAddTeamIsOpen(false);
  }

  //Update Modal
  function openUpdateUser(Id) {
    setUpdateUserIsOpen(true);
    setUserId(Id);
  }
  function closeUpdateUser() {
    setUpdateUserIsOpen(false);
  }
  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      apiPrivate.delete(`Users/${id}`);
      toast.success("User deleted successfully!", {
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  useEffect(() => {
    apiPrivate
      .get("Users")
      .then((response) => {
        const data = response.data;
        const updatedData = data.filter(
          (elem) => elem.username !== auth.userName
        );
        setUsers(updatedData);
        console.log(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = users.slice(firstPostIndex, lastPostIndex);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="team">
      <div className="head">
        <h1>Team</h1>
        <button className="add" onClick={openAddTeam}>
          <i className="bx bx-plus-circle"></i>
          New
        </button>
        <AddUser isOpen={addTeamIsOpen} closeModal={closeAddTeam} />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Users"
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="bx bx-search search-icon"></i>
      </div>
      <div className="data">
        <div className="order">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice(firstPostIndex, lastPostIndex)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="row">
                        {auth && auth.role === "Admin" && (
                          <>
                            <button
                              className="edit-button btn"
                              onClick={() => openUpdateUser(user.id)}
                            >
                              <i className="bx bxs-edit-alt"></i>
                            </button>
                            {updateUserIsOpen && user.id === userId && (
                              <EditUser
                                isOpen={updateUserIsOpen}
                                closeModal={closeUpdateUser}
                                userId={userId}
                              />
                            )}
                            <button
                              className="delete-button btn"
                              onClick={() => handleDelete(user.id)}
                            >
                              <i className="bx bxs-trash"></i>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
