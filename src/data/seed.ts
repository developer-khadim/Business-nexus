import { localStore, STORAGE_KEYS } from '../services/localStore';
import { User, Startup, EntrepreneurCardData, InvestorUser } from '../types';

const INITIAL_USERS: User[] = [
    {
        id: 'guest-entrepreneur-id',
        name: 'Guest Entrepreneur',
        email: 'guest@entrepreneur.com',
        role: 'entrepreneur',
        isOnline: true,
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://ui-avatars.com/api/?name=Guest+Entrepreneur&background=random',
        bio: 'I am a guest user exploring the platform.',
        location: 'San Francisco, CA'
    },
    {
        id: 'guest-investor-id',
        name: 'Guest Investor',
        email: 'guest@investor.com',
        role: 'investor',
        isOnline: true,
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://ui-avatars.com/api/?name=Guest+Investor&background=random',
        bio: 'I am a guest investor looking for opportunities.',
        location: 'New York, NY'
    },
    {
        id: 'sarah-id',
        name: 'Sarah Chen',
        email: 'sarah@techwave.io',
        role: 'entrepreneur',
        isOnline: true,
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Tech enthusiast and serial entrepreneur.',
        location: 'Austin, TX'
    },
    {
        id: 'michael-id',
        name: 'Michael Ross',
        email: 'michael@vcinnovate.com',
        role: 'investor',
        isOnline: true,
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Managing Partner at VC Innovate. Focused on early-stage tech.',
        location: 'Boston, MA'
    }
];

const INITIAL_STARTUPS: Startup[] = [
    {
        _id: 'startup-1',
        entrepreneurId: 'guest-entrepreneur-id',
        startupName: 'TechNova',
        location: 'San Francisco, CA',
        foundedAt: '2023-01-01',
        totalFunds: 500000,
        industry: 'Technology',
        overview: {
            problemStatement: 'Inefficient data processing',
            solution: 'AI-driven data value extraction',
            marketOpportunity: '$50B market',
            competitiveAdvantage: 'Proprietary algorithms'
        },
        team: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: 'startup-sarah',
        entrepreneurId: 'sarah-id',
        startupName: 'TechWave',
        location: 'Austin, TX',
        foundedAt: '2022-05-15',
        totalFunds: 1200000,
        industry: 'SaaS',
        overview: {
            problemStatement: 'Remote work coordination is chaotic',
            solution: 'Unified workspace for digital nomads',
            marketOpportunity: 'Global remote workforce',
            competitiveAdvantage: 'All-in-one integration'
        },
        team: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

const INITIAL_INVESTOR_PROFILES: InvestorUser[] = [
    {
        id: 'guest-investor-id',
        name: 'Guest Investor',
        email: 'guest@investor.com',
        role: 'investor',
        bio: 'Looking for the next big thing.',
        isEmailVerified: true,
        avatar: 'https://ui-avatars.com/api/?name=Guest+Investor&background=random',
        isOnline: true,
        lastActiveAt: new Date().toISOString(),
        location: 'New York, NY',
        industries: ['Technology', 'Health'],
        investmentStages: ['Seed', 'Series A'],
        investmentCriteria: ['Strong Team', 'Scalability'],
        totalInvestments: 5,
        investmentRange: { min: 10000, max: 1000000 },
        portfolioCompanies: []
    },
    {
        id: 'michael-id',
        name: 'Michael Ross',
        email: 'michael@vcinnovate.com',
        role: 'investor',
        bio: 'Managing Partner at VC Innovate.',
        isEmailVerified: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        isOnline: true,
        lastActiveAt: new Date().toISOString(),
        location: 'Boston, MA',
        industries: ['Fintech', 'SaaS'],
        investmentStages: ['Series A', 'Series B'],
        investmentCriteria: ['Recurring Revenue', 'Proven Market Fit'],
        totalInvestments: 12,
        investmentRange: { min: 250000, max: 5000000 },
        portfolioCompanies: ['Stripe', 'Airbnb']
    }
]

export const initializeData = () => {
    // Users
    const currentUsers = localStore.getItem<User[]>(STORAGE_KEYS.USERS) || [];
    let usersUpdated = false;
    INITIAL_USERS.forEach(initUser => {
        if (!currentUsers.find(u => u.email === initUser.email)) {
            currentUsers.push(initUser);
            usersUpdated = true;
        }
    });
    if (usersUpdated || currentUsers.length === 0) {
        localStore.setItem(STORAGE_KEYS.USERS, currentUsers);
    }

    // Startups
    const currentStartups = localStore.getItem<Startup[]>(STORAGE_KEYS.STARTUPS) || [];
    let startupsUpdated = false;
    INITIAL_STARTUPS.forEach(initStartup => {
        if (!currentStartups.find(s => s._id === initStartup._id)) {
            currentStartups.push(initStartup);
            startupsUpdated = true;
        }
    });
    if (startupsUpdated || currentStartups.length === 0) {
        localStore.setItem(STORAGE_KEYS.STARTUPS, currentStartups);
    }

    // Investors
    const currentInvestors = localStore.getItem<InvestorUser[]>(STORAGE_KEYS.INVESTORS) || [];
    let investorsUpdated = false;
    INITIAL_INVESTOR_PROFILES.forEach(initInvestor => {
        if (!currentInvestors.find(i => i.id === initInvestor.id)) {
            currentInvestors.push(initInvestor);
            investorsUpdated = true;
        }
    });
    if (investorsUpdated || currentInvestors.length === 0) {
        localStore.setItem(STORAGE_KEYS.INVESTORS, currentInvestors);
    }
};
