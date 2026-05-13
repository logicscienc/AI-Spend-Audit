import { v4 as uuidv4 } from "uuid";
import supabase from "../lib/supabase.js";

export async function saveAudit({
  results,
  rawEntries,
  totalMonthlySavings,
  yearlySavings,
  summary,
}) {

  const auditId = uuidv4();

  const { data, error } = await supabase
    .from("audits")
    .insert([
      {
        id: auditId,
        results,
        raw_entries: rawEntries,
        total_monthly_savings:
          totalMonthlySavings,

        yearly_savings:
          yearlySavings,

        summary,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error);

    throw new Error(
      "Failed to save audit"
    );
  }

  return data;
}