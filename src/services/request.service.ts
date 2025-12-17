import { api } from "@/lib/api"
import type { RequestFormData } from "@/schema/request.schema";

export const createRequestService = async (data: RequestFormData) => {
  const response = await api.post('/requests', data);
  return response;
}