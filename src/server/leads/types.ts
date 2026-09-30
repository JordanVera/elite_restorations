import "server-only";

import type { Lead } from "@/lib/inquiry-schema";
import type { SignedPhoto } from "@/server/leads/photos";

type WithSignedPhotos<T> = T extends unknown
  ? Omit<T, "photos" | "website"> & {
      photos: SignedPhoto[];
      /** Photos the visitor attached that could not be turned into links. */
      photosMissing: number;
    }
  : never;

/** A validated lead whose photo references have been resolved to readable links. */
export type DeliverableLead = WithSignedPhotos<Lead>;
