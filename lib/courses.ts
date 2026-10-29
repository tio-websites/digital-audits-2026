export type LessonType = "text" | "video" | "interactive";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
  content?: TextContent;
  video?: VideoContent;
}

export interface TextContent {
  body: Section[];
}

export interface VideoContent {
  posterBg: string;
  duration: string;
  transcript: string[];
}

export interface Section {
  kind: "heading" | "paragraph" | "pullquote" | "list";
  text?: string;
  items?: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  type: string;
  pillar: string;
  level: string;
  duration: string;
  cpdHours: string;
  objectives: string[];
  progress: number;
  modules: CourseModule[];
}

export const courses: Course[] = [
  {
    slug: "from-zero-to-manufacturing",
    title: "From Zero to Manufacturing Aligners",
    description: "A complete progression covering every stage of in-house aligner production — from the business case through printer calibration, ISO documentation, and QC.",
    type: "Clinical Module",
    pillar: "Digital Workflow",
    level: "Foundational",
    duration: "12h 30m",
    cpdHours: "12.5",
    progress: 65,
    objectives: [
      "Set up a compliant ISO workflow",
      "Configure and operate an FDM printer",
      "Establish QC checkpoints at each production stage",
    ],
    modules: [
      {
        id: "module-1",
        title: "Foundation",
        lessons: [
          {
            id: "what-in-house-manufacturing-means",
            title: "What in-house manufacturing actually means",
            type: "text",
            duration: "12 min",
            completed: true,
            content: {
              body: [
                { kind: "paragraph", text: "In-house aligner manufacturing is not about buying a printer. It is about building a production system that your practice owns, controls, and can continuously improve. The distinction matters because most practices that struggle with in-house production have bought the equipment without building the system." },
                { kind: "pullquote", text: "The practices that make in-house work are not the ones with the best printers. They are the ones with the most disciplined processes." },
                { kind: "heading", text: "What you are actually taking on" },
                { kind: "paragraph", text: "When you bring production in-house, you are not just adding a piece of equipment to your clinical space. You are vertically integrating a manufacturing function into a healthcare business. That means taking on responsibilities that your laboratory partner currently holds: material procurement, machine maintenance, quality control, regulatory documentation, and batch management." },
                { kind: "paragraph", text: "None of these are technically difficult. But they require consistency, and consistency requires systems. This is why the practices that make in-house work are not the ones with the best printers — they are the ones with the most disciplined processes." },
                { kind: "heading", text: "The three models" },
                { kind: "paragraph", text: "There are broadly three in-house models in orthodontic practice today. Understanding which one you are building towards will shape every decision you make in this course." },
                { kind: "list", items: [
                  "Hybrid production: you print some cases in-house and outsource others. Useful for practices transitioning, but operationally complex.",
                  "Full in-house: all aligner production happens on-site. Highest efficiency, requires the most process maturity.",
                  "In-house with external finishing: you print and trim in-house but use an external service for final polishing or packaging. Common in early-stage setups.",
                ]},
                { kind: "heading", text: "What changes for the patient" },
                { kind: "paragraph", text: "From the patient's perspective, in-house production should mean faster turnaround and tighter clinical integration. When you control the production process, you can respond to mid-treatment changes in days rather than weeks. Refinements become less disruptive. Your clinical decisions and your manufacturing capability are no longer separated by a third party." },
                { kind: "paragraph", text: "This is the real clinical advantage of in-house manufacturing. Not the cost saving — though that is real — but the ability to run a more responsive, integrated practice." },
              ],
            },
          },
          {
            id: "the-cost-model",
            title: "The cost model: when in-house becomes viable",
            type: "text",
            duration: "8 min",
            completed: true,
            content: {
              body: [
                { kind: "paragraph", text: "The question of whether in-house aligner production makes financial sense depends on three variables: your current outsourcing cost per case, your expected case volume, and your total setup investment. Most practices underestimate the third and overestimate the second." },
                { kind: "heading", text: "The break-even calculation" },
                { kind: "paragraph", text: "A basic in-house setup — one FDM printer, a post-cure unit, and a thermoforming machine — costs between £8,000 and £18,000 depending on brand and specification. If you are currently paying £150 per arch per case to a laboratory, and you produce 8 full-arch cases per month, your outsourcing spend is £1,200 per month. At that volume, the setup pays for itself within 8–15 months." },
                { kind: "pullquote", text: "Most practices underestimate the setup cost and overestimate the case volume. Run your numbers conservatively." },
                { kind: "paragraph", text: "The calculation changes significantly at lower volumes. Below 5 cases per month, the economics are marginal and the operational overhead — material storage, machine maintenance, staff time — often tips the balance away from in-house." },
                { kind: "heading", text: "Hidden costs" },
                { kind: "list", items: [
                  "Staff time for printing, trimming, and QC (typically 20–40 minutes per case)",
                  "Material waste during calibration and failed prints (budget 15–20% in the first 3 months)",
                  "Machine maintenance contracts and consumable replacement",
                  "ISO documentation and audit preparation if you pursue formal certification",
                ]},
              ],
            },
          },
          {
            id: "equipment-overview",
            title: "Equipment overview: printers, scanners, software",
            type: "video",
            duration: "22 min",
            completed: true,
            video: {
              posterBg: "#1C2E27",
              duration: "22:14",
              transcript: [
                "In this session we're going to walk through the three core pieces of equipment you need to run in-house aligner production.",
                "First, the printer. For aligner production, you have two main options: FDM — fused deposition modelling — and MSLA, which is masked stereolithography.",
                "FDM printers extrude a filament material layer by layer. They are cheaper to run and easier to maintain, but the layer resolution is lower than resin-based systems.",
                "MSLA printers use a UV-masked LCD screen to cure liquid resin layer by layer. The resolution is significantly higher, which matters for fit accuracy on aligners.",
                "Most practices starting out choose FDM for the lower running costs and simpler maintenance profile. As volume and case complexity increases, many transition to MSLA.",
              ],
            },
          },
        ],
      },
      {
        id: "module-2",
        title: "Your First Printer",
        lessons: [
          {
            id: "choosing-your-first-printer",
            title: "Choosing your first FDM printer",
            type: "text",
            duration: "15 min",
            completed: true,
            content: {
              body: [
                { kind: "paragraph", text: "The printer market for aligner production has consolidated significantly over the past two years. Where there were once dozens of viable options, the field has narrowed to a handful of machines that have demonstrated consistent results at clinical volume." },
                { kind: "heading", text: "What to look for" },
                { kind: "list", items: [
                  "Build volume: minimum 250 × 200mm to print full arches across orientations",
                  "Layer resolution: 0.1mm or better for acceptable fit accuracy",
                  "Enclosed build chamber: prevents warping on longer prints",
                  "Active levelling: reduces calibration drift across print runs",
                  "Software ecosystem: proprietary slicer vs open-source compatibility",
                ]},
                { kind: "paragraph", text: "On the software question: some manufacturers lock their machines to proprietary slicers. This reduces flexibility but often results in more consistent output because the slicing parameters are optimised for the machine. Open-source slicer compatibility gives you more control but requires more configuration expertise." },
              ],
            },
          },
          {
            id: "calibration-protocol",
            title: "Calibration protocol: step-by-step",
            type: "video",
            duration: "35 min",
            completed: true,
            video: {
              posterBg: "#2A3E35",
              duration: "35:02",
              transcript: [
                "Calibration is the single most important variable in consistent aligner production. A printer that was calibrated correctly six months ago may have drifted significantly, especially if it has been moved or if the ambient temperature in your production space changes seasonally.",
                "We recommend a full calibration check at the start of every production week, and a full recalibration whenever you change materials or after any physical move of the printer.",
                "The first step is always a cold-start check: power the printer on, let it reach operating temperature, and run the bed levelling routine before touching any other setting.",
              ],
            },
          },
          {
            id: "calibration-failures",
            title: "Common calibration failures and how to diagnose them",
            type: "text",
            duration: "10 min",
            completed: true,
            content: {
              body: [
                { kind: "paragraph", text: "Even with a disciplined calibration routine, you will encounter failures. Understanding what causes them — and how to diagnose them quickly — is what separates a productive production workflow from a frustrating one." },
                { kind: "heading", text: "Layer adhesion failures" },
                { kind: "paragraph", text: "If your prints are delaminating — layers separating mid-print — the most common causes are: too-low bed temperature, incorrect first-layer height, or printing speed too high for the material. Start by checking your temperature settings against the material manufacturer's recommended profile." },
                { kind: "heading", text: "Warping at the corners" },
                { kind: "paragraph", text: "Warping on wide, flat objects like aligner models is almost always a bed adhesion problem. Ensure your bed is clean, your first layer is slightly squished (not floating), and your enclosure is maintaining temperature throughout the print." },
                { kind: "pullquote", text: "Most calibration failures trace back to one of three things: temperature, adhesion, or speed. Check these in that order before touching anything else." },
              ],
            },
          },
        ],
      },
      {
        id: "module-3",
        title: "Materials",
        lessons: [
          {
            id: "resin-selection",
            title: "Resin selection by case type",
            type: "text",
            duration: "18 min",
            completed: true,
            content: {
              body: [
                { kind: "paragraph", text: "Material selection is one of the most consequential decisions in in-house aligner production and one of the least standardised. The aligner material you choose affects fit accuracy, force delivery, patient comfort, and the durability of the appliance across wear cycles." },
                { kind: "heading", text: "The main material categories" },
                { kind: "paragraph", text: "For FDM printing, you are primarily choosing between PLA-based and PETG-based filaments. PLA is easier to print and produces good surface quality, but has lower chemical resistance and can deform at body temperature in some cases. PETG is more durable and chemically resistant, but requires more careful calibration." },
                { kind: "paragraph", text: "For MSLA resin printing, the distinction is between standard photopolymer resins and the newer class of elastic or flexible resins specifically developed for aligner applications. The flexible resins produce better force profiles for tooth movement but are significantly more expensive." },
              ],
            },
          },
          {
            id: "post-cure-protocols",
            title: "Post-cure protocols",
            type: "video",
            duration: "28 min",
            completed: false,
            video: {
              posterBg: "#1C2E27",
              duration: "28:45",
              transcript: [
                "Post-curing is the step that most practices get wrong when they first start with resin-based production. The tendency is to under-cure — because the part looks done — or to over-cure, which makes the material brittle.",
                "The correct cure time is not fixed. It depends on your resin type, your cure unit's lamp intensity, the geometry of the part, and the ambient temperature.",
                "We recommend running a cure ladder test whenever you introduce a new material: print five identical test pieces and cure them at your intended settings minus 20%, minus 10%, at nominal, plus 10%, and plus 20%. The correct cure point is where the part has full surface hardness without becoming brittle at the edges.",
              ],
            },
          },
          {
            id: "material-testing",
            title: "Material testing and validation",
            type: "text",
            duration: "12 min",
            completed: false,
            content: {
              body: [
                { kind: "paragraph", text: "Before you use any new material in clinical production, it should go through a structured validation process. This is not just good practice — for ISO 13485 certification, it is a documented requirement." },
                { kind: "heading", text: "The validation sequence" },
                { kind: "list", items: [
                  "Print 10 test models using your standard production settings",
                  "Measure dimensional accuracy at 5 reference points per model",
                  "Form aligners over each model and check fit on a reference typodont",
                  "Document the results and compare against your acceptance criteria",
                  "Sign off the material for production use — or reject and repeat with adjusted settings",
                ]},
              ],
            },
          },
        ],
      },
      {
        id: "module-4",
        title: "ISO Documentation",
        lessons: [
          {
            id: "what-iso-13485-means",
            title: "What ISO 13485 means for your practice",
            type: "text",
            duration: "20 min",
            completed: false,
            content: {
              body: [
                { kind: "paragraph", text: "ISO 13485 is the international standard for quality management systems in medical device manufacturing. Aligner production — printing models, forming aligners — falls within the scope of medical device manufacture in most regulatory frameworks. Understanding what this means in practice is essential before you build your documentation system." },
                { kind: "pullquote", text: "ISO 13485 is not a bureaucratic exercise. It is a framework for running a production system that produces consistent, safe outputs — which is exactly what you need in clinical practice." },
                { kind: "heading", text: "What it actually requires" },
                { kind: "paragraph", text: "At its core, ISO 13485 requires you to document what you do, do what you document, and provide evidence that you did it. For an in-house aligner practice, this means having written procedures for each production step, training records for each person who performs those steps, and batch records that show each production run was completed according to those procedures." },
                { kind: "heading", text: "Certification vs compliance" },
                { kind: "paragraph", text: "Many practices operate to the spirit of ISO 13485 without formal certification. Certification — which requires a third-party audit — is valuable if you are supplying aligners to other clinicians or operating at scale, but it is not legally required for in-house production within your own practice in most jurisdictions." },
                { kind: "paragraph", text: "What is required is that your production process meets the regulatory requirements for medical device manufacture in your country. In the UK this means MHRA compliance. In the EU, MDR 2017/745. In the US, FDA 21 CFR Part 820." },
                { kind: "heading", text: "The practical starting point" },
                { kind: "paragraph", text: "Before you worry about certification, focus on building four foundational documents: a quality manual, a process document for each production step, a training record template, and a batch record template. These four documents are the backbone of any ISO-compliant system and the basis on which everything else is built." },
              ],
            },
          },
          {
            id: "building-process-documentation",
            title: "Building your process documentation",
            type: "text",
            duration: "25 min",
            completed: false,
            content: {
              body: [
                { kind: "paragraph", text: "Process documentation is the foundation of a compliant production system. Its purpose is simple: if the person who normally does this task is not available, can someone else do it correctly using only the written procedure?" },
                { kind: "heading", text: "The anatomy of a good procedure" },
                { kind: "list", items: [
                  "Purpose: one sentence on why this procedure exists",
                  "Scope: what it covers and what it explicitly does not cover",
                  "Responsibilities: who performs each step and who checks it",
                  "Required materials and equipment: with specification numbers where relevant",
                  "Step-by-step instructions: numbered, specific, no assumed knowledge",
                  "Acceptance criteria: what does good look like?",
                  "Non-conformance response: what to do if it goes wrong",
                ]},
              ],
            },
          },
          {
            id: "non-conformance-management",
            title: "Non-conformance management",
            type: "text",
            duration: "15 min",
            completed: false,
            content: {
              body: [
                { kind: "paragraph", text: "A non-conformance is any instance where a product or process does not meet its specified requirements. In aligner production, this includes failed prints, aligners that do not fit correctly, materials outside specification, and deviations from documented procedures." },
                { kind: "paragraph", text: "The purpose of non-conformance management is not blame. It is learning. A well-run production system generates non-conformance records and uses them to identify patterns — which are the basis for corrective action." },
              ],
            },
          },
        ],
      },
      {
        id: "module-5",
        title: "QC Systems",
        lessons: [
          {
            id: "qc-checkpoints",
            title: "QC checkpoints: the full stack",
            type: "text",
            duration: "20 min",
            completed: false,
            content: { body: [{ kind: "paragraph", text: "Content coming soon." }] },
          },
          {
            id: "rejection-criteria",
            title: "Rejection criteria and what to do",
            type: "text",
            duration: "12 min",
            completed: false,
            content: { body: [{ kind: "paragraph", text: "Content coming soon." }] },
          },
          {
            id: "final-validation",
            title: "Final validation before patient delivery",
            type: "video",
            duration: "18 min",
            completed: false,
            video: {
              posterBg: "#1C2E27",
              duration: "18:30",
              transcript: ["Content coming soon."],
            },
          },
        ],
      },
    ],
  },

  {
    slug: "choose-the-better-trimline",
    title: "Choose the better trimline",
    description: "Seven scenarios. Seven clinical decisions. Identify the trimline that will perform better and understand why.",
    type: "Interactive Decision",
    pillar: "Clinical",
    level: "Intermediate",
    duration: "45 min",
    cpdHours: "0.75",
    progress: 0,
    objectives: [
      "Understand trimline biomechanical implications",
      "Develop clinical decision confidence",
    ],
    modules: [
      {
        id: "scenarios",
        title: "Clinical Scenarios",
        lessons: [
          { id: "scenario-1", title: "Scenario 1: Anterior intrusion, deep bite", type: "interactive", duration: "6 min", completed: false },
          { id: "scenario-2", title: "Scenario 2: Upper molar rotation with buccal root torque", type: "interactive", duration: "7 min", completed: false },
          { id: "scenario-3", title: "Scenario 3: Lower canine extrusion", type: "interactive", duration: "5 min", completed: false },
          { id: "scenario-4", title: "Scenario 4: Class II correction with anterior torque", type: "interactive", duration: "7 min", completed: false },
          { id: "scenario-5", title: "Scenario 5: Posterior expansion, asymmetric arch", type: "interactive", duration: "6 min", completed: false },
          { id: "scenario-6", title: "Scenario 6: Premolar derotation", type: "interactive", duration: "5 min", completed: false },
          { id: "scenario-7", title: "Scenario 7: Mixed dentition preparation case", type: "interactive", duration: "9 min", completed: false },
        ],
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonId: string): { course: Course; lesson: Lesson; module: CourseModule } | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) return { course, lesson, module: mod };
  }
  return undefined;
}

export function getAllLessons(course: Course): Lesson[] {
  return course.modules.flatMap(m => m.lessons);
}

export function getAdjacentLessons(course: Course, lessonId: string): { prev?: Lesson; next?: Lesson } {
  const all = getAllLessons(course);
  const idx = all.findIndex(l => l.id === lessonId);
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}
