import React from "react";
import type { JSX } from "react";
import {
    Mail,
    Phone,
    Database,
    BarChart3,
    LayoutTemplate,
    ShieldCheck,
    Briefcase,
    Globe,
} from "lucide-react";

/* -------------------------
   Types
   ------------------------- */
type TabKey = "all" | "advisory" | "assurance";

export interface Metric {
    value: string;
    label: string;
}

export interface ExperienceItem {
    id: number | string;
    type: string;
    role?: string;
    title: string;
    clientType?: string;
    stack?: string[];
    description?: string;
    metrics?: Metric[];
}

/* -------------------------
   Small shared primitives
   ------------------------- */

interface ArchButtonProps {
    children: React.ReactNode;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
    download?: string | boolean;
}

export const ArchButton: React.FC<ArchButtonProps> = ({
    children,
    icon: Icon,
    onClick,
    href,
    download,
}) => (
    <a
        href={href}
        download={download as string | boolean | undefined}
        onClick={onClick}
        className="group relative inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 text-white overflow-hidden transition-all hover:bg-neutral-800 cursor-pointer"
    >
        <div className="absolute left-0 top-0 h-full w-[2px] bg-orange-600 transition-all group-hover:w-1" />
        <span className="font-mono text-sm tracking-widest uppercase">{children}</span>
        {Icon && <Icon width={16} height={16} className="text-orange-500" />}
    </a>
);

export const SectionHeader: React.FC<{ number: string | number; title: string }> = ({
    number,
    title,
}) => (
    <div className="flex items-baseline gap-4 mb-12 border-b border-neutral-200 pb-4">
        <span className="font-mono text-orange-600 text-sm">0{number}</span>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">{title}</h2>
    </div>
);

/* -------------------------
   Project specification card
   ------------------------- */

