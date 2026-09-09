import { events } from "@/data/events";
import { research } from "@/data/research";
import { users } from "@/data/users";
import { applications } from "@/data/applications";
import { announcements } from "@/data/announcements";
import { Event } from "@/types/event";
import { Research } from "@/types/research";
import { User } from "@/types/user";
import { Application } from "@/types/application";
import { Announcement } from "@/types/announcement";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // ============ USERS ============
  async getUsers(): Promise<User[]> {
    await delay();
    return [...users];
  },

  async getUserById(id: string): Promise<User | undefined> {
    await delay();
    return users.find(u => u.id === id);
  },

  async getUsersByRole(role: string): Promise<User[]> {
    await delay();
    return users.filter(u => u.role === role);
  },

  async createUser(userData: Partial<User>): Promise<User> {
    await delay();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "PARTICIPANT",
      status: "PENDING",
      createdAt: new Date().toISOString(),
      avatar: userData.avatar,
      bio: userData.bio,
      organization: userData.organization,
    };
    users.push(newUser);
    return newUser;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    users[index] = { ...users[index], ...updates };
    return users[index];
  },

  // ============ EVENTS ============
  async getEvents(): Promise<Event[]> {
    await delay();
    return [...events];
  },

  async getEventById(id: string): Promise<Event | undefined> {
    await delay();
    return events.find(e => e.id === id);
  },

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    await delay();
    return events.filter(e => e.organizerId === organizerId);
  },

  async getPublishedEvents(): Promise<Event[]> {
    await delay();
    return events.filter(e => e.status === "PUBLISHED");
  },

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    await delay();
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: eventData.title || "",
      description: eventData.description || "",
      type: "EVENT",
      organizerId: eventData.organizerId || "",
      category: eventData.category || "General",
      status: eventData.status || "DRAFT",
      location: eventData.location || "",
      startDate: eventData.startDate || new Date().toISOString(),
      endDate: eventData.endDate || new Date().toISOString(),
      quota: eventData.quota || 0,
      registeredCount: 0,
      createdAt: new Date().toISOString(),
      deadline: eventData.deadline,
      image: eventData.image,
      isOnline: eventData.isOnline || false,
      meetingLink: eventData.meetingLink,
    };
    events.push(newEvent);
    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | undefined> {
    await delay();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    events[index] = { ...events[index], ...updates };
    return events[index];
  },

  async deleteEvent(id: string): Promise<boolean> {
    await delay();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    return true;
  },

  // ============ RESEARCH ============
  async getResearch(): Promise<Research[]> {
    await delay();
    return [...research];
  },

  async getResearchById(id: string): Promise<Research | undefined> {
    await delay();
    return research.find(r => r.id === id);
  },

  async getResearchByOrganizer(organizerId: string): Promise<Research[]> {
    await delay();
    return research.filter(r => r.organizerId === organizerId);
  },

  async getPublishedResearch(): Promise<Research[]> {
    await delay();
    return research.filter(r => r.status === "PUBLISHED");
  },

  async createResearch(researchData: Partial<Research>): Promise<Research> {
    await delay();
    const newResearch: Research = {
      id: `research-${Date.now()}`,
      title: researchData.title || "",
      description: researchData.description || "",
      type: "RESEARCH",
      organizerId: researchData.organizerId || "",
      category: researchData.category || "General",
      status: researchData.status || "DRAFT",
      researcher: researchData.researcher || "",
      requiredParticipants: researchData.requiredParticipants || 0,
      currentParticipants: 0,
      criteria: researchData.criteria || [],
      compensation: researchData.compensation,
      createdAt: new Date().toISOString(),
      deadline: researchData.deadline,
      image: researchData.image,
      duration: researchData.duration,
    };
    research.push(newResearch);
    return newResearch;
  },

  async updateResearch(id: string, updates: Partial<Research>): Promise<Research | undefined> {
    await delay();
    const index = research.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    research[index] = { ...research[index], ...updates };
    return research[index];
  },

  async deleteResearch(id: string): Promise<boolean> {
    await delay();
    const index = research.findIndex(r => r.id === id);
    if (index === -1) return false;
    research.splice(index, 1);
    return true;
  },

  // ============ APPLICATIONS ============
  async getApplications(): Promise<Application[]> {
    await delay();
    return [...applications];
  },

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    await delay();
    return applications.filter(a => a.applicantId === userId);
  },

  async getApplicationsByOpportunity(opportunityId: string): Promise<Application[]> {
    await delay();
    return applications.filter(a => a.opportunityId === opportunityId);
  },

  async createApplication(applicationData: Partial<Application>): Promise<Application> {
    await delay();
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      applicantId: applicationData.applicantId || "",
      opportunityId: applicationData.opportunityId || "",
      opportunityType: applicationData.opportunityType || "EVENT",
      status: "PENDING",
      appliedAt: new Date().toISOString(),
      motivation: applicationData.motivation || "",
    };
    applications.push(newApplication);
    return newApplication;
  },

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined> {
    await delay();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    applications[index] = { ...applications[index], ...updates, updatedAt: new Date().toISOString() };
    return applications[index];
  },

  async deleteApplication(id: string): Promise<boolean> {
    await delay();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) return false;
    applications.splice(index, 1);
    return true;
  },

  // ============ ANNOUNCEMENTS ============
  async getAnnouncements(): Promise<Announcement[]> {
    await delay();
    return announcements.filter(a => a.isActive);
  },

  async getAnnouncementById(id: string): Promise<Announcement | undefined> {
    await delay();
    return announcements.find(a => a.id === id);
  },

  async createAnnouncement(announcementData: Partial<Announcement>): Promise<Announcement> {
    await delay();
    const newAnnouncement: Announcement = {
      id: `announce-${Date.now()}`,
      title: announcementData.title || "",
      content: announcementData.content || "",
      type: announcementData.type || "INFO",
      authorId: announcementData.authorId || "",
      createdAt: new Date().toISOString(),
      expiresAt: announcementData.expiresAt,
      isActive: true,
    };
    announcements.push(newAnnouncement);
    return newAnnouncement;
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    await delay();
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) return false;
    announcements[index].isActive = false;
    return true;
  },
};
