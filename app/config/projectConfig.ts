// Custom project configurations to override GitHub API data
// Add entries here with the repository name as key

export const projectConfig: Record<string, {
  description?: string;
  image?: string;
  details?: string;
  featured?: boolean;
}> = {
  "BookStore_api-connecting": {
    description: "This is a custom description for my project.",
    image: "/images/my-repo-image.png", // Path to your image in /public/images/
    details: "Extra details or features.",
    featured: true // Optional: mark as featured
  },
};
