import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface NoteDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNoteById(id);

  if (!note) {
    notFound();
  }

  const title = note.title;
  const description =
    (note.content && note.content.slice(0, 120)) || "Note details in NoteHub.";
  const imageUrl = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://09-auth-brown-five.vercel.app/notes/${note.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "NoteHub preview image",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function NoteDetailsPage({ params }: NoteDetailProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
