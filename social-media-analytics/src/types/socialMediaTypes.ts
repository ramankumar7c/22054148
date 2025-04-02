export interface SocialMediaUser {
    id: string;
    name: string;
  }
  
  export interface SocialMediaPost {
    id: string;
    userId: string;
    content: string;
  }
  
  export interface Comment {
    id: string;
    postId: string;
    content: string;
  }