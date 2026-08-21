import { api } from "./api";

export interface SubmitReservationPayload {
  date: string;
  time: string;
  partySize: number;
  name: string;
  phone: string;
  note?: string;
}

export interface SubmitReservationResponse {
  confirmationId: string;
}

export async function submitReservationRequest(
  payload: SubmitReservationPayload,
): Promise<SubmitReservationResponse> {
  const { data } = await api.post<SubmitReservationResponse>("/reservations", payload);
  return data;
}
