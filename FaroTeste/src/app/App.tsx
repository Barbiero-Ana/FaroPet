import { createContext, useContext, useState, useEffect } from "react";
import {
  Home, PawPrint, Calendar, Settings, Bell, Plus, ChevronRight,
  ChevronLeft, Eye, EyeOff, Search, Filter, X, Check, Clock,
  MapPin, Phone, Mail, Lock, User, Edit2, Trash2, AlertCircle,
  CheckCircle, XCircle, Heart, Syringe, Pill, LogOut, Moon, Sun,
  MoreVertical, Camera, ArrowRight, Info, Star, Shield
} from "lucide-react";

import imgOnboarding1 from "@/imports/IPhone1415ProMax1/9d970e908cdb7a8eb364682a4a93d77d40e1821d.png";
import imgOnboarding2 from "@/imports/IPhone1415ProMax2/3fa0f5d630db51095eac4adea238f9f1eee02484.png";
import imgOnboarding3 from "@/imports/IPhone1415ProMax3/133bc8adaaa6dcfebb92a7c5800af1dad4eef47f.png";
import imgLoginIllustration from "@/imports/Login/8990c52b4b22bad115a57cae66e8de2ea5a82b2d.png";
import imgUserAvatar from "@/imports/Homepage/c87ce173e6c8c86b453188a1b222549070cb17cc.png";
import imgPetCard from "@/imports/Homepage/a1d05f4be6f4739c76797a250c9d1547d674f368.png";
import imgClinic1 from "@/imports/Homepage/2a9f487081e3fc497ff6dee5dabf7fd22d2e7d0b.png";
import imgClinic2 from "@/imports/Homepage/7ef32cf936cb5b763e5b68472de39ead4c1e4aa4.png";
import imgClinic3 from "@/imports/Homepage/7fb7e5fa4cbcc7f55de350b0bded5ce84a85ebc8.png";
import imgClinic4 from "@/imports/Homepage/a4c369e0f5a4330a875daf7205abcf52f5d3a6eb.png";
import imgClinic5 from "@/imports/Homepage/d05f82d2464181f4c87c7df9d44d17d80be31ead.png";
import imgClinic6 from "@/imports/Homepage/f0021328905960a0402983283d6417d0c134603b.png";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  | "onboarding" | "login" | "register" | "forgot"
  | "home" | "pets" | "pet-form" | "pet-detail"
  | "vaccines" | "vaccine-form"
  | "appointments" | "appointment-form"
  | "medications" | "medication-form"
  | "agenda" | "notifications" | "adoption" | "adoption-form"
  | "clinics" | "settings";

type PetType = "dog" | "cat" | "bird" | "fish" | "hamster" | "rabbit" | "other";
type VaccineStatus = "pending" | "taken" | "scheduled";
type AppointmentStatus = "scheduled" | "completed" | "canceled";
type MedType = "pill" | "liquid" | "injection" | "topical" | "other";
type AdoptionStatus = "available" | "in_process" | "adopted";

interface AppUser {
  id: string; firstName: string; lastName: string;
  email: string; phone: string; cpf: string; avatar?: string;
}
interface Pet {
  id: string; name: string; type: PetType; breed: string;
  gender: "male" | "female"; birthDate: string; weight?: number;
  conditions?: string; notes?: string; photo?: string;
}
interface Vaccine {
  id: string; petId: string; name: string; recommendedAge: string;
  status: VaccineStatus; dateTaken?: string; scheduledDate?: string;
  clinic?: string; vet?: string; batch?: string; notes?: string; nextDose?: string;
}
interface Appointment {
  id: string; petId: string; date: string; time: string;
  reason: string; location: string; vet?: string;
  hasMedication: boolean; medicationDetails?: string;
  observations?: string; status: AppointmentStatus;
}
interface Medication {
  id: string; petId: string; name: string; dosage?: string;
  frequency: string; durationDays: number; startDate: string;
  endDate: string; fasting: boolean; type: MedType;
  reason: string; observations?: string;
  doses: { date: string; time: string; status: "taken" | "skipped" | "pending" }[];
}
interface AppNotification {
  id: string; title: string; body: string;
  type: "vaccine" | "appointment" | "medication" | "general";
  date: string; read: boolean;
}
interface AdoptionPost {
  id: string; animalName?: string; animalType: string; breed?: string;
  gender: string; age: string; photo?: string; description: string;
  city: string; state: string; contactName: string; contact: string;
  status: AdoptionStatus;
}
interface Clinic {
  id: string; name: string; distance: string; address: string;
  phone: string; rating: number; image: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_USER: AppUser = {
  id: "u1", firstName: "Roberta", lastName: "Silva",
  email: "roberta@email.com", phone: "(11) 99999-1234", cpf: "123.456.789-00",
};

const MOCK_PETS: Pet[] = [
  { id: "p1", name: "Floquinho", type: "dog", breed: "Golden Retriever", gender: "male",
    birthDate: "2021-03-15", weight: 28, photo: imgPetCard },
  { id: "p2", name: "Mia", type: "cat", breed: "Siamesa", gender: "female",
    birthDate: "2022-07-20", weight: 4 },
];

const today = new Date().toISOString().split("T")[0];
const MOCK_VACCINES: Vaccine[] = [
  { id: "v1", petId: "p1", name: "V8 Polivalente", recommendedAge: "2 meses", status: "taken", dateTaken: "2021-05-20" },
  { id: "v2", petId: "p1", name: "Antirrábica", recommendedAge: "3 meses", status: "scheduled", scheduledDate: "2024-08-10" },
  { id: "v3", petId: "p1", name: "Gripe Canina", recommendedAge: "Anual", status: "pending" },
  { id: "v4", petId: "p2", name: "Tríplice Felina", recommendedAge: "2 meses", status: "taken", dateTaken: "2022-09-10" },
  { id: "v5", petId: "p2", name: "FIV/FeLV", recommendedAge: "12 meses", status: "scheduled", scheduledDate: "2024-09-01" },
  { id: "v6", petId: "p2", name: "Antirrábica Felina", recommendedAge: "3 meses", status: "pending" },
  { id: "v7", petId: "p1", name: "Leishmaniose", recommendedAge: "6 meses", status: "pending" },
];

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "a1", petId: "p1", date: "2024-08-15", time: "10:00", reason: "Consulta de rotina",
    location: "Clínica VetCare", vet: "Dra. Ana Lima", hasMedication: false, status: "scheduled" },
  { id: "a2", petId: "p2", date: "2024-07-10", time: "14:30", reason: "Vacinação",
    location: "PetSaúde", hasMedication: true, medicationDetails: "Vermífugo", status: "completed" },
  { id: "a3", petId: "p1", date: "2024-06-01", time: "09:00", reason: "Banho e tosa",
    location: "PetShop Amigo", hasMedication: false, status: "canceled" },
];

const MOCK_MEDICATIONS: Medication[] = [
  { id: "m1", petId: "p1", name: "Nexgard", dosage: "1 comprimido", frequency: "30 dias",
    durationDays: 365, startDate: "2024-01-01", endDate: "2024-12-31",
    fasting: false, type: "pill", reason: "Antipulgas e carrapatos",
    doses: [{ date: today, time: "08:00", status: "pending" }] },
  { id: "m2", petId: "p2", name: "Drontal", dosage: "1/2 comprimido", frequency: "6 meses",
    durationDays: 180, startDate: "2024-01-15", endDate: "2024-07-15",
    fasting: true, type: "pill", reason: "Vermífugo",
    doses: [{ date: "2024-01-15", time: "08:00", status: "taken" }] },
];

const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", title: "Vacina próxima", body: "Antirrábica do Floquinho está agendada para 10/08.", type: "vaccine", date: today, read: false },
  { id: "n2", title: "Consulta amanhã", body: "Floquinho tem consulta amanhã às 10h na VetCare.", type: "appointment", date: today, read: false },
  { id: "n3", title: "Medicação hoje", body: "Dar Nexgard ao Floquinho hoje.", type: "medication", date: today, read: true },
  { id: "n4", title: "Vacina pendente", body: "Gripe Canina do Floquinho está pendente.", type: "vaccine", date: "2024-07-01", read: true },
];

const MOCK_ADOPTION: AdoptionPost[] = [
  { id: "ad1", animalName: "Bolinha", animalType: "dog", breed: "Vira-lata", gender: "male",
    age: "2 anos", description: "Dócil e brincalhão, vacinado e castrado.", city: "São Paulo", state: "SP",
    contactName: "Maria", contact: "(11) 98765-4321", status: "available" },
  { id: "ad2", animalName: "Luna", animalType: "cat", gender: "female",
    age: "8 meses", description: "Filhote dócil, adora colo.", city: "São Paulo", state: "SP",
    contactName: "João", contact: "joao@email.com", status: "available" },
  { id: "ad3", animalType: "dog", breed: "Beagle", gender: "female",
    age: "3 anos", description: "Resgatada da rua, precisa de lar amoroso.", city: "Campinas", state: "SP",
    contactName: "ONG Amigo Pet", contact: "(19) 3333-1111", status: "in_process" },
];

