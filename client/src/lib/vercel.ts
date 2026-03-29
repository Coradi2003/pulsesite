// Vercel REST API client
// Docs: https://vercel.com/docs/rest-api

import { supabase } from "./supabase";

export const isVercelConfigured = true;

async function vercelFetch<T = unknown>(
  path: string,
  method: string = "GET",
  body?: any
): Promise<T> {
  if (!supabase) {
    throw new Error("Supabase não configurado");
  }
  const { data, error } = await supabase.functions.invoke("vercel-proxy", {
    body: { url: path, method, body },
  });

  if (error) {
    // Handle specific error cases if possible, otherwise generic
    console.error("Vercel Proxy Error:", error);
    throw new Error(error.message || "Erro ao conectar com o serviço Vercel");
  }

  // The function returns the Vercel API response.
  // If the Vercel API itself returned an error (e.g. 401), it will be in the data if the proxy passed it through.
  // Our proxy passes the status and data.
  if (data && data.error) {
    throw new Error(
      data.error.message || data.error || "Erro na API da Vercel"
    );
  }

  return data as T;
}

// ─── Types ─────────────────────────────────────────────────────────────────

export type DeployState =
  | "READY"
  | "ERROR"
  | "BUILDING"
  | "QUEUED"
  | "CANCELED"
  | "INITIALIZING";

export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  updatedAt: number;
  link?: {
    type: string;
    projectUrl?: string;
    repoId?: string;
  };
  latestDeployments?: VercelDeployment[];
}

export interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  state?: DeployState;
  readyState?: DeployState;
  target: "production" | "preview" | null;
  createdAt: number;
  readyAt?: number;
  projectId: string;
  meta?: {
    githubCommitMessage?: string;
    githubCommitRef?: string;
  };
}

export interface VercelTeam {
  id: string;
  name: string;
  slug: string;
}

// ─── API calls ─────────────────────────────────────────────────────────────

export async function fetchVercelProjects(): Promise<VercelProject[]> {
  const data = await vercelFetch<{ projects: VercelProject[] }>(
    "/v9/projects?limit=100"
  );
  return data.projects ?? [];
}

export async function fetchProjectDeployments(
  projectId: string,
  limit = 5
): Promise<VercelDeployment[]> {
  const data = await vercelFetch<{ deployments: VercelDeployment[] }>(
    `/v6/deployments?projectId=${projectId}&limit=${limit}&target=production`
  );
  return data.deployments ?? [];
}

export async function fetchVercelUser(): Promise<{
  name: string;
  username: string;
  email: string;
} | null> {
  try {
    const data = await vercelFetch<{
      user: { name: string; username: string; email: string };
    }>("/v2/user");
    return data.user ?? null;
  } catch {
    return null;
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────

export function deployStateBadge(state: DeployState) {
  switch (state) {
    case "READY":
      return { label: "Pronto", color: "emerald" };
    case "ERROR":
      return { label: "Erro", color: "red" };
    case "BUILDING":
    case "INITIALIZING":
      return { label: "Buildando", color: "blue" };
    case "QUEUED":
      return { label: "Na fila", color: "yellow" };
    case "CANCELED":
      return { label: "Cancelado", color: "gray" };
    default:
      return { label: state, color: "gray" };
  }
}

export function formatDeployAge(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}
