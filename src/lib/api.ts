import { BlogPost } from './types';
import { getPosts, savePost as saveLocalPost, deletePost as deleteLocalPost } from './storage';
import { blogFallbackImage } from './utils';

const getApiBase = () => {
  return import.meta.env.VITE_API_URL ?? `${window.location.protocol}//${window.location.hostname}:5000/api`;
};

// ─── Review stats (Google + TripAdvisor) ──────────────────────────────────────

export interface ReviewSourceStats {
  rating: number;
  count: number;
  source?: 'manual' | 'api';
  updatedAt?: string | null;
}

export interface ReviewStats {
  google: ReviewSourceStats;
  tripadvisor: ReviewSourceStats;
}

const isValidSource = (s: any): s is ReviewSourceStats =>
  s && typeof s.rating === 'number' && typeof s.count === 'number' && s.count > 0;

export async function fetchReviewStats(): Promise<ReviewStats | null> {
  try {
    const res = await fetch(`${getApiBase()}/review-stats`);
    if (!res.ok) return null;
    const json = await res.json();
    const { google, tripadvisor } = json?.data ?? {};
    if (!isValidSource(google) || !isValidSource(tripadvisor)) return null;
    return { google, tripadvisor };
  } catch {
    return null;
  }
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export async function apiLogin(
  username: string,
  password: string,
  rememberMe: boolean
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${getApiBase()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password, rememberMe }),
  });
  const json = await res.json();
  return { success: json.success, message: json.message };
}

export async function apiLogout(): Promise<void> {
  try {
    await fetch(`${getApiBase()}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.warn('[API] Logout request failed', err);
  }
}

export async function apiVerifyAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${getApiBase()}/auth/verify`, {
      credentials: 'include',
    });
    if (!res.ok) return false;
    const json = await res.json();
    return json.success === true;
  } catch {
    return false;
  }
}

// Map backend blog model to frontend BlogPost!
const mapBackendToFrontend = (item: any): BlogPost => {
  const body = item.content ? item.content.split('\n\n').filter(Boolean) : [];
  return {
    _id: item._id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || '',
    body: body.length > 0 ? body : [''],
    cover: item.thumbnail?.url || item.cover || blogFallbackImage(item.slug),
    date: (item.publishedAt || item.createdAt || new Date().toISOString()).slice(0, 10),
    readingTime: item.readingTime || '5 min read',
    category: item.category || 'Journal',
  };
};

export async function apiGetPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${getApiBase()}/blogs?limit=100`);
    if (!res.ok) throw new Error('API server returned error');
    const json = await res.json();
    if (json.success && json.data?.blogs) {
      return json.data.blogs.map(mapBackendToFrontend);
    }
    throw new Error('API returned unsuccessful response');
  } catch (err) {
    console.warn('[API] Failed to fetch blogs from backend, using localStorage fallback', err);
    return getPosts();
  }
}

export async function apiGetPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const res = await fetch(`${getApiBase()}/blogs/${slug}`);
    if (!res.ok) throw new Error('API server returned error');
    const json = await res.json();
    if (json.success && json.data) {
      return mapBackendToFrontend(json.data);
    }
    throw new Error('API returned unsuccessful response');
  } catch (err) {
    console.warn(`[API] Failed to fetch blog by slug ${slug} from backend, using localStorage fallback`, err);
    const posts = getPosts();
    return posts.find(p => p.slug === slug);
  }
}

// Cloudinary unsigned upload: ảnh bài viết mới được upload thẳng từ trình duyệt lên Cloudinary,
// backend chỉ nhận lại URL (secure_url) qua field `cover`. Preset phải để chế độ "Unsigned".
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ize5h4fj';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Odyssey_HaGiang';

export async function apiUploadBlogImage(file: File): Promise<{ url: string; publicId?: string }> {
  if (!file.type.startsWith('image/')) throw new Error('Only image files are allowed');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be 5MB or smaller');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  if (!res.ok || !json.secure_url) {
    throw new Error(json.error?.message || `Cloudinary upload failed (${res.status})`);
  }
  return { url: json.secure_url as string, publicId: json.public_id as string };
}

export async function apiSavePost(
  postData: Omit<BlogPost, 'cover'>,
  coverUrl: string
): Promise<BlogPost> {
  const payload = {
    title: postData.title,
    slug: postData.slug,
    excerpt: postData.excerpt,
    content: postData.body.join('\n\n'),
    readingTime: postData.readingTime,
    category: postData.category,
    status: 'published', // Default to published on save from admin page
    cover: coverUrl, // static path, e.g. /Blog/12.webp
  };

  const isEdit = !!postData._id;
  const url = isEdit
    ? `${getApiBase()}/blogs/${postData._id}`
    : `${getApiBase()}/blogs`;

  try {
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server returned ${res.status}: ${errorText}`);
    }

    const json = await res.json();
    if (json.success && json.data) {
      const savedPost = mapBackendToFrontend(json.data);
      // Synchronize with local storage as secondary backup
      saveLocalPost(savedPost);
      return savedPost;
    }
    throw new Error('API save returned unsuccessful response');
  } catch (err) {
    console.warn('[API] Failed to save blog to backend, using localStorage fallback', err);
    const localPost: BlogPost = {
      ...postData,
      cover: coverUrl,
      date: postData.date || new Date().toISOString().split('T')[0],
    };
    saveLocalPost(localPost);
    return localPost;
  }
}

