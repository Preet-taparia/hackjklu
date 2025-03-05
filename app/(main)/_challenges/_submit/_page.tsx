"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FormData {
  teamName: string;
  teamLeaderName: string;
  collegeName: string;
  teamNumber: string;
  problemNumber: string;
  category: string;
}

interface FormErrors {
  teamName?: string;
  teamLeaderName?: string;
  collegeName?: string;
  teamNumber?: string;
  problemNumber?: string;
  category?: string;
}

const sanitizeInput = (input: string) => input.trim();

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex flex-col space-y-4", className)}>{children}</div>;

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeaderName: "",
    collegeName: "",
    teamNumber: "",
    problemNumber: "",
    category: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    validateField(id as keyof FormData, value);
  };

  const validateField = (field: keyof FormData, value: string) => {
    const fieldErrors: FormErrors = { ...errors };

    fieldErrors[field] = value.trim() ? "" : `${field} is required`;

    setErrors(fieldErrors);
  };

  const validateForm = () => {
    let valid = true;
    const updatedErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (value.trim() === "") {
        updatedErrors[key as keyof FormData] = `${key} is required`;
        valid = false;
      }
    });

    setErrors(updatedErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("Submitting...");

    const sanitizedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, sanitizeInput(value)])
    );

    try {
      const response = await fetch("/api/submit-team-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("Form submitted!");
      } else {
        setFormStatus(data.message || "Error submitting the form");
      }
    } catch {
      setFormStatus("Network error. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="mx-auto rounded-lg p-6 shadow-lg flex flex-col gap-6">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {[
            { id: "teamName", placeholder: "Team Name" },
            { id: "teamLeaderName", placeholder: "Team Leader Name" },
            { id: "collegeName", placeholder: "College Name" },
            { id: "teamNumber", placeholder: "Team Number" },
            { id: "problemNumber", placeholder: "Problem Number" },
          ].map(({ id, placeholder }) => (
            <LabelInputContainer key={id}>
              <input
                id={id}
                value={formData[id as keyof FormData]}
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                required
                className="border-2 border-[#1f54fb] focus:border-transparent bg-transparent focus:ring-4 focus:ring-gradient-focus focus:outline-none p-3 rounded-md text-lg text-white w-full"
              />
            </LabelInputContainer>
          ))}

<LabelInputContainer>
            <select
              id="designation"
              value={formData.category  }
              onChange={handleChange}
              className="border-2 border-[#1f54fb] focus:border-transparent focus:ring-4 focus:ring-gradient-focus focus:outline-none bg-transparent px-4 py-2 text-lg text-white shadow-md rounded-md w-full"
              required
            >
              <option value="" disabled className="text-black bg-white">
                Select Designation
              </option>
              <option value="student" className="text-black bg-white">
                Student
              </option>
              <option value="software-engineer" className="text-black bg-white">
                Software Engineer
              </option>
              <option value="other" className="text-black bg-white">
                Other
              </option>
            </select>
          </LabelInputContainer>

          <div className="md:col-span-2 mt-2">
            <button
              className="block w-full text-white rounded-md h-12 font-medium bg-gradient-to-br from-[#0BFB00] to-[#1f54fb] text-lg"
              type="submit"
              disabled={formStatus === "Submitting..."}
            >
              {formStatus || "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
