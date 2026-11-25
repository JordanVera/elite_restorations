export type UploadMode = "blob" | "server" | "none";

export async function uploadPreparedFile(input: {
  mode: Exclude<UploadMode, "none">;
  blob: Blob;
  name: string;
  contentType: string;
  pathname: string;
}) {
  if (input.mode === "blob") {
    const { upload } = await import("@vercel/blob/client");
    await upload(input.pathname, input.blob, {
      access: "private",
      handleUploadUrl: "/api/estimate-request/upload",
      contentType: input.contentType,
    });
    return;
  }

  const body = new FormData();
  body.set("pathname", input.pathname);
  body.set("file", new File([input.blob], input.name, { type: input.contentType }));
  const response = await fetch("/api/estimate-request/upload", { method: "POST", body });
  const data = (await response.json().catch(() => null)) as { message?: string } | null;
  if (!response.ok) throw new Error(data?.message || "The file did not upload. Try again.");
}
