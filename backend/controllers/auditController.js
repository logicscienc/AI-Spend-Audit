import { generateAISummary } from "../services/openaiService.js";
import { saveAudit } from "../services/auditService.js";
import { sendLeadConfirmationEmail } from "../services/emailService.js";
import supabase from "../lib/supabase.js";

export async function generateSummary(req, res) {
  console.log("REQ BODY:", req.body);

  try {
    const {
      results,
      rawEntries,
      totalMonthlySavings,
      yearlySavings,
    } = req.body;

    const aiResponse = await generateAISummary({
      results,
      rawEntries,
      totalMonthlySavings,
      yearlySavings,
    });

    const savedAudit = await saveAudit({
      results,
      rawEntries,
      totalMonthlySavings,
      yearlySavings,
      summary: aiResponse.summary,
    });

    res.json({
      success: true,
      auditId: savedAudit.id,
      results,
      rawEntries,
      totalMonthlySavings,
      yearlySavings,
      summary: aiResponse.summary,
      auditDate: new Date().toISOString(),
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate audit",
    });
  }
}

export async function getAudits(req, res) {
  try {
    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      audits: data,
    });

  } catch (error) {
    console.log("GET AUDITS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch audits",
    });
  }
}



export async function getAuditById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      audit: data,
    });

  } catch (error) {
    console.log("GET AUDIT BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch audit",
    });
  }
}

export const saveLead = async (req, res) => {
  try {
    const {
  email,
  company,
  role,
  teamSize,
  website,
  totalMonthlySavings,
} = req.body;

// HONEYPOT PROTECTION
if (website) {
  return res.status(400).json({
    success: false,
    message: "Spam detected",
  });
}

    // BASIC VALIDATION
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // SAVE TO SUPABASE
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          company,
          role,
          team_size: teamSize,
          total_monthly_savings: totalMonthlySavings,
        },
      ])
      .select();

    if (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Failed to save lead",
      });
    }

    await sendLeadConfirmationEmail({
  email,
  totalMonthlySavings,
});

    res.status(201).json({
      success: true,
      lead: data[0],
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};