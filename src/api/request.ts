import {
  RequestResponse,
  Request,
  RequestListResponse,
  GetEntrepreneurRequestsResponse,
} from "../types/index";
import { localStore, STORAGE_KEYS } from "../services/localStore";

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

export interface CollaboratorsResponse {
  success: boolean;
  total: number;
  collaborators: Collaborator[];
}

/* ----------------------------- REQUEST API ----------------------------- */
// Investor sends request
export const sendRequest = async (
  investorId: string,
  entrepreneurId: string,
  startupId: string,
  message: string
): Promise<RequestResponse> => {
  const newRequest: Request = {
    id: Math.random().toString(36).substring(2, 9),
    investorId,
    entrepreneurId,
    startupId,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  localStore.addItemToList(STORAGE_KEYS.REQUESTS, newRequest);

  return { success: true, message: "Request sent", data: newRequest };
};

// Entrepreneur responds (accept/reject)
export const respondRequest = async (
  requestId: string,
  action: "accepted" | "rejected"
): Promise<RequestResponse> => {

  // Type casting logic to match generic updater expectation or manual find/update
  const updated = localStore.updateInList<Request>(
    STORAGE_KEYS.REQUESTS,
    (r) => r.id === requestId,
    (r) => ({ ...r, status: action, respondedAt: new Date().toISOString() })
  );

  if (updated) {
    return { success: true, message: `Request ${action}`, data: updated };
  }
  return { success: false, message: "Request not found" };
};

// Investor withdraws
export const withdrawRequest = async (
  requestId: string
): Promise<RequestResponse> => {
  const updated = localStore.updateInList<Request>(
    STORAGE_KEYS.REQUESTS,
    (r) => r.id === requestId,
    (r) => ({ ...r, status: 'withdrawn' })
  );
  if (updated) {
    return { success: true, message: "Request withdrawn", data: updated };
  }
  return { success: false, message: "Request not found" };
};

// Fetch investor’s sent requests
export const getInvestorRequests = async (
  investorId: string
): Promise<RequestListResponse> => {
  const requests = localStore.filterList<Request>(STORAGE_KEYS.REQUESTS, r => r.investorId === investorId);
  return { success: true, count: requests.length, data: requests };
};


// Check if investor already sent request
export const checkRequestExists = async (
  investorId: string,
  entrepreneurId: string,
  startupId: string
): Promise<{ success: boolean; exists: boolean; status: string; message: string; data?: Request }> => {
  const existing = localStore.findInList<Request>(
    STORAGE_KEYS.REQUESTS,
    r => r.investorId === investorId && r.entrepreneurId === entrepreneurId && r.startupId === startupId
  );

  if (existing) {
    return { success: true, exists: true, status: existing.status, message: "Found", data: existing };
  }
  return { success: true, exists: false, status: "", message: "Not found" };
};

// api/requestApi.ts
export const getEntrepreneurRequests = async (
  entrepreneurId: string
): Promise<GetEntrepreneurRequestsResponse> => {
  // Return all requests for this entrepreneur
  const requests = localStore.filterList<any>(STORAGE_KEYS.REQUESTS, r => r.entrepreneurId === entrepreneurId);

  // Map to CollaborationRequest shape if needed, or stick to any if types match close enough
  // The UI expects properties: id, investorId, entrepreneurId, message, status, createdAt.
  // Our 'Request' type has these.
  return { success: true, count: requests.length, data: requests };
};

// api/requestApi.ts
export const getCollaborators = async (
  entrepreneurId: string
): Promise<GetEntrepreneurRequestsResponse> => {
  const requests = localStore.filterList<any>(STORAGE_KEYS.REQUESTS, r => r.entrepreneurId === entrepreneurId);
  return { success: true, count: requests.length, data: requests };
};

// Fetch entrepreneur collaborators (investors)
export const getEntrepreneurCollaborators = async (): Promise<CollaboratorsResponse> => {
  // This would typically join users and accepted requests. For now, mock empty.
  return { success: true, total: 0, collaborators: [] };
};