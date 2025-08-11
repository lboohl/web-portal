// src/pages/AssetRequestPage.jsx
import AssetRequestForm from "../components/AssetRequestForm";
import FormLayout from "../components/FormLayout";
import jsPDF from "jspdf";

export default function AssetRequestPage() {
  const handleSubmit = async (payload) => {
    console.log("Form submitted:", payload);
    
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [210, 148.5] // Custom size: A4 width, 50% A4 height
    });
    const logo = "/netl-logo-800.png"; // From public folder
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      // Header
      doc.addImage(img, 'PNG', 14, 12, 40, 10);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("10F ONE TRIUM TOWER Pacific", 140, 15);
      doc.text("Rim Alabang, Muntinlupa City", 140, 20);

      // Title
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Asset Request Form", 105, 40, { align: "center" });

      // Body
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const bodyText = `This letter is to formally request the following asset: a ${payload.assetType} (Quantity: ${payload.quantity}). This is requested by ${payload.name} from the ${payload.department} department.

The justification for this request is as follows:
${payload.justification}

The required asset specifications are:
${payload.description}

This request has a priority level of ${payload.priority} and has been approved by ${payload.managerName} (${payload.managerEmail}).

For any clarifications, the requester can be contacted at ${payload.email} or ${payload.phone || 'N/A'}.
`;
      const splitText = doc.splitTextToSize(bodyText, 180);
      doc.text(splitText, 14, 60);

      // Footer
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setLineWidth(0.5);
      doc.line(14, pageHeight - 25, 80, pageHeight - 25); // Employee Signature line
      doc.line(130, pageHeight - 25, 196, pageHeight - 25); // Team Leader Signature line
      doc.setFontSize(10);
      doc.text("Employee Signature", 35, pageHeight - 18);
      doc.text("Team Leader Signature", 148, pageHeight - 18);

      doc.save(`asset-request-${payload.name.replace(/\s/g, '_')}-${new Date().toISOString().slice(0,10)}.pdf`);
    };
  };

  return (
    <FormLayout>
      <main className="p-8 flex justify-center">
        <AssetRequestForm onSubmit={handleSubmit} />
      </main>
    </FormLayout>
  );
}
