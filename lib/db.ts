import bcrypt from "bcryptjs";

// TODO: Replace this entire module with Prisma + PostgreSQL (Neon or Supabase)
// Schema is in prisma/schema.prisma — run `npx prisma generate && npx prisma db push` when ready

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  practice?: string;
  plan: "basic" | "premium" | "super-premium";
  role: "user" | "admin";
  mondayId?: string;
  createdAt: Date;
};

// In-memory store for demo — not persistent across cold starts in production
// TODO: Replace with: import { db } from '@/lib/prisma'
const users = new Map<string, User>();

// Seed one admin account so you can test immediately
const seedAdmin = async () => {
  if (users.size === 0) {
    const hash = await bcrypt.hash("okklusion-admin-2024", 12);
    users.set("admin@okklusion.com", {
      id: "admin_001",
      email: "admin@okklusion.com",
      passwordHash: hash,
      firstName: "Finn",
      lastName: "Geoghagan",
      role: "admin",
      plan: "super-premium",
      createdAt: new Date(),
    });
    const memberHash = await bcrypt.hash("demo1234", 12);
    users.set("demo@okklusion.com", {
      id: "user_001",
      email: "demo@okklusion.com",
      passwordHash: memberHash,
      firstName: "Demo",
      lastName: "User",
      practice: "Demo Practice",
      role: "user",
      plan: "premium",
      createdAt: new Date(),
    });
  }
};

seedAdmin();

export async function findUserByEmail(email: string): Promise<User | null> {
  // TODO: return db.user.findUnique({ where: { email } })
  return users.get(email.toLowerCase()) ?? null;
}

export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  practice?: string;
  plan: User["plan"];
}): Promise<User> {
  // TODO: return db.user.create({ data: { ...data, passwordHash: hash } })
  const hash = await bcrypt.hash(data.password, 12);
  const user: User = {
    id: `user_${Date.now()}`,
    email: data.email.toLowerCase(),
    passwordHash: hash,
    firstName: data.firstName,
    lastName: data.lastName,
    practice: data.practice,
    plan: data.plan,
    role: "user",
    createdAt: new Date(),
  };
  users.set(user.email, user);
  return user;
}

export async function getAllUsers(): Promise<User[]> {
  // TODO: return db.user.findMany({ orderBy: { createdAt: 'desc' } })
  return Array.from(users.values());
}

export async function updateUserPlan(email: string, plan: User["plan"]): Promise<void> {
  // TODO: db.user.update({ where: { email }, data: { plan } })
  const user = users.get(email.toLowerCase());
  if (user) users.set(email.toLowerCase(), { ...user, plan });
}
