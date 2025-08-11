import React, { useMemo, useState } from "react";

/**
 * AssetRequestForm.jsx
 *
 * Drop-in React + Tailwind component for an internal Asset Request form.
 * - No external deps
 * - Accessible labels, keyboard-friendly
 * - Client-side validation with inline errors
 * - File upload with size/type checks and removable chips
 * - Works in light/dark (inherits your project's theme)
 *
 * Usage:
 * <AssetRequestForm onSubmit={async (payload) => { await api.createRequest(payload); }} />
 */

const DEFAULT_DEPARTMENTS = [
  "IT",
  "HR",
  "Finance",
  "Marketing",
  "Operations",
  "Sales",
  "Others",
];

const DEFAULT_ASSET_TYPES = [
  "Laptop",
  "Desktop",
  "Monitor",
  "Mobile Phone",
  "Tablet",
  "Headset",
  "Office Furniture",
  "Others",
];

const DEFAULT_PRIORITIES = ["Low", "Medium", "High", "Urgent"];

const MAX_FILE_MB = 10;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

function readableFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB"]; // 10MB max anyway
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(1)} ${units[i]}`;
}

export default function AssetRequestForm({
  onSubmit,
  departments = DEFAULT_DEPARTMENTS,
  assetTypes = DEFAULT_ASSET_TYPES,
  priorities = DEFAULT_PRIORITIES,
  className,
  title = "Asset Request Form",
  accent = "ring-blue-500 focus:ring-blue-500",
}) {
  const [form, setForm] = useState({
    name: "",
    department: departments[0] || "",
    email: "",
    phone: "",
    assetType: assetTypes[0] || "",
    description: "",
    quantity: 1,
    justification: "",
    priority: priorities[1] || "Medium",
    managerName: "",
    managerEmail: "",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState(null); // success | error | null

  const totalSize = useMemo(() => files.reduce((sum, f) => sum + f.size, 0), [files]);

  function update(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function validate() {
    const e = {};

    if (!form.name?.trim()) e.name = "Full name is required.";

    if (!form.department) e.department = "Department is required.";

    if (!form.email?.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";

    if (form.phone && !/^[0-9+()\-\s]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";

    if (!form.assetType) e.assetType = "Asset type is required.";

    if (!form.description?.trim()) e.description = "Provide asset specifications.";

    if (!form.quantity || Number(form.quantity) < 1) e.quantity = "Quantity must be at least 1.";

    if (!form.justification?.trim()) e.justification = "Justification is required.";

    if (!form.priority) e.priority = "Priority is required.";

    if (!form.managerName?.trim()) e.managerName = "Approving manager name is required.";

    if (!form.managerEmail?.trim()) e.managerEmail = "Manager email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.managerEmail)) e.managerEmail = "Enter a valid manager email.";

    // File checks
    files.forEach((f, idx) => {
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        e[`file_${idx}`] = `Each file must be ≤ ${MAX_FILE_MB} MB.`;
      }
      if (!ACCEPTED_FILE_TYPES.includes(f.type)) {
        e[`filetype_${idx}`] = "Unsupported file type.";
      }
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onFileSelect(ev) {
    const list = Array.from(ev.target.files || []);
    if (!list.length) return;
    const filtered = list.filter((f) => ACCEPTED_FILE_TYPES.includes(f.type));
    setFiles((prev) => [...prev, ...filtered]);
    ev.target.value = ""; // reset for same-file reselects
  }

  function removeFile(i) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setSubmitState(null);
    if (!validate()) return;

    try {
      setSubmitting(true);
      const payload = {
        ...form,
        quantity: Number(form.quantity),
        attachments: files,
        submittedAt: new Date().toISOString(),
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // Fallback: log payload if no handler provided
        console.log("AssetRequestForm submit payload", payload);
      }
      setSubmitState("success");
      // Optionally reset:
      // setForm({ ...form, description: "", justification: "" });
      // setFiles([]);
    } catch (err) {
      console.error(err);
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={classNames(
        "w-full max-w-3xl mx-auto p-6 rounded-2xl shadow-lg border",
        "bg-white/70 backdrop-blur dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Please fill in the details below. Fields marked * are required.
        </p>
      </div>

      {/* Requester Information */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            value={form.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            autoComplete="name"
            placeholder="Juan Dela Cruz"
          />
          <Select
            label="Department *"
            value={form.department}
            onChange={(v) => update("department", v)}
            options={departments}
            error={errors.department}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            label="Contact Email *"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            autoComplete="email"
            placeholder="you@company.com"
          />
          <Input
            label="Contact Number"
            value={form.phone}
            onChange={(v) => update("phone", v)}
            error={errors.phone}
            autoComplete="tel"
            placeholder="e.g., +63 912 345 6789"
          />
        </div>
      </section>

      <Divider />

      {/* Asset Details */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Type of Asset *"
            value={form.assetType}
            onChange={(v) => update("assetType", v)}
            options={assetTypes}
            error={errors.assetType}
          />
          <Input
            type="number"
            label="Quantity *"
            value={form.quantity}
            onChange={(v) => update("quantity", v)}
            min={1}
            error={errors.quantity}
          />
        </div>
        <Textarea
          label="Asset Specification / Description *"
          value={form.description}
          onChange={(v) => update("description", v)}
          error={errors.description}
          placeholder="Model, specs, required accessories, etc."
        />
        <Textarea
          label="Purpose / Justification *"
          value={form.justification}
          onChange={(v) => update("justification", v)}
          error={errors.justification}
          placeholder="How will this asset be used and why is it needed?"
        />
      </section>

      <Divider />

      {/* Priority & Approval */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Priority Level *"
            value={form.priority}
            onChange={(v) => update("priority", v)}
            options={priorities}
            error={errors.priority}
          />
          <Input
            label="Approving Manager *"
            value={form.managerName}
            onChange={(v) => update("managerName", v)}
            error={errors.managerName}
            placeholder="Manager's full name"
          />
          <Input
            type="email"
            label="Manager Email *"
            value={form.managerEmail}
            onChange={(v) => update("managerEmail", v)}
            error={errors.managerEmail}
            placeholder="manager@company.com"
          />
        </div>
      </section>

      <Divider />

      {/* Attachments */}
      <section className="space-y-3">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Attachments
          <span className="ml-1 text-neutral-800">(PDF, DOCX, JPG, PNG • up to {MAX_FILE_MB}MB each)</span>
        </label>
        <input
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(",")}
          onChange={onFileSelect}
          className={classNames(
            "block w-full rounded-lg border bg-white/60 dark:bg-neutral-900/60",
            "px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2",
            "file:text-sm file:font-medium hover:file:bg-neutral-200 dark:file:bg-neutral-800 dark:hover:file:bg-neutral-700",
            "border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2",
            accent
          )}
        />
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2" aria-live="polite">
            {files.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                className="group flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-sm bg-white/70 dark:bg-neutral-900/60"
                title={`${f.name} • ${readableFileSize(f.size)}`}
              >
                <span className="truncate max-w-[14rem]" aria-label="file name">
                  {f.name}
                </span>
                <span className="text-xs text-neutral-500">{readableFileSize(f.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-1 rounded-full px-2 py-0.5 text-xs border border-transparent hover:border-red-500 hover:text-red-600"
                  aria-label={`Remove ${f.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {Object.keys(errors).some((k) => k.startsWith("file")) && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {"There are issues with one or more files. Remove invalid files and try again."}
          </p>
        )}
        {files.length > 0 && (
          <p className="text-xs text-neutral-500">Total upload size: {readableFileSize(totalSize)}</p>
        )}
      </section>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className={classNames(
            "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
            "border border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
            "hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
        <button
          type="button"
          onClick={() => {
            setForm({
              name: "",
              department: departments[0] || "",
              email: "",
              phone: "",
              assetType: assetTypes[0] || "",
              description: "",
              quantity: 1,
              justification: "",
              priority: priorities[1] || "Medium",
              managerName: "",
              managerEmail: "",
            });
            setFiles([]);
            setErrors({});
            setSubmitState(null);
          }}
          className={classNames(
            "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
            "border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900",
            "hover:bg-neutral-50 dark:hover:bg-neutral-800"
          )}
        >
          Reset
        </button>
        {submitState === "success" && (
          <span className="text-sm text-green-700 dark:text-green-400" role="status">
            Request submitted.
          </span>
        )}
        {submitState === "error" && (
          <span className="text-sm text-red-600 dark:text-red-400" role="status">
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}

function Divider() {
  return <div className="my-6 h-px w-full bg-neutral-200 dark:bg-neutral-800" />;
}

function FieldWrapper({ id, label, error, children }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Input({ id, label, error, type = "text", value, onChange, placeholder, min, autoComplete }) {
  const [inputId] = useState(() => id || Math.random().toString(36).slice(2));
  return (
    <FieldWrapper id={inputId} label={label} error={error}>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? e.target.valueAsNumber || e.target.value : e.target.value)}
        placeholder={placeholder}
        min={min}
        autoComplete={autoComplete}
        className={classNames(
          "mt-1 w-full rounded-xl border bg-white/60 dark:bg-neutral-900/60 px-3 py-2 text-sm",
          "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-offset-0 ring-blue-500"
        )}
      />
    </FieldWrapper>
  );
}

function Textarea({ id, label, error, value, onChange, placeholder, rows = 4 }) {
  const [inputId] = useState(() => id || Math.random().toString(36).slice(2));
  return (
    <FieldWrapper id={inputId} label={label} error={error}>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={classNames(
          "mt-1 w-full rounded-xl border bg-white/60 dark:bg-neutral-900/60 px-3 py-2 text-sm",
          "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-offset-0 ring-blue-500"
        )}
      />
    </FieldWrapper>
  );
}

function Select({ id, label, error, value, onChange, options = [] }) {
  const [inputId] = useState(() => id || Math.random().toString(36).slice(2));
  return (
    <FieldWrapper id={inputId} label={label} error={error}>
      <div className="relative mt-1">
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={classNames(
            "w-full appearance-none rounded-xl border bg-white/60 dark:bg-neutral-900/60 px-3 py-2 text-sm",
            "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
            "focus:outline-none focus:ring-2 focus:ring-offset-0 ring-blue-500"
          )}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">▾</span>
      </div>
    </FieldWrapper>
  );
}
