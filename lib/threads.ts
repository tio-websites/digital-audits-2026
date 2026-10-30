export interface Reply {
  id: string;
  author: string;
  initial: string;
  role?: string;
  time: string;
  body: string;
  helpful: number;
  isFinn?: boolean;
}

export interface Thread {
  id: string;
  dept: string;
  title: string;
  body: string;
  author: string;
  initial: string;
  role?: string;
  time: string;
  replies: Reply[];
  helpful: number;
  views: number;
  pinned?: boolean;
  hot?: boolean;
}

export const deptColour: Record<string, string> = {
  "Lab Note":        "#7A8C84",
  "Clinical":        "var(--text-primary)",
  "Software":        "#8C8279",
  "Practice":        "var(--text-secondary)",
  "Evidence":        "#848C7A",
  "Case Submission": "var(--accent)",
};

export const threads: Thread[] = [
  {
    id: "weekly-case-class-iii-crowding",
    dept: "Case Submission",
    title: "Weekly case: Class III with severe crowding — staging input welcome",
    body: "Sharing this week's case for peer discussion. 24-year-old female, Class III skeletal, 6mm of lower arch crowding, non-extraction plan. The staging decisions that made this interesting: how to sequence lower decrowding when you're simultaneously trying to protect the buccal overjet. Files and CBCT available to members on request. I've gone with my approach but curious to hear how others would stage this differently.",
    author: "Finn",
    initial: "F",
    role: "Clinical Director",
    time: "18h ago",
    helpful: 94,
    views: 312,
    pinned: true,
    hot: true,
    replies: [
      {
        id: "r1",
        author: "Dr Sarah Chen",
        initial: "S",
        role: "Orthodontist, Edinburgh",
        time: "16h ago",
        body: "Would love to see the files. My instinct on Class III cases with this level of crowding is to start with lower decrowding before introducing any anterior torque expression — otherwise you're fighting the aligner on two fronts. What prescription did you end up using for the lower incisors?",
        helpful: 31,
      },
      {
        id: "r2",
        author: "Dr M. Okafor",
        initial: "M",
        role: "Specialist, London",
        time: "14h ago",
        body: "Interesting setup. Did you consider staging with a posterior platform to manage the vertical before starting the decrowding sequence? In our Class III non-extraction cases it's been useful for controlling the buccal overjet early.",
        helpful: 18,
      },
      {
        id: "r3",
        author: "Finn",
        initial: "F",
        role: "Clinical Director",
        isFinn: true,
        time: "12h ago",
        body: "Good question on the prescription. We ran +2 on the lower incisors with a step-down in torque from the 3s outward. The posterior platform idea was tempting but we had concerns about patient compliance with anything that increased bulk on the occlusal surface. Files now shared — DM me and I'll send the link.",
        helpful: 47,
      },
      {
        id: "r4",
        author: "AlignFlow_Dublin",
        initial: "A",
        time: "10h ago",
        body: "Following this closely. We have a similar case in planning right now and the staging question around lower crowding vs anterior position has been the sticking point. Very helpful to see the thought process laid out.",
        helpful: 9,
      },
    ],
  },
  {
    id: "attachment-bond-failures-ormco",
    dept: "Lab Note",
    title: "Attachment bond failures with the new Ormco trays — anyone else seeing this?",
    body: "We've been experiencing higher than usual attachment bond failures specifically with what appears to be the February batch of Ormco clear trays. SprintRay Pro 95 in-house. About 3 out of 10 cases in the last 6 weeks have had anterior attachment failures before the 2-week mark. Consistently on lower 3s and upper 4s. We've checked etch time (30 sec), bond (Transbond XT), light cure (10 sec each face) — all within protocol. Nothing changed on our end. Has anyone else tracked this pattern?",
    author: "DigitalDental_Leeds",
    initial: "D",
    time: "2h ago",
    helpful: 44,
    views: 187,
    hot: true,
    replies: [
      {
        id: "r1",
        author: "Dr James Whitfield",
        initial: "J",
        role: "Principal, Manchester",
        time: "1h 45m ago",
        body: "Exact same batch timing. We ran 6 weeks of slightly elevated failure rates before we switched from Transbond XT to RelyX Ortho Cement. Haven't seen a failure since. Worth a trial.",
        helpful: 22,
      },
      {
        id: "r2",
        author: "SprintRay_User_Bris",
        initial: "B",
        time: "1h 20m ago",
        body: "We print in-house so different material entirely, but had a similar issue run last quarter. Turned out to be a post-cure creep — our unit's lamp had degraded enough that the surface energy was slightly off. Worth running a cure ladder if you haven't recently.",
        helpful: 14,
      },
      {
        id: "r3",
        author: "Finn",
        initial: "F",
        role: "Clinical Director",
        isFinn: true,
        time: "45m ago",
        body: "Worth flagging: there was a report circulating on a lab forum last week about the Feb batch having measurably different surface energy properties — suspected UV stabiliser variance in the polymer. The fix most practices have found is extending etch time to 45 seconds and using a silane primer before bonding. I'm following up with Ormco directly and will post anything confirmed here. In the meantime, the silane primer step is low risk and worth trying.",
        helpful: 51,
      },
    ],
  },
  {
    id: "dm-42-compliance-scoring",
    dept: "Software",
    title: "DM 4.2 compliance scoring changes — how are you handling existing patients mid-treatment?",
    body: "The new compliance scoring algorithm in DM 4.2 has changed how non-wear is classified. Several of our active patients who were previously tracking as compliant have now dropped into amber or red — not because their behaviour changed, but because the scoring threshold shifted. Before I go through and manually review 60+ active cases, has anyone found a systematic way to triage who needs a clinical call vs who's fine to continue without intervention?",
    author: "Align_Manchester",
    initial: "A",
    time: "5h ago",
    helpful: 28,
    views: 142,
    hot: true,
    replies: [
      {
        id: "r1",
        author: "Dr K. Ndlovu",
        initial: "K",
        role: "Specialist Orthodontist",
        time: "4h ago",
        body: "We ran a filter for all cases where the score dropped by more than 15 points between 4.1 and 4.2. That isolated the 'algorithm change' cases from genuine clinical compliance drops. About 70% of our apparent amber cases were in the former bucket and we kept them on current protocol.",
        helpful: 34,
      },
      {
        id: "r2",
        author: "DMPower_User",
        initial: "P",
        time: "3h ago",
        body: "DM support confirmed to us that there's a batch re-scoring option in the practice admin settings. We used it to normalise the historical data before making any clinical calls. Might be worth a call to your rep.",
        helpful: 19,
      },
    ],
  },
  {
    id: "class-ii-div2-deep-bite-staging",
    dept: "Clinical",
    title: "Best approach for staging a Class II div 2 with deep bite — share your workflows",
    body: "Looking for peer input on staging philosophy for a Class II division 2 presentation with a traumatic deep bite. Patient is mid-30s, adult periodontium, wants aligner treatment. I've got a clear view on the finishing goal but the sequencing question is where I'd love other perspectives: do you open the bite early in staging to give yourself room for anteriors, or leave bite opening until the arch forms are reasonably close to ideal?",
    author: "ClassicCaseOrtho",
    initial: "C",
    time: "Yesterday",
    helpful: 22,
    views: 98,
    replies: [
      {
        id: "r1",
        author: "Dr A. Brannigan",
        initial: "A",
        role: "Consultant Orthodontist",
        time: "Yesterday",
        body: "Early bite opening is our default for division 2 presentations. Leaving it until later means your upper incisors can't move freely until the posterior vertical has increased — you end up with an aligner doing two things at once and neither well.",
        helpful: 17,
      },
      {
        id: "r2",
        author: "Finn",
        initial: "F",
        role: "Clinical Director",
        isFinn: true,
        time: "Yesterday",
        body: "Agree with early bite opening as a principle. One nuance worth considering in adult cases with a traumatic overbite: check the upper incisor root lengths before you start. If there's any resorption history, intrusion as part of bite opening can be riskier than a levelling approach. The evidence on this in the EARR review module is relevant here.",
        helpful: 38,
      },
    ],
  },
  {
    id: "in-house-aligner-pricing",
    dept: "Practice",
    title: "Pricing for in-house aligners — what are practices charging, and how do you structure it?",
    body: "We're 6 months into full in-house production and the question I keep going back to is pricing. We're currently charging the same as before — the production cost saving goes to margin — but I'm wondering if others are passing any saving to patients, or using it differently. Is anyone structuring pricing to make in-house a visible differentiator?",
    author: "PracticeOwner_Cardiff",
    initial: "P",
    time: "Yesterday",
    helpful: 31,
    views: 115,
    replies: [
      {
        id: "r1",
        author: "DSO_Ops_Member",
        initial: "D",
        time: "23h ago",
        body: "We've kept our list price the same but launched a 'fast track' refinement offer — in-house production means we can turn refinements in 5 days rather than 3-4 weeks, and that's become a genuine sales point. Patients notice.",
        helpful: 24,
      },
      {
        id: "r2",
        author: "IndyOrtho_Notts",
        initial: "I",
        time: "20h ago",
        body: "We used the saving to hire a treatment coordinator specifically focused on case starts, not production. Better ROI than a price reduction in our market.",
        helpful: 11,
      },
    ],
  },
  {
    id: "iso-documentation-templates",
    dept: "Lab Note",
    title: "ISO 13485 documentation — anyone using a template system they'd share?",
    body: "Working through our first proper ISO documentation sprint. We've got the quality manual started but the process documents are taking longer than expected because we're building from scratch. Has anyone developed templates or a documentation system they're happy to share? Even a format that others have found audit-ready would save us weeks.",
    author: "StartingISO_Birm",
    initial: "S",
    time: "2 days ago",
    helpful: 19,
    views: 74,
    replies: [
      {
        id: "r1",
        author: "ISO_Done_Glasgow",
        initial: "I",
        time: "2 days ago",
        body: "We used a consultant for our first pass — about 3 days of their time. Expensive but saved us from reinventing the wheel on document control structure. Happy to share the format we ended up with privately.",
        helpful: 13,
      },
    ],
  },
  {
    id: "upper-lateral-overcorrection",
    dept: "Clinical",
    title: "Overcorrection on upper laterals — how much is enough for reliable torque expression?",
    body: "Recurring question in our planning sessions: what overcorrection factor are people using for upper lateral incisor torque in standard aligner cases? We're currently running 3-5 degrees over prescription but still seeing under-expression on about a third of cases that reach the finishing stage.",
    author: "TorqueQuestion",
    initial: "T",
    time: "3 days ago",
    helpful: 14,
    views: 56,
    replies: [
      {
        id: "r1",
        author: "Dr L. Farquhar",
        initial: "L",
        role: "Specialist Orthodontist",
        time: "3 days ago",
        body: "We've moved to 7-10 degrees overcorrection on upper laterals as a default, with attachments on both adjacent teeth. Under-expression halved. The attachment geometry matters as much as the prescription value.",
        helpful: 21,
      },
    ],
  },
  {
    id: "dm-alert-fatigue",
    dept: "Software",
    title: "DM alert fatigue — how do you manage your triage workflow when you have 300+ active cases?",
    body: "At our volume, the DM dashboard generates around 40-60 alerts a day across the practice. We're spending over an hour each morning just categorising them before anyone starts clinical work. Looking for systems other large-volume practices use — whether that's filtering logic, delegation to trained coordinators, or AI-assisted triage. What's working?",
    author: "HighVolume_Ortho",
    initial: "H",
    time: "4 days ago",
    helpful: 26,
    views: 89,
    replies: [
      {
        id: "r1",
        author: "ScaleOrtho_MCR",
        initial: "S",
        time: "4 days ago",
        body: "Trained our treatment coordinator to handle all yellow alerts autonomously — she has a decision protocol for the 6 most common yellow scenarios and escalates anything outside that to me. Cut my daily DM time from 45 minutes to 10.",
        helpful: 33,
      },
    ],
  },
];

export function getThread(id: string): Thread | undefined {
  return threads.find(t => t.id === id);
}
