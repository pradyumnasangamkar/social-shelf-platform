"use client";
import mongoose from "mongoose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import classNames from "classnames";

interface User {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  role: string;
}

interface UserProps {
  usersArray: User[];
}

export default function Users({ usersArray }: UserProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Book Management
      </h1>
      <div className="rounded-lg shadow">
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name of User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersArray.map((user) => (
                <TableRow key={user.fullname}>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={classNames(
                        "px-2 py-1 rounded-full text-sm font-medium",
                        {
                          "bg-green-100 text-green-800":
                            user.role === "student",
                          "bg-blue-100 text-blue-800":
                            user.role === "volunteer",
                        }
                      )}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
