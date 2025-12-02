import React, { useMemo, useState } from 'react';
import {
    Mail,
    Phone,
    Database,
    BarChart3,
    LayoutTemplate,
    ShieldCheck,
} from 'lucide-react';

// -----------------------------
// Types
// -----------------------------
export interface Metric {
    value: string;
    label: string;
}

export interface Project {
    id: number | string;
    type: string;
    title: string;
    sector?: string;
    stack?: string[];
    description?: string;
    metrics?: Metric[];
}

interface ArchButtonProps {
    children: React.ReactNode;
    icon?: React.ComponentType<Record<string, unknown>>;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    href?: string;
    download?: string | boolean;
}

// -----------------------------
// Small shared primitives
// -----------------------------
export const ArchButton: React.FC<ArchButtonProps> = ({ children, icon: Icon, onClick, href, download }) => {
    // HTML anchor `download` expects a string (filename) or its presence; convert boolean/undefined accordingly.
    const downloadAttr = typeof download === 'string' ? download : download ? '' : undefined;

    return (
        <a
            href={href}
            download={downloadAttr}
            onClick={onClick}
            className="group relative inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 text-white overflow-hidden transition-all hover:bg-neutral-800 cursor-pointer"
        >
            <div className="absolute left-0 top-0 h-full w-[2px] bg-orange-600 transition-all group-hover:w-1" />
            <span className="font-mono text-sm tracking-widest uppercase">{children}</span>
            {Icon && <Icon size={16} className="text-orange-500" />}
        </a>
    );
};

export const SectionHeader: React.FC<{ number: string | number; title: string }> = ({ number, title }) => (
    <div className="flex items-baseline gap-4 mb-12 border-b border-neutral-200 pb-4">
        <span className="font-mono text-orange-600 text-sm">0{number}</span>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">{title}</h2>
    </div>
);

