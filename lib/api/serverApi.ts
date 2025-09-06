import { cookies } from "next/headers";
import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

// ================== NOTES ================== //

export interface FetchServerNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchServerNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  params: FetchServerNotesParams
): Promise<FetchServerNotesResponse> => {
  const cookieStore = cookies();
  const response = await api.get<FetchServerNotesResponse>("/notes", {
    params,
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

// ================== AUTH ================== //

export const checkServerSession = async () => {
  const cookieStore = cookies();
  const response = await api.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

// ================== PROFILE ================== //

export const getServerMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await api.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
