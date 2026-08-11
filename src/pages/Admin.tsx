import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArchiveIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircle2Icon,
  DownloadIcon,
  Edit2Icon,
  FileTextIcon,
  InboxIcon,
  Loader2Icon,
  LogOutIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  ReplyIcon,
  SearchIcon,
  Trash2Icon,
  UserIcon,
  UsersIcon,
  XIcon
} from 'lucide-react';
import {
  ContactSubmission,
  Subscriber
} from '../lib/storage';
import {
  apiGetPosts, apiSavePost, apiDeletePost,
  apiGetContacts, apiUpdateContactStatus, apiDeleteContact,
  apiGetSubscribers, apiDeleteSubscriber,
  apiVerifyAuth, apiLogout,
} from '../lib/api';
import { BlogPost } from '../lib/types';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { TextField, TextAreaField, SelectField } from '../components/ui/Field';

type Tab = 'blog' | 'contacts' | 'subscribers';

const TOPIC_LABELS: Record<string, string> = {
  'book-private-tour': 'Book Private Tour',
  'book-group-tour': 'Book Group Tour',
  'book-car-tour': 'Book Car Tour',
  'get-a-motorbike': 'Get A Motorbike',
  'book-a-room': 'Book a Room',
  'book-bus': 'Book Bus',
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/5 pt-4">
      <div className="text-xs text-ink-muted font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border border-ink/10 px-3 py-1.5 text-xs font-semibold hover:bg-ink/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          Prev
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="rounded-xl px-3 py-1.5 text-xs font-semibold border transition-colors border-ink/10 hover:bg-ink/5"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-xs text-ink-muted">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-colors ${currentPage === p
              ? 'bg-forest-900 border-forest-900 text-white shadow-sm'
              : 'border-ink/10 hover:bg-ink/5'
              }`}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1 text-xs text-ink-muted">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="rounded-xl px-3 py-1.5 text-xs font-semibold border transition-colors border-ink/10 hover:bg-ink/5"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-ink/10 px-3 py-1.5 text-xs font-semibold hover:bg-ink/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'danger' | 'primary';
  onConfirm: () => void | Promise<void>;
}

export function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('admin_authenticated') === 'true');
  const [authChecked, setAuthChecked] = useState(false);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);



  // Verify token with backend on mount
  useEffect(() => {
    apiVerifyAuth().then((valid) => {
      if (!valid) {
        sessionStorage.removeItem('admin_authenticated');
        setAuthenticated(false);
        navigate('/login');
      } else {
        sessionStorage.setItem('admin_authenticated', 'true');
        setAuthenticated(true);
      }
      setAuthChecked(true);
    });
  }, [navigate]);

  // App data state
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [contactsList, setContactsList] = useState<ContactSubmission[]>([]);
  const [subscribersList, setSubscribersList] = useState<Subscriber[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('blog');

  // Search & Filter
  const [blogSearch, setBlogSearch] = useState('');
  const [contactFilter, setContactFilter] = useState<'all' | 'new' | 'replied' | 'archived'>('all');

  // Blog Editor state
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    cover: '',
    readingTime: '',
    category: 'Journal' as BlogPost['category'],
  });
  const [blogErrors, setBlogErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Contact Reply state
  const [replyingContact, setReplyingContact] = useState<ContactSubmission | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccessMsg, setReplySuccessMsg] = useState('');

  // Newsletter Broadcast state
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [selectedPostSlug, setSelectedPostSlug] = useState('');
  const [newsletterSuccessMsg, setNewsletterSuccessMsg] = useState('');

  // Custom Confirmation Dialog state
  const [confirmDialogIsSubmitting, setConfirmDialogIsSubmitting] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
  });

  const showConfirm = (options: Omit<ConfirmDialogState, 'isOpen'>) => {
    setConfirmDialog({
      ...options,
      isOpen: true,
    });
  };

  // Pagination states
  const [blogPage, setBlogPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [subscriberPage, setSubscriberPage] = useState(1);

  const BLOGS_PER_PAGE = 5;
  const CONTACTS_PER_PAGE = 5;
  const SUBSCRIBERS_PER_PAGE = 10;

  useEffect(() => {
    setBlogPage(1);
  }, [blogSearch]);

  useEffect(() => {
    setContactPage(1);
  }, [contactFilter]);

  // Load data on mount & keep updated in real-time
  useEffect(() => {
    if (!authenticated) return;

    const refreshData = () => {
      apiGetPosts().then(posts => setPostsList(posts));
      apiGetContacts().then(contacts => setContactsList(contacts));
      apiGetSubscribers().then(subs => setSubscribersList(subs));
    };

    refreshData();

    // 1. Listen for cross-tab localStorage updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'karst_contact_submissions' || e.key === 'karst_blog_posts' || e.key === 'karst_newsletter_subscribers') {
        refreshData();
      }
    };

    // 2. Refresh immediately when operator switches back to this tab
    const handleFocus = () => {
      refreshData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [authenticated]);

  const handleLogout = async () => {
    await apiLogout();
    sessionStorage.removeItem('admin_authenticated');
    navigate('/login');
  };

  // Blog Form changes & validation
  const handleBlogFormChange = (key: string, value: string) => {
    setBlogForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !editingPost) {
        next.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
      return next;
    });
    setBlogErrors((prev) => ({ ...prev, [key]: '' }));
  };



  const openBlogEditor = (post: BlogPost | null) => {
    setSelectedFile(null);
    if (post) {
      setEditingPost(post);
      setBlogForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body.filter(p => p.trim().length > 0).join('\n\n'),
        cover: post.cover,
        readingTime: post.readingTime,
        category: post.category,
      });
      setPreviewUrl(post.cover);
    } else {
      setEditingPost(null);
      setBlogForm({
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        cover: '',
        readingTime: '5 min read',
        category: 'Journal',
      });
      setPreviewUrl('');
    }
    setBlogErrors({});
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!blogForm.title.trim()) errors.title = 'Title is required';
    if (!blogForm.slug.trim()) errors.slug = 'Slug is required';
    if (!blogForm.excerpt.trim()) errors.excerpt = 'Excerpt is required';
    if (!blogForm.body.trim()) errors.body = 'Content body is required';

    if (Object.keys(errors).length > 0) {
      setBlogErrors(errors);
      return;
    }

    if (!blogForm.cover && !selectedFile) {
      errors.cover = 'Cover image is required';
      setBlogErrors(errors);
      return;
    }

    const postData: Omit<BlogPost, 'cover'> = {
      _id: editingPost?._id,
      slug: blogForm.slug,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      body: blogForm.body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean),
      date: editingPost ? editingPost.date : new Date().toISOString().split('T')[0],
      readingTime: blogForm.readingTime || '5 min read',
      category: blogForm.category,
    };

    setIsSavingBlog(true);
    try {
      await apiSavePost(postData, selectedFile, blogForm.cover);
      const updated = await apiGetPosts();
      setPostsList(updated);
      setIsBlogModalOpen(false);
      setSelectedFile(null);
    } catch (err) {
      console.error('Failed to save blog post to backend', err);
      errors.title = 'Failed to save to backend server';
      setBlogErrors(errors);
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleDeleteBlog = (slug: string) => {
    showConfirm({
      title: 'Delete Blog Post',
      message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
      confirmText: 'Delete',
      confirmVariant: 'danger',
      onConfirm: async () => {
        const post = postsList.find(p => p.slug === slug);
        if (post) {
          try {
            await apiDeletePost(post._id || '', slug);
            const updated = await apiGetPosts();
            setPostsList(updated);
          } catch (err) {
            console.error('Failed to delete blog post from backend', err);
          }
        }
      }
    });
  };

  // Contacts Actions
  const handleArchiveContact = (id: string) => {
    apiUpdateContactStatus(id, 'archived').then(() =>
      apiGetContacts().then(contacts => setContactsList(contacts))
    );
  };

  const handleDeleteContact = (id: string) => {
    showConfirm({
      title: 'Delete Submission',
      message: 'Are you sure you want to permanently delete this submission? This action cannot be undone.',
      confirmText: 'Delete',
      confirmVariant: 'danger',
      onConfirm: () => {
        apiDeleteContact(id).then(() =>
          apiGetContacts().then(contacts => setContactsList(contacts))
        );
      }
    });
  };

  const handleExportContacts = () => {
    if (contactsList.length === 0) {
      alert('No contacts available to export.');
      return;
    }

    const formatDateTime = (dateStr: string) => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      const pad = (n: number) => String(n).padStart(2, '0');
      return `="${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}"`;
    };

    const headers = [
      'Name',
      'Email',
      'WhatsApp Number',
      'Arrival Date',
      'Guests',
      'Topic',
      'Message',
      'Status',
      'Submitted Date',
      'Reply Content',
      'Replied Date'
    ];

    const rows = contactsList.map(c => [
      c.name,
      c.email,
      c.whatsapp ? `="${c.whatsapp}"` : '',
      c.arrivalDate ? `="${c.arrivalDate}"` : '',
      c.guests ? `="${c.guests}"` : '',
      TOPIC_LABELS[c.topic] || c.topic.replace(/-/g, ' ').replace(/_/g, ' '),
      c.message,
      c.status,
      formatDateTime(c.date),
      c.replyContent || '',
      c.repliedAt ? formatDateTime(c.repliedAt) : ''
    ]);

    const tsvContent = [
      headers.join('\t'),
      ...rows.map(row =>
        row.map(value => {
          const stringValue = typeof value === 'string' ? value : String(value);
          const escaped = stringValue.replace(/"/g, '""');
          if (escaped.includes('\t') || escaped.includes('"') || escaped.includes('\n') || escaped.includes('\r')) {
            return `"${escaped}"`;
          }
          return escaped;
        }).join('\t')
      )
    ].join('\r\n');

    // Create UTF-16 LE array buffer (2 bytes BOM + 2 bytes per char)
    const buffer = new ArrayBuffer(2 + tsvContent.length * 2);
    const view = new DataView(buffer);
    // Write UTF-16 LE Byte Order Mark (0xFEFF)
    view.setUint16(0, 0xFEFF, true);
    // Write string chars
    for (let i = 0; i < tsvContent.length; i++) {
      view.setUint16(2 + i * 2, tsvContent.charCodeAt(i), true);
    }

    const blob = new Blob([buffer], { type: 'text/csv;charset=utf-16le;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getHtmlTemplate = (recipientName: string, messageBody: string) => {
    const lines = messageBody.split('\n').map(line => line.trim() ? `<p style="margin: 0 0 16px 0;">${line}</p>` : '<div style="height: 12px;"></div>').join('');

    return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; color: #1c2b24; line-height: 1.6; background-color: #fafaf8; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(28,43,36,0.08);">
  <div style="background-color: #04291d; padding: 32px 24px; text-align: center;">
    <h1 style="color: #ffebc6; font-size: 24px; font-weight: normal; margin: 0; letter-spacing: 3px; font-family: Georgia, serif; line-height: 1.2;">ODYSSEY HA GIANG LOOP</h1>
  </div>
  
  <div style="padding: 40px 32px;">
    <p style="font-size: 15px; margin: 0 0 24px 0; font-weight: bold; color: #04291d;">Dear ${recipientName},</p>
    
    <div style="font-size: 15px; color: #2c3e35; line-height: 1.8;">
      ${lines}
    </div>
    
    <hr style="border: none; border-top: 1px solid rgba(28,43,36,0.08); margin: 36px 0;" />
    
    <div style="font-size: 12px; color: #667e70; line-height: 1.8;">
      <p style="margin: 0; font-weight: bold; color: #04291d; font-size: 13px;">ODYSSEY HOSTEL, TOURS & MOTORBIKES RENTAL</p>
      <p style="margin: 2px 0 12px 0; font-style: italic; color: #8fa396;">No 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City</p>
      <p style="margin: 0; font-size: 11px;">
        <span style="color: #8fa396;">Phone:</span> <a href="tel:+84357292323" style="color: #04291d; text-decoration: none;">+84 357292323</a> &middot; 
        <span style="color: #8fa396;">Email:</span> <a href="mailto:odyssey.hagiang@gmail.com" style="color: #04291d; text-decoration: none;">odyssey.hagiang@gmail.com</a>
      </p>
      <p style="margin: 4px 0 0 0; font-size: 11px;">
        <span style="color: #8fa396;">Website:</span> <a href="${window.location.origin}" style="color: #cda869; text-decoration: none; font-weight: bold;">${window.location.host}</a>
      </p>
    </div>
  </div>
</div>`;
  };

  const handleSendReplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!replyText.trim() || !replyingContact) return;

    // 1. State and storage updates
    apiUpdateContactStatus(replyingContact.id, 'replied', replyText).then(() =>
      apiGetContacts().then(contacts => setContactsList(contacts))
    );

    // 2. Compile the luxury HTML and plain text copies
    const htmlString = getHtmlTemplate(replyingContact.name, replyText);
    const plainText = `Dear ${replyingContact.name},\n\n${replyText}\n\n--\nOdyssey Ha Giang Loop Travel Operations\nNo 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City\nPhone/WhatsApp: +84 357292323\nEmail: odyssey.hagiang@gmail.com\nWebsite: ${window.location.origin}`;

    if (isMobile) {
      e.preventDefault();
    }

    const performNavigation = () => {
      if (isMobile) {
        const mailtoUrl = `mailto:${replyingContact.email}?subject=${encodeURIComponent('Regarding your Odyssey Ha Giang Loop inquiry')}`;
        window.location.href = mailtoUrl;
      }
    };

    // 3. Automate copying to clipboard
    try {
      const blob = new Blob([htmlString], { type: 'text/html' });
      const plainBlob = new Blob([plainText], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': plainBlob })];
      navigator.clipboard.write(data)
        .then(performNavigation)
        .catch(err => {
          console.error('Auto-copy failed, trying plain fallback', err);
          navigator.clipboard.writeText(plainText).then(performNavigation);
        });
    } catch (err) {
      console.error('Clipboard write error', err);
      navigator.clipboard.writeText(plainText).then(performNavigation);
    }

    const successMsg = isMobile
      ? `Opening your Mail App! Paste the copied response into the email body.`
      : `Opening Gmail! Paste the copied response into the email body to fill the styled layout.`;
    setReplySuccessMsg(successMsg);
    setReplyText('');
  };

  const handleSendNewsletterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!selectedPostSlug || subscribersList.length === 0) return;

    const post = postsList.find(p => p.slug === selectedPostSlug);
    if (!post) return;

    // 1. Compile the luxury newsletter HTML layout
    const htmlString = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; color: #1c2b24; line-height: 1.6; background-color: #fafaf8; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(28,43,36,0.08);">
  <div style="background-color: #04291d; padding: 32px 24px; text-align: center;">
    <h1 style="color: #ffebc6; font-size: 24px; font-weight: normal; margin: 0; letter-spacing: 3px; font-family: Georgia, serif; line-height: 1.2;">ODYSSEY HA GIANG LOOP</h1>
    <p style="color: rgba(255,255,255,0.4); font-size: 9px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Seasonal Letters & Travel Journal Updates</p>
  </div>
  
  <div style="padding: 40px 32px; text-align: center;">
    <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1.5px; color: #8fa396; font-weight: bold; margin: 0 0 10px 0;">New Journal Publication</p>
    <h2 style="font-family: Georgia, serif; font-size: 22px; font-weight: normal; line-height: 1.4; color: #04291d; margin: 0 0 20px 0;">${post.title}</h2>
    
    ${post.cover ? `<img src="${post.cover.startsWith('http://') || post.cover.startsWith('https://') || post.cover.startsWith('//') ? post.cover : `${window.location.origin}${post.cover.startsWith('/') ? '' : '/'}${post.cover}`}" alt="${post.title}" style="width: 100%; max-height: 240px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />` : ''}
    
    <p style="font-size: 14px; color: #2c3e35; line-height: 1.8; text-align: left; margin: 0 0 28px 0;">
      ${post.excerpt}
    </p>
    
    <a href="${window.location.origin}/blog/${post.slug}" target="_blank" style="display: inline-block; background-color: #cda869; color: #04291d; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 30px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Read Full Article</a>
    
    <hr style="border: none; border-top: 1px solid rgba(28,43,36,0.08); margin: 36px 0;" />
    
    <div style="font-size: 11px; color: #667e70; line-height: 1.8; text-align: left;">
      <p style="margin: 0; font-weight: bold; color: #04291d; font-size: 12px;">ODYSSEY HOSTEL, TOURS & MOTORBIKES RENTAL</p>
      <p style="margin: 2px 0 12px 0; font-style: italic; color: #8fa396;">No 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City</p>
      <p style="margin: 0; font-size: 10px;">
        You are receiving this because you subscribed to our letters at the footer of our site. 
        If you wish to unsubscribe, please email us at <a href="mailto:odyssey.hagiang@gmail.com" style="color: #04291d; text-decoration: underline;">odyssey.hagiang@gmail.com</a>.
      </p>
    </div>
  </div>
