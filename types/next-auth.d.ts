import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    fullName: string;
    role: "USER" | "ADMIN";
    verified?: Date | null;
    provider?: string | null;
    providerId?: string | null;
  }

  interface Session {
    user: User & {
      id: string;
      fullName: string;
      role: "USER" | "ADMIN";
    };
  }

  interface JWT {
    id: string;
    email: string;
    fullName: string;
    role: "USER" | "ADMIN";
  }
}
