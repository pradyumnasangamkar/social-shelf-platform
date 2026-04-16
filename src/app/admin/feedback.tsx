"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import mongoose from "mongoose";

interface Feedback {
  _id?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  phoneno: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FeedbackProps {
  feedbackArray: Feedback[];
}

export default function Feedback({ feedbackArray }: FeedbackProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Feedbacks
      </h1>
      <div className="rounded-lg shadow">
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone No</TableHead>
                {/* <TableHead>Stock</TableHead> */}
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackArray.map((feed) => (
                <TableRow key={feed._id?.toString()}>
                  <TableCell>{feed.fullname}</TableCell>
                  <TableCell>{feed.email}</TableCell>
                  <TableCell>{feed.phoneno}</TableCell>
                  <TableCell>{feed.message}</TableCell>
                  <TableCell>{feed.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