const MOCK_CLINICS: Clinic[] = [
  { id: "c1", name: "VetCare Centro", distance: "0.8 km", address: "Rua das Flores, 123", phone: "(11) 3333-1111", rating: 4.8, image: imgClinic1 },
  { id: "c2", name: "PetSaúde", distance: "1.2 km", address: "Av. Paulista, 456", phone: "(11) 3333-2222", rating: 4.5, image: imgClinic2 },
  { id: "c3", name: "Clínica Animal Care", distance: "2.0 km", address: "Rua Augusta, 789", phone: "(11) 3333-3333", rating: 4.7, image: imgClinic3 },
  { id: "c4", name: "VetAmigo", distance: "2.5 km", address: "Rua Oscar Freire, 321", phone: "(11) 3333-4444", rating: 4.3, image: imgClinic4 },
  { id: "c5", name: "PetClínica SP", distance: "3.1 km", address: "Rua Haddock Lobo, 555", phone: "(11) 3333-5555", rating: 4.6, image: imgClinic5 },
  { id: "c6", name: "Hospital Veterinário", distance: "4.0 km", address: "Av. Rebouças, 888", phone: "(11) 3333-6666", rating: 4.9, image: imgClinic6 },
];

// ─── Context ──────────────────────────────────────────────────────────────────
interface AppContextType {
  page: Page; navigate: (p: Page, data?: any) => void; navData: any;
  user: AppUser | null; isLoggedIn: boolean;
  login: (email: string, pw: string) => boolean;
  logout: () => void;
  register: (data: Partial<AppUser> & { password: string }) => void;
  pets: Pet[]; addPet: (p: Omit<Pet, "id">) => void;
  updatePet: (p: Pet) => void; deletePet: (id: string) => void;
  vaccines: Vaccine[]; addVaccine: (v: Omit<Vaccine, "id">) => void;
  updateVaccine: (v: Vaccine) => void; deleteVaccine: (id: string) => void;
  appointments: Appointment[]; addAppointment: (a: Omit<Appointment, "id">) => void;
  updateAppointment: (a: Appointment) => void; deleteAppointment: (id: string) => void;
  medications: Medication[]; addMedication: (m: Omit<Medication, "id" | "doses">) => void;
  updateMedication: (m: Medication) => void; deleteMedication: (id: string) => void;
  notifications: AppNotification[]; markRead: (id: string) => void;
  markAllRead: () => void; deleteNotification: (id: string) => void;
  adoption: AdoptionPost[]; addAdoption: (a: Omit<AdoptionPost, "id">) => void;
  clinics: Clinic[];
  toast: { msg: string; type: "success" | "error" | "info" } | null;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
  darkMode: boolean; toggleDark: () => void;
  fontSize: "normal" | "large"; toggleFontSize: () => void;
}

const AppCtx = createContext<AppContextType>(null!);
const useApp = () => useContext(AppCtx);

function uid() { return Math.random().toString(36).slice(2, 10); }

function AppProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>("onboarding");
  const [navData, setNavData] = useState<any>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS);
  const [vaccines, setVaccines] = useState<Vaccine[]>(MOCK_VACCINES);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [adoption, setAdoption] = useState<AdoptionPost[]>(MOCK_ADOPTION);
  const [toast, setToast] = useState<AppContextType["toast"]>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");

  const navigate = (p: Page, data?: any) => { setPage(p); setNavData(data ?? null); };
  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (email: string, _pw: string) => {
    if (email === MOCK_USER.email || email.includes("@")) {
      setUser(MOCK_USER); navigate("home"); return true;
    }
    return false;
  };
  const logout = () => { setUser(null); navigate("login"); };
  const register = (data: Partial<AppUser> & { password: string }) => {
    setUser({ id: uid(), firstName: data.firstName ?? "", lastName: data.lastName ?? "",
      email: data.email ?? "", phone: data.phone ?? "", cpf: data.cpf ?? "" });
    navigate("home");
  };

  const addPet = (p: Omit<Pet, "id">) => { setPets(prev => [...prev, { ...p, id: uid() }]); showToast("Pet adicionado!"); };
  const updatePet = (p: Pet) => { setPets(prev => prev.map(x => x.id === p.id ? p : x)); showToast("Pet atualizado!"); };
  const deletePet = (id: string) => { setPets(prev => prev.filter(x => x.id !== id)); showToast("Pet removido.", "info"); };

  const addVaccine = (v: Omit<Vaccine, "id">) => { setVaccines(prev => [...prev, { ...v, id: uid() }]); showToast("Vacina registrada!"); };
  const updateVaccine = (v: Vaccine) => { setVaccines(prev => prev.map(x => x.id === v.id ? v : x)); showToast("Vacina atualizada!"); };
  const deleteVaccine = (id: string) => { setVaccines(prev => prev.filter(x => x.id !== id)); };

  const addAppointment = (a: Omit<Appointment, "id">) => { setAppointments(prev => [...prev, { ...a, id: uid() }]); showToast("Consulta agendada!"); };
  const updateAppointment = (a: Appointment) => { setAppointments(prev => prev.map(x => x.id === a.id ? a : x)); showToast("Consulta atualizada!"); };
  const deleteAppointment = (id: string) => { setAppointments(prev => prev.filter(x => x.id !== id)); };

  const addMedication = (m: Omit<Medication, "id" | "doses">) => {
    setMedications(prev => [...prev, { ...m, id: uid(), doses: [] }]);
    showToast("Medicação adicionada!");
  };
  const updateMedication = (m: Medication) => { setMedications(prev => prev.map(x => x.id === m.id ? m : x)); showToast("Medicação atualizada!"); };
  const deleteMedication = (id: string) => { setMedications(prev => prev.filter(x => x.id !== id)); };

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const addAdoption = (a: Omit<AdoptionPost, "id">) => { setAdoption(prev => [...prev, { ...a, id: uid() }]); showToast("Publicado com sucesso!"); };

  const toggleDark = () => {
    setDarkMode(d => {
      document.documentElement.classList.toggle("dark", !d);
      return !d;
    });
  };
  const toggleFontSize = () => setFontSize(s => s === "normal" ? "large" : "normal");

  return (
    <AppCtx.Provider value={{
      page, navigate, navData, user, isLoggedIn: !!user,
      login, logout, register,
      pets, addPet, updatePet, deletePet,
      vaccines, addVaccine, updateVaccine, deleteVaccine,
      appointments, addAppointment, updateAppointment, deleteAppointment,
      medications, addMedication, updateMedication, deleteMedication,
      notifications, markRead, markAllRead, deleteNotification,
      adoption, addAdoption, clinics: MOCK_CLINICS,
      toast, showToast, darkMode, toggleDark, fontSize, toggleFontSize,
    }}>
      {children}
    </AppCtx.Provider>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcAge(birthDate: string) {
  const b = new Date(birthDate);
  const now = new Date();
  const years = now.getFullYear() - b.getFullYear();
  const months = now.getMonth() - b.getMonth();
  if (years === 0) return `${months < 0 ? 0 : months} meses`;
  return `${years} ano${years > 1 ? "s" : ""}`;
}

function petIcon(type: PetType) {
  const icons: Record<PetType, string> = {
    dog: "🐕", cat: "🐈", bird: "🐦", fish: "🐠", hamster: "🐹", rabbit: "🐇", other: "🐾",
  };
  return icons[type] ?? "🐾";
}

const PET_TYPE_LABELS: Record<PetType, string> = {
  dog: "Cachorro", cat: "Gato", bird: "Pássaro",
  fish: "Peixe", hamster: "Hamster", rabbit: "Coelho", other: "Outro",
};

function fmtDate(d?: string) {
  if (!d) return "--";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

const STATUS_COLORS: Record<VaccineStatus, string> = {
  taken: "text-green-600 bg-green-50",
  scheduled: "text-blue-600 bg-blue-50",
  pending: "text-orange-600 bg-orange-50",
};
const STATUS_LABELS: Record<VaccineStatus, string> = {
  taken: "Tomada", scheduled: "Agendada", pending: "Pendente",
};
const APT_STATUS_COLORS: Record<AppointmentStatus, string> = {
  scheduled: "text-blue-600 bg-blue-50",
  completed: "text-green-600 bg-green-50",
  canceled: "text-red-600 bg-red-50",
};
const APT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: "Agendada", completed: "Realizada", canceled: "Cancelada",
};

// ─── UI Components ────────────────────────────────────────────────────────────
function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  const colors = { success: "bg-green-500", error: "bg-red-500", info: "bg-blue-500" };
  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[toast.type]} max-w-xs text-center`}>
      {toast.msg}
    </div>
  );
}

function SidebarNav() {
  const { page, navigate, notifications, user, logout } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  const items = [
    { id: "home",         label: "Início",          icon: Home },
    { id: "pets",         label: "Meus Pets",        icon: PawPrint },
    { id: "vaccines",     label: "Saúde",            icon: Syringe },
    { id: "agenda",       label: "Agenda",           icon: Calendar },
    { id: "notifications",label: "Notificações",     icon: Bell,    badge: unread },
    { id: "adoption",     label: "Adoção",           icon: Heart },
    { id: "clinics",      label: "Clínicas",         icon: MapPin },
    { id: "settings",     label: "Configurações",    icon: Settings },
  ] as const;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-20">
      <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shrink-0">
          <PawPrint size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">Faro</p>
          <p className="text-[11px] text-gray-400">Saúde Pet</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {items.map(item => {
          const active = page === item.id || (item.id === "vaccines" && ["vaccines","vaccine-form"].includes(page));
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => navigate(item.id as Page)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative w-full text-left ${active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"}`}>
              <Icon size={17} className="shrink-0" />
              {item.label}
              {"badge" in item && item.badge > 0 && (
                <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <User size={15} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </aside>
  );
}

