import { create } from "zustand";
import { Post, NewPost } from "../types";

interface State {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;

  fetchPosts: () => Promise<void>;
  addPost: (post: NewPost) => void;
  setPage: (page: number) => void;
  getPaginatedPosts: () => Post[];
  getPostById: (id: number) => Post | undefined;
}

const API_URL = process.env.REACT_PUBLIC_APP_BASE_URL;
const DEFAULT_ITEMS_PER_PAGE = 10;

export const useStore = create<State>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,

  fetchPosts: async () => {
    // Prevent refetching if posts already exist (preserves local state)
    if (get().posts.length > 0) return;

    if (!API_URL) {
      set({ error: "API URL not configured", isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/posts`);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      set({ posts: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch posts",
        isLoading: false,
      });
    }
  },

  addPost: (newPost: NewPost) => {
    set((state) => {
      const maxId = state.posts.reduce((max, p) => Math.max(max, p.id), 0);
      const post: Post = {
        ...newPost,
        id: maxId + 1,
        userId: 1,
        date: new Date().toISOString(),
      };
      return { posts: [post, ...state.posts] };
    });
  },

  setPage: (page: number) => set({ currentPage: page }),

  getPaginatedPosts: () => {
    const { posts, currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return posts.slice(startIndex, startIndex + itemsPerPage);
  },

  getPostById: (id: number) => {
    return get().posts.find((p) => p.id === id);
  },
}));
