import { BlogPost } from './types';
import { posts as initialPosts } from './data';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  arrivalDate?: string;
  guests?: string;
  topic: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
  replyContent?: string;
  repliedAt?: string;
}

const POSTS_KEY = 'karst_blog_posts';
const CONTACTS_KEY = 'karst_contact_submissions';

export function getPosts(): BlogPost[] {
  const data = localStorage.getItem(POSTS_KEY);
  if (!data) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse posts from localStorage', e);
    return initialPosts;
  }
}

export function savePost(post: BlogPost): void {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function deletePost(slug: string): void {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  localStorage.setItem(POSTS_KEY, JSON.stringify(filtered));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug);
}

export function getContacts(): ContactSubmission[] {
  const data = localStorage.getItem(CONTACTS_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse contacts from localStorage', e);
    return [];
  }
}

export function saveContact(submission: Omit<ContactSubmission, 'id' | 'date' | 'status'>): void {
  const contacts = getContacts();
  const newSubmission: ContactSubmission = {
    ...submission,
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
    date: new Date().toISOString(),
    status: 'new',
  };
  contacts.unshift(newSubmission);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function updateContactStatus(id: string, status: ContactSubmission['status'], replyContent?: string): void {
  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index >= 0) {
    contacts[index].status = status;
    if (replyContent) {
      contacts[index].replyContent = replyContent;
      contacts[index].repliedAt = new Date().toISOString();
    }
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }
}

export function deleteContact(id: string): void {
  const contacts = getContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered));
}

// Newsletter Subscribers Management
export interface Subscriber {
  email: string;
  subscribedAt: string;
}

const SUBSCRIBERS_KEY = 'karst_newsletter_subscribers';

export function getSubscribers(): Subscriber[] {
  const data = localStorage.getItem(SUBSCRIBERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse subscribers', e);
    return [];
  }
}

export function addSubscriber(email: string): void {
  const subscribers = getSubscribers();
  if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return;
  }
  const newSubscriber: Subscriber = {
    email,
    subscribedAt: new Date().toISOString(),
  };
  subscribers.unshift(newSubscriber);
  localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
}

export function deleteSubscriber(email: string): void {
  const subscribers = getSubscribers();
  const filtered = subscribers.filter(s => s.email.toLowerCase() !== email.toLowerCase());
  localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(filtered));
}
