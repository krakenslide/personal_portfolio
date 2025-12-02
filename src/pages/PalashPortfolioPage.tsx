import React from "react";
import type { JSX } from "react";
import {
    Mail,
    Phone,
    Database,
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
        <span className="font-mono text-sm tracking-widest uppercase">
            {children}
        </span>
        {Icon && <Icon width={16} height={16} className="text-orange-500" />}
    </a>
);

export const SectionHeader: React.FC<{ number: string | number; title: string }> = ({
    number,
    title,
}) => (
    <div className="flex items-baseline gap-4 mb-12 border-b border-neutral-200 pb-4">
        <span className="font-mono text-orange-600 text-sm">0{number}</span>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">
            {title}
        </h2>
    </div>
);

/* -------------------------
   Project / Engagement card
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
                {clientType && (
                    <p className="text-neutral-500 font-serif italic">{clientType}</p>
                )}
            </div>

            <div className="mt-4 md:mt-0 flex gap-2 flex-wrap max-w-xs justify-end">
                {stack.map((tech) => (
                    <span
                        key={tech}
                        className="text-[10px] border border-neutral-300 px-2 py-1 rounded-full text-neutral-600 font-mono"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {description && (
            <p className="text-neutral-700 leading-relaxed mb-6 max-w-prose">
                {description}
            </p>
        )}

        {metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-sm border border-neutral-100">
                {metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                        <span className="text-2xl font-light text-orange-600">
                            {metric.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono mt-1">
                            {metric.label}
                        </span>
                    </div>
                ))}
            </div>
        )}
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

export const SkillBlock: React.FC<SkillBlockProps> = ({
    icon: Icon,
    title,
    items = [],
}) => (
    <div className="bg-white border border-neutral-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <Icon className="text-orange-600 mb-4" width={24} height={24} />
        <h4 className="font-mono text-sm uppercase tracking-widest mb-4 border-b border-neutral-100 pb-2">
            {title}
        </h4>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li
                    key={idx}
                    className="text-neutral-600 text-sm flex items-center gap-2"
                >
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

/* -------------------------
   Experience data (Palash)
   ------------------------- */

const DEFAULT_EXPERIENCE: ExperienceItem[] = [
    {
        id: 1,
        type: "Audit & Assurance",
        role: "Article Assistant",
        title: "Statutory & Tax Audits",
        clientType:
            "10+ Clients across manufacturing, hospitality and other sectors",
        stack: ["Statutory Audit", "Tax Audit", "Ind AS / AS", "SAs"],
        description:
            "Executed statutory and tax audits for a diverse portfolio of entities, ensuring compliance with auditing standards, accurate financial reporting and robust documentation for partner review.",
        metrics: [
            { value: "10+", label: "Audit Clients Handled" },
            { value: "3+", label: "Years of Articleship" },
            { value: "End-to-End", label: "Audit Lifecycle Exposure" },
        ],
    },
    {
        id: 2,
        type: "Internal Audit",
        role: "Internal Audit Trainee",
        title: "Internal & Process Audits",
        clientType: "Manufacturing Company – Treasury, Marketing & HR",
        stack: ["Internal Audit", "IFCR", "Process Walkthroughs"],
        description:
            "Supported and performed internal audits across key business functions, documenting process flows, identifying control gaps and contributing to Internal Financial Control Reports (IFCR) for management and statutory purposes.",
        metrics: [
            { value: "3", label: "Key Functions Reviewed" },
            { value: "IFCR", label: "Reports Prepared" },
            { value: "Controls", label: "Design & Operating Effectiveness" },
        ],
    },
    {
        id: 3,
        type: "Costing & MIS",
        role: "Costing & MIS Support",
        title: "TDABC on SAP HANA",
        clientType: "Incense Manufacturing Client",
        stack: ["SAP HANA", "TDABC", "MIS Reporting"],
        description:
            "Assisted in developing and implementing a Time-Driven Activity-Based Costing (TDABC) model on SAP HANA, enabling detailed MIS reports for management and supporting more informed cost and pricing decisions.",
        metrics: [
            { value: "TDABC", label: "Costing Framework" },
            { value: "SAP", label: "Analytics Layer" },
            { value: "Insightful", label: "Management Reporting" },
        ],
    },
    {
        id: 4,
        type: "Tax & Compliance",
        role: "Direct Tax Associate",
        title: "Direct Tax & TDS Compliance",
        clientType:
            "100+ Clients – Individuals, Firms, Trusts and Other Entities",
        stack: ["ITR Filing", "TDS Compliance", "Income Tax Portal"],
        description:
            "Managed comprehensive direct tax compliance including income tax return preparation, TDS computations and filings, and query handling on the Income Tax portal for a wide client base.",
        metrics: [
            { value: "100+", label: "ITRs & Cases Managed" },
            { value: "TDS", label: "End-to-End Compliance" },
            { value: "Accuracy", label: "Focus on Error-Free Filing" },
        ],
    },
    {
        id: 5,
        type: "Tax & Compliance",
        role: "TP Support",
        title: "Transfer Pricing Documentation",
        clientType: "Associated Enterprises & Related Party Transactions",
        stack: ["Transfer Pricing", "Documentation", "Audit Support"],
        description:
            "Supported Transfer Pricing compliance by preparing documentation and working papers required for audits and regulatory filings, ensuring alignment with TP regulations and timelines.",
        metrics: [
            { value: "TP", label: "Compliance Support" },
            { value: "On-Time", label: "Filing & Documentation" },
            { value: "Collaborative", label: "Work with Seniors & Partners" },
        ],
    },
];

