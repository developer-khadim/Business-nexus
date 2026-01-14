import {
  InvestorUser,
  GetInvestorProfileResponse,
  UpdateInvestorProfileResponse,
  GetRecommendedInvestorsResponse,
  SearchInvestorsResponse,
  InvestorDashboardResponse,
  Investor
} from '../types/index'
import { localStore, STORAGE_KEYS } from "../services/localStore";



/* ----------------------------- INVESTOR API ----------------------------- */
// Fetch logged-in investor’s profile
export const getInvestorProfile = async (
  id: string
): Promise<GetInvestorProfileResponse> => {
  try {
    const investors = localStore.getItem<InvestorUser[]>(STORAGE_KEYS.INVESTORS) || [];
    const investor = investors.find(i => i.id === id);

    if (investor) {
      return { success: true, message: "Fetched", investor };
    }
    throw new Error("Investor profile not found");

  } catch (e: any) {
    throw new Error(e.message || "Failed");
  }
};

export const updateInvestorProfile = async (
  id: string,
  payload: Partial<InvestorUser>
): Promise<UpdateInvestorProfileResponse> => {
  try {
    const updatedInvestor = localStore.updateInList<InvestorUser>(
      STORAGE_KEYS.INVESTORS,
      (i) => i.id === id,
      (i) => ({ ...i, ...payload })
    );

    if (updatedInvestor) {
      return { success: true, message: "Updated", investor: updatedInvestor };
    }
    throw new Error("Investor not found");
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getRecommendedInvestors =
  async (): Promise<GetRecommendedInvestorsResponse> => {
    const investors = localStore.getItem<InvestorUser[]>(STORAGE_KEYS.INVESTORS) || [];

    // Convert InvestorUser to Investor type if needed or just return mock subset
    const recommended: Investor[] = investors.map(i => ({
      id: i.id,
      name: i.name,
      email: i.email, // Added to satisfy User interface extension if needed
      role: 'investor',
      createdAt: new Date().toISOString(), // Mock
      isOnline: i.isOnline,
      avatarUrl: i.avatar,
      bio: i.bio,
      totalInvestments: i.totalInvestments,
      investmentStage: i.investmentStages,
      investmentInterests: i.industries,
      minimumInvestment: i.investmentRange.min || 0,
      maximumInvestment: i.investmentRange.max || 1000000
    }));

    return { success: true, count: recommended.length, data: recommended };
  };

//  Search Investors
export const searchInvestors = async (params: {
  searchQuery?: string;
  industries?: string[];
  stages?: string[];
  minInvestment?: number;
  maxInvestment?: number;
  location?: string;
}): Promise<SearchInvestorsResponse> => {

  const { data } = await getRecommendedInvestors();
  let filtered = data;

  if (params.searchQuery) {
    const q = params.searchQuery.toLowerCase();
    filtered = filtered.filter(i => i.name.toLowerCase().includes(q));
  }

  return { success: true, count: filtered.length, data: filtered };
};

export const getInvestorDashboard = async (): Promise<InvestorDashboardResponse> => {
  // Mock dashboard
  return {
    success: true,
    data: {
      collaborationsCount: 5,
      dealsCount: 2,
      totalInvestments: 120000,
      totalStartups: 15,
      collaborations: [],
      deals: []
    }
  };
};