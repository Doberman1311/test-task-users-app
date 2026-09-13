import { useState, useEffect } from "react";
import { getUsers, updateUser, deleteUser } from "../api/users";
import type { IUser } from "../types/user";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import type { ICreateUser } from "../types/user";
import { createUser } from "../api/users";

function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState<ICreateUser | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const userData = await getUsers();
      setUsers(userData);
    }

    loadUsers();
  }, []);

  useEffect(() => {
    if (!notification) return;

    const timerDeleteMsg = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => {
      clearTimeout(timerDeleteMsg);
    };
  }, [notification]);

  async function handleCreateUser(userData: ICreateUser) {
    const newUser = await createUser(userData);

    const userForList = {
      id: newUser.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      address: {
        street: "",
        suite: "",
        city: userData.city,
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      company: {
        name: userData.company,
        catchPhrase: "",
        bs: "",
      },
    };
    setUsers((prev) => [...prev, userForList]);
    setShowForm(false);
    setNotification("User created successfully");
  }

  async function handleEditUser(userId: number) {
    const findUser = users.find((element) => {
      return element.id === userId;
    });

    setEditUserId(userId);

    if (!findUser) return;

    setEditUserData({
      name: findUser.name,
      username: findUser.username,
      email: findUser.email,
      phone: findUser.phone,
      website: findUser.website,
      city: findUser.address.city,
      company: findUser.company.name,
    });
  }

  async function handleUpdateUser(userData: ICreateUser) {
    if (editUserId === null) return;

    await updateUser(editUserId, userData);

    const updatedUser = {
      id: editUserId,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      address: {
        street: "",
        suite: "",
        city: userData.city,
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      company: {
        name: userData.company,
        catchPhrase: "",
        bs: "",
      },
    };

    const resultUpdateUser = users.map((user) => {
      if (user.id === editUserId) {
        return updatedUser;
      } else {
        return user;
      }
    });

    setUsers(resultUpdateUser);
    setNotification("User updated successfully");
    setEditUserData(null);
    setEditUserId(null);
  }

  async function handleDeleteUser(userId: number) {
    await deleteUser(userId);

    const checkUserDel = users.filter((user) => {
      return user.id !== userId;
    });

    setUsers(checkUserDel);
    setNotification("User deleted successfully");
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Users Page</h1>
      <button
        className="mb-6 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        {showForm ? "Close form" : "Create user"}
      </button>

      <div className="mb-8">
        {showForm && <UserForm onSubmit={handleCreateUser} />}
        {editUserData && (
          <UserForm initialData={editUserData} onSubmit={handleUpdateUser} />
        )}
      </div>
      {notification && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          {notification}
        </div>
      )}
      <hr className="mb-6 border-gray-300" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((element) => {
        return (
          <UserCard
            key={element.id}
            user={element}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        );
      })}
      </div>
    </div>
  );
}

export default UsersPage;
