"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Inbox,
  FolderGit2,
  Layers,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  RefreshCw,
  Search,
  Lock,
  Loader2,
  X,
  ExternalLink,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget_range: string;
  timeline: string;
  description: string;
  status: string;
  created_at: string;
}

interface DBProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  solution: string;
  architecture: string[];
  technologies: string[];
  outcome: string;
  featured: boolean;
  is_confidential: boolean;
  confidentiality_note: string | null;
  status: string;
}

interface DBService {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  capabilities: string[];
  tech_highlight: string[];
  icon: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"inquiries" | "projects" | "services">("inquiries");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Data states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [services, setServices] = useState<DBService[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal editor states
  const [editingProject, setEditingProject] = useState<DBProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [editingService, setEditingService] = useState<DBService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Initial Auth Verification & Data Fetch
  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    setLoading(true);
    try {
      const authRes = await fetch("/api/admin/check");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      setAuthenticated(true);
      await Promise.all([fetchInquiries(), fetchProjects(), fetchServices()]);
    } catch (err) {
      console.error(err);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Inquiry actions
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleInquiryStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "new" ? "read" : "new";
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) => (inq.id === id ? { ...inq, status: nextStatus } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Project Modal Actions
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const isNew = !projects.some((p) => p.id === editingProject.id);
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setIsProjectModalOpen(false);
        setEditingProject(null);
        await fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Service Modal Actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const isNew = !services.some((s) => s.id === editingService.id);
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (res.ok) {
        setIsServiceModalOpen(false);
        setEditingService(null);
        await fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#A3E635]" />
        <p className="text-xs font-mono text-[#A1A1AA]">Verifying admin session & loading Neon DB data...</p>
      </div>
    );
  }

  if (!authenticated) return null;

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] pt-24 pb-20">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#27272A] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#A3E635]">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span>CONNECTED TO NEON POSTGRESQL</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#FAFAFA]">
              StackWorks Studio Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={checkAuthAndLoad}
              className="px-3.5 py-2 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh DB</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-md bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-xs font-medium text-red-200 flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 pt-6 border-b border-[#27272A]">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === "inquiries"
                ? "border-[#A3E635] text-[#FAFAFA] font-medium"
                : "border-transparent text-[#71717A] hover:text-[#A1A1AA]"
            }`}
          >
            <Inbox className="w-4 h-4 text-[#A3E635]" />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === "projects"
                ? "border-[#A3E635] text-[#FAFAFA] font-medium"
                : "border-transparent text-[#71717A] hover:text-[#A1A1AA]"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === "services"
                ? "border-[#A3E635] text-[#FAFAFA] font-medium"
                : "border-transparent text-[#71717A] hover:text-[#A1A1AA]"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services ({services.length})</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === "inquiries" && (
          <div className="py-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-md bg-[#111113] border border-[#27272A] text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#A3E635]"
                />
              </div>
              <div className="text-xs font-mono text-[#71717A]">
                Showing {filteredInquiries.length} of {inquiries.length} project inquiries
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-[#111113] border border-[#27272A] space-y-2">
                <p className="text-sm font-medium text-[#FAFAFA]">No project inquiries found.</p>
                <p className="text-xs text-[#71717A]">
                  Submissions from the `/contact` form will automatically persist here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-4 hover:border-[#3F3F46] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            inq.status === "new" ? "bg-[#A3E635]" : "bg-zinc-600"
                          }`}
                        />
                        <h3 className="text-lg font-semibold text-[#FAFAFA] tracking-tight">
                          {inq.name}
                        </h3>
                        {inq.company && (
                          <span className="text-xs font-mono text-[#71717A]">
                            ({inq.company})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#71717A]">
                        <span>{new Date(inq.created_at).toLocaleString()}</span>
                        <button
                          onClick={() => toggleInquiryStatus(inq.id, inq.status)}
                          className="px-2 py-1 rounded bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]"
                        >
                          Mark as {inq.status === "new" ? "Read" : "New"}
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded bg-[#18181B]"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono bg-[#18181B]/50 p-3 rounded-lg border border-[#27272A]">
                      <div>
                        <span className="text-[#71717A] block">EMAIL:</span>
                        <a href={`mailto:${inq.email}`} className="text-[#FAFAFA] hover:text-[#A3E635]">
                          {inq.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-[#71717A] block">PROJECT TYPE:</span>
                        <span className="text-[#A3E635]">{inq.project_type}</span>
                      </div>
                      <div>
                        <span className="text-[#71717A] block">BUDGET RANGE:</span>
                        <span className="text-[#FAFAFA]">{inq.budget_range}</span>
                      </div>
                      <div>
                        <span className="text-[#71717A] block">TARGET TIMELINE:</span>
                        <span className="text-[#FAFAFA]">{inq.timeline}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-[#71717A] uppercase">Description:</span>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">
                        {inq.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#FAFAFA]">Dynamic Projects List</h2>
                <p className="text-xs text-[#71717A]">
                  Manage case studies rendered dynamically on `/work` and `/work/[slug]`.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    slug: `new-project-${Date.now()}`,
                    title: "New Software Project",
                    category: "Web Platform",
                    summary: "Business summary of project",
                    problem: "Problem details...",
                    approach: "Engineering approach...",
                    solution: "Solution details...",
                    architecture: ["Next.js App Router", "Neon PostgreSQL"],
                    technologies: ["React", "TypeScript", "PostgreSQL"],
                    outcome: "Delivered under 100ms response speed",
                    featured: true,
                    is_confidential: false,
                    confidentiality_note: null,
                    status: "published",
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2 rounded-md bg-[#FAFAFA] text-[#09090B] text-xs font-medium hover:bg-white flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#A3E635] uppercase">{proj.category}</span>
                      <div className="flex items-center space-x-2">
                        {proj.featured && (
                          <span className="text-[10px] font-mono text-[#A3E635] bg-[#A3E635]/10 px-2 py-0.5 rounded border border-[#A3E635]/30">
                            Featured
                          </span>
                        )}
                        {proj.is_confidential && (
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                            Confidential
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#FAFAFA]">{proj.title}</h3>
                    <p className="text-xs text-[#A1A1AA] line-clamp-2">{proj.summary}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t) => (
                        <span key={t} className="text-[10px] font-mono text-[#71717A] bg-[#18181B] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#27272A] flex items-center justify-between text-xs">
                    <a
                      href={`/work/${proj.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center space-x-1"
                    >
                      <span>View Live Case Study</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded bg-[#18181B] border border-[#27272A] text-[#FAFAFA] flex items-center space-x-1 hover:bg-[#27272A]"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#A3E635]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded bg-[#18181B]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MANAGER */}
        {activeTab === "services" && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#FAFAFA]">Dynamic Services List</h2>
                <p className="text-xs text-[#71717A]">
                  Manage studio services rendered dynamically on `/services` and home page.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    id: `service-${Date.now()}`,
                    slug: `new-service-${Date.now()}`,
                    title: "New Studio Capability",
                    short_description: "Short description",
                    description: "Full service description...",
                    capabilities: ["Capability 1", "Capability 2"],
                    tech_highlight: ["Next.js", "TypeScript"],
                    icon: "LayoutGrid",
                  });
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2 rounded-md bg-[#FAFAFA] text-[#09090B] text-xs font-medium hover:bg-white flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="p-6 rounded-xl bg-[#111113] border border-[#27272A] space-y-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <h3 className="text-lg font-semibold text-[#FAFAFA]">{serv.title}</h3>
                    <p className="text-xs text-[#A1A1AA]">{serv.short_description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {serv.capabilities.map((c) => (
                        <span key={c} className="text-[10px] font-mono text-[#A3E635] bg-[#A3E635]/10 px-2 py-0.5 rounded border border-[#A3E635]/20">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingService(serv);
                        setIsServiceModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded bg-[#18181B] border border-[#27272A] text-xs text-[#FAFAFA] flex items-center space-x-1 hover:bg-[#27272A]"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#A3E635]" />
                      <span>Edit Service</span>
                    </button>
                    <button
                      onClick={() => handleDeleteService(serv.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 rounded bg-[#18181B]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PROJECT EDITOR MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111113] border border-[#27272A] max-w-2xl w-full rounded-2xl p-6 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
              <h3 className="text-lg font-semibold text-[#FAFAFA]">
                {projects.some((p) => p.id === editingProject.id) ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-[#71717A] hover:text-[#FAFAFA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                  />
                </div>
                <div>
                  <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Category</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                  />
                </div>
                <div>
                  <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Outcome Metric</label>
                  <input
                    type="text"
                    required
                    value={editingProject.outcome}
                    onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                    className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Summary</label>
                <textarea
                  rows={2}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Problem Statement</label>
                <textarea
                  rows={2}
                  value={editingProject.problem}
                  onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Solution & Approach</label>
                <textarea
                  rows={2}
                  value={editingProject.solution}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-[#FAFAFA]">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded border-[#27272A]"
                  />
                  <span>Featured Project</span>
                </label>
                <label className="flex items-center space-x-2 text-[#FAFAFA]">
                  <input
                    type="checkbox"
                    checked={editingProject.is_confidential}
                    onChange={(e) => setEditingProject({ ...editingProject, is_confidential: e.target.checked })}
                    className="rounded border-[#27272A]"
                  />
                  <span>Confidential Case Study</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#27272A] flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#FAFAFA] text-[#09090B] font-medium hover:bg-white"
                >
                  Save Project to Neon DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE EDITOR MODAL */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111113] border border-[#27272A] max-w-xl w-full rounded-2xl p-6 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
              <h3 className="text-lg font-semibold text-[#FAFAFA]">
                {services.some((s) => s.id === editingService.id) ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="text-[#71717A] hover:text-[#FAFAFA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Short Description</label>
                <input
                  type="text"
                  required
                  value={editingService.short_description}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Full Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Capabilities (comma separated)</label>
                <input
                  type="text"
                  value={editingService.capabilities.join(", ")}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      capabilities: e.target.value.split(",").map((c) => c.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="block text-[#FAFAFA] mb-1 font-mono uppercase">Tech Highlights (comma separated)</label>
                <input
                  type="text"
                  value={editingService.tech_highlight.join(", ")}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      tech_highlight: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 bg-[#09090B] border border-[#27272A] rounded text-[#FAFAFA]"
                />
              </div>

              <div className="pt-4 border-t border-[#27272A] flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#FAFAFA] text-[#09090B] font-medium hover:bg-white"
                >
                  Save Service to Neon DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
