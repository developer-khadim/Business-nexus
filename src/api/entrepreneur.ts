import {
  TeamMember,
  StartupOverview,
  Startup,
  UserInfo,
  EntrepreneurCardData,
  StartupAndUserResponse,
  EntrepreneurDashboardResponse
} from "../types/index";
import { localStore, STORAGE_KEYS } from "../services/localStore";
import { User } from "../types";

//  Get startup profile + user details by entrepreneur userId
export const getStartupByUserId = async (id: string):
  Promise<StartupAndUserResponse> => {
  try {
    const startups = localStore.getItem<Startup[]>(STORAGE_KEYS.STARTUPS) || [];
    const startup = startups.find(s => s.entrepreneurId === id) || null;

    const users = localStore.getItem<User[]>(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === id);

    const userInfo: UserInfo | null = user ? {
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatarUrl || '',
      isOnline: user.isOnline || false,
      role: user.role,
      location: user.location,
      isEmailVerified: true // Mock
    } : null;

    return { success: true, data: { user: userInfo, startup: startup } };
  } catch (error: any) {
    console.error("Error fetching startup:", error);
    return { success: false, data: { user: null, startup: null }, error: error.message || "Failed to fetch startup" };
  }
};


//  Create a new startup
export const createStartup = async (startupData: Partial<Startup>):
  Promise<{ success: boolean; data: Startup | null; error?: string }> => {
  try {
    const newStartup: Startup = {
      _id: Math.random().toString(36).substring(2, 9),
      entrepreneurId: startupData.entrepreneurId!,
      startupName: startupData.startupName || '',
      location: startupData.location || '',
      foundedAt: startupData.foundedAt || new Date().toISOString(),
      totalFunds: startupData.totalFunds || 0,
      industry: startupData.industry || '',
      overview: startupData.overview || {
        problemStatement: '',
        solution: '',
        marketOpportunity: '',
        competitiveAdvantage: ''
      },
      team: startupData.team || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localStore.addItemToList(STORAGE_KEYS.STARTUPS, newStartup);

    return { success: true, data: newStartup };
  } catch (error: any) {
    console.error("Error creating startup:", error);
    return { success: false, data: null, error: error.message || "Failed to create startup" };
  }
};


// Update existing startup by startup ID
export const updateStartup = async (id: string, startupData: Partial<Startup>):
  Promise<{ success: boolean; data: Startup | null; error?: string }> => {
  try {
    const updatedStartup = localStore.updateInList<Startup>(
      STORAGE_KEYS.STARTUPS,
      (s) => s._id === id || s.entrepreneurId === id, // API usually expects ID, but just in case
      (s) => ({ ...s, ...startupData, updatedAt: new Date().toISOString() })
    );

    if (updatedStartup) {
      return { success: true, data: updatedStartup };
    } else {
      return { success: false, data: null, error: "Startup not found" };
    }

  } catch (error: any) {
    console.error("Error updating startup:", error);
    return { success: false, data: null, error: error.message || "Failed to update startup" };
  }
};


export const getAllEntrepreneurs = async ():
  Promise<{ success: boolean; entrepreneurs: EntrepreneurCardData[] }> => {
  try {
    const startups = localStore.getItem<Startup[]>(STORAGE_KEYS.STARTUPS) || [];
    const users = localStore.getItem<User[]>(STORAGE_KEYS.USERS) || [];

    const entrepreneurs: EntrepreneurCardData[] = startups.map(startup => {
      const user = users.find(u => u.id === startup.entrepreneurId);
      return {
        id: user?.id || '',
        name: user?.name || 'Unknown',
        avatarUrl: user?.avatarUrl || '',
        isOnline: user?.isOnline || false,
        startupName: startup.startupName,
        industry: startup.industry,
        location: startup.location,
        foundedYear: new Date(startup.foundedAt).getFullYear(),
        pitchSummary: startup.overview.solution.substring(0, 100) + '...',
        fundingNeeded: 0, // Not in startup type currently, mocking
        totalFunds: startup.totalFunds,
        teamSize: startup.team.length
      };
    }).filter(e => e.id !== '');

    return { success: true, entrepreneurs };
  } catch (error: any) {
    console.error("Error fetching entrepreneurs:", error);
    return { success: false, entrepreneurs: [] };
  }
};

// Search Startups
export const searchEntrepreneursAPI = async (params: {
  searchQuery?: string;
  industries?: string[];
  fundingRanges?: string[];
  locations?: string[];
}): Promise<{ success: boolean; results: EntrepreneurCardData[] }> => {
  try {
    // Re-use logic for getting all then filter
    const { entrepreneurs } = await getAllEntrepreneurs();
    let results = entrepreneurs;

    if (params.searchQuery) {
      const q = params.searchQuery.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(q) || e.startupName?.toLowerCase().includes(q));
    }

    // Add other filters if valid

    return { success: true, results };
  } catch (error: any) {
    console.error("Error searching entrepreneurs:", error);
    return { success: false, results: [] };
  }
};

export const getEntrepreneurDashboard = async (): Promise<EntrepreneurDashboardResponse> => {
  // Mock dashboard data
  return {
    success: true,
    data: {
      totalConnections: 5,
      pendingRequests: 3,
      upcomingMeetings: 2,
      profileViews: 45,
      startup: {
        id: 'startup-1',
        name: 'TechNova',
        stage: 'Seed',
        industry: 'Tech'
      },
      meetings: [
        { id: '1', title: 'Intro Call', status: 'scheduled', date: new Date().toISOString() },
        { id: '2', title: 'Follow up', status: 'scheduled', date: new Date().toISOString() }
      ],
      collaborations: [
        { id: 'c1', status: 'accepted' },
        { id: 'c2', status: 'accepted' },
        { id: 'c3', status: 'accepted' },
        { id: 'c4', status: 'accepted' },
        { id: 'c5', status: 'accepted' }
      ]
    }
  };
};
