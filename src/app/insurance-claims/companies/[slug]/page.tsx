import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsurerView, insurerMetadata } from "@/components/insurer-view";
import { insurers } from "@/lib/insurers";

type Params = { slug: string };

export function generateStaticParams() {
  return insurers.map((insurer) => ({ slug: insurer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return insurerMetadata(slug);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!insurers.some((insurer) => insurer.slug === slug)) notFound();
  return <InsurerView slug={slug} />;
}
