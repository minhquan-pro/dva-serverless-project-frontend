import { api } from "./api";
import type { ContactPayload, ContactResponse } from "../types/contact";

export async function sendContactRequest(payload: ContactPayload): Promise<ContactResponse> {
  const { data } = await api.post<ContactResponse>("/contact", payload);
  return data;
}
