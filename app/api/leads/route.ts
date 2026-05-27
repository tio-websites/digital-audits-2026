import { type NextRequest } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  let email: string, auditId: string, overallScore: number;

  try {
    const body = await request.json();
    email = (body.email as string)?.trim().toLowerCase();
    auditId = body.auditId as string;
    overallScore = Number(body.overallScore) || 0;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Valid email required." }, { status: 400 });
  }

  // ── 1. Save lead to Supabase ─────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: lead, error: leadError } = await (supabaseAdmin as any)
    .from("leads")
    .insert({ email, audit_id: auditId || null, overall_score: overallScore })
    .select("id")
    .single();

  if (leadError) {
    console.error("Lead insert error:", leadError);
    // Continue — HubSpot sync is best effort
  }

  const leadId = (lead as { id: string } | null)?.id;

  // ── 2. HubSpot integration ───────────────────────────────────────────────────
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    return Response.json({ ok: true, leadId });
  }

  const auditUrl = auditId
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/audit/${auditId}`
    : "";

  const hsHeaders = {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  let contactId: string | null = null;

  // Create or update contact
  try {
    const contactRes = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: hsHeaders,
        body: JSON.stringify({
          properties: {
            email,
            website_audit_score: String(overallScore),
            website_audit_url: auditUrl,
          },
        }),
      }
    );

    if (contactRes.status === 409) {
      // Contact already exists — extract the existing ID
      const existingId = (await contactRes.json())?.message?.match(
        /Existing ID: (\d+)/
      )?.[1];
      if (existingId) {
        // Update existing contact
        await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
          {
            method: "PATCH",
            headers: hsHeaders,
            body: JSON.stringify({
              properties: {
                website_audit_score: String(overallScore),
                website_audit_url: auditUrl,
              },
            }),
          }
        );
        contactId = existingId;
      }
    } else if (contactRes.ok) {
      contactId = (await contactRes.json()).id ?? null;
    }
  } catch (err) {
    console.error("HubSpot contact error:", err);
  }

  // Create deal and associate with contact
  let dealId: string | null = null;
  if (contactId && process.env.HUBSPOT_PIPELINE_ID) {
    try {
      const dealRes = await fetch(
        "https://api.hubapi.com/crm/v3/objects/deals",
        {
          method: "POST",
          headers: hsHeaders,
          body: JSON.stringify({
            properties: {
              dealname: `Website Audit — ${email}`,
              pipeline: process.env.HUBSPOT_PIPELINE_ID,
              dealstage:
                process.env.HUBSPOT_PIPELINE_STAGE_ID ?? "appointmentscheduled",
              amount: "0",
              description: `Audit score: ${overallScore}/100\n${auditUrl}`,
            },
            associations: [
              {
                to: { id: contactId },
                types: [
                  {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 3, // deal → contact
                  },
                ],
              },
            ],
          }),
        }
      );
      if (dealRes.ok) {
        dealId = (await dealRes.json()).id ?? null;
      }
    } catch (err) {
      console.error("HubSpot deal error:", err);
    }
  }

  // ── 3. Update lead with HubSpot IDs ──────────────────────────────────────────
  if (leadId && (contactId || dealId)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin as any)
      .from("leads")
      .update({ hubspot_contact_id: contactId, hubspot_deal_id: dealId })
      .eq("id", leadId);
  }

  return Response.json({ ok: true, leadId });
}
