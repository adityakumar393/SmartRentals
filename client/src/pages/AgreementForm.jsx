import React, { useState } from "react";
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

const AgreementForm = () => {
  const [form, setForm] = useState({ tenant: "", landlord: "", terms: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/agreements", form);
    alert("Agreement submitted");
  };

  const MyPDF = () => (
    <Document>
      <Page>
        <Text>Rental Agreement</Text>
        <Text>Tenant: {form.tenant}</Text>
        <Text>Landlord: {form.landlord}</Text>
        <Text>Terms: {form.terms}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="p-4">
      <input name="tenant" placeholder="Tenant Name" onChange={handleChange} />
      <input name="landlord" placeholder="Landlord Name" onChange={handleChange} />
      <textarea name="terms" placeholder="Terms" onChange={handleChange}></textarea>
      <button onClick={handleSubmit}>Submit</button>
      <PDFDownloadLink document={<MyPDF />} fileName="rental_agreement.pdf">
        {({ loading }) => (loading ? "Loading..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default AgreementForm;