export const ProjectSpec: React.FC<ExperienceItem> = ({
    title,
    clientType,
    metrics = [],
    stack = [],
    description,
    type,
    role,
}) => (
    <div className="group border-l border-neutral-200 pl-6 py-4 hover:border-orange-600 transition-colors duration-500">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
            <div>
                <div className="flex gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-neutral-100 text-neutral-600 tracking-wider">
                        {type}
                    </span>
                    {role && (
                        <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-orange-50 text-orange-700 tracking-wider border border-orange-100">
                            {role}
                        </span>
                    )}
                </div>

                <h3 className="text-2xl font-medium text-neutral-900 mb-1 group-hover:translate-x-1 transition-transform">
                    {title}
                </h3>
                {clientType && <p className="text-neutral-500 font-serif italic">{clientType}</p>}
            </div>

            <div className="mt-4 md:mt-0 flex gap-2 flex-wrap max-w-xs justify-end">
                {stack.map((tech) => (
                    <span key={tech} className="text-[10px] border border-neutral-300 px-2 py-1 rounded-full text-neutral-600 font-mono">
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {description && <p className="text-neutral-700 leading-relaxed mb-6 max-w-prose">{description}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-sm border border-neutral-100">
            {metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                    <span className="text-2xl font-light text-orange-600">{metric.value}</span>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono mt-1">
                        {metric.label}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

/* -------------------------
   Skill Block
   ------------------------- */

interface SkillBlockProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    items?: string[];
}

export const SkillBlock: React.FC<SkillBlockProps> = ({ icon: Icon, title, items = [] }) => (
    <div className="bg-white border border-neutral-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <Icon className="text-orange-600 mb-4" width={24} height={24} />
        <h4 className="font-mono text-sm uppercase tracking-widest mb-4 border-b border-neutral-100 pb-2">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="text-neutral-600 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

/* -------------------------
   Page component
   ------------------------- */

const DEFAULT_EXPERIENCE: ExperienceItem[] = [
    {
        id: 1,
        type: "Transformation",
        role: "Lead Consultant",
        title: "Strategic Cost Transformation",
        clientType: "Ministry of Defence (PSU) | ₹3,000Cr+ Turnover",
        stack: ["MySQL", "Power BI", "Driver-Based Budgeting"],
        description:
            "Spearheaded a financial transformation initiative for a major Defence PSU. Re-engineered legacy cost structures into a dynamic, driver-based Cost Management System, providing leadership with component-level visibility for strategic pricing.",
        metrics: [
            { value: "₹30B+", label: "Asset Scope" },
            { value: "10%", label: "Direct Cost Savings" },
            { value: "100%", label: "Granularity Achieved" },
        ],
    },
    {
        id: 4,
        type: "Risk Assurance",
        role: "Risk Analyst",
        title: "Enterprise GRC Framework",
        clientType: "Aerospace & Manufacturing Conglomerate",
        stack: ["SQL", "ICFR", "SOX Compliance", "RCM"],
        description:
            "Executed enterprise-wide risk assessments across P2P, O2C, and Fixed Assets. Leveraged SQL for full-population testing (vs. sample testing) to identify control failures, ensuring readiness for internal and statutory audits.",
        metrics: [
            { value: "100%", label: "Population Audited" },
            { value: "Zero", label: "Material Weaknesses" },
            { value: "High", label: "Control Maturity" },
        ],
    },
    {
        id: 3,
        type: "Transformation",
        role: "Process Architect",
        title: "Commercial Finance Architecture",
        clientType: "FMCG Leader | 1,500+ Retail Channels",
        stack: ["TDABC", "Standardization", "Process Mining"],
        description:
            "Designed the commercial finance architecture for a multi-plant FMCG entity. Standardized BOMs and implemented Time-Driven Activity-Based Costing (TDABC) to uncover profitability leaks across 10+ SKUs and 50 distribution depots.",
        metrics: [
            { value: "20%", label: "Efficiency Gain" },
            { value: "50", label: "Depots Optimized" },
            { value: "Scalable", label: "Cost Model" },
        ],
    },
    {
        id: 2,
        type: "Optimization",
        role: "Ops Consultant",
        title: "Operational Excellence (OpEx)",
        clientType: "Aluminium Extrusion Manufacturer",
        stack: ["Lean Six Sigma", "Value Stream Mapping"],
        description:
            "Deployed Value Stream Mapping (VSM) to identify bottlenecks in a high-volume manufacturing plant. Implemented material flow accounting to reduce scrap rates and optimize yield performance.",
        metrics: [
            { value: "60%", label: "Scrap Reduction" },
            { value: "600t", label: "Monthly Throughput" },
            { value: "Yield", label: "Maximized" },
        ],
    },
];

export default function KhushiPortfolio2(): JSX.Element {
    const [activeTab, setActiveTab] = React.useState<TabKey>("all");

    const experience = DEFAULT_EXPERIENCE;

    const filteredExp = React.useMemo(() => {
        if (activeTab === "all") return experience;
        if (activeTab === "advisory")
            return experience.filter((e) => e.type === "Transformation" || e.type === "Optimization");
        if (activeTab === "assurance") return experience.filter((e) => e.type === "Risk Assurance");
        return experience;
    }, [activeTab, experience]);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-orange-100 selection:text-orange-900">
            {/* Navigation / Top Bar */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-neutral-200 z-50 px-6 py-4 flex justify-between items-center">
                <div className="font-mono font-bold text-xl tracking-tighter">
                    KS<span className="text-orange-600">.</span>CONSULTING
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-500">
                    <a href="#about" className="hover:text-neutral-900 transition-colors">
                        PROFILE
                    </a>
                    <a href="#projects" className="hover:text-neutral-900 transition-colors">
                        ENGAGEMENTS
                    </a>
                    <a href="#skills" className="hover:text-neutral-900 transition-colors">
                        CAPABILITIES
                    </a>
                </div>
                <ArchButton href="mailto:s.khushi.chrd@gmail.com" icon={Mail}>
                    Get in Touch
                </ArchButton>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8">
                            Financial <br />
                            <span className="font-serif italic text-neutral-400">Transformation</span> <br />
                            & Assurance
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-2xl leading-relaxed">
                            Khushi Jain is a <strong>Management Consultant</strong> & CMA specializing in data-driven cost architecture and GRC frameworks for high-scale manufacturing & defence sectors.
                        </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end font-mono text-xs text-neutral-400 gap-2">
                        <p className="flex items-center gap-2">
                            <Globe size={12} /> BANGALORE / REMOTE
                        </p>
                        <p>EXP: 2+ YEARS</p>
                        <p>DOMAIN: MFG / AEROSPACE / FMCG</p>
                        <div className="h-24 w-[1px] bg-neutral-300 mt-4 hidden md:block" />
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="px-6 md:px-20 lg:px-32 pb-32 max-w-7xl mx-auto space-y-32">
                {/* About / Philosophy Section */}
                <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-200 pt-12">
                    <div>
                        <span className="font-mono text-orange-600 text-sm mb-4 block">01 / EXECUTIVE SUMMARY</span>
                        <h2 className="text-3xl font-medium mb-6">Bridging Finance & Technology</h2>
                        <p className="text-neutral-600 mb-6 leading-relaxed">
                            I operate at the intersection of <strong>Operational Finance</strong> and <strong>Digital Assurance</strong>. Unlike traditional auditors, I leverage SQL and Power BI to analyze full data populations, ensuring robust governance. Unlike traditional accountants, I design forward-looking cost models that drive strategic pricing and profitability.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-neutral-100 p-4 w-full">
                                <h3 className="font-mono text-xs uppercase mb-2 text-neutral-500">Qualification</h3>
                                <p className="font-medium">CMA</p>
                                <p className="text-sm text-neutral-500">Institute of Management Accountants</p>
                            </div>
                            <div className="bg-neutral-100 p-4 w-full">
                                <h3 className="font-mono text-xs uppercase mb-2 text-neutral-500">Education</h3>
                                <p className="font-medium">BBA Finance</p>
                                <p className="text-sm text-neutral-500">University of Mysore</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] bg-neutral-900 text-white p-8 flex flex-col justify-between">
                        <ShieldCheck className="text-neutral-700 w-32 h-32 absolute top-4 right-4 opacity-20" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-light mb-2">Key Competencies</h3>
                            <p className="text-orange-500 font-mono text-sm">STRATEGY & RISK</p>
                        </div>
                        <div className="relative z-10 font-mono text-xs grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-neutral-500 mb-1">ADVISORY</p>
                                <p>Cost Optimization</p>
                                <p>Process Re-engineering</p>
                            </div>
                            <div>
                                <p className="text-neutral-500 mb-1">ASSURANCE</p>
                                <p>Internal Controls (ICFR)</p>
                                <p>Digital Audit (SQL)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Selected Works / Projects */}
                <section id="projects">
                    <SectionHeader number="2" title="Key Engagements" />

                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                        {(["all", "advisory", "assurance"] as TabKey[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveTab(filter)}
                                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${activeTab === filter ? "bg-neutral-900 text-white" : "bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-900"
                                    }`}
                            >
                                {filter === "all" ? "All Engagements" : filter === "advisory" ? "Mgmt Consulting" : "Risk & Assurance"}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {filteredExp.map((project) => (
                            <ProjectSpec key={project.id} {...project} />
                        ))}
                    </div>
                </section>

                {/* Technical Competencies */}
                <section id="skills">
                    <SectionHeader number="3" title="Digital & Functional Stack" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SkillBlock icon={Database} title="Digital Audit" items={["SQL / MySQL", "Full Population Testing", "Automated Validation", "Data Integrity Checks"]} />
                        <SkillBlock icon={BarChart3} title="Business Intelligence" items={["Power BI", "DAX", "Strategic Dashboards", "Budget Simulation Models"]} />
                        <SkillBlock icon={LayoutTemplate} title="Financial Modeling" items={["TDABC Frameworks", "Cost Driver Mapping", "Variance Analysis", "Pricing Strategy"]} />
                        <SkillBlock icon={Briefcase} title="GRC & Compliance" items={["SOX Frameworks", "ICFR & IFC", "Risk Control Matrices", "Process Flowcharts"]} />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-neutral-900 text-neutral-400 py-20 px-6 md:px-20 lg:px-32">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div>
                        <h2 className="text-white text-3xl font-light mb-6">Ready for high-impact engagements.</h2>
                        <div className="flex flex-col gap-4">
                            <a href="mailto:s.khushi.chrd@gmail.com" className="flex items-center gap-4 hover:text-orange-500 transition-colors">
                                <Mail size={20} />
                                <span className="font-mono text-sm">s.khushi.chrd@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-4">
                                <Phone size={20} />
                                <span className="font-mono text-sm">+91 9972070005</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-mono text-xs text-neutral-600 mb-2">© 2025 KHUSHI Jain</p>
                        <div className="flex gap-4">
                            <button className="text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-orange-500 transition-colors">LinkedIn</button>
                            <button className="text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-orange-500 transition-colors">Download CV</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
