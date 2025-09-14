import React, { useState } from "react";
import OwnerInfoForm from "./OwnerInfoForm";
import OwnerAuthStep from "./OwnerAuthStep";
import SalonInfoForm from "./SalonInfoForm";
import ServicesAndTimingForm from "./ServicesAndTimingForm";
import BankDetailsForm from "./BankDetailsForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalonRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = async () => {
    try {
      const fullForm = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          fullForm.append(key, JSON.stringify(value));
        } else {
          fullForm.append(key, value);
        }
      });

      const response = await axios.post(
        "http://localhost:5000/api/register/shop",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/login");
      alert(" Registration Successful!");
    } catch (err) {
      alert(" Registration Failed.", err.message);
      console.error(err);
    }
  };

  return (
    <>
      {step === 1 && (
        <OwnerAuthStep
          onNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <OwnerInfoForm
          onNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <SalonInfoForm
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <ServicesAndTimingForm
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 5 && (
        <BankDetailsForm
          onNext={handleFinalSubmit}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default SalonRegistration;
