"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import  Button  from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth-provider";

export default function ReportDetail({ id }) {
  const [report, setReport] = useState(null);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchReport = async () => {
      const docRef = doc(db, "reports", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReport({ id: docSnap.id, ...docSnap.data() });
      } else {
        toast({
          title: "Error",
          description: "Report not found",
          variant: "destructive",
        });
        router.push("/dashboard");
      }
    };

    fetchReport();
  }, [id, router, toast, user]);

  const handleStatusChange = async (newStatus) => {
    if (!report) return;

    try {
      await updateDoc(doc(db, "reports", report.id), { status: newStatus });
      setReport({ ...report, status: newStatus });
      toast({
        title: "Success",
        description: "Report status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <div>Please log in to view report details.</div>;
  }

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{report.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{report.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Crime Type</h3>
            <p>{report.crimeType}</p>
          </div>
          <div>
            <h3 className="font-semibold">Suspect Description</h3>
            <p>{report.suspectDescription || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date Reported</h3>
            <p>{new Date(report.createdAt.seconds * 1000).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <Select
              defaultValue={report.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
