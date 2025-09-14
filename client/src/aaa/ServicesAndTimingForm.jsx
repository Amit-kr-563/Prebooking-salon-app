import React, { useState } from "react";

const ServicesAndTimingForm = ({ formData, setFormData, onNext, onBack }) => {
  const [services, setServices] = useState([
    { name: "", price: "", duration: "" },
  ]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [notes, setNotes] = useState("");

  const serviceOptions = [
    "Haircut",
    "Facial",
    "Shaving",
    "Hair Color",
    "Spa",
    "Makeup",
    "Threading",
    "Bleach",
    "Body Massage",
    "Manicure",
    "Pedicure",
  ];

  const timeOptions = [
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const handleAddService = () => {
    setServices([...services, { name: "", price: "", duration: "" }]);
  };

  const handleRemoveService = (index) => {
    if (services.length === 1) return;
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const toggleWorkingDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stepData = {
      services,
      openingTime,
      closingTime,
      workingDays,
      notes,
    };

    const updatedData = {
      ...formData,
      servicesAndTiming: stepData,
    };

    setFormData(updatedData);
    console.log(" All Form Data So Far:", updatedData);

    onNext();
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center text-teal-600">
        Step 3: Services & Timings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-4 rounded-lg shadow-md max-w-7xl mx-auto mt-10"
      >
        {services.map((service, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4 ">
            <select
              value={service.name}
              onChange={(e) =>
                handleServiceChange(index, "name", e.target.value)
              }
              className="p-2 border rounded "
              required
            >
              <option value="">Select Service</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price ₹"
              value={service.price}
              onChange={(e) =>
                handleServiceChange(index, "price", e.target.value)
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g. 30min)"
              value={service.duration}
              onChange={(e) =>
                handleServiceChange(index, "duration", e.target.value)
              }
              className="p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveService(index)}
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-start mb-4">
          <button
            type="button"
            onClick={handleAddService}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
          >
            Add Another Service
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 overflow-visible">
          <div>
            <label className="block mb-1 font-bold">Opening Time:</label>
            <select
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Select Opening Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-bold">Closing Time:</label>
            <select
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Select Closing Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Select Working Days:</label>
          <div className="flex flex-wrap gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <button
                type="button"
                key={day}
                className={`px-3 py-1 rounded border ${
                  workingDays.includes(day)
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleWorkingDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-1">
            Additional Notes (Optional):
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special instructions, offers, holidays etc."
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>

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
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default ServicesAndTimingForm;
