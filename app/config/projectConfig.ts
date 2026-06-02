// Custom project configurations to override GitHub API data
// Add entries here with the repository name as key

export const projectConfig: Record<string, {
  description?: string;
  image?: string;
  details?: string;
  featured?: boolean;
}> = {
  "BookStore_api-connecting": {
    description: "Inventory management system for bookstore operations. Track stock levels across titles, query book collections by author, and search books by author name.",
    image: "/BookStore.png",
    details: "Built with database integration for real-time inventory tracking and book-author relationship management.",
    featured: true
  },
  "CLI": {
    description: "Multi-threaded ticket booking CLI system demonstrating concurrent thread operations. Administrators configure sellers, buyers, and ticket release intervals with automatic validation and MySQL persistence.",
    image: "/TicketBooking.png",
    details: "Implemented in Java with advanced thread synchronization, ensuring ticket overselling prevention and real-time transaction handling.",
    featured: true
  },
  "Isandith_Portfolio": {
    description: "My first portfolio website built with HTML and CSS. A foundational project showcasing web fundamentals and design principles.",
    image: "/PortFolio.png",
    details: "Demonstrates semantic HTML structure and responsive CSS styling.",
    featured: false
  },
  
  "Dice-game-CW": {
    description: "Turn-based dice game where the player and computer race to reach a target score. Each turn players roll dice and may select dice to reroll up to three times per round.",
    image: "/DiceGame.png",
    details: "Interactive reroll mechanics (up to 3 rerolls), turn management, score tracking, and a simple AI opponent. UI allows selecting dice to keep or reroll each chance.",
    featured: false
  },

  "MovieApplication_Kotlin": {
    description: "Android movie search application built with Kotlin. Search movies by title or actor, view detailed information including runtime, ratings, and cast. Save favorites to a local database.",
    image: "/MovieApp.png",
    details: "Leverages Kotlin's virtual database with intuitive UI for movie discovery and personalized watchlist management.",
    featured: true
  },
  "MyPortfolio": {
    description: "Portfolio website built with Angular framework. A progressive web application showcasing skills and projects.",
    image: "/PortFolio.png",
    details: "Angular-based implementation with component architecture and data binding.",
    featured: false
  },
  "PlaneManagementSystem_Java": {
    description: "Comprehensive seat management system for airline reservations. View available seats, make bookings, and visualize seat layouts. Export booking data to JSON and text formats.",
    image: "/PlaneManage.png",
    details: "Built with Java 17 featuring command-line interface, seat visualization, and data persistence.",
    featured: true
  },
  "portfolio-cyberpunk": {
    description: "Modern cyberpunk-themed portfolio currently in development. Showcasing advanced Next.js, TypeScript, and Tailwind CSS with dynamic animations and GitHub API integration.",
    image: "/CyberPunk.png",
    details: "Features automated project syncing, customizable metadata, and immersive visual effects.",
    featured: true
  },
  "portfolio2": {
    description: "Experimental portfolio project exploring alternative design approaches and technologies.",
    image: "/PortFolio.png",
    details: "A learning project for testing new frameworks and design patterns.",
    featured: false
  },
  "Ticketing-System-Backend_-SpringBoot": {
    description: "Enterprise-grade ticket booking backend built with Spring Boot. Handles concurrent transactions, seller-buyer interactions, and ticket allocation with full validation logic.",
    image: "/TicketBooking.png",
    details: "RESTful API with MySQL database, thread-safe operations, and comprehensive business logic validation.",
    featured: true
  },

  "ticketingSystem-frontend": {
    description: "Angular-based frontend for the ticketing system. User-friendly interface for buyers and sellers to manage bookings and transactions.",
    image: "/TicketBooking.png",
    details: "Responsive Angular application with state management and real-time data synchronization.",
    featured: true
  },

  "ai-doc-assistant": {
    description: "AI-powered document assistant backend that processes and understands documents using large language models. Enables intelligent Q&A, summarization, and contextual search over uploaded files.",
    image: "/AiDocAssistant.png",
    details: "Built with Python and LLM integration for document parsing, vector embeddings, and retrieval-augmented generation (RAG) to deliver accurate, context-aware responses.",
    featured: true
  },

  "ai_doc_assistent_Frontend": {
    description: "React-based frontend for the AI Document Assistant. Upload documents, ask questions in natural language, and get AI-generated answers with source citations from your files.",
    image: "/AiDocAssistant.png",
    details: "Responsive UI with real-time streaming responses, document upload management, and conversation history powered by the AI doc assistant backend.",
    featured: true
  },

  "SmartDesk-UI": {
    description: "React-based frontend for the SmartDesk workspace management platform. Allows employees to browse, reserve, and manage desk bookings with an intuitive calendar-driven interface.",
    image: "/SmartDesk.png",
    details: "Built with React and a component-driven architecture featuring real-time availability views, booking management, and seamless integration with the SmartDesk REST API.",
    featured: true
  },

  "SmartDesk.Api": {
    description: "ASP.NET Core backend powering the SmartDesk platform. Manages desk inventory, handles reservation logic, enforces booking rules, and exposes a RESTful API for the frontend.",
    image: "/SmartDesk.png",
    details: "Built with .NET and Entity Framework Core, featuring JWT authentication, role-based access control, and a clean layered architecture for scalable workspace management.",
    featured: true
  },

  

};