export async function apiDeletePost(idOrSlug: string, slug: string): Promise<boolean> {
  const url = idOrSlug && idOrSlug.length > 12 // MongoDB ObjectIDs are typically 24 hex chars
    ? `${getApiBase()}/blogs/${idOrSlug}`
    : `${getApiBase()}/blogs/${slug}`; // Fallback

  try {
    const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error('API server returned error during delete');
    const json = await res.json();
    if (json.success) {
      deleteLocalPost(slug);
      return true;
    }
    throw new Error('API delete returned unsuccessful response');
  } catch (err) {
    console.warn(`[API] Failed to delete blog ${slug} from backend, using localStorage fallback`, err);
    deleteLocalPost(slug);
    return true;
  }
}

// ─── Contact API ──────────────────────────────────────────────────────────────

import {
  ContactSubmission,
  saveContact as saveLocalContact,
  getContacts as getLocalContacts,
  updateContactStatus as updateLocalContactStatus,
  deleteContact as deleteLocalContact,
} from './storage';

/** Map API response → FE ContactSubmission shape */
const mapContact = (item: any): ContactSubmission => ({
  id: item._id,
  name: item.name,
  email: item.email,
  whatsapp: item.whatsapp || '',
  arrivalDate: item.arrivalDate || '',
  guests: item.guests || '1',
  topic: item.topic,
  message: item.message,
  date: item.date || item.createdAt || new Date().toISOString(),
  status: item.status || 'new',
  replyContent: item.replyContent || '',
  repliedAt: item.repliedAt || '',
});

export async function apiSaveContact(
  payload: Omit<ContactSubmission, 'id' | 'date' | 'status'>
): Promise<void> {
  try {
    const res = await fetch(`${getApiBase()}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Server ${res.status}`);
    const json = await res.json();
    if (!json.success) throw new Error('API returned unsuccessful');
  } catch (err) {
    console.warn('[API] Failed to save contact to backend, using localStorage fallback', err);
    saveLocalContact(payload);
  }
}

export async function apiGetContacts(): Promise<ContactSubmission[]> {
  try {
    const res = await fetch(`${getApiBase()}/contacts?limit=200&sort=date&order=desc`, { credentials: 'include' });
    if (!res.ok) throw new Error(`Server ${res.status}`);
    const json = await res.json();
    if (json.success && json.data?.contacts) {
      return json.data.contacts.map(mapContact);
    }
    throw new Error('Unexpected response shape');
  } catch (err) {
    console.warn('[API] Failed to get contacts, using localStorage fallback', err);
    return getLocalContacts();
  }
}

export async function apiUpdateContactStatus(
  id: string,
  status: ContactSubmission['status'],
  replyContent?: string
): Promise<void> {
  try {
    const body: Record<string, string> = { status };
    if (replyContent) body.replyContent = replyContent;
    const res = await fetch(`${getApiBase()}/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Server ${res.status}`);
  } catch (err) {
    console.warn('[API] Failed to update contact status, using localStorage fallback', err);
    updateLocalContactStatus(id, status, replyContent);
  }
}

export async function apiDeleteContact(id: string): Promise<void> {
  try {
    const res = await fetch(`${getApiBase()}/contacts/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error(`Server ${res.status}`);
  } catch (err) {
    console.warn('[API] Failed to delete contact, using localStorage fallback', err);
    deleteLocalContact(id);
  }
}

// ─── Subscriber API ───────────────────────────────────────────────────────────

import {
  Subscriber,
  addSubscriber as addLocalSubscriber,
  getSubscribers as getLocalSubscribers,
  deleteSubscriber as deleteLocalSubscriber,
} from './storage';

export async function apiAddSubscriber(email: string): Promise<void> {
  try {
    const res = await fetch(`${getApiBase()}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      // 409 = already subscribed — not an error from UX perspective
      if (res.status === 409) return;
      throw new Error(`Server ${res.status}`);
    }
  } catch (err) {
    console.warn('[API] Failed to add subscriber, using localStorage fallback', err);
    addLocalSubscriber(email);
  }
}

export async function apiGetSubscribers(): Promise<Subscriber[]> {
  try {
    const res = await fetch(`${getApiBase()}/subscribers?limit=500`, { credentials: 'include' });
    if (!res.ok) throw new Error(`Server ${res.status}`);
    const json = await res.json();
    if (json.success && json.data?.subscribers) {
      return json.data.subscribers.map((s: any): Subscriber => ({
        email: s.email,
        subscribedAt: s.subscribedAt || s.createdAt || new Date().toISOString(),
      }));
    }
    throw new Error('Unexpected response shape');
  } catch (err) {
    console.warn('[API] Failed to get subscribers, using localStorage fallback', err);
    return getLocalSubscribers();
  }
}

export async function apiDeleteSubscriber(email: string): Promise<void> {
  try {
    const res = await fetch(`${getApiBase()}/subscribers/${encodeURIComponent(email)}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`Server ${res.status}`);
  } catch (err) {
    console.warn('[API] Failed to delete subscriber, using localStorage fallback', err);
    deleteLocalSubscriber(email);
  }
}
