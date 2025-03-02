"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import themes from "@/data/themes.json";

interface FormData {
  name: string;
  email: string;
  phone: string;
  designation: string;
  organization: string;
  theme: string;
  problem: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  designation?: string;
  organization?: string;
  theme?: string;
  problem?: string;
  description?: string;
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
    name: "",
    email: "",
    phone: "",
    designation: "",
    organization: "",
    theme: "",
    problem: "",
    description: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    validateField(id as keyof FormData, value);
  };

  const validateField = (field: keyof FormData, value: string) => {
    const fieldErrors: FormErrors = { ...errors };

    switch (field) {
      case "name":
        fieldErrors.name = value.trim() ? "" : "Name is required";
        break;
      case "email":
        fieldErrors.email = value.trim()
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Please enter a valid email"
          : "Email is required";
        break;
      case "phone":
        fieldErrors.phone = value.trim()
          ? /^[0-9]{10}$/.test(value)
            ? ""
            : "Please enter a valid phone number (10 digits)"
          : "Phone number is required";
        break;
      case "designation":
        fieldErrors.designation = value ? "" : "Designation is required";
        break;
      case "organization":
        fieldErrors.organization = value.trim() ? "" : "Organization is required";
        break;
      case "theme":
        fieldErrors.theme = value ? "" : "Please select a theme";
        break;
      case "problem":
        fieldErrors.problem = value.trim() ? "" : "Problem description is required";
        break;
      case "description":
        fieldErrors.description = value.trim() ? "" : "Description is required";
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  const validateForm = () => {
    let valid = true;
    const updatedErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      validateField(key as keyof FormData, value);
      if (value.trim() === "") valid = false;
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

    const sanitizedFormData = {
      ...formData,
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      designation: sanitizeInput(formData.designation),
      organization: sanitizeInput(formData.organization),
      theme: sanitizeInput(formData.theme),
      problem: sanitizeInput(formData.problem),
      description: sanitizeInput(formData.description),
    };

    try {
      const response = await fetch("/api/submit-form", {
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
      {/* Form Container */}
      <div className="mx-auto rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-6">
        <div className="">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            {[
              { id: "name", type: "text", placeholder: "Your Name" },
              { id: "email", type: "email", placeholder: "your@mail.com" },
              { id: "phone", type: "tel", placeholder: "Your Number" },
              { id: "organization", type: "text", placeholder: "Your Organization" },
              { id: "problem", type: "text", placeholder: "Describe Your Problem", isFullRow: true },
            ].map(({ id, type, placeholder, isFullRow }) => (
              <LabelInputContainer className={isFullRow ? "md:col-span-2" : ""} key={id}>
                <input
                  id={id}
                  value={formData[id as keyof FormData]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  type={type}
                  required
                  className="border-2 border-[#1f54fb] focus:border-transparent bg-transparent focus:ring-4 focus:ring-gradient-focus focus:outline-none p-3 rounded-md text-lg text-white w-full"
                />
              </LabelInputContainer>
            ))}

            <LabelInputContainer>
              <select
                id="designation"
                value={formData.designation}
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

            <LabelInputContainer>
              <select
                id="theme"
                value={formData.theme}
                onChange={handleChange}
                className="border-2 border-[#1f54fb] focus:border-transparent focus:ring-4 focus:ring-gradient-focus focus:outline-none bg-transparent px-4 py-2 text-lg text-white shadow-md rounded-md w-full"
                required
              >
                <option value="" disabled className="text-black bg-white">
                  Select Theme
                </option>
                {themes.map((theme, index) => (
                  <option key={index} value={theme.title.toLowerCase()} className="text-black bg-white">
                    {theme.title}
                  </option>
                ))}
              </select>
            </LabelInputContainer>

            <LabelInputContainer className="md:col-span-2">
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description here"
                className="border-2 border-[#1f54fb] focus:border-transparent focus:ring-4 focus:ring-gradient-focus focus:outline-none bg-transparent px-4 py-2 text-lg text-white shadow-md rounded-md w-full h-28"
                required
              />
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
      </div>
    </section>
  );
}
