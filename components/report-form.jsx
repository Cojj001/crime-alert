"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    crimeType: "",
    suspectDescription: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();
  const { addToast } = useToast();

  const validateForm = () => {
    const errors = {};
    if (!formData.title) {
      errors.title = "Title is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await addDoc(collection(db, "reports"), {
        ...formData,
        createdAt: new Date(),
        status: "Open",
      });
      // console.log("Report successfully added:", formData);
      addToast({
        title: "Success",
        description: "Your report has been submitted",
        variant: "success",
      });
      router.push("/");
    } catch (error) {
      // console.error("Error submitting report to Firestore:", error);
      addToast({
        title: "Error",
        description: "There was an error submitting your report",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Report a Crime</CardTitle>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={formErrors.title ? "border-red-500" : ""}
              />
              {formErrors.title && (
                <p className="text-red-500 text-sm">{formErrors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={formErrors.description ? "border-red-500" : ""}
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm">{formErrors.description}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="crimeType" className="text-sm font-medium">
                Type of Crime
              </label>
              <Select
                name="crimeType"
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, crimeType: value }))
                }
              >
                <SelectTrigger
                  className={formErrors.crimeType ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select crime type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="assault">Assault</SelectItem>
                  <SelectItem value="vandalism">Vandalism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.crimeType && (
                <p className="text-red-500 text-sm">{formErrors.crimeType}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="suspectDescription"
                className="text-sm font-medium"
              >
                Suspect Description (optional)
              </label>
              <Textarea
                id="suspectDescription"
                name="suspectDescription"
                value={formData.suspectDescription}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Submit Report
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