function BottomNav() {
  const { page, navigate, notifications } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  const items = [
    { id: "home", label: "Início", icon: Home },
    { id: "clinics", label: "Clínicas", icon: MapPin },
    { id: "pets", label: "Pets", icon: PawPrint },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "settings", label: "Menu", icon: Settings },
  ] as const;

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 flex justify-center pointer-events-none">
      <nav className="bg-brand-orange rounded-full px-4 py-2.5 flex items-center justify-between w-full max-w-sm shadow-xl pointer-events-auto">
        {items.map(item => {
          const active = page === item.id || (item.id === "agenda" && (page === "vaccines" || page === "vaccine-form" || page === "appointments" || page === "medications" || page === "agenda"));
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => navigate(item.id as Page)}
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all active:scale-95">
              {active && <div className="absolute inset-0 bg-white rounded-full shadow-sm" />}
              <Icon size={24} className={`relative z-10 transition-colors ${active ? "text-brand-orange" : "text-white"}`} strokeWidth={active ? 2.5 : 2} />
              {item.id === "settings" && unread > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold border-2 border-brand-orange"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function BackHeader({ title, onBack, rightEl }: { title: string; onBack?: () => void; rightEl?: React.ReactNode }) {
  const { navigate } = useApp();
  return (
    <div className="sticky top-0 z-10 bg-background border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 h-14">
      <button onClick={onBack ?? (() => navigate("home"))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        <ChevronLeft size={18} className="text-gray-600" />
      </button>
      <h1 className="font-semibold text-sm text-gray-800 truncate px-2">{title}</h1>
      <div className="w-9 flex justify-end shrink-0">{rightEl}</div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange, placeholder, error, rightEl }: {
  label?: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; rightEl?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all
            ${error ? "border-red-400" : "border-gray-200 focus:border-primary"}
            ${rightEl ? "pr-12" : ""}`} />
        {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", full = false, disabled = false, type = "button" }: {
  children: React.ReactNode; onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg"; full?: boolean; disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base = "font-semibold rounded-xl transition-all flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white active:opacity-80",
    outline: "border-2 border-primary text-primary bg-transparent active:bg-orange-50",
    ghost: "text-gray-600 bg-gray-100 active:bg-gray-200",
    danger: "bg-red-500 text-white active:opacity-80",
  };
  const sizes = { sm: "px-3 py-2 text-xs", md: "px-5 py-3 text-sm", lg: "px-6 py-4 text-base" };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      {children}
    </button>
  );
}

function Select({ label, value, onChange, options, error }: {
  label?: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all appearance-none
          ${error ? "border-red-400" : "border-gray-200 focus:border-primary"}`}>
        <option value="">Selecione...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

function Badge({ label, className = "" }: { label: string; className?: string }) {
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>{label}</span>;
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
const ONBOARDING_SLIDES = [
  { img: imgOnboarding1, title: "Bem-vindo ao Faro", sub: "Sua carteira digital de saúde pet. Tudo sobre seu animal em um só lugar." },
  { img: imgOnboarding2, title: "Vacinas em dia", sub: "Registre vacinas, receba alertas e nunca esqueça uma dose importante." },
  { img: imgOnboarding3, title: "Cuidado completo", sub: "Consultas, medicações, adoção e clínicas próximas. Tudo com você." },
];

function Onboarding() {
  const { navigate } = useApp();
  const [slide, setSlide] = useState(0);
  const s = ONBOARDING_SLIDES[slide];

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <img src={s.img} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 px-8 text-white">
          <h1 className="text-2xl font-bold mb-2">{s.title}</h1>
          <p className="text-sm opacity-90 leading-relaxed">{s.sub}</p>
        </div>
      </div>
      <div className="bg-white px-6 py-6 flex flex-col gap-4">
        <div className="flex justify-center gap-2">
          {ONBOARDING_SLIDES.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-2 bg-gray-200"}`} />
          ))}
        </div>
        {slide < ONBOARDING_SLIDES.length - 1 ? (
          <div className="flex gap-3">
            <Btn variant="ghost" full onClick={() => navigate("login")}>Pular</Btn>
            <Btn variant="primary" full onClick={() => setSlide(s => s + 1)}>Próximo</Btn>
          </div>
        ) : (
          <div className="flex gap-3">
            <Btn variant="outline" full onClick={() => navigate("login")}>Entrar</Btn>
            <Btn variant="primary" full onClick={() => navigate("register")}>Criar conta</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function Login() {
  const { navigate, login, showToast } = useApp();
  const [email, setEmail] = useState("roberta@email.com");
  const [password, setPassword] = useState("123456");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = "Informe o e-mail";
    else if (!email.includes("@")) errs.email = "E-mail inválido";
    if (!password) errs.password = "Informe a senha";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!login(email, password)) showToast("E-mail ou senha inválidos", "error");
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <div className="bg-primary px-6 pt-14 pb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
          <PawPrint size={40} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-white">Faro</h1>
        <p className="text-orange-100 text-sm mt-1">Saúde do seu pet em primeiro lugar</p>
      </div>
      <div className="flex-1 px-6 py-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Bem-vindo de volta</h2>
          <p className="text-gray-500 text-sm mt-1">Entre na sua conta para continuar</p>
        </div>
        <img src={imgLoginIllustration} alt="" className="w-40 h-32 object-contain mx-auto" />
        <div className="flex flex-col gap-4">
          <Input label="E-mail" type="email" value={email} onChange={setEmail}
            placeholder="seu@email.com" error={errors.email} />
          <Input label="Senha" type={showPw ? "text" : "password"} value={password}
            onChange={setPassword} placeholder="••••••••" error={errors.password}
            rightEl={
              <button onClick={() => setShowPw(!showPw)} className="text-gray-400">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            } />
          <button onClick={() => navigate("forgot")} className="text-primary text-sm font-medium text-right">
            Esqueci minha senha
          </button>
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>Entrar</Btn>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Btn variant="outline" full onClick={() => navigate("register")}>Criar conta</Btn>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────────────────
function Register() {
  const { navigate, register } = useApp();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", cpf: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = "Obrigatório";
    if (!form.lastName) errs.lastName = "Obrigatório";
    if (!form.email || !form.email.includes("@")) errs.email = "E-mail inválido";
    if (!form.phone) errs.phone = "Obrigatório";
    if (!form.cpf || form.cpf.length < 11) errs.cpf = "CPF inválido";
    if (!form.password || form.password.length < 6) errs.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) errs.confirm = "Senhas não coincidem";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    register(form);
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <BackHeader title="Criar conta" onBack={() => navigate("login")} />
      <div className="px-6 pb-10 flex flex-col gap-4">
        <p className="text-gray-500 text-sm">Preencha os dados para criar sua conta.</p>
        <div className="flex gap-3">
          <Input label="Nome" value={form.firstName} onChange={set("firstName")} placeholder="Nome" error={errors.firstName} />
          <Input label="Sobrenome" value={form.lastName} onChange={set("lastName")} placeholder="Sobrenome" error={errors.lastName} />
        </div>
        <Input label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" error={errors.email} />
        <Input label="Telefone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(11) 99999-9999" error={errors.phone} />
        <Input label="CPF" value={form.cpf} onChange={set("cpf")} placeholder="000.000.000-00" error={errors.cpf} />
        <Input label="Senha" type={showPw ? "text" : "password"} value={form.password} onChange={set("password")}
          placeholder="Mínimo 6 caracteres" error={errors.password}
          rightEl={<button onClick={() => setShowPw(!showPw)} className="text-gray-400">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>} />
        <Input label="Confirmar senha" type={showPw ? "text" : "password"} value={form.confirm} onChange={set("confirm")}
          placeholder="Repita a senha" error={errors.confirm} />
        <Btn variant="primary" full size="lg" onClick={submit}>Criar conta</Btn>
        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <button onClick={() => navigate("login")} className="text-primary font-semibold">Entrar</button>
        </p>
      </div>
    </div>
  );
}

// ─── Forgot Password ──────────────────────────────────────────────────────────
function ForgotPassword() {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!email || !email.includes("@")) { showToast("Informe um e-mail válido", "error"); return; }
    setSent(true);
    showToast("Link enviado para seu e-mail!");
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-background">
      <BackHeader title="Esqueci minha senha" onBack={() => navigate("login")} />
      <div className="flex-1 px-6 flex flex-col justify-center gap-6">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <Lock size={36} className="text-primary" />
        </div>
        {sent ? (
          <div className="text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h2 className="font-bold text-lg text-gray-800 mb-2">E-mail enviado!</h2>
            <p className="text-gray-500 text-sm">Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
            <button onClick={() => navigate("login")} className="mt-6 text-primary font-semibold text-sm">Voltar para o login</button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="font-bold text-xl text-gray-800 mb-2">Redefinir senha</h2>
              <p className="text-gray-500 text-sm">Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
            </div>
            <Input label="E-mail" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" />
            <Btn variant="primary" full size="lg" onClick={submit}>Enviar link</Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomeScreen() {
  const { user, navigate, pets, vaccines, notifications, clinics } = useApp();
  const unread = notifications.filter(n => !n.read).length;
  const upcomingVaccines = vaccines.filter(v => v.status === "scheduled" || v.status === "pending").slice(0, 3);

  return (
    <div className="flex flex-col bg-[#f8f9fa] min-h-screen pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-6 relative overflow-hidden">
        {/* Top right shape */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#b45309] rounded-bl-full z-0 -mr-4 -mt-4"></div>
        
        <div className="relative flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
              <img src={imgUserAvatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-gray-700 text-sm">Olá,</p>
              <h1 className="text-gray-900 text-xl font-bold leading-tight">{user?.firstName} {user?.lastName}</h1>
            </div>
          </div>
          <button onClick={() => navigate("notifications")} className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-orange border border-gray-100">
            <Bell size={20} />
            {unread > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
          </button>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-8 mt-2">
        {/* Pets cadastrados */}
        <div>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Pets cadastrados</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar items-center">
            {pets.map(p => (
              <button key={p.id} onClick={() => navigate("pet-detail", p)}
                className="flex-shrink-0 flex flex-col items-center bg-[#a6632f] rounded-2xl overflow-hidden shadow-sm w-36 h-44 relative transition-transform active:scale-95">
                <div className="w-full h-32 p-2 pb-0">
                  {p.photo
                    ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover rounded-xl" />
                    : <div className="w-full h-full flex items-center justify-center text-4xl bg-orange-100 rounded-xl">{petIcon(p.type)}</div>
                  }
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                   <span className="text-sm font-semibold text-white">{p.name}</span>
                </div>
              </button>
            ))}
            {pets.length < 3 && (
              <button onClick={() => navigate("pet-form")}
                className="flex-shrink-0 w-14 h-14 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center ml-2 bg-transparent transition-transform active:scale-95">
                <Plus size={24} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>

        {/* Próximas vacinas */}
        <div>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Próximas vacinas</h2>
          <div className="flex flex-col gap-3">
            {upcomingVaccines.length > 0 ? upcomingVaccines.map(v => (
              <Card key={v.id} className="p-3 flex items-center gap-4 border-none shadow-sm rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0">
                  <Syringe size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{v.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-0.5 h-3.5 rounded-full ${v.status === "scheduled" ? "bg-green-500" : "bg-red-500"}`}></div>
                    <p className={`text-xs font-medium ${v.status === "scheduled" ? "text-green-600" : "text-red-500"}`}>
                      {v.status === "scheduled" ? "Agendada" : "A agendar"}
                    </p>
                  </div>
                </div>
                <button onClick={() => navigate("vaccine-form", v)} className="flex items-center gap-2 flex-shrink-0 group">
                  <span className="text-[11px] text-gray-500 font-medium">Ver detalhes</span>
                  <div className="w-7 h-7 bg-brand-orange rounded-full flex items-center justify-center group-active:scale-95 transition-transform">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </button>
              </Card>
            )) : (
               <p className="text-sm text-gray-500 px-1">Nenhuma vacina pendente ou agendada.</p>
            )}
            
            <Btn variant="primary" full className="mt-3 py-3.5 rounded-xl font-bold shadow-sm" onClick={() => navigate("vaccines")}>
              Ver mais
            </Btn>
          </div>
        </div>

        {/* Clinicas veterinárias */}
        <div>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Clinicas veterinárias próximas de você</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {clinics.slice(0, 4).map(c => (
              <div key={c.id} className="flex-shrink-0 w-28 flex flex-col items-center">
                <Card className="w-full flex flex-col items-center p-3 border-none shadow-sm rounded-2xl gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 bg-white">
                     <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 text-center line-clamp-1">{c.name}</p>
                </Card>
              </div>
            ))}
          </div>
          <Btn variant="primary" full className="mt-4 py-3.5 rounded-xl font-bold shadow-sm" onClick={() => navigate("clinics")}>
            Ver mais
          </Btn>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// ─── Pets List ────────────────────────────────────────────────────────────────
function Pets() {
  const { pets, navigate } = useApp();

  return (
    <div className="flex flex-col bg-background">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Meus Pets</h1>
        {pets.length < 3
          ? <button onClick={() => navigate("pet-form")} className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <Plus size={20} className="text-white" />
            </button>
          : <div className="w-9" />
        }
      </div>

      {pets.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <PawPrint size={40} className="text-primary" />
          </div>
          <h2 className="font-bold text-gray-700">Nenhum pet cadastrado</h2>
          <p className="text-gray-400 text-sm">Adicione seu primeiro pet para começar a gerenciar a saúde dele!</p>
          <Btn variant="primary" onClick={() => navigate("pet-form")}>Adicionar pet</Btn>
        </div>
      ) : (
        <div className="px-5 flex flex-col gap-3">
          {pets.map(p => (
            <button key={p.id} onClick={() => navigate("pet-detail", p)}
              className="text-left w-full">
              <Card className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-orange-100 flex-shrink-0">
                  {p.photo
                    ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-3xl">{petIcon(p.type)}</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500">{PET_TYPE_LABELS[p.type]} • {p.breed}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{calcAge(p.birthDate)} • {p.gender === "male" ? "Macho" : "Fêmea"}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </Card>
            </button>
          ))}
          {pets.length >= 3 && (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-3">
              <Info size={16} className="text-orange-500 flex-shrink-0" />
              <p className="text-xs text-orange-700">Limite de 3 pets por conta atingido.</p>
            </div>
          )}
        </div>
      )}
      <BottomNav />
    </div>
  );
}

// ─── Pet Form ─────────────────────────────────────────────────────────────────
function PetForm() {
  const { navData, navigate, addPet, updatePet, showToast } = useApp();
  const editing = navData as Pet | null;

  const [form, setForm] = useState({
    name: editing?.name ?? "", type: (editing?.type ?? "dog") as PetType,
    breed: editing?.breed ?? "", gender: (editing?.gender ?? "male") as "male" | "female",
    birthDate: editing?.birthDate ?? "", weight: String(editing?.weight ?? ""),
    conditions: editing?.conditions ?? "", notes: editing?.notes ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = "Obrigatório";
    if (!form.breed) errs.breed = "Obrigatório";
    if (!form.birthDate) errs.birthDate = "Obrigatório";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const pet = {
      name: form.name, type: form.type, breed: form.breed,
      gender: form.gender, birthDate: form.birthDate,
      weight: form.weight ? Number(form.weight) : undefined,
      conditions: form.conditions || undefined, notes: form.notes || undefined,
    };
    if (editing) updatePet({ ...editing, ...pet });
    else addPet(pet);
    navigate("pets");
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <BackHeader title={editing ? "Editar pet" : "Novo pet"} onBack={() => navigate("pets")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <div className="flex justify-center py-4">
          <div className="w-24 h-24 rounded-2xl bg-orange-100 border-2 border-dashed border-primary/40 flex flex-col items-center justify-center gap-1 cursor-pointer">
            <Camera size={24} className="text-primary" />
            <span className="text-xs text-primary font-medium">Foto</span>
          </div>
        </div>
        <Input label="Nome do pet" value={form.name} onChange={set("name")} placeholder="Ex: Floquinho" error={errors.name} />
        <Select label="Tipo de animal" value={form.type} onChange={v => setForm(f => ({ ...f, type: v as PetType }))}
          options={Object.entries(PET_TYPE_LABELS).map(([k, v]) => ({ value: k, label: v }))} />
        <Input label="Raça" value={form.breed} onChange={set("breed")} placeholder="Ex: Golden Retriever" error={errors.breed} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Sexo</label>
          <div className="flex gap-3">
            {[{ v: "male", l: "Macho" }, { v: "female", l: "Fêmea" }].map(({ v, l }) => (
              <button key={v} onClick={() => setForm(f => ({ ...f, gender: v as "male" | "female" }))}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${form.gender === v ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-500"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <Input label="Data de nascimento" type="date" value={form.birthDate} onChange={set("birthDate")} error={errors.birthDate} />
        {form.birthDate && (
          <p className="text-xs text-gray-500 -mt-2">Idade calculada: {calcAge(form.birthDate)}</p>
        )}
        <Input label="Peso (kg) — opcional" type="number" value={form.weight} onChange={set("weight")} placeholder="Ex: 12.5" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Comorbidades — opcional</label>
          <textarea value={form.conditions} onChange={e => set("conditions")(e.target.value)}
            placeholder="Ex: Diabetes, alergia a frango..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea value={form.notes} onChange={e => set("notes")(e.target.value)}
            placeholder="Notas adicionais..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20" />
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>
          {editing ? "Salvar alterações" : "Cadastrar pet"}
        </Btn>
      </div>
    </div>
  );
}

// ─── Pet Detail ───────────────────────────────────────────────────────────────
function PetDetail() {
  const { navData, navigate, deletePet, vaccines, appointments, medications, showToast } = useApp();
  const pet = navData as Pet;
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!pet) { navigate("pets"); return null; }

  const petVaccines = vaccines.filter(v => v.petId === pet.id);
  const petApts = appointments.filter(a => a.petId === pet.id && a.status === "scheduled");
  const petMeds = medications.filter(m => m.petId === pet.id);

  const doDelete = () => { deletePet(pet.id); navigate("pets"); };

  return (
    <div className="flex flex-col bg-background">
      <div className="relative">
        <div className="bg-primary h-40 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cellipse cx='30' cy='38' rx='9' ry='7' fill='white'/%3E%3Cellipse cx='20' cy='25' rx='5' ry='4' fill='white'/%3E%3Cellipse cx='40' cy='25' rx='5' ry='4' fill='white'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }} />
        </div>
        <button onClick={() => navigate("pets")} className="absolute top-12 left-5 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="absolute top-12 right-5 flex gap-2">
          <button onClick={() => navigate("pet-form", pet)} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Edit2 size={16} className="text-white" />
          </button>
          <button onClick={() => setConfirmDelete(true)} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Trash2 size={16} className="text-white" />
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-16 w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-orange-100">
          {pet.photo
            ? <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-4xl">{petIcon(pet.type)}</div>
          }
        </div>
      </div>

      <div className="pt-16 px-5 flex flex-col gap-5">
        <div className="text-center">
          <h1 className="font-bold text-2xl text-gray-800">{pet.name}</h1>
          <p className="text-gray-500 text-sm">{PET_TYPE_LABELS[pet.type]} • {pet.breed}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Idade", value: calcAge(pet.birthDate) },
            { label: "Sexo", value: pet.gender === "male" ? "Macho" : "Fêmea" },
            { label: "Peso", value: pet.weight ? `${pet.weight} kg` : "--" },
          ].map(({ label, value }) => (
            <Card key={label} className="p-3 text-center">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{value}</p>
            </Card>
          ))}
        </div>
        {pet.conditions && (
          <Card className="p-4">
            <p className="text-xs text-gray-400 mb-1">Comorbidades</p>
            <p className="text-sm text-gray-700">{pet.conditions}</p>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Vacinas</h3>
            <button onClick={() => navigate("vaccines")} className="text-primary text-sm">Ver todas</button>
          </div>
          <div className="flex flex-col gap-2">
            {petVaccines.slice(0, 3).map(v => (
              <Card key={v.id} className="px-4 py-3 flex items-center gap-3">
                <Syringe size={16} className="text-primary" />
                <span className="text-sm text-gray-700 flex-1">{v.name}</span>
                <Badge label={STATUS_LABELS[v.status]} className={STATUS_COLORS[v.status]} />
              </Card>
            ))}
            {petVaccines.length === 0 && <p className="text-sm text-gray-400 px-1">Nenhuma vacina registrada.</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Próximas consultas</h3>
            <button onClick={() => navigate("appointments")} className="text-primary text-sm">Ver todas</button>
          </div>
          {petApts.length === 0
            ? <p className="text-sm text-gray-400 px-1">Nenhuma consulta agendada.</p>
            : petApts.slice(0, 2).map(a => (
              <Card key={a.id} className="px-4 py-3 flex items-center gap-3 mb-2">
                <Calendar size={16} className="text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{a.reason}</p>
                  <p className="text-xs text-gray-400">{fmtDate(a.date)} {a.time}</p>
                </div>
              </Card>
            ))
          }
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg text-gray-800">Remover {pet.name}?</h3>
            <p className="text-gray-500 text-sm">Esta ação não pode ser desfeita. Todos os dados do pet serão perdidos.</p>
            <div className="flex gap-3">
              <Btn variant="ghost" full onClick={() => setConfirmDelete(false)}>Cancelar</Btn>
              <Btn variant="danger" full onClick={doDelete}>Remover</Btn>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}

// ─── Vaccines ─────────────────────────────────────────────────────────────────
function VaccineWallet() {
  const { vaccines, pets, navigate } = useApp();
  const [selectedPet, setSelectedPet] = useState<string>("all");
  const [filter, setFilter] = useState<VaccineStatus | "all">("all");

  const filtered = vaccines.filter(v => {
    if (selectedPet !== "all" && v.petId !== selectedPet) return false;
    if (filter !== "all" && v.status !== filter) return false;
    return true;
  });

  return (
    <div className="flex flex-col bg-background">
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl text-gray-800">Carteira de Vacinas</h1>
          <button onClick={() => navigate("vaccine-form")} className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <Plus size={20} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <Info size={12} /> Informativo — confirme com seu veterinário.
        </p>
      </div>

      <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {[{ id: "all", name: "Todos" }, ...pets].map(p => (
          <button key={"id" in p ? p.id : p} onClick={() => setSelectedPet("id" in p ? p.id : p)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedPet === ("id" in p ? p.id : p) ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
            {"name" in p ? p.name : "Todos"}
          </button>
        ))}
      </div>

      <div className="px-5 flex gap-2 pb-3">
        {(["all", "pending", "scheduled", "taken"] as const).map(s => {
          const labels = { all: "Todas", pending: "Pendentes", scheduled: "Agendadas", taken: "Tomadas" };
          return (
            <button key={s} onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === s ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"}`}>
              {labels[s]}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Syringe size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Nenhuma vacina encontrada.</p>
          </div>
        ) : (
          filtered.map(v => {
            const pet = pets.find(p => p.id === v.petId);
            return (
              <Card key={v.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{v.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{pet?.name} • {v.recommendedAge}</p>
                    {v.dateTaken && <p className="text-xs text-gray-400">Tomada: {fmtDate(v.dateTaken)}</p>}
                    {v.scheduledDate && <p className="text-xs text-gray-400">Agendada: {fmtDate(v.scheduledDate)}</p>}
                    {v.nextDose && <p className="text-xs text-blue-500">Próxima dose: {fmtDate(v.nextDose)}</p>}
                  </div>
                  <Badge label={STATUS_LABELS[v.status]} className={STATUS_COLORS[v.status]} />
                </div>
                <button onClick={() => navigate("vaccine-form", v)}
                  className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                  <Edit2 size={12} /> Editar
                </button>
              </Card>
            );
          })
        )}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── Mock Vaccine Options ───────────────────────────────────────────────────────
const VACCINE_OPTIONS = [
  { value: "V8 Polivalente", label: "V8 Polivalente" },
  { value: "V10 Polivalente", label: "V10 Polivalente" },
  { value: "Antirrábica", label: "Antirrábica" },
  { value: "Gripe Canina", label: "Gripe Canina" },
  { value: "Giárdia", label: "Giárdia" },
  { value: "Tríplice Felina", label: "Tríplice Felina" },
  { value: "Quádrupla Felina", label: "Quádrupla Felina" },
  { value: "FIV/FeLV", label: "FIV/FeLV" },
  { value: "Leishmaniose", label: "Leishmaniose" },
  { value: "Carrapato", label: "Carrapato" },
  { value: "Vermífugo", label: "Vermífugo" },
];

// ─── Vaccine Form ─────────────────────────────────────────────────────────────
function VaccineForm() {
  const { navData, navigate, pets, addVaccine, updateVaccine, deleteVaccine } = useApp();
  const editing = navData as Vaccine | null;

  const [form, setForm] = useState({
    petId: editing?.petId ?? (pets[0]?.id ?? ""),
    name: editing?.name ?? "",
    recommendedAge: editing?.recommendedAge ?? "",
    status: (editing?.status ?? "pending") as VaccineStatus,
    dateTaken: editing?.dateTaken ?? "",
    scheduledDate: editing?.scheduledDate ?? "",
    clinic: editing?.clinic ?? "",
    vet: editing?.vet ?? "",
    batch: editing?.batch ?? "",
    notes: editing?.notes ?? "",
    nextDose: editing?.nextDose ?? "",
  });
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.petId || !form.name) return;
    if (editing) updateVaccine({ ...editing, ...form });
    else addVaccine(form);
    navigate("vaccines");
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <BackHeader title={editing ? "Editar vacina" : "Registrar vacina"} onBack={() => navigate("vaccines")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <Select label="Pet" value={form.petId} onChange={set("petId")}
          options={pets.map(p => ({ value: p.id, label: p.name }))} />
        <Select label="Nome da vacina" value={form.name} onChange={set("name")} options={VACCINE_OPTIONS} />
        <Input label="Indicada para" value={form.recommendedAge} onChange={set("recommendedAge")} placeholder="Ex: 2 meses, Anual" />
        <Select label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v as VaccineStatus }))}
          options={[{ value: "pending", label: "Pendente" }, { value: "taken", label: "Tomada" }, { value: "scheduled", label: "Agendada" }]} />
        {form.status === "taken" && (
          <Input label="Data de aplicação" type="date" value={form.dateTaken} onChange={set("dateTaken")} />
        )}
        {form.status === "scheduled" && (
          <Input label="Data agendada" type="date" value={form.scheduledDate} onChange={set("scheduledDate")} />
        )}
        <Input label="Clínica — opcional" value={form.clinic} onChange={set("clinic")} placeholder="Nome da clínica" />
        <Input label="Veterinário — opcional" value={form.vet} onChange={set("vet")} placeholder="Dr. Nome" />
        <Input label="Lote — opcional" value={form.batch} onChange={set("batch")} placeholder="Número do lote" />
        <Input label="Próxima dose — opcional" type="date" value={form.nextDose} onChange={set("nextDose")} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea value={form.notes} onChange={e => set("notes")(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20" />
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>Salvar vacina</Btn>
        {editing && (
          <Btn variant="danger" full onClick={() => { deleteVaccine(editing.id); navigate("vaccines"); }}>Excluir vacina</Btn>
        )}
      </div>
    </div>
  );
}

// ─── Appointments ─────────────────────────────────────────────────────────────
function Appointments() {
  const { appointments, pets, navigate } = useApp();
  const [tab, setTab] = useState<"scheduled" | "history">("scheduled");

  const filtered = appointments.filter(a =>
    tab === "scheduled" ? a.status === "scheduled" : a.status !== "scheduled"
  );

  return (
    <div className="flex flex-col bg-background">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Consultas</h1>
        <button onClick={() => navigate("appointment-form")} className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
          <Plus size={20} className="text-white" />
        </button>
      </div>
      <div className="px-5 flex gap-2 mb-4">
        {[{ id: "scheduled", label: "Agendadas" }, { id: "history", label: "Histórico" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Calendar size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Nenhuma consulta encontrada.</p>
            <Btn variant="primary" size="sm" onClick={() => navigate("appointment-form")}>Agendar consulta</Btn>
          </div>
        ) : (
          filtered.map(a => {
            const pet = pets.find(p => p.id === a.petId);
            return (
              <Card key={a.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{a.reason}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{pet?.name} • {fmtDate(a.date)} às {a.time}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{a.location}</span>
                    </div>
                    {a.vet && <p className="text-xs text-gray-400">{a.vet}</p>}
                  </div>
                  <Badge label={APT_STATUS_LABELS[a.status]} className={APT_STATUS_COLORS[a.status]} />
                </div>
                <button onClick={() => navigate("appointment-form", a)} className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                  <Edit2 size={12} /> Editar
                </button>
              </Card>
            );
          })
        )}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── Appointment Form ─────────────────────────────────────────────────────────
function AppointmentForm() {
  const { navData, navigate, pets, addAppointment, updateAppointment, deleteAppointment } = useApp();
  const editing = navData as Appointment | null;

  const [form, setForm] = useState({
    petId: editing?.petId ?? (pets[0]?.id ?? ""),
    date: editing?.date ?? "", time: editing?.time ?? "",
    reason: editing?.reason ?? "", location: editing?.location ?? "",
    vet: editing?.vet ?? "", hasMedication: editing?.hasMedication ?? false,
    medicationDetails: editing?.medicationDetails ?? "",
    observations: editing?.observations ?? "",
    status: (editing?.status ?? "scheduled") as AppointmentStatus,
  });
  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.petId || !form.date || !form.reason || !form.location) return;
    if (editing) updateAppointment({ ...editing, ...form });
    else addAppointment(form);
    navigate("appointments");
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <BackHeader title={editing ? "Editar consulta" : "Nova consulta"} onBack={() => navigate("appointments")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <Select label="Pet" value={form.petId} onChange={set("petId")} options={pets.map(p => ({ value: p.id, label: p.name }))} />
        <Input label="Data" type="date" value={form.date} onChange={set("date")} />
        <Input label="Horário" type="time" value={form.time} onChange={set("time")} />
        <Input label="Motivo da consulta" value={form.reason} onChange={set("reason")} placeholder="Ex: Consulta de rotina" />
        <Input label="Local / Clínica" value={form.location} onChange={set("location")} placeholder="Nome da clínica" />
        <Input label="Veterinário — opcional" value={form.vet} onChange={set("vet")} placeholder="Dr. Nome" />
        <Select label="Status" value={form.status}
          onChange={v => setForm(f => ({ ...f, status: v as AppointmentStatus }))}
          options={[{ value: "scheduled", label: "Agendada" }, { value: "completed", label: "Realizada" }, { value: "canceled", label: "Cancelada" }]} />
        <div className="flex items-center gap-3">
          <button onClick={() => setForm(f => ({ ...f, hasMedication: !f.hasMedication }))}
            className={`w-12 h-6 rounded-full transition-all relative ${form.hasMedication ? "bg-primary" : "bg-gray-200"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.hasMedication ? "right-1" : "left-1"}`} />
          </button>
          <label className="text-sm font-medium text-gray-700">Medicação prescrita</label>
        </div>
        {form.hasMedication && (
          <Input label="Detalhes da medicação" value={form.medicationDetails} onChange={set("medicationDetails")} placeholder="Nome e dosagem" />
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea value={form.observations} onChange={e => set("observations")(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20" />
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>Salvar consulta</Btn>
        {editing && (
          <Btn variant="danger" full onClick={() => { deleteAppointment(editing.id); navigate("appointments"); }}>Excluir consulta</Btn>
        )}
      </div>
    </div>
  );
}

// ─── Medications ──────────────────────────────────────────────────────────────
function Medications() {
  const { medications, pets, navigate } = useApp();

  return (
    <div className="flex flex-col bg-background">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Medicações</h1>
        <button onClick={() => navigate("medication-form")} className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
          <Plus size={20} className="text-white" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
        {medications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Pill size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Nenhuma medicação cadastrada.</p>
            <Btn variant="primary" size="sm" onClick={() => navigate("medication-form")}>Adicionar medicação</Btn>
          </div>
        ) : (
          medications.map(m => {
            const pet = pets.find(p => p.id === m.petId);
            const pendingDoses = m.doses.filter(d => d.status === "pending").length;
            return (
              <Card key={m.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{m.name}</h3>
                      <Badge label={m.type} className="text-gray-500 bg-gray-100 capitalize" />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{pet?.name} • {m.dosage}</p>
                    <p className="text-xs text-gray-400">Frequência: {m.frequency}</p>
                    <p className="text-xs text-gray-400">Até: {fmtDate(m.endDate)}</p>
                    {m.fasting && <p className="text-xs text-orange-500 font-medium mt-1">Em jejum</p>}
                  </div>
                  {pendingDoses > 0 && <Badge label={`${pendingDoses} pendente${pendingDoses > 1 ? "s" : ""}`} className="text-orange-600 bg-orange-50" />}
                </div>
                <button onClick={() => navigate("medication-form", m)} className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                  <Edit2 size={12} /> Editar
                </button>
              </Card>
            );
          })
        )}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── Medication Form ──────────────────────────────────────────────────────────
function MedicationForm() {
  const { navData, navigate, pets, addMedication, updateMedication, deleteMedication } = useApp();
  const editing = navData as Medication | null;

  const [form, setForm] = useState({
    petId: editing?.petId ?? (pets[0]?.id ?? ""),
    name: editing?.name ?? "", dosage: editing?.dosage ?? "",
    frequency: editing?.frequency ?? "24 horas", durationDays: String(editing?.durationDays ?? 7),
    startDate: editing?.startDate ?? "", fasting: editing?.fasting ?? false,
    type: (editing?.type ?? "pill") as MedType,
    reason: editing?.reason ?? "", observations: editing?.observations ?? "",
  });
  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const endDate = form.startDate && form.durationDays
    ? new Date(new Date(form.startDate).getTime() + Number(form.durationDays) * 86400000).toISOString().split("T")[0]
    : "";

  const submit = () => {
    if (!form.petId || !form.name || !form.startDate || !form.reason) return;
    const data = { ...form, durationDays: Number(form.durationDays), endDate };
    if (editing) updateMedication({ ...editing, ...data });
    else addMedication(data);
    navigate("medications");
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <BackHeader title={editing ? "Editar medicação" : "Nova medicação"} onBack={() => navigate("medications")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <Select label="Pet" value={form.petId} onChange={set("petId")} options={pets.map(p => ({ value: p.id, label: p.name }))} />
        <Input label="Nome da medicação" value={form.name} onChange={set("name")} placeholder="Ex: Nexgard" />
        <Input label="Dosagem — opcional" value={form.dosage} onChange={set("dosage")} placeholder="Ex: 1 comprimido" />
        <Select label="Tipo" value={form.type} onChange={v => setForm(f => ({ ...f, type: v as MedType }))}
          options={[{ value: "pill", label: "Comprimido" }, { value: "liquid", label: "Líquido" }, { value: "injection", label: "Injeção" }, { value: "topical", label: "Tópico" }, { value: "other", label: "Outro" }]} />
        <Input label="Frequência" value={form.frequency} onChange={set("frequency")} placeholder="Ex: A cada 8 horas, Diário" />
        <Input label="Duração (dias)" type="number" value={form.durationDays} onChange={set("durationDays")} placeholder="Ex: 7" />
        <Input label="Data de início" type="date" value={form.startDate} onChange={set("startDate")} />
        {endDate && <p className="text-xs text-gray-500 -mt-2">Término: {fmtDate(endDate)}</p>}
        <div className="flex items-center gap-3">
          <button onClick={() => setForm(f => ({ ...f, fasting: !f.fasting }))}
            className={`w-12 h-6 rounded-full transition-all relative ${form.fasting ? "bg-primary" : "bg-gray-200"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.fasting ? "right-1" : "left-1"}`} />
          </button>
          <label className="text-sm font-medium text-gray-700">Deve ser administrado em jejum</label>
        </div>
        <Input label="Motivo da medicação" value={form.reason} onChange={set("reason")} placeholder="Ex: Antipulgas" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea value={form.observations} onChange={e => set("observations")(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20" />
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>Salvar medicação</Btn>
        {editing && (
          <Btn variant="danger" full onClick={() => { deleteMedication(editing.id); navigate("medications"); }}>Excluir medicação</Btn>
        )}
      </div>
    </div>
  );
}

// ─── Agenda ───────────────────────────────────────────────────────────────────
function Agenda() {
  const { vaccines, appointments, medications, pets, navigate } = useApp();
  const [view, setView] = useState<"today" | "week" | "all">("today");

  const todayStr = new Date().toISOString().split("T")[0];

  type AgendaItem = {
    id: string; date: string; time?: string; type: string;
    title: string; petName: string; status: string;
  };

  const items: AgendaItem[] = [
    ...vaccines.filter(v => v.status === "scheduled" && v.scheduledDate).map(v => ({
      id: v.id, date: v.scheduledDate!, type: "Vacina", title: v.name,
      petName: pets.find(p => p.id === v.petId)?.name ?? "",
      status: "Agendada",
    })),
    ...appointments.filter(a => a.status === "scheduled").map(a => ({
      id: a.id, date: a.date, time: a.time, type: "Consulta", title: a.reason,
      petName: pets.find(p => p.id === a.petId)?.name ?? "",
      status: "Agendada",
    })),
    ...medications.flatMap(m =>
      m.doses.filter(d => d.status === "pending").map((d, i) => ({
        id: `${m.id}-${i}`, date: d.date, time: d.time, type: "Medicação", title: m.name,
        petName: pets.find(p => p.id === m.petId)?.name ?? "",
        status: "Pendente",
      }))
    ),
  ].sort((a, b) => a.date.localeCompare(b.date));

  const filtered = items.filter(item => {
    if (view === "today") return item.date === todayStr;
    if (view === "week") {
      const itemDate = new Date(item.date);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() + 7);
      return itemDate >= new Date(todayStr) && itemDate <= weekEnd;
    }
    return true;
  });

  const typeColors: Record<string, string> = {
    Vacina: "bg-blue-50 text-blue-600",
    Consulta: "bg-purple-50 text-purple-600",
    Medicação: "bg-green-50 text-green-600",
  };

  return (
    <div className="flex flex-col bg-background">
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-bold text-xl text-gray-800">Agenda</h1>
      </div>
      <div className="px-5 flex gap-2 mb-4">
        {[{ id: "today", label: "Hoje" }, { id: "week", label: "7 dias" }, { id: "all", label: "Tudo" }].map(t => (
          <button key={t.id} onClick={() => setView(t.id as typeof view)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === t.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Calendar size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Nenhum evento para este período.</p>
          </div>
        ) : (
          filtered.map(item => (
            <Card key={item.id} className="p-4 flex items-start gap-3">
              <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${typeColors[item.type] ?? "bg-gray-100 text-gray-600"}`}>
                {item.type}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-xs text-gray-400">{item.petName} • {fmtDate(item.date)}{item.time ? ` às ${item.time}` : ""}</p>
              </div>
              <Badge label={item.status} className="text-orange-600 bg-orange-50" />
            </Card>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function NotificationsPage() {
  const { navigate, notifications, markRead, markAllRead, deleteNotification } = useApp();

  const typeColors: Record<AppNotification["type"], string> = {
    vaccine: "bg-blue-50 text-blue-500",
    appointment: "bg-purple-50 text-purple-500",
    medication: "bg-green-50 text-green-500",
    general: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-background">
      <BackHeader title="Notificações" onBack={() => navigate("home")}
        rightEl={
          <button onClick={markAllRead} className="text-primary text-xs font-medium">Ler tudo</button>
        }
      />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Bell size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Sem notificações.</p>
          </div>
        ) : (
          notifications.map(n => (
            <Card key={n.id}
              className={`p-4 flex items-start gap-3 ${!n.read ? "border-l-4 border-primary" : ""}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[n.type]}`}>
                {n.type === "vaccine" && <Syringe size={16} />}
                {n.type === "appointment" && <Calendar size={16} />}
                {n.type === "medication" && <Pill size={16} />}
                {n.type === "general" && <Bell size={16} />}
              </div>
              <div className="flex-1" onClick={() => markRead(n.id)}>
                <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                <p className="text-xs text-gray-300 mt-1">{fmtDate(n.date)}</p>
              </div>
              <button onClick={() => deleteNotification(n.id)} className="text-gray-300 active:text-red-400">
                <X size={16} />
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Adoption ─────────────────────────────────────────────────────────────────
function Adoption() {
  const { adoption, navigate } = useApp();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = adoption.filter(a => {
    if (filter !== "all" && a.animalType !== filter) return false;
    if (search && !a.animalName?.toLowerCase().includes(search.toLowerCase()) && !a.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusColors: Record<AdoptionStatus, string> = {
    available: "text-green-600 bg-green-50",
    in_process: "text-orange-600 bg-orange-50",
    adopted: "text-gray-500 bg-gray-100",
  };
  const statusLabels: Record<AdoptionStatus, string> = {
    available: "Disponível", in_process: "Em processo", adopted: "Adotado",
  };

  return (
    <div className="flex flex-col bg-background">
      <div className="bg-primary px-5 pt-12 pb-6">
        <h1 className="font-bold text-xl text-white">Adoção</h1>
        <p className="text-orange-100 text-sm mt-1">Algum animal que precisa de adoção?</p>
      </div>
      <div className="px-5 pt-4 pb-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary" />
        </div>
      </div>
      <div className="px-5 flex gap-2 py-2 overflow-x-auto no-scrollbar">
        {[{ id: "all", label: "Todos" }, { id: "dog", label: "Cachorros" }, { id: "cat", label: "Gatos" }, { id: "other", label: "Outros" }].map(t => (
          <button key={t.id} onClick={() => setFilter(t.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === t.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 pb-2">
        <span className="text-xs text-gray-400">{filtered.length} animais</span>
        <button onClick={() => navigate("adoption-form")}
          className="flex items-center gap-1 text-xs text-primary font-semibold">
          <Plus size={14} /> Publicar
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Heart size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Nenhum animal encontrado.</p>
            <Btn variant="primary" size="sm" onClick={() => navigate("adoption-form")}>Publicar adoção</Btn>
          </div>
        ) : (
          filtered.map(a => (
            <Card key={a.id} className="overflow-hidden flex gap-0">
              <div className="w-24 h-28 bg-orange-100 flex items-center justify-center flex-shrink-0 text-4xl">
                {a.animalType === "dog" ? "🐕" : a.animalType === "cat" ? "🐈" : "🐾"}
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{a.animalName ?? "Sem nome"}</h3>
                    <p className="text-xs text-gray-500">{a.animalType === "dog" ? "Cachorro" : a.animalType === "cat" ? "Gato" : "Animal"}{a.breed ? ` • ${a.breed}` : ""}</p>
                  </div>
                  <Badge label={statusLabels[a.status]} className={statusColors[a.status]} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{a.age} • {a.gender === "male" ? "Macho" : "Fêmea"}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={10} className="text-gray-400" />
                  <span className="text-xs text-gray-400">{a.city}, {a.state}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description}</p>
                <p className="text-xs text-primary font-medium mt-1">{a.contact}</p>
              </div>
            </Card>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── Adoption Form ────────────────────────────────────────────────────────────
function AdoptionForm() {
  const { navigate, addAdoption } = useApp();
  const [form, setForm] = useState({
    animalName: "", animalType: "dog", breed: "", gender: "male",
    age: "", description: "", city: "", state: "",
    contactName: "", contact: "", status: "available" as AdoptionStatus,
  });
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.animalType || !form.age || !form.description || !form.city || !form.state || !form.contactName || !form.contact) return;
    addAdoption({ ...form, gender: form.gender as "male" | "female", status: form.status });
    navigate("adoption");
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-background">
      <BackHeader title="Publicar adoção" onBack={() => navigate("adoption")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <Input label="Nome do animal — opcional" value={form.animalName} onChange={set("animalName")} placeholder="Ex: Bolinha" />
        <Select label="Tipo de animal" value={form.animalType} onChange={set("animalType")}
          options={[{ value: "dog", label: "Cachorro" }, { value: "cat", label: "Gato" }, { value: "bird", label: "Pássaro" }, { value: "other", label: "Outro" }]} />
        <Input label="Raça — opcional" value={form.breed} onChange={set("breed")} placeholder="Ex: Vira-lata" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Sexo</label>
          <div className="flex gap-3">
            {[{ v: "male", l: "Macho" }, { v: "female", l: "Fêmea" }].map(({ v, l }) => (
              <button key={v} onClick={() => setForm(f => ({ ...f, gender: v }))}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${form.gender === v ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-500"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <Input label="Idade aproximada" value={form.age} onChange={set("age")} placeholder="Ex: 2 anos, 6 meses" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <textarea value={form.description} onChange={e => set("description")(e.target.value)}
            placeholder="Descreva o animal, temperamento, histórico..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-24" />
        </div>
        <div className="flex gap-3">
          <Input label="Cidade" value={form.city} onChange={set("city")} placeholder="São Paulo" />
          <Input label="Estado" value={form.state} onChange={set("state")} placeholder="SP" />
        </div>
        <Input label="Seu nome" value={form.contactName} onChange={set("contactName")} placeholder="Nome para contato" />
        <Input label="Telefone ou e-mail" value={form.contact} onChange={set("contact")} placeholder="(11) 99999-9999" />
        <Btn variant="primary" full size="lg" onClick={submit}>Publicar</Btn>
      </div>
    </div>
  );
}

// ─── Clinics ──────────────────────────────────────────────────────────────────
function Clinics() {
  const { clinics, navigate } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col bg-background">
      <BackHeader title="Clínicas próximas" onBack={() => navigate("home")} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6">
        {clinics.map(c => (
          <Card key={c.id} className="overflow-hidden">
            <img src={c.image} alt={c.name} className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{c.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{c.address}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{c.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{c.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge label={c.distance} className="text-primary bg-orange-50" />
                <Btn variant="outline" size="sm" onClick={() => {}}>
                  <Phone size={12} /> Ligar
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Settings ────────────────────────────────────────────────────────────────
function SettingsPage() {
  const { navigate, user, logout, darkMode, toggleDark, fontSize, toggleFontSize, showToast } = useApp();
  const [changePassword, setChangePassword] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const submitPw = () => {
    if (!pw.current || !pw.next || pw.next !== pw.confirm) {
      showToast("Verifique os campos de senha", "error"); return;
    }
    showToast("Senha alterada com sucesso!");
    setChangePassword(false);
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="flex flex-col bg-background">
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-bold text-xl text-gray-800">Configurações</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
        {/* Profile */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={imgUserAvatar} alt="avatar" className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
            <div>
              <p className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              <p className="text-gray-400">Telefone</p>
              <p className="font-medium text-gray-700">{user?.phone}</p>
            </div>
            <div>
              <p className="text-gray-400">CPF</p>
              <p className="font-medium text-gray-700">{user?.cpf}</p>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="divide-y divide-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={18} className="text-gray-500" /> : <Sun size={18} className="text-gray-500" />}
              <span className="text-sm font-medium text-gray-700">{darkMode ? "Modo escuro" : "Modo claro"}</span>
            </div>
            <button onClick={toggleDark}
              className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? "bg-primary" : "bg-gray-200"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${darkMode ? "right-1" : "left-1"}`} />
            </button>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Fonte grande</span>
            </div>
            <button onClick={toggleFontSize}
              className={`w-12 h-6 rounded-full transition-all relative ${fontSize === "large" ? "bg-primary" : "bg-gray-200"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${fontSize === "large" ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </Card>

        {/* Security */}
        <Card className="divide-y divide-gray-100">
          <button className="px-4 py-3 flex items-center gap-3 w-full" onClick={() => setChangePassword(!changePassword)}>
            <Lock size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 flex-1 text-left">Alterar senha</span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
          {changePassword && (
            <div className="p-4 flex flex-col gap-3">
              <Input label="Senha atual" type="password" value={pw.current} onChange={v => setPw(p => ({ ...p, current: v }))} placeholder="••••••••" />
              <Input label="Nova senha" type="password" value={pw.next} onChange={v => setPw(p => ({ ...p, next: v }))} placeholder="Mínimo 6 caracteres" />
              <Input label="Confirmar nova senha" type="password" value={pw.confirm} onChange={v => setPw(p => ({ ...p, confirm: v }))} placeholder="Repita a senha" />
              <Btn variant="primary" full onClick={submitPw}>Salvar senha</Btn>
            </div>
          )}
        </Card>

        {/* About */}
        <Card className="divide-y divide-gray-100">
          <button className="px-4 py-3 flex items-center gap-3 w-full">
            <Info size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 flex-1 text-left">Sobre o Faro</span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
          <button className="px-4 py-3 flex items-center gap-3 w-full">
            <Shield size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 flex-1 text-left">Política de privacidade</span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </Card>

        {/* Pet limit info */}
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4">
          <PawPrint size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Limite de pets</p>
            <p className="text-xs text-gray-500 mt-0.5">Cada conta permite cadastrar até 3 pets. Você tem espaço para mais pets na sua conta.</p>
          </div>
        </div>

        <Btn variant="danger" full onClick={() => { logout(); }}>
          <LogOut size={16} /> Sair da conta
        </Btn>
      </div>
      <BottomNav />
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────
const AUTH_PAGES = ["onboarding", "login", "register", "forgot"];

function Router() {
  const { page, isLoggedIn, navigate } = useApp();
  const isAuth = AUTH_PAGES.includes(page);

  useEffect(() => {
    if (!isLoggedIn && !isAuth) navigate("login");
  }, [isLoggedIn, page]);

  const authScreens: Partial<Record<Page, React.ReactNode>> = {
    onboarding: <Onboarding />,
    login: <Login />,
    register: <Register />,
    forgot: <ForgotPassword />,
  };

  const appScreens: Partial<Record<Page, React.ReactNode>> = {
    home: <HomeScreen />,
    pets: <Pets />,
    "pet-form": <PetForm />,
    "pet-detail": <PetDetail />,
    vaccines: <VaccineWallet />,
    "vaccine-form": <VaccineForm />,
    appointments: <Appointments />,
    "appointment-form": <AppointmentForm />,
    medications: <Medications />,
    "medication-form": <MedicationForm />,
    agenda: <Agenda />,
    notifications: <NotificationsPage />,
    adoption: <Adoption />,
    "adoption-form": <AdoptionForm />,
    clinics: <Clinics />,
    settings: <SettingsPage />,
  };

  if (isAuth) return <>{authScreens[page] ?? <Login />}</>;

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 md:ml-64 min-h-screen pb-16 md:pb-0">
        {appScreens[page] ?? <HomeScreen />}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <Toast />
      <Router />
    </AppProvider>
  );
}
