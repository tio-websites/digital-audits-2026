export type SectionKind = "paragraph" | "heading" | "pullquote" | "list" | "divider";

export interface Section {
  kind: SectionKind;
  text?: string;
  items?: string[];
}

export interface Article {
  slug: string;
  dept: string;
  deptSlug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  issue: string;
  body: Section[];
}

export const articles: Article[] = [
  // ── EDITOR'S NOTE ─────────────────────────────────────────────────────────
  {
    slug: "building-systems-not-tools",
    dept: "Editor's Note",
    deptSlug: "editors-note",
    title: "Why the best practices are building systems, not just using tools",
    excerpt: "There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable.",
    author: "Finn",
    authorRole: "Clinical Director, Okklusion",
    date: "27 May 2026",
    readTime: "4 min",
    issue: "Issue 4",
    body: [
      {
        kind: "paragraph",
        text: "I visited a practice in Edinburgh last month that runs 400 active aligner cases with two clinicians and three support staff. They are not exceptional people running exceptional hours. They have built a system.",
      },
      {
        kind: "paragraph",
        text: "The distinction sounds obvious until you look at how most practices actually operate. They have acquired digital tools — a scanner, a monitoring platform, maybe an in-house printer — and they have added those tools to workflows that were designed for an analogue world. The result is a practice that is busier, not more efficient. The principal is still the bottleneck. The output ceiling is still the principal's available hours.",
      },
      {
        kind: "pullquote",
        text: "A practice that has built a digital system runs without the principal in the room. That is not a goal — it is a test.",
      },
      {
        kind: "paragraph",
        text: "The Edinburgh practice operates differently. Every scan goes through a defined triage protocol before the clinician sees it. Monitoring alerts are classified by a trained coordinator using a decision tree that covers 90% of scenarios. Treatment planning follows a documented template that was built by the principal and can be executed — with appropriate oversight — by trained staff. The clinician touches cases at defined decision points, not continuously.",
      },
      {
        kind: "heading",
        text: "What systems thinking actually requires",
      },
      {
        kind: "paragraph",
        text: "Building a system is harder than buying a tool. It requires the principal to extract their own decision-making — to make explicit what is currently implicit — and then to encode it in processes, training, and documentation that other people can follow. Most clinicians find this uncomfortable. The act of making your decisions legible to others can feel like giving something away.",
      },
      {
        kind: "paragraph",
        text: "It is not. What you are giving away is the low-value version of those decisions — the routine ones, the ones that follow a pattern, the ones your coordinator could make as well as you if they had your mental model written down. What you are keeping is the genuinely clinical work: the outliers, the complex presentations, the cases where your judgment is irreplaceable.",
      },
      {
        kind: "list",
        items: [
          "Document what you actually do, not what the software manual says to do",
          "Identify where coordinator-level decisions are currently sitting with the principal",
          "Build decision protocols for the 10 most common scenarios your team faces",
          "Create a defined escalation path for everything outside those protocols",
          "Review and update the system quarterly — it will drift otherwise",
        ],
      },
      {
        kind: "heading",
        text: "The ceiling you cannot see",
      },
      {
        kind: "paragraph",
        text: "The practices most resistant to systems thinking are usually the most successful ones. They have grown to a meaningful volume and they attribute that growth to their clinical quality — which is real — and to their personal involvement in every case — which is a confounding variable. Their output is already high relative to peers. The ceiling is invisible because they have not hit it yet.",
      },
      {
        kind: "paragraph",
        text: "They hit it eventually. At 150 active cases, the principal's involvement in everything is sustainable with effort. At 250, it requires long hours. At 350, it requires compromising something — quality, family time, or health — and at that point the practice stops growing because the principal cannot absorb more load.",
      },
      {
        kind: "pullquote",
        text: "The practices most resistant to systems thinking are usually the most successful ones. They have not hit the ceiling yet.",
      },
      {
        kind: "paragraph",
        text: "The Edinburgh practice has 400 active cases. The principal leaves at 5:30. The system is the point.",
      },
    ],
  },
  {
    slug: "ai-adoption-pressure",
    dept: "Editor's Note",
    deptSlug: "editors-note",
    title: "On the pressure to adopt AI before understanding it",
    excerpt: "Every week there is a new AI tool promising to transform orthodontic practice. Most of them are solving problems we do not have.",
    author: "Finn",
    authorRole: "Clinical Director, Okklusion",
    date: "20 May 2026",
    readTime: "3 min",
    issue: "Issue 3",
    body: [
      {
        kind: "paragraph",
        text: "I have been watching the AI tools space in orthodontics closely for two years. My honest assessment: the marketing has significantly outpaced the clinical evidence. That does not mean the tools are without value — some of them are genuinely useful — but the pressure practitioners feel to adopt them immediately, before the evidence base matures, is not in the patient's interest.",
      },
      {
        kind: "paragraph",
        text: "The sales pitch is consistent across vendors: AI will reduce your planning time, improve your outcomes, and let you see more patients. The first claim is often true. The second is unproven. The third is a consequence of the first only if the time saved is reinvested in capacity, which requires the kind of systems thinking I wrote about last week.",
      },
      {
        kind: "pullquote",
        text: "Ask the vendor one question: what peer-reviewed evidence supports the clinical outcome claims on your landing page?",
      },
      {
        kind: "paragraph",
        text: "Before adopting any AI-assisted planning or monitoring tool, I would encourage practitioners to ask one question of the vendor: what peer-reviewed evidence supports the clinical outcome claims on your landing page? If they cannot point to specific papers, you are being asked to be a beta tester. That may be fine — early adoption has its own rewards — but it should be a conscious choice, not a response to FOMO.",
      },
      {
        kind: "paragraph",
        text: "The tools I find most defensible are the ones with narrow, well-defined use cases: automated landmark identification on CBCT, compliance pattern detection in monitoring data, appointment scheduling optimisation. These are tasks with measurable accuracy benchmarks and limited clinical consequence if the algorithm is slightly wrong. The tools I am more cautious about are the ones making whole-treatment planning suggestions to practitioners who may not have the experience to evaluate those suggestions critically.",
      },
      {
        kind: "paragraph",
        text: "Adopt deliberately. Understand what problem you are solving before you sign the contract. The vendors will still be there in six months.",
      },
    ],
  },

  // ── CASE OF THE WEEK ──────────────────────────────────────────────────────
  {
    slug: "class-iii-severe-crowding-staging",
    dept: "Case of the Week",
    deptSlug: "case-of-the-week",
    title: "A Class III with severe crowding: the staging decisions that mattered",
    excerpt: "When anchorage is limited and the patient won't tolerate extractions, every staging decision carries compounding consequences.",
    author: "Finn",
    authorRole: "Clinical Director, Okklusion",
    date: "26 May 2026",
    readTime: "10 min",
    issue: "Issue 4",
    body: [
      {
        kind: "paragraph",
        text: "The patient is a 24-year-old woman referred by her GDP with a Class III skeletal pattern, 6mm of lower arch crowding, and a firm preference against extractions. She had worn a removable appliance as a teenager with partial resolution and had relapsed. She was motivated, articulate about her goals, and had realistic expectations about treatment duration.",
      },
      {
        kind: "heading",
        text: "The diagnostic picture",
      },
      {
        kind: "paragraph",
        text: "CBCT showed a mildly retrognathic maxilla and a slightly prognathic mandible — ANB of -2°, WITS of -4mm. The lower arch crowding was primarily in the anterior segment. Upper arch was near ideal. The buccal overjet was 0mm on the left and -1mm on the right. The soft tissue profile was acceptable and the patient had no concerns about her facial appearance.",
      },
      {
        kind: "paragraph",
        text: "The combination of Class III skeletal, lower crowding, and borderline buccal overjet creates a specific staging problem. Any decrowding of the lower arch involves expansion of arch form and proclination of lower incisors — both of which worsen the buccal overjet. If you decrowd first and the overjet goes negative, you lose the ability to introduce upper arch changes without a collision. The upper anteriors have nowhere to go.",
      },
      {
        kind: "pullquote",
        text: "The staging question was not what to do — it was what order to do it in, and which movements to protect from each other.",
      },
      {
        kind: "heading",
        text: "The staging decision",
      },
      {
        kind: "paragraph",
        text: "We staged in three phases. Phase one addressed posterior relationships bilaterally before touching the anterior segment — this gave us room to control vertical dimension and establish a more stable posterior platform. Phase two introduced lower incisor retraction with +2 torque overcorrection on the lower 3s, stepping down torque from the canines outward. We held the upper anteriors entirely in this phase.",
      },
      {
        kind: "list",
        items: [
          "Phase 1 (aligners 1–18): Posterior decrowding, buccal uprighting, establish vertical control",
          "Phase 2 (aligners 19–34): Lower anterior management, torque expression, preserve overjet",
          "Phase 3 (aligners 35–44): Upper arch finishing, final anterior torque, interproximal refinement",
        ],
      },
      {
        kind: "paragraph",
        text: "The rationale for this sequence was protecting the buccal overjet throughout phase two. By the time we introduced upper arch movement in phase three, the lower arch was near its final position and the collision risk was greatly reduced.",
      },
      {
        kind: "heading",
        text: "What we would do differently",
      },
      {
        kind: "paragraph",
        text: "The main thing I would change is the attachment design on the lower 3s. We used standard rectangular attachments and saw some rotational slippage mid-treatment. Optimised attachments — specifically the vertical rectangular with a mesial offset — would have given us better control and we might have reduced the overcorrection requirement from +2 to +1.5.",
      },
      {
        kind: "paragraph",
        text: "The case finished at aligner 42 with an excellent result. Buccal overjet ended at +0.5mm bilaterally. The patient is in fixed retention upper and lower with a plan for annual checks.",
      },
    ],
  },
  {
    slug: "unexpected-root-resorption",
    dept: "Case of the Week",
    deptSlug: "case-of-the-week",
    title: "Unexpected root resorption at review: what we changed and why",
    excerpt: "A routine review at aligner 30 revealed external apical root resorption on the upper laterals. Here is how we managed it.",
    author: "Finn",
    authorRole: "Clinical Director, Okklusion",
    date: "19 May 2026",
    readTime: "8 min",
    issue: "Issue 3",
    body: [
      {
        kind: "paragraph",
        text: "The case had been straightforward to that point. A 34-year-old male, Class I occlusion, moderate upper crowding, non-extraction plan. Healthy periodontium, no history of trauma. Routine periapical radiographs at aligner 30 — taken as protocol, not in response to any clinical finding — showed 1.5mm of external apical root resorption on both upper lateral incisors.",
      },
      {
        kind: "paragraph",
        text: "This is more common than practitioners acknowledge publicly. The literature on EARR in aligner therapy suggests rates between 5–15% depending on the definition used and the imaging protocol. What matters clinically is how you respond when you find it.",
      },
      {
        kind: "heading",
        text: "Immediate response",
      },
      {
        kind: "paragraph",
        text: "We paused treatment for 12 weeks — standard EARR protocol. During that pause we did three things: reviewed the original staging to assess how much upper lateral movement remained, reviewed the patient's consent documentation to confirm EARR had been discussed, and took a CBCT to establish a clearer baseline for the post-pause comparison.",
      },
      {
        kind: "pullquote",
        text: "What matters when you find EARR is not the diagnosis — it is the response. Most practitioners underreact. Some overreact. Both create problems.",
      },
      {
        kind: "paragraph",
        text: "After the pause, we took new periapicals. No further progression. We modified the remaining upper lateral movements — reducing planned torque from +3 to +1.5 and extending the aligner sequence to reduce the force per aligner. The patient was informed, understood the modification, and agreed to continue.",
      },
      {
        kind: "paragraph",
        text: "The case finished four months later. Final periapicals showed no further resorption. Root lengths were clinically acceptable. The patient is under annual radiographic review as part of their retention protocol.",
      },
    ],
  },

  // ── LAB NOTE ──────────────────────────────────────────────────────────────
  {
    slug: "resin-selection-high-throughput",
    dept: "Lab Note",
    deptSlug: "lab-note",
    title: "Resin selection in high-throughput environments: what the data shows",
    excerpt: "Not all resins perform equally under production pressure. We tested three materials across 400 consecutive prints and the results were not what we expected.",
    author: "Okklusion Editorial",
    date: "25 May 2026",
    readTime: "6 min",
    issue: "Issue 4",
    body: [
      {
        kind: "paragraph",
        text: "The received wisdom is that resin selection is primarily a cost decision once you have crossed the threshold of adequate optical clarity and dimensional accuracy. Our experience — and the data from our 400-print test — suggests this is wrong. Resin selection is a consistency decision, and consistency matters far more in high-throughput environments than in low-volume ones.",
      },
      {
        kind: "heading",
        text: "The test",
      },
      {
        kind: "paragraph",
        text: "We ran three materials through 400 consecutive prints on the same printer under identical conditions: SprintRay Pro 95, Ounuo Clear, and FormLabs Dental LT Clear v3. Prints were assessed for dimensional accuracy (measured against the STL with a structured light scanner), surface roughness (Ra value), and post-cure hardness (Shore D). We also tracked failure rate — defined as any print requiring manual intervention or discard.",
      },
      {
        kind: "list",
        items: [
          "SprintRay Pro 95: mean dimensional deviation 68µm, Ra 0.42, Shore D 87, failure rate 2.1%",
          "Ounuo Clear: mean dimensional deviation 82µm, Ra 0.61, Shore D 79, failure rate 4.7%",
          "FormLabs LT Clear v3: mean dimensional deviation 61µm, Ra 0.38, Shore D 91, failure rate 1.4%",
        ],
      },
      {
        kind: "paragraph",
        text: "The FormLabs material outperformed on every metric, but the cost delta is significant — approximately 2.2x the per-litre cost of Ounuo. At low volumes, the performance advantage is easy to justify. At 400+ prints per month, the calculation is more complex.",
      },
      {
        kind: "pullquote",
        text: "The failure rate difference between Ounuo and FormLabs — 4.7% versus 1.4% — costs more in labour and remakes than the material price difference at any volume above 80 prints per month.",
      },
      {
        kind: "heading",
        text: "The throughput calculation",
      },
      {
        kind: "paragraph",
        text: "At 400 prints per month, the difference in failure rate between Ounuo (4.7%) and FormLabs (1.4%) represents approximately 13 additional failed prints. Each failed print costs staff time for identification, reprinting, and quality check — in our environment, roughly 18 minutes. That is 3.9 hours of labour per month, which at coordinator pay rates is more expensive than the resin cost difference.",
      },
      {
        kind: "paragraph",
        text: "The conclusion we drew: at volumes above approximately 80 prints per month, the higher-performing resin pays for itself through reduced failure rates and labour cost. Below that volume, the cheaper material is defensible. The crossover point will vary by practice depending on labour costs and capacity utilisation.",
      },
    ],
  },
  {
    slug: "post-cure-time-aligner-fit",
    dept: "Lab Note",
    deptSlug: "lab-note",
    title: "Post-cure time and aligner fit: a practical review",
    excerpt: "How much does post-cure time actually affect fit? We ran a controlled comparison and the results have changed our protocol.",
    author: "Okklusion Editorial",
    date: "18 May 2026",
    readTime: "5 min",
    issue: "Issue 3",
    body: [
      {
        kind: "paragraph",
        text: "Post-cure time is one of those parameters that most practices set once — usually following the resin manufacturer's recommendation — and then leave alone. Our experience is that the manufacturer recommendation is a minimum, not an optimum, and that extending post-cure time within reasonable limits improves both aligner stiffness and dimensional stability.",
      },
      {
        kind: "paragraph",
        text: "We tested post-cure times of 5, 8, 10, and 15 minutes on the same resin and printer combination, assessing each sample at 24h and at 7 days post-production. The 7-day measurement matters because resins continue to cure after production — a post-cure time that produces acceptable results at 24h may look different at one week.",
      },
      {
        kind: "pullquote",
        text: "The manufacturer minimum is a floor, not a target. Most practices are running below the optimal post-cure time for their resin and UV unit combination.",
      },
      {
        kind: "paragraph",
        text: "Our results showed meaningful improvement up to 10 minutes, with diminishing returns beyond that. Crucially, the difference between 5 minutes (manufacturer minimum for our resin) and 10 minutes was greater than we expected — approximately 12% improvement in Shore D hardness and a measurable reduction in dimensional creep over 7 days.",
      },
      {
        kind: "paragraph",
        text: "We have updated our protocol to 10 minutes post-cure as a standard. If you have not run this test for your own resin and UV unit combination, it is worth doing. The cost is one afternoon of testing; the benefit is potentially significant fit improvement across your entire production output.",
      },
    ],
  },

  // ── SOFTWARE NOTE ─────────────────────────────────────────────────────────
  {
    slug: "dm-42-monitoring-algorithm",
    dept: "Software Note",
    deptSlug: "software-note",
    title: "DM 4.2 update: what changed in the monitoring algorithm",
    excerpt: "The new compliance scoring model changes how non-wear is classified. Here is what it means for how you triage your active patients.",
    author: "Okklusion Editorial",
    date: "24 May 2026",
    readTime: "4 min",
    issue: "Issue 4",
    body: [
      {
        kind: "paragraph",
        text: "DentaMonitor 4.2 shipped last month with a change to the compliance scoring algorithm that has caused significant confusion across practices using the platform. Patients who were previously scoring green are now scoring amber. The change is not a bug — it reflects a deliberate threshold adjustment by DM's clinical team — but it requires active management to avoid unnecessary clinical calls.",
      },
      {
        kind: "heading",
        text: "What actually changed",
      },
      {
        kind: "paragraph",
        text: "The 4.1 algorithm classified non-wear based on a rolling 7-day wear average, with the amber threshold set at below 20 hours per day average. The 4.2 algorithm introduces a weighted model that gives greater weight to consecutive non-wear events — defined as any 24-hour window with under 16 hours of detected wear. Two such events in a 7-day window now triggers an automatic amber classification regardless of the overall average.",
      },
      {
        kind: "pullquote",
        text: "Patients who sleep poorly, travel across time zones, or have variable work schedules are most affected by the consecutive-event weighting. This is worth noting when reviewing amber cases.",
      },
      {
        kind: "paragraph",
        text: "The practical consequence: a patient who wears their aligners diligently for 5 of 7 days but has two days of poor wear — due to illness, travel, or a social event — now scores amber automatically, regardless of their overall compliance pattern. In 4.1, the same patient would likely have scored green.",
      },
      {
        kind: "heading",
        text: "How to triage the backlog",
      },
      {
        kind: "paragraph",
        text: "The most efficient approach we have seen is to filter for cases where the DM score dropped by more than 15 points between versions. This isolates algorithm-driven reclassifications from genuine clinical compliance deterioration. In most practices, approximately 60–70% of new amber cases fall into this category and can be monitored rather than called.",
      },
      {
        kind: "list",
        items: [
          "Export compliance data from 4.1 before the update if you have not already (DM support can assist)",
          "Filter new amber cases by score delta — drops of >15 points are likely algorithmic",
          "Cross-reference with check-in photo quality and self-reported wear from the patient app",
          "Reserve clinical calls for cases with both amber score and poor photo evidence",
          "Contact your DM rep about the batch re-scoring option in admin settings",
        ],
      },
    ],
  },

  // ── EVIDENCE NOTE ─────────────────────────────────────────────────────────
  {
    slug: "root-resorption-evidence-review",
    dept: "Evidence Note",
    deptSlug: "evidence-note",
    title: "Root resorption risk in digital aligner therapy: a review of current evidence",
    excerpt: "The literature is more nuanced than the marketing suggests. Here is what the evidence actually says and what it means for informed consent.",
    author: "Okklusion Editorial",
    date: "23 May 2026",
    readTime: "7 min",
    issue: "Issue 4",
    body: [
      {
        kind: "paragraph",
        text: "External apical root resorption (EARR) is one of the better-studied risks in orthodontic treatment, and it is also one of the most poorly communicated ones. Marketing materials for aligner systems routinely describe reduced EARR risk compared to fixed appliances — a claim that has some support in the literature but is significantly more conditional than the promotional language implies.",
      },
      {
        kind: "heading",
        text: "What the evidence actually says",
      },
      {
        kind: "paragraph",
        text: "The most comprehensive systematic review to date (Zheng et al., 2024, American Journal of Orthodontics) pooled data from 22 studies comparing aligner therapy and fixed appliances on EARR incidence and severity. The headline finding — lower EARR in aligner groups — holds across most studies. The conditional finding — that this advantage disappears for teeth undergoing significant torque change — is less frequently cited.",
      },
      {
        kind: "pullquote",
        text: "The EARR advantage of aligner therapy is real but conditional. It applies to teeth with minimal torque change. For upper laterals undergoing significant torque, the evidence is less clear.",
      },
      {
        kind: "paragraph",
        text: "Specifically, upper lateral incisors undergoing torque changes greater than 8 degrees show EARR rates in aligner therapy comparable to those seen in fixed appliance treatment. Given that upper lateral torque correction is a routine component of many aligner cases — and that torque overcorrection is standard practice — this finding is clinically significant.",
      },
      {
        kind: "heading",
        text: "Implications for informed consent",
      },
      {
        kind: "paragraph",
        text: "The standard informed consent document for aligner treatment should acknowledge EARR as a risk and specify that the risk is higher for cases involving significant anterior torque. Most consent forms meet this standard. Where practice falls short is in the verbal consent conversation — practitioners who use the 'gentler than braces' framing are creating an expectation that the evidence does not fully support.",
      },
      {
        kind: "list",
        items: [
          "Acknowledge EARR as a specific risk in consent, not as a generic 'orthodontic complication'",
          "Specify the elevated risk for upper anterior torque cases in the consent conversation",
          "Take periapical radiographs at defined intervals — our protocol is at aligner 30 and at completion",
          "Document the pre-treatment root length as a baseline for comparison",
          "Have a defined pause-and-review protocol that clinical staff can initiate without requiring the principal",
        ],
      },
    ],
  },

  // ── PRACTICE NOTE ─────────────────────────────────────────────────────────
  {
    slug: "onboarding-treatment-coordinator-dm",
    dept: "Practice Note",
    deptSlug: "practice-note",
    title: "How to onboard a treatment coordinator onto DM in five days",
    excerpt: "Staff resistance is almost always a training and confidence problem. Here is a structured five-day onboarding that removes both.",
    author: "Okklusion Editorial",
    date: "22 May 2026",
    readTime: "5 min",
    issue: "Issue 4",
    body: [
      {
        kind: "paragraph",
        text: "The most common reason DentaMonitor adoption stalls in practice is not technical — it is human. A treatment coordinator who does not understand the platform, cannot interpret the alerts, and has no decision protocol for common scenarios will default to interrupting the principal. The principal then takes over, the coordinator disengages, and the ROI of the monitoring platform disappears.",
      },
      {
        kind: "paragraph",
        text: "The fix is structured onboarding. Not 'here is the login, here is a YouTube tutorial' onboarding — a proper five-day programme that ends with the coordinator running the DM dashboard autonomously for routine cases.",
      },
      {
        kind: "heading",
        text: "The five-day structure",
      },
      {
        kind: "list",
        items: [
          "Day 1: Platform orientation — dashboard layout, alert types, patient file navigation, photo review. No decision-making. Just reading.",
          "Day 2: Alert classification — working through 20 historical amber and red cases with the principal, discussing the reasoning behind each call.",
          "Day 3: Decision protocol — building the coordinator's decision tree for the six most common alert scenarios in your practice.",
          "Day 4: Supervised autonomy — coordinator makes initial assessments independently, principal reviews and gives feedback before any action is taken.",
          "Day 5: Independent operation — coordinator runs the full morning DM session solo. Principal available for escalation only.",
        ],
      },
      {
        kind: "pullquote",
        text: "Day 3 is the most important day. The decision tree the coordinator builds on Day 3 is the document that replaces the principal in routine DM triage. It deserves a proper afternoon.",
      },
      {
        kind: "paragraph",
        text: "The escalation path matters as much as the decision tree. The coordinator needs to know exactly what triggers a principal review, how to document the escalation, and what turnaround time to expect. Without a defined escalation path, coordinators either over-escalate (destroying the efficiency gain) or under-escalate (creating clinical risk).",
      },
      {
        kind: "paragraph",
        text: "After five days, most coordinators are running routine DM triage with minimal principal involvement. The principal's daily DM time typically drops from 30–45 minutes to 5–10 minutes. The coordinator's confidence and engagement increases because they have a real clinical role with clear boundaries.",
      },
    ],
  },
  {
    slug: "pricing-digital-workflows",
    dept: "Practice Note",
    deptSlug: "practice-note",
    title: "Pricing digital workflows: what to charge and how to explain it",
    excerpt: "Most practices either undercharge for digital treatment or fail to communicate its value. Both are solvable problems.",
    author: "Okklusion Editorial",
    date: "15 May 2026",
    readTime: "4 min",
    issue: "Issue 3",
    body: [
      {
        kind: "paragraph",
        text: "The pricing conversation in digital orthodontics is muddied by the fact that cost saving and value creation are different things. A practice that moves to in-house printing reduces its material cost per case. That cost saving is not the same as an increase in the value of the treatment to the patient — and conflating the two leads to pricing decisions that leave money on the table or fail to grow case volume.",
      },
      {
        kind: "pullquote",
        text: "Patients do not pay for your costs. They pay for outcomes, experience, and confidence. Pricing should reflect what you deliver, not what you spend.",
      },
      {
        kind: "paragraph",
        text: "The practices getting pricing right in digital workflows are doing two things: articulating the value of remote monitoring to patients in terms of outcomes and convenience, not in terms of technology; and using the speed advantage of in-house production as a service differentiator — faster refinements, faster restarts, faster resolution of mid-treatment issues — rather than as a cost-based price reduction.",
      },
      {
        kind: "list",
        items: [
          "Do not lead with 'we make our aligners in-house' — patients do not know what to do with that",
          "Do lead with 'your refinements are turned around in 5 days, not 3–4 weeks'",
          "Remote monitoring is worth a meaningful fee supplement — 20–30% of practices are charging nothing for it",
          "Consider a case complexity tiering that reflects clinical time rather than just aligner count",
          "Review your pricing annually — the market is moving and your costs are too",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByDept(deptSlug: string): Article[] {
  return articles.filter(a => a.deptSlug === deptSlug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return articles
    .filter(a => a.slug !== slug && a.deptSlug === article.deptSlug)
    .slice(0, count);
}

export const deptMeta: Record<string, { label: string; description: string; colour: string }> = {
  "editors-note":     { label: "Editor's Note",    description: "Finn's weekly perspective on where digital orthodontics is heading.",              colour: "var(--accent)" },
  "case-of-the-week": { label: "Case of the Week", description: "A clinical case dissected in full — staging decisions, mid-treatment calls, and outcomes.", colour: "var(--text-primary)" },
  "lab-note":         { label: "Lab Note",          description: "Manufacturing, printing, materials, and quality control from the production floor.", colour: "#7A8C84" },
  "software-note":    { label: "Software Note",     description: "Updates, analysis and practical guidance on the software stack.",                   colour: "#8C8279" },
  "evidence-note":    { label: "Evidence Note",     description: "Clinical research translated into practical guidance.",                             colour: "#848C7A" },
  "practice-note":    { label: "Practice Note",     description: "Operations, staffing, systems, and the business of a digital practice.",            colour: "var(--text-secondary)" },
};