/* -------------------------
   Page component
   ------------------------- */

export default function PalashPortfolio(): JSX.Element {
    const [activeTab, setActiveTab] = React.useState<TabKey>("all");

    const experience = DEFAULT_EXPERIENCE;

    const filteredExp = React.useMemo(() => {
        if (activeTab === "all") return experience;
        if (activeTab === "advisory") {
            // Tax, costing, analytics-oriented work
            return experience.filter((e) =>
                ["Tax & Compliance", "Costing & MIS"].includes(e.type)
            );
        }
        if (activeTab === "assurance") {
            // Audit and internal control–oriented work
            return experience.filter((e) =>
                ["Audit & Assurance", "Internal Audit"].includes(e.type)
            );
        }
        return experience;
    }, [activeTab, experience]);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-orange-100 selection:text-orange-900">
            {/* Navigation / Top Bar */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-neutral-200 z-50 px-6 py-4 flex justify-between items-center">
                <div className="font-mono font-bold text-xl tracking-tighter">
                    PALASH<span className="text-orange-600">.</span>CA
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-500">
                    <a
                        href="#about"
                        className="hover:text-neutral-900 transition-colors"
                    >
                        PROFILE
                    </a>
                    <a
                        href="#projects"
                        className="hover:text-neutral-900 transition-colors"
                    >
                        EXPERIENCE
                    </a>
                    <a
                        href="#skills"
                        className="hover:text-neutral-900 transition-colors"
                    >
                        STACK
                    </a>
                </div>
                <ArchButton
                    href="mailto:palash.s.1401@gmail.com"
                    icon={Mail}
                >
                    Get in Touch
                </ArchButton>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8">
                            Audit <br />
                            <span className="font-serif italic text-neutral-400">
                                Assurance
                            </span>{" "}
                            <br />
                            & Tax
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-2xl leading-relaxed">
                            Palash S. is a newly qualified{" "}
                            <strong>Chartered Accountant</strong> (ICAI) with
                            3 years of articleship experience, specialising in{" "}
                            <strong>
                                Statutory Audit, Internal Audit, Direct
                                Taxation and Transfer Pricing
                            </strong>
                            , with hands-on exposure to SAP HANA and TDABC-based
                            costing models.
                        </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end font-mono text-xs text-neutral-400 gap-2">
                        <p className="flex items-center gap-2">
                            <Globe size={12} /> INDIA / REMOTE
                        </p>
                        <p>EXPERIENCE: 3 YEARS ARTICLESHIP</p>
                        <p>FOCUS: AUDIT / TAX / ANALYTICS</p>
                        <div className="h-24 w-[1px] bg-neutral-300 mt-4 hidden md:block" />
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="px-6 md:px-20 lg:px-32 pb-32 max-w-7xl mx-auto space-y-32">
                {/* About / Summary Section */}
                <section
                    id="about"
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-200 pt-12"
                >
                    <div>
                        <span className="font-mono text-orange-600 text-sm mb-4 block">
                            01 / PROFESSIONAL SUMMARY
                        </span>
                        <h2 className="text-3xl font-medium mb-6">
                            Building a strong base in Audit & Assurance
                        </h2>
                        <p className="text-neutral-600 mb-6 leading-relaxed">
                            I trained at a mid-sized CA firm with exposure
                            across{" "}
                            <strong>
                                statutory audit, internal audit, direct tax
                                compliance and transfer pricing
                            </strong>
                            . My work spans end-to-end audit execution, income
                            tax and TDS filings for a large client base, and
                            supporting management through{" "}
                            <strong>TDABC models on SAP HANA</strong> and{" "}
                            <strong>data-driven MIS reports</strong>.
                        </p>
                        <p className="text-neutral-600 mb-6 leading-relaxed">
                            Alongside core audit work, I am comfortable working
                            with{" "}
                            <strong>
                                Tally Prime, SAP HANA, Cloud 9 ERP, Power BI and
                                Advanced Excel
                            </strong>
                            , enabling me to bridge traditional assurance with
                            modern data and reporting tools.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-neutral-100 p-4 w-full">
                                <h3 className="font-mono text-xs uppercase mb-2 text-neutral-500">
                                    Qualification
                                </h3>
                                <p className="font-medium">
                                    Chartered Accountant
                                </p>
                                <p className="text-sm text-neutral-500">
                                    Institute of Chartered Accountants of India
                                    (ICAI)
                                </p>
                            </div>
                            <div className="bg-neutral-100 p-4 w-full">
                                <h3 className="font-mono text-xs uppercase mb-2 text-neutral-500">
                                    Articleship
                                </h3>
                                <p className="font-medium">
                                    Murthy Swamy & Associates LLP
                                </p>
                                <p className="text-sm text-neutral-500">
                                    May 2022 – May 2025
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] bg-neutral-900 text-white p-8 flex flex-col justify-between">
                        <ShieldCheck className="text-neutral-700 w-32 h-32 absolute top-4 right-4 opacity-20" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-light mb-2">
                                Core Areas
                            </h3>
                            <p className="text-orange-500 font-mono text-sm">
                                AUDIT • TAX • CONTROLS
                            </p>
                        </div>
                        <div className="relative z-10 font-mono text-xs grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-neutral-500 mb-1">
                                    ASSURANCE
                                </p>
                                <p>Statutory Audit</p>
                                <p>Tax Audit</p>
                                <p>Internal Audit & IFCR</p>
                            </div>
                            <div>
                                <p className="text-neutral-500 mb-1">TAX</p>
                                <p>Direct Tax & TDS</p>
                                <p>Transfer Pricing Support</p>
                                <p>Income Tax Portal</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience / Engagements */}
                <section id="projects">
                    <SectionHeader number="2" title="Articleship Experience & Key Engagements" />

                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                        {(["all", "advisory", "assurance"] as TabKey[]).map(
                            (filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveTab(filter)}
                                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${activeTab === filter
                                        ? "bg-neutral-900 text-white"
                                        : "bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-900"
                                        }`}
                                >
                                    {filter === "all"
                                        ? "All Experience"
                                        : filter === "advisory"
                                            ? "Tax & Advisory"
                                            : "Audit & Controls"}
                                </button>
                            )
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {filteredExp.map((project) => (
                            <ProjectSpec key={project.id} {...project} />
                        ))}
                    </div>
                </section>

                {/* Technical & Functional Stack */}
                <section id="skills">
                    <SectionHeader
                        number="3"
                        title="Technical & Functional Stack"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SkillBlock
                            icon={ShieldCheck}
                            title="Audit & Assurance"
                            items={[
                                "Statutory & Tax Audit",
                                "Internal Audit & IFCR",
                                "Auditing Standards (SAs)",
                                "Ind AS / AS Application",
                            ]}
                        />
                        <SkillBlock
                            icon={Briefcase}
                            title="Direct Tax & Compliance"
                            items={[
                                "Income Tax Returns (Individuals, Firms, Trusts)",
                                "TDS Computation & Filing",
                                "Transfer Pricing Documentation Support",
                                "Income Tax Portal Operations",
                            ]}
                        />
                        <SkillBlock
                            icon={LayoutTemplate}
                            title="Accounting & ERP"
                            items={[
                                "Tally Prime",
                                "SAP HANA (Basic)",
                                "Cloud 9 ERP",
                                "General Ledger & Trial Balance Review",
                            ]}
                        />
                        <SkillBlock
                            icon={Database}
                            title="Data & Reporting"
                            items={[
                                "Advanced Microsoft Excel",
                                "Power BI & Power Query",
                                "MIS & Management Reporting",
                                "Data Transformation for Audit Analytics",
                            ]}
                        />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-neutral-900 text-neutral-400 py-20 px-6 md:px-20 lg:px-32">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div>
                        <h2 className="text-white text-3xl font-light mb-6">
                            Ready to contribute to Audit & Assurance teams.
                        </h2>
                        <div className="flex flex-col gap-4">
                            <a
                                href="mailto:palash.s.1401@gmail.com"
                                className="flex items-center gap-4 hover:text-orange-500 transition-colors"
                            >
                                <Mail size={20} />
                                <span className="font-mono text-sm">
                                    palash.s.1401@gmail.com
                                </span>
                            </a>
                            <div className="flex items-center gap-4">
                                <Phone size={20} />
                                <span className="font-mono text-sm">
                                    +91 8861470005
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-mono text-xs text-neutral-600 mb-2">
                            © 2025 PALASH S. // AUDIT & ASSURANCE PROFILE
                        </p>
                        <div className="flex gap-4 justify-end">
                            <a
                                href="https://www.linkedin.com/in/annisdsouza"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-orange-500 transition-colors"
                            >
                                LinkedIn
                            </a>
                            <button className="text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-orange-500 transition-colors">
                                Download CV
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
