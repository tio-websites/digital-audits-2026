// TODO: Replace with real Monday.com GraphQL API calls when API token available
// Monday.com API endpoint: https://api.monday.com/v2
// Required env vars: MONDAY_API_TOKEN, MONDAY_MEMBERS_BOARD_ID, MONDAY_LEADS_BOARD_ID

export type MondayContact = {
  id?: string;
  name: string;
  email: string;
  plan: "basic" | "premium" | "super-premium";
  practice?: string;
  status: "active" | "inactive" | "lead";
  joinedAt: string;
};

export async function createMondayContact(contact: MondayContact): Promise<{ id: string }> {
  // TODO: POST to Monday.com GraphQL API to create item in Members board
  // mutation { create_item(board_id: MONDAY_MEMBERS_BOARD_ID, item_name: contact.name, column_values: {...}) { id } }
  console.log("[Monday STUB] createMondayContact:", contact);
  return { id: `mock_${Date.now()}` };
}

export async function updateMondayContact(mondayId: string, updates: Partial<MondayContact>): Promise<void> {
  // TODO: PATCH Monday.com item via GraphQL change_column_value mutation
  console.log("[Monday STUB] updateMondayContact:", mondayId, updates);
}

export async function createMondayLead(email: string, source?: string): Promise<{ id: string }> {
  // TODO: Create item in Leads board for visitors who don't complete signup
  console.log("[Monday STUB] createMondayLead:", email, source);
  return { id: `lead_${Date.now()}` };
}

export async function getMondayMembers(): Promise<MondayContact[]> {
  // TODO: Query Monday.com board for all members
  // Returns mock data for now
  return [
    { id: "mock_1", name: "Demo User", email: "demo@example.com", plan: "premium", practice: "Demo Practice", status: "active", joinedAt: new Date().toISOString() },
  ];
}
