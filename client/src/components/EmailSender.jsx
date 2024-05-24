import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function EmailSender() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const validateEmails = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.split(",").every((email) => emailRegex.test(email.trim()));
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setTo("");
    setSubject("");
    setText("");
    setFile("");

    if (!validateEmails(to)) {
      // alert("Invalid email format");
      toast.error("Invalid email format");
      return;
    }

    const formData = new FormData();
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("text", text);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:4001/api/email/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Email sent successfully");
      // alert("Email sent successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email");
      // alert(error.response?.data?.message || "Failed to send email");
    }
  };

  return (
    <>
      <div className="bg-cover bg-[url('/feature.jpg')] bg-center bg-no-repeat h-full w-full">
        <div
          className="lg:flex lg:items-center lg:justify-between"
          style={{
            margin: "1em",
            backgroundColor: "#1E293B",
            borderRadius: ".5em",
            height: "5em",
          }}
        >
          <div className="min-w-0 flex-1">
            <h2
              className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
              style={{ color: "white", paddingLeft: "1em" }}
            >
              Send Mail
            </h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3" style={{ paddingRight: "2em" }}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Link to="/logout">Logout</Link>
              </button>
            </span>
          </div>
        </div>
        <div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Send Mail to Multiple Recipients
            </h1>
            <b>
              {" "}
              <p className="mt-6 text-lg leading-8 text-gray-600">
                When entering every email into the address, give the comma
                quatation when entering every email.
              </p>
            </b>
          </div>
        </div>
        <div
          style={{
            border: "1px solid grey",
            borderRadius: ".5em",
            backgroundColor: "#D5DEE3",
            padding: "3em 5em",
            margin: "1em 10em",
          }}
        >
          <form onSubmit={handleSendEmail}>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                To address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="comma-separated emails"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subject
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Message"
                  required
                  rows={10}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            <div style={{ margin: "1em 0" }}>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default EmailSender;
