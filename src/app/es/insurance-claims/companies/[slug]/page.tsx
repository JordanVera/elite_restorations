import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsurerView, insurerMetadata } from "@/components/insurer-view";
import { esInsurers } from "@/lib/es/insurers";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return esInsurers.map((insurer) => ({ slug: insurer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return insurerMetadata(slug, "es");
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!esInsurers.some((insurer) => insurer.slug === slug)) notFound();
  return <InsurerView slug={slug} locale="es" />;
}