</div>`;

    const plainText = `Dear Explorer,\n\nWe have published a new article: "${post.title}"\n\n${post.excerpt}\n\nRead it here: ${window.location.origin}/blog/${post.slug}\n\n--\nODYSSEY HOSTEL, TOURS & MOTORBIKES RENTAL\nNo 11, Lane 29, Group 18, Nguyen Trai Ward, Ha Giang City\nEmail: odyssey.hagiang@gmail.com`;

    if (isMobile) {
      e.preventDefault();
    }

    const performNavigation = () => {
      if (isMobile) {
        const bccList = subscribersList.map(s => s.email).join(',');
        const subject = `[Odyssey Ha Giang Loop] New Article: ${post.title}`;
        const mailtoUrl = `mailto:?bcc=${encodeURIComponent(bccList)}&subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoUrl;
      }
    };

    // 2. Copy to clipboard
    try {
      const blob = new Blob([htmlString], { type: 'text/html' });
      const plainBlob = new Blob([plainText], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': plainBlob })];
      navigator.clipboard.write(data)
        .then(performNavigation)
        .catch(err => {
          console.error('Failed to copy newsletter rich text, trying plain fallback', err);
          navigator.clipboard.writeText(plainText).then(performNavigation);
        });
    } catch (err) {
      console.error('Failed to copy newsletter rich text', err);
      navigator.clipboard.writeText(plainText).then(performNavigation);
    }

    const successMsg = isMobile
      ? `Opening your Mail App! Paste the copied newsletter into the email body.`
      : `Opening Gmail! Paste the copied newsletter into the email body to fill the styled layout.`;
    setNewsletterSuccessMsg(successMsg);
  };

  // Filtering
  const filteredPosts = postsList.filter(p =>
    p.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const filteredContacts = contactsList.filter(c => {
    if (contactFilter === 'all') return true;
    return c.status === contactFilter;
  });

  const pendingContacts = contactsList.filter(c => c.status === 'new');

  // Pagination slice and pages count calculations
  const totalBlogPages = Math.ceil(filteredPosts.length / BLOGS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (blogPage - 1) * BLOGS_PER_PAGE,
    blogPage * BLOGS_PER_PAGE
  );

  const totalContactPages = Math.ceil(filteredContacts.length / CONTACTS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice(
    (contactPage - 1) * CONTACTS_PER_PAGE,
    contactPage * CONTACTS_PER_PAGE
  );

  const totalSubscriberPages = Math.ceil(subscribersList.length / SUBSCRIBERS_PER_PAGE);
  const paginatedSubscribers = subscribersList.slice(
    (subscriberPage - 1) * SUBSCRIBERS_PER_PAGE,
    subscriberPage * SUBSCRIBERS_PER_PAGE
  );

  if (!authenticated || !authChecked) {
    return null;
  }

  return (
    <main className="flex min-h-screen bg-canvas text-ink pt-[60px] md:pt-0">

      {/* Sidebar Panel */}
      <aside className="fixed bottom-0 top-[60px] left-0 z-30 hidden w-64 flex-col bg-[#02150F] text-white/80 md:flex md:top-0 md:h-screen border-r border-white/5">

        {/* Brand Header */}
        <div className="p-6 border-b border-white/5 flex flex-col items-center gap-2">
          <img
            src="/logo/logo.webp"
            alt="Odyssey logo"
            className="h-14 w-14 shrink-0 rounded-full border border-white/10 object-cover"
          />
        </div>

        {/* Navigation Sidebar */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button
            onClick={() => setActiveTab('blog')}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-300",
              activeTab === 'blog'
                ? "bg-white/10 text-white border-l-2 border-gold-300 pl-3"
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <span className="flex items-center gap-3">
              <BookOpenIcon className="h-4 w-4 text-gold-300/80" />
              <span>Blogs</span>
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
              {postsList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-300",
              activeTab === 'contacts'
                ? "bg-white/10 text-white border-l-2 border-gold-300 pl-3"
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <span className="flex items-center gap-3">
              <InboxIcon className="h-4 w-4 text-gold-300/80" />
              <span>Contacts</span>
            </span>
            {pendingContacts.length > 0 && (
              <span className="rounded-full bg-gold-300/20 text-gold-300 border border-gold-300/30 px-2 py-0.5 text-[9px] font-bold">
                {pendingContacts.length} New
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-300",
              activeTab === 'subscribers'
                ? "bg-white/10 text-white border-l-2 border-gold-300 pl-3"
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <span className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 text-gold-300/80" />
              <span>Subscribers</span>
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
              {subscribersList.length}
            </span>
          </button>
        </nav>

        {/* Footer Actions & User Card */}
        <div className="p-4 border-t border-white/5 space-y-3">
          {/* User Card */}
          {/* User Profile with Log Out Action */}
          <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gold-300">
                <UserIcon className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">System Operator</p>
                <p className="text-[10px] text-white/40 truncate">admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-300"
            >
              <LogOutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">

        {/* Mobile Header Bar */}
        <div className="fixed top-[60px] left-0 right-0 z-20 flex h-14 items-center justify-between bg-[#02150F] px-5 text-white md:hidden border-b border-white/5">
          <span className="font-display text-sm font-semibold tracking-wider">Control Panel</span>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('blog')}
              className={cn("p-2 rounded-lg text-xs", activeTab === 'blog' ? "text-gold-300" : "text-white/60")}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={cn("p-2 rounded-lg text-xs", activeTab === 'contacts' ? "text-gold-300" : "text-white/60")}
            >
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={cn("p-2 rounded-lg text-xs", activeTab === 'subscribers' ? "text-gold-300" : "text-white/60")}
            >
              Letters
            </button>
          </div>
        </div>

        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex h-16 shrink-0 items-center justify-between border-b border-ink/5 bg-white px-8 lg:px-10">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span>Control Panel</span>
            <span className="text-ink/20">/</span>
            <span className="capitalize font-semibold text-ink">{activeTab}</span>
          </div>
          <div className="text-xs text-ink-muted">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* Section Contents */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto mt-14 md:mt-0">


          {activeTab === 'blog' && (
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-normal">Manage Publications</h2>
                  <p className="text-xs text-ink-muted mt-0.5">Create, edit, or remove entries from the travel journal archive.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-[280px]">
                  <SearchIcon className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={blogSearch}
                    onChange={e => setBlogSearch(e.target.value)}
                    className="w-full rounded-full border border-ink/10 bg-white py-2 pl-10 pr-4 text-xs outline-none transition focus:border-forest-500"
                  />
                </div>

                <button
                  onClick={() => openBlogEditor(null)}
                  className="flex items-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-xs uppercase tracking-wider text-white transition hover:bg-forest-800 self-start sm:self-center"
                >
                  <PlusIcon className="h-4 w-4" /> Create New Post
                </button>
              </div>

              {/* Blog list */}
              {filteredPosts.length === 0 ? (
                <div className="rounded-5xl border border-dashed border-ink/10 p-12 text-center text-ink-muted bg-white/50">
                  <FileTextIcon className="mx-auto h-12 w-12 text-ink/20 mb-4" />
                  <p className="font-display text-lg">No articles found</p>
                  <p className="text-xs mt-1">Try tweaking your search terms or create a new post.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-6">
                    {paginatedPosts.map(post => (
                      <article key={post.slug} className="flex flex-col gap-6 rounded-4xl border border-ink/[0.06] bg-white p-6 md:flex-row md:items-center">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="h-20 w-32 rounded-3xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-forest-500">
                            {post.category} · {post.readingTime}
                          </div>
                          <h3 className="mt-2 font-display text-lg leading-snug truncate">{post.title}</h3>
                          <p className="mt-1 text-xs text-ink-muted truncate">
                            {post.date}
                          </p>
                        </div>
                        <div className="flex gap-2 self-start md:self-center">
                          <button
                            onClick={() => openBlogEditor(post)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:bg-forest-900 hover:text-white"
                            title="Edit Post"
                          >
                            <Edit2Icon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(post.slug)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-red-600 transition hover:bg-red-600 hover:text-white"
                            title="Delete Post"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  <Pagination currentPage={blogPage} totalPages={totalBlogPages} onPageChange={setBlogPage} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-normal">Inbox & Inquiries</h2>
                  <p className="text-xs text-ink-muted mt-0.5">Process customer notes and record simulated email responses.</p>
                </div>
                {/* Filter buttons & Export button */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {(['all', 'new', 'replied', 'archived'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setContactFilter(f)}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-[10px] uppercase tracking-wider font-semibold transition border",
                          contactFilter === f
                            ? "bg-gold-300/20 text-forest-900 border-gold-300"
                            : "bg-white text-ink-muted border-ink/10 hover:bg-ink/5"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleExportContacts}
                    className="flex items-center gap-2 rounded-full border border-forest-600/30 bg-forest-900 px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold text-white hover:bg-forest-800 transition-colors shadow-sm"
                  >
                    <DownloadIcon className="h-3.5 w-3.5" /> Export Excel
                  </button>
                </div>

              </div>

              {filteredContacts.length === 0 ? (
                <div className="rounded-5xl border border-dashed border-ink/10 p-12 text-center text-ink-muted bg-white/50">
                  <InboxIcon className="mx-auto h-12 w-12 text-ink/20 mb-4" />
                  <p className="font-display text-lg">Your inbox is clear</p>
                  <p className="text-xs mt-1">No contact submissions match the selected filter.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedContacts.map(c => (
                    <div
                      key={c.id}
                      className={cn(
                        "rounded-2xl border p-4 bg-white transition-all shadow-sm",
                        c.status === 'new' ? "border-forest-500/30 ring-1 ring-forest-500/10" : "border-ink/[0.06]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display text-sm font-semibold truncate">{c.name}</span>
                            <span className={cn(
                              "rounded-full px-2 py-px text-[8px] uppercase tracking-wider font-bold",
                              c.status === 'new' && "bg-forest-100 text-forest-800",
                              c.status === 'replied' && "bg-gold-100 text-gold-800",
                              c.status === 'archived' && "bg-ink/10 text-ink-muted"
                            )}>
                              {c.status}
                            </span>
                            <span className="rounded-full bg-forest-50 px-2 py-px text-[9px] font-medium text-forest-700">
                              {TOPIC_LABELS[c.topic] || c.topic.replace(/-/g, ' ').replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-ink-muted flex flex-wrap gap-x-3 items-center">
                            <span className="flex items-center gap-1"><MailIcon className="h-3 w-3" /> {c.email}</span>
                            {c.whatsapp && <span className="flex items-center gap-1"><PhoneIcon className="h-3 w-3" /> {c.whatsapp}</span>}
                            {c.arrivalDate && <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> Arrival: {c.arrivalDate}</span>}
                            {c.guests && <span className="flex items-center gap-1"><UsersIcon className="h-3 w-3" /> {c.guests} guests</span>}
                            <span className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">Sent: {new Date(c.date).toLocaleDateString()}</span>
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {c.status === 'new' && (
                            <button
                              onClick={() => {
                                setReplyingContact(c);
                                setReplyText('');
                                setReplySuccessMsg('');
                              }}
                              className="flex items-center gap-1 rounded-full bg-forest-900 px-3 py-1 text-[9px] uppercase font-bold tracking-wider text-white hover:bg-forest-800"
                            >
                              <ReplyIcon className="h-3 w-3" /> Reply
                            </button>
                          )}
                          {c.status !== 'archived' && (
                            <button
                              onClick={() => handleArchiveContact(c.id)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 hover:bg-ink/5"
                              title="Archive"
                            >
                              <ArchiveIcon className="h-3 w-3 text-ink-muted" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2Icon className="h-3 w-3 text-red-600" />
                          </button>
                        </div>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-ink-soft whitespace-pre-line bg-canvas/30 rounded-xl p-3 border border-ink/[0.04]">
                        {c.message}
                      </p>

                      {c.replyContent && (
                        <div className="mt-2 rounded-xl border border-gold-300/20 bg-gold-50/20 p-3">
                          <p className="text-[8px] uppercase tracking-widest text-gold-700 font-bold mb-1 flex items-center gap-1">
                            <CheckCircle2Icon className="h-3 w-3 text-gold-600" /> Replied {new Date(c.repliedAt!).toLocaleDateString()}
                          </p>
                          <p className="text-[11px] italic text-ink-soft whitespace-pre-line leading-relaxed">
                            {c.replyContent}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <Pagination currentPage={contactPage} totalPages={totalContactPages} onPageChange={setContactPage} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-normal">Newsletter Subscribers</h2>
                  <p className="text-xs text-ink-muted mt-0.5">Manage user email addresses registered for seasonal letters.</p>
                </div>
                {subscribersList.length > 0 && (
                  <button
                    onClick={() => {
                      if (postsList.length === 0) {
                        alert('Please publish at least one article first.');
                        return;
                      }
                      setSelectedPostSlug(postsList[0].slug);
                      setIsNewsletterModalOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white transition hover:bg-forest-800 self-start sm:self-center"
                  >
                    <MailIcon className="h-4 w-4 text-gold-300" /> Send New Blog
                  </button>
                )}
              </div>

              {subscribersList.length === 0 ? (
                <div className="rounded-5xl border border-dashed border-ink/10 p-12 text-center text-ink-muted bg-white/50">
                  <MailIcon className="mx-auto h-12 w-12 text-ink/20 mb-4" />
                  <p className="font-display text-lg">No subscribers registered</p>
                  <p className="text-xs mt-1">Users subscribing via the website footer will appear here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-4xl border border-ink/[0.06] bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-canvas/50 border-b border-ink/5">
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Email Address</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Subscribed Date</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-ink-muted text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedSubscribers.map((sub) => (
                            <tr key={sub.email} className="border-b border-ink/5 last:border-0 hover:bg-canvas/30 transition-colors">
                              <td className="p-4 text-sm font-semibold">{sub.email}</td>
                              <td className="p-4 text-xs text-ink-soft">{new Date(sub.subscribedAt).toLocaleString()}</td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => {
                                    showConfirm({
                                      title: 'Remove Subscriber',
                                      message: `Are you sure you want to remove ${sub.email} from the newsletter list?`,
                                      confirmText: 'Remove',
                                      confirmVariant: 'danger',
                                      onConfirm: () => {
                                        apiDeleteSubscriber(sub.email).then(() =>
                                          apiGetSubscribers().then(subs => {
                                            setSubscribersList(subs);
                                            const newTotal = subs.length;
                                            const maxPage = Math.max(1, Math.ceil(newTotal / SUBSCRIBERS_PER_PAGE));
                                            if (subscriberPage > maxPage) setSubscriberPage(maxPage);
                                          })
                                        );
                                      }
                                    });
                                  }}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-red-600 hover:bg-red-50 hover:border-red-500/20 transition-all"
                                  title="Unsubscribe user"
                                >
                                  <Trash2Icon className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination currentPage={subscriberPage} totalPages={totalSubscriberPages} onPageChange={setSubscriberPage} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Blog Editor Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[680px] rounded-5xl border border-ink/10 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <header className="flex items-center justify-between border-b border-ink/5 p-8 pb-4 shrink-0">
              <h3 className="font-display text-xl">
                {editingPost ? 'Edit Article' : 'Create Article'}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 hover:bg-ink/5"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            <div className="overflow-y-auto px-8 pr-6 flex-1 py-4">
              <form id="blog-form" onSubmit={handleSaveBlog} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label="Article Title"
                    required
                    value={blogForm.title}
                    error={blogErrors.title}
                    placeholder="The Winding Roads of Ma Pi Leng"
                    onChange={e => handleBlogFormChange('title', e.target.value)}
                  />
                  <TextField
                    label="URL Slug"
                    required
                    value={blogForm.slug}
                    error={blogErrors.slug}
                    placeholder="winding-roads-ma-pi-leng"
                    onChange={e => handleBlogFormChange('slug', e.target.value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Category"
                    value={blogForm.category}
                    options={[
                      { value: 'Guides', label: 'Guides' },
                      { value: 'Culture', label: 'Culture' },
                      { value: 'Journal', label: 'Journal' },
                      { value: 'Destinations', label: 'Destinations' },
                    ]}
                    onChange={e => handleBlogFormChange('category', e.target.value)}
                  />
                  <TextField
                    label="Reading Time"
                    value={blogForm.readingTime}
                    placeholder="5 min read"
                    onChange={e => handleBlogFormChange('readingTime', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-ink-muted font-bold mb-2">
                    Cover Image
                  </label>
                  <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {previewUrl && (
                      <div className="relative h-24 w-36 overflow-hidden rounded-3xl border border-ink/10 bg-canvas">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        id="cover-upload"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <label
                        htmlFor="cover-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-ink/5 transition"
                      >
                        <PlusIcon className="h-4 w-4 text-ink-muted" /> Choose File
                      </label>
                      <p className="mt-1.5 text-[10px] text-ink-muted">
                        {selectedFile ? selectedFile.name : 'No file chosen (only uploaded when clicking Register/Save)'}
                      </p>
                    </div>
                  </div>
                  {blogErrors.cover && (
                    <p className="mt-1 text-xs text-red-600 font-semibold">{blogErrors.cover}</p>
                  )}
                </div>

                <TextAreaField
                  label="Excerpt / Summary"
                  required
                  value={blogForm.excerpt}
                  error={blogErrors.excerpt}
                  placeholder="A short summary of the article displayed on lists..."
                  onChange={e => handleBlogFormChange('excerpt', e.target.value)}
                />

                <div>
                  <TextAreaField
                    label="Article Content"
                    required
                    value={blogForm.body}
                    error={blogErrors.body}
                    rows={12}
                    placeholder="Type or paste your article content here..."
                    onChange={e => handleBlogFormChange('body', e.target.value)}
                    hint="Tip: Use ##Title for Headings, ###Subtitle for Subheadings, **bold** for Bold, and - Item for Bullet Lists."
                  />
                </div>

              </form>
            </div>

            <div className="flex justify-end gap-3 p-8 pt-4 border-t border-ink/5 shrink-0 bg-white">
              <Button
                type="button"
                variant="outline"
                disabled={isSavingBlog}
                onClick={() => setIsBlogModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" form="blog-form" variant="gold" disabled={isSavingBlog}>
                {isSavingBlog ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    {editingPost ? 'Saving...' : 'Publishing...'}
                  </span>
                ) : (
                  editingPost ? 'Save Changes' : 'Publish Article'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[540px] rounded-5xl border border-ink/10 bg-white p-8 shadow-2xl">
            <header className="flex items-center justify-between border-b border-ink/5 pb-4">
              <div>
                <h3 className="font-display text-lg">Send Email Response</h3>
                <p className="text-xs text-ink-muted mt-0.5">Replying to {replyingContact.name} ({replyingContact.email})</p>
              </div>
              <button
                onClick={() => setReplyingContact(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 hover:bg-ink/5"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            {replySuccessMsg ? (
              <div className="space-y-6 py-6 text-center">
                <CheckCircle2Icon className="mx-auto h-12 w-12 text-forest-500 animate-pulse" />
                <div>
                  <h4 className="font-display text-lg">Inquiry marked as Replied</h4>
                  <p className="text-xs text-ink-muted mt-1">{replySuccessMsg}</p>
                </div>

                <div className="rounded-3xl bg-forest-50 p-5 border border-forest-500/20 max-w-xs mx-auto">
                  <p className="text-xs text-forest-800 leading-relaxed font-semibold">
                    Paste the copied response into the email body!
                  </p>
                </div>

                <div className="pt-4 border-t border-ink/5">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setReplySuccessMsg('');
                      setReplyingContact(null);
                    }}
                  >
                    Return to Inbox
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-canvas p-4 text-xs text-ink-soft leading-relaxed max-h-[140px] overflow-y-auto border border-ink/[0.04]">
                  <p className="font-bold text-[9px] uppercase tracking-wider text-ink-muted mb-1">Original Inquiry:</p>
                  {replyingContact.message}
                </div>

                <TextAreaField
                  label="Email Body Content"
                  required
                  rows={6}
                  value={replyText}
                  placeholder="Hi Elena,&#10;&#10;Thank you for reaching out! We would be delighted to host you on our signature loop..."
                  onChange={e => setReplyText(e.target.value)}
                />

                <div className="flex justify-end gap-3 pt-4 border-t border-ink/5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReplyingContact(null)}
                  >
                    Cancel
                  </Button>
                  <a
                    href={isMobile
                      ? `mailto:${replyingContact.email}?subject=${encodeURIComponent('Regarding your Odyssey Ha Giang Loop inquiry')}`
                      : `https://mail.google.com/mail/?view=cm&fs=1&to=${replyingContact.email}&su=${encodeURIComponent('Regarding your Odyssey Ha Giang Loop inquiry')}`
                    }
                    target={isMobile ? undefined : "_blank"}
                    rel={isMobile ? undefined : "noopener noreferrer"}
                    onClick={handleSendReplyClick}
                    className="group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-500 ease-editorial active:scale-[0.98] bg-gold-400 text-forest-900 hover:bg-gold-300 shadow-soft h-12 px-7 text-sm no-underline"
                  >
                    {isMobile ? 'Open Mail App' : 'Open Gmail & Paste Response'}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Newsletter Modal */}
      {isNewsletterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[540px] rounded-5xl border border-ink/10 bg-white p-8 shadow-2xl">
            <header className="flex items-center justify-between border-b border-ink/5 pb-4">
              <div>
                <h3 className="font-display text-lg">Send New Blog Newsletter</h3>
                <p className="text-xs text-ink-muted mt-0.5">Broadcasting to {subscribersList.length} subscriber(s)</p>
              </div>
              <button
                onClick={() => {
                  setIsNewsletterModalOpen(false);
                  setNewsletterSuccessMsg('');
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 hover:bg-ink/5"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            {newsletterSuccessMsg ? (
              <div className="space-y-6 py-6 text-center">
                <CheckCircle2Icon className="mx-auto h-12 w-12 text-forest-500 animate-pulse" />
                <div>
                  <h4 className="font-display text-lg">Newsletter Ready</h4>
                  <p className="text-xs text-ink-muted mt-1">{newsletterSuccessMsg}</p>
                </div>

                <div className="rounded-3xl bg-forest-50 p-5 border border-forest-500/20 max-w-xs mx-auto">
                  <p className="text-xs text-forest-800 leading-relaxed font-semibold">
                    Paste the copied newsletter into the email body!
                  </p>
                </div>

                <div className="pt-4 border-t border-ink/5">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsNewsletterModalOpen(false);
                      setNewsletterSuccessMsg('');
                    }}
                  >
                    Close & Return
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <SelectField
                  label="Select Article to Broadcast"
                  value={selectedPostSlug}
                  options={postsList.map(post => ({
                    value: post.slug,
                    label: post.title,
                  }))}
                  onChange={e => setSelectedPostSlug(e.target.value)}
                />

                <div className="rounded-3xl bg-forest-50 p-4 border border-forest-500/10 text-xs text-forest-800 space-y-2 leading-relaxed">
                  <p className="font-bold">How it works:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>It compiles a luxury formatted newsletter layout for the selected article.</li>
                    {isMobile ? (
                      <>
                        <li>It automatically copies the formatted template to your clipboard.</li>
                        <li>It opens your Mail app with all subscriber emails in the <strong>BCC field</strong> (protecting subscriber privacy).</li>
                        <li>You just paste the template into the email body and click send!</li>
                      </>
                    ) : (
                      <>
                        <li>It automatically copies the formatted template to your clipboard.</li>
                        <li>It opens a new Gmail tab with all subscriber emails pre-filled in the <strong>BCC field</strong> (protecting subscriber privacy).</li>
                        <li>You just paste the template into the email body and click send!</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-ink/5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNewsletterModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <a
                    href={(() => {
                      const post = postsList.find(p => p.slug === selectedPostSlug);
                      const bccList = subscribersList.map(s => s.email).join(',');
                      const subject = `[Odyssey Ha Giang Loop] New Article: ${post?.title || ''}`;
                      if (isMobile) {
                        return `mailto:?bcc=${encodeURIComponent(bccList)}&subject=${encodeURIComponent(subject)}`;
                      }
                      return `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodeURIComponent(bccList)}&su=${encodeURIComponent(subject)}`;
                    })()}
                    target={isMobile ? undefined : "_blank"}
                    rel={isMobile ? undefined : "noopener noreferrer"}
                    onClick={handleSendNewsletterClick}
                    className="group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-500 ease-editorial active:scale-[0.98] bg-gold-400 text-forest-900 hover:bg-gold-300 shadow-soft h-12 px-7 text-sm no-underline"
                  >
                    {isMobile ? 'Open Mail App' : 'Open Gmail & Paste Newsletter'}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[420px] rounded-5xl border border-ink/10 bg-white p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between border-b border-ink/5 pb-4">
              <h3 className="font-display text-lg">
                {confirmDialog.title}
              </h3>
              <button
                disabled={confirmDialogIsSubmitting}
                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 hover:bg-ink/5 disabled:opacity-50"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            <div className="mt-6 text-sm text-ink-soft leading-relaxed">
              {confirmDialog.message}
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-ink/5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={confirmDialogIsSubmitting}
                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={confirmDialogIsSubmitting}
                className={cn(
                  confirmDialog.confirmVariant === 'danger'
                    ? 'bg-red-600 hover:bg-red-500 text-white border-none shadow-none'
                    : 'bg-forest-500 text-white hover:bg-forest-600'
                )}
                onClick={async () => {
                  setConfirmDialogIsSubmitting(true);
                  try {
                    await confirmDialog.onConfirm();
                  } catch (err) {
                    console.error('Action failed:', err);
                  } finally {
                    setConfirmDialogIsSubmitting(false);
                    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                  }
                }}
              >
                {confirmDialogIsSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  confirmDialog.confirmText || 'Confirm'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
