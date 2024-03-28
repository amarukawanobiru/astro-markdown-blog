import { type TagData } from "@/utils/types";

export const getTagData = (postTags: string[], tags: TagData[]) => {
  return postTags
    .filter((postTag) => tags.map((tag) => tag.tagName).includes(postTag))
    .map((postTag) => tags.find((tag) => tag.tagName === postTag) as TagData);
};