// -----------------------------
// Project specification card
// -----------------------------
export const ProjectSpec: React.FC<Project> = ({ title, sector, metrics = [], stack = [], description, type }) => (
    <div className="group border-l border-neutral-200 pl-6 py-4 hover:border-orange-600 transition-colors duration-500">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
            <div>
                <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-mono uppercase bg-neutral-100 text-neutral-600 tracking-wider">
                    {type}
                </span>
                <h3 className="text-2xl font-medium text-neutral-900 mb-1 group-hover:translate-x-1 transition-transform">{title}</h3>
                {sector && <p className="text-neutral-500 font-serif italic">{sector}</p>}
            </div>

            <div className="mt-4 md:mt-0 flex gap-2 flex-wrap">
                {stack?.map((tech) => (
                    <span key={tech} className="text-[10px] border border-neutral-300 px-2 py-1 rounded-full text-neutral-600 font-mono">
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {description && <p className="text-neutral-700 leading-relaxed mb-6 max-w-prose">{description}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-sm">
            {metrics?.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                    <span className="text-2xl font-light text-orange-600">{metric.value}</span>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono mt-1">{metric.label}</span>
                </div>
            ))}
        </div>
    </div>
);

export const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <div className="grid grid-cols-1 gap-12">{projects.map((p) => <ProjectSpec key={p.id} {...p} />)}</div>
);

// -----------------------------
// Skill block
// -----------------------------
export const SkillBlock: React.FC<{ icon: React.ComponentType<Record<string, unknown>>; title: string; items?: string[] }> = ({ icon: Icon, title, items = [] }) => (
    <div className="bg-white border border-neutral-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <Icon className="text-orange-600 mb-4" size={24} />
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

// -----------------------------
// Page sections (Nav, Hero, About...)
// -----------------------------
export const NavBar: React.FC<{ onContact?: () => void }> = ({ onContact }) => (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-neutral-200 z-50 px-6 py-4 flex justify-between items-center">
        <div className="font-mono font-bold text-xl tracking-tighter">KJ<span className="text-orange-600">.</span>CMA</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-500">
            <a href="#about" className="hover:text-neutral-900 transition-colors">PROFILE</a>
            <a href="#projects" className="hover:text-neutral-900 transition-colors">PROJECTS</a>
            <a href="#skills" className="hover:text-neutral-900 transition-colors">COMPETENCIES</a>
        </div>
        <ArchButton href="mailto:s.khushi.chrd@gmail.com" icon={Mail} onClick={(e) => { e.preventDefault(); onContact?.(); }}>
            Contact
        </ArchButton>
    </nav>
);

export const Hero: React.FC = () => (
    <header className="pt-32 pb-20 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8">
                    Financial <br />
                    <span className="font-serif italic text-neutral-400">Control</span> <br />
                    Architecture
                </h1>
                <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-2xl leading-relaxed">
                    Khushi S. is a CMA-certified consultant architecting resilient financial systems. Bridging the gap between <span className="border-b border-orange-500 text-neutral-900">cost efficiency</span> and <span className="border-b border-orange-500 text-neutral-900">risk governance</span>.
                </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end font-mono text-xs text-neutral-400 gap-2">
                <p>LOC: KARNATAKA, INDIA</p>
                <p>EXP: 2+ YEARS</p>
                <p>SPECIALTY: COST & RISK</p>
                <div className="h-24 w-[1px] bg-neutral-300 mt-4 hidden md:block" />
            </div>
        </div>
    </header>
);

export const About: React.FC = () => (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-200 pt-12">
        <div>
            <span className="font-mono text-orange-600 text-sm mb-4 block">01 / PROFILE</span>
            <h2 className="text-3xl font-medium mb-6">The Dual Lens Approach</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
                My methodology treats financial data as structural components. Whether designing driver-based cost systems for defense sectors or fortifying internal controls for aerospace manufacturers, I apply engineering precision to financial reporting.
            </p>

            <div className="flex gap-4">
                <div className="bg-neutral-100 p-4 w-full">
                    <h3 className="font-mono text-xs uppercase mb-2 text-neutral-500">Education</h3>
                    <p className="font-medium">CMA, Inst. of Management Accountants</p>
                    <p className="text-sm text-neutral-500">2025</p>
                </div>
                <div className="bg-neutral-100 p-4 w-full">
                    <h3 className="font-mono text-xs uppercase mb-2 text-neutral-500">Degree</h3>
                    <p className="font-medium">BBA Finance, Mysore Univ.</p>
                    <p className="text-sm text-neutral-500">2017 - 2020</p>
                </div>
            </div>
        </div>

        <div className="relative h-full min-h-[300px] bg-neutral-900 text-white p-8 flex flex-col justify-between">
            <Database className="text-neutral-700 w-32 h-32 absolute top-4 right-4 opacity-20" />
            <div className="relative z-10">
                <h3 className="text-2xl font-light mb-2">Current Role</h3>
                <p className="text-orange-500 font-mono text-sm">B S RAVIKUMAR & ASSOCIATES</p>
            </div>
            <div className="relative z-10 font-mono text-xs grid grid-cols-2 gap-4">
                <div>
                    <p className="text-neutral-500">FOCUS</p>
                    <p>Cost Consulting</p>
                </div>
                <div>
                    <p className="text-neutral-500">FOCUS</p>
                    <p>Internal Audit</p>
                </div>
            </div>
        </div>
    </section>
);

// -----------------------------
// Projects section with filtering logic
// -----------------------------
export const Projects: React.FC<{ items: Project[] }> = ({ items }) => {
    const [activeTab, setActiveTab] = useState<'all' | 'cost' | 'risk'>('all');

    const filtered = useMemo(() => {
        if (activeTab === 'all') return items;
        if (activeTab === 'cost') return items.filter(i => (i.type || '').toLowerCase().includes('cost') || (i.stack || []).some(s => s.toLowerCase().includes('tdabc') || s.toLowerCase().includes('value')));
        if (activeTab === 'risk') return items.filter(i => (i.type || '').toLowerCase().includes('risk') || (i.stack || []).some(s => s.toLowerCase().includes('sox') || s.toLowerCase().includes('icfr')));
        return items;
    }, [activeTab, items]);

    return (
        <section id="projects">
            <SectionHeader number={2} title="Selected Works" />

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {['all', 'cost', 'risk'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveTab(filter as 'all' | 'cost' | 'risk')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${activeTab === filter
                            ? 'bg-neutral-900 text-white'
                            : 'bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-900'
                            }`}
                    >
                        {filter === 'all' ? 'All Systems' : filter}
                    </button>
                ))}
            </div>

            <ProjectList projects={filtered} />
        </section>
    );
};

// -----------------------------
// Skills section
// -----------------------------
export const Skills: React.FC = () => (
    <section id="skills">
        <SectionHeader number={3} title="Technical Specs" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillBlock icon={Database} title="Data Architecture" items={['MySQL / SQL', 'Advanced Excel', 'Power Query', 'Data Modeling']} />
            <SkillBlock icon={LayoutTemplate} title="Visualization" items={['Power BI Dashboards', 'Tableau', 'Risk Heatmaps', 'Interactive Reporting']} />
            <SkillBlock icon={BarChart3} title="Cost Engineering" items={['TDABC Frameworks', 'Value Stream Mapping', 'Cost Driver Mapping', 'Variance Analysis']} />
            <SkillBlock icon={ShieldCheck} title="Governance" items={['ICFR & SOX', 'Risk Control Matrices', 'SOP Development', 'Audit Readiness']} />
        </div>
    </section>
);

// -----------------------------
// Footer
// -----------------------------
export const Footer: React.FC = () => (
    <footer className="bg-neutral-900 text-neutral-400 py-20 px-6 md:px-20 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
                <h2 className="text-white text-3xl font-light mb-6">Let's build something efficient.</h2>
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
                <p className="font-mono text-xs text-neutral-600 mb-2">PORTFOLIO VERSION 2025.1</p>
                <div className="flex gap-4">
                    <a href="#" className="text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-orange-500 transition-colors">LinkedIn</a>
                    <a href="/resume.pdf" download className="text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-orange-500 transition-colors">Download Resume</a>
                </div>
            </div>
        </div>
    </footer>
);

// -----------------------------
// Default page component
// -----------------------------
const DEFAULT_EXPERIENCE: Project[] = [
    {
        id: 1,
        type: 'Structural Costing',
        title: 'Defence PSU Cost Architecture',
        sector: 'Ministry of Defence | Manufacturing',
        stack: ['MySQL', 'Power BI', 'ABC Principles'],
        description:
            'Led a comprehensive cost restructuring initiative across four manufacturing complexes. Redesigned legacy accounting systems into a driver-based Cost Management System, enabling granular component-level visibility.',
        metrics: [
            { value: '10%', label: 'Cost Savings' },
            { value: '3000cr', label: 'Turnover Scope' },
            { value: '100%', label: 'Visibility' },
        ],
    },
    {
        id: 2,
        type: 'Process Engineering',
        title: 'Aluminium Extrusion Yield Opt.',
        sector: 'Extrusion Industry | Manufacturing',
        stack: ['Value Stream Mapping', 'Material Flow CA'],
        description:
            'Conducted end-to-end Value Stream Mapping for a 600 ton/month plant. Implemented inflow-outflow measurement systems to standardize loss tracking and enhance traceability.',
        metrics: [
            { value: '60%', label: 'Scrap Reduction' },
            { value: '600t', label: 'Monthly Vol' },
            { value: 'High', label: 'Yield Impact' },
        ],
    },
    {
        id: 3,
        type: 'System Design',
        title: 'FMCG Product Costing',
        sector: 'Incense & Fragrance | FMCG',
        stack: ['TDABC', 'BOM Standardization', 'Excel'],
        description:
            'Designed a complete product costing architecture across 3 plants and 50 depots. Implemented Time-Driven Activity-Based Costing (TDABC) for granular SKU and machine-level cost analysis.',
        metrics: [
            { value: '20%', label: 'Utilization Lift' },
            { value: '1500+', label: 'Retail Channels' },
            { value: '10+', label: 'SKU Structures' },
        ],
    },
    {
        id: 4,
        type: 'Risk Control',
        title: 'Enterprise Risk Framework',
        sector: 'Aerospace & Manufacturing',
        stack: ['SQL', 'ICFR', 'SOX Frameworks'],
        description:
            'Conducted enterprise-wide risk assessments across P2P, O2C, and Fixed Assets. Performed SQL-based full-population transaction testing to detect control failures and policy deviations.',
        metrics: [
            { value: '100%', label: 'Population Test' },
            { value: 'Zero', label: 'Major Gaps' },
            { value: 'High', label: 'Compliance' },
        ],
    },
];

const KhushiPortfolio: React.FC = () => {
    const experience = DEFAULT_EXPERIENCE;

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-orange-100 selection:text-orange-900">
            <NavBar onContact={() => { /* placeholder for contact handler */ }} />
            <Hero />

            <main className="px-6 md:px-20 lg:px-32 pb-32 max-w-7xl mx-auto space-y-32">
                <About />
                <Projects items={experience} />
                <Skills />
            </main>

            <Footer />
        </div>
    );
};

export default KhushiPortfolio;
