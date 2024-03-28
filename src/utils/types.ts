export interface TagData {
  tagName: string;
  tagSlug: string;
}

export interface Page<T = any> {
  data: T[];
  start: number;
  end: number;
  total: number;
  currentPage: number;
  size: number;
  lastPage: number;
  url: {
    current: string;
    prev: string | undefined;
    next: string | undefined;
  };
}
