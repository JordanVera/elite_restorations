import type { EstimateExt } from "@/lib/estimate-request/files";

export type LocalFile = {
  id: string;
  name: string;
  blob: Blob;
  contentType: string;
  ext: EstimateExt;
  previewUrl: string | null;
  pathname?: string;
};

export type RoomFiles = {
  files: LocalFile[];
  sketch: LocalFile | null;
};

export const emptyRoomFiles = (): RoomFiles => ({ files: [], sketch: null });
