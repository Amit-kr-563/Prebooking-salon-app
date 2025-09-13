
import React, { useState } from "react";

const BankDetailsForm = ({ formData, setFormData, onBack, onNext }) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      accountHolder,
      accountNumber,
      ifsc,
      upiId,
      bankName,
      passbookPhoto,
    } = formData;
 console.log(" All Form Data So Far:", formData);
    if (!accountHolder || !accountNumber || !ifsc || !upiId || !bankName || !passbookPhoto) {
      setError(" All fields are required.");
      return;
    }

    setError("");
    onNext(); // final submit handled in parent
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded ">
      <h2 className="text-2xl text-center text-teal-600 font-bold mb-4">Step 5: Bank Details</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <label className="block mb-2">
        Account Holder Name:
        <input
          type="text"
          name="accountHolder"
          value={formData.accountHolder || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-2">
        Account Number:
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-2">
        IFSC Code:
        <input
          type="text"
          name="ifsc"
          value={formData.ifsc || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-2">
        UPI ID:
        <input
          type="text"
          name="upiId"
          value={formData.upiId || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-2">
        Bank Name:
        <input
          type="text"
          name="bankName"
          value={formData.bankName || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-4">
        Upload Passbook Photo:
        <input
          type="file"
          name="passbookPhoto"
          accept="image/*"
          onChange={handleChange}
          className="block mt-1"
        />
      </label>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
        >
           Back
        </button>

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BankDetailsForm;  
