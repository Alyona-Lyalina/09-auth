import { api } from "./api";
import type { Note } from '../../types/note';
import type { User } from "../../types/user";

// ================== NOTES ================== //

export  interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag 
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes',{
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });
  return response.data;
};

export const createNote = async (
  newNote: Omit<Note,
  'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

// ================== AUTH ================== //

export interface AuthCredentials {
  email: string;
  password: string;
}

export const registerUser = async (credentials: AuthCredentials): Promise<User> => {
  const res = await api.post<User>("/auth/register", credentials);
  return res.data;
};

export const loginUser = async (credentials: AuthCredentials): Promise<User> => {
  const res = await api.post<User>("/auth/login", credentials);
  return res.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// ================== PROFILE ================== //

export interface UpdateProfileData {
  email: string;
  username: string;
}

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateUserProfile = async (data: UpdateProfileData): Promise<User> => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};

// ================== SESSION ================== //

interface SessionStatus {
  success: boolean;
}

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<SessionStatus>("/auth/session");
  return res.data.success;
};