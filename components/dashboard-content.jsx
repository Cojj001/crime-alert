"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/components/auth-provider";

export default function DashboardContent() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedReports = [];
      querySnapshot.forEach((doc) => {
        fetchedReports.push({ id: doc.id, ...doc.data() });
      });
      setReports(fetchedReports);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.crimeType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="py-60 flex-col space-y-2">
        <div>
          <div className="text-center  text-pretty text-xl">
            Please log in to view the dashboard.
          </div>
          <Link className="" href={`/login`}>
            <Button variant="default" size="sm">
              Go to Police Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Crime Reports Dashboard</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.crimeType}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>
                {new Date(report.createdAt.seconds * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/${report.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
