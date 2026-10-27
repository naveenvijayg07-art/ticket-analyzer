// ============================================================
// 📂 src/api/mockData.ts
// PURPOSE: Connected to the real architecture discovered in
//          D:\NAVEEN\ErpDevelop (AKR Textile Enterprise ERP)
//
// ⛔ SAFETY: Strictly READ-ONLY. Zero changes to D:\NAVEEN and DB.
// ============================================================

import type { Ticket, TicketHistoryRecord, Module, AnalysisReport } from "../types";

// ── REAL ENTERPRISE TICKETS FROM AKR TEXTILE ERP ─────────────

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    title: "CHA Bill unable to map with Invoice AKRT/0099/26-27 (CHA Bill: CCLSM/02993/26-27)",
    description: "DEAR TEAM, THE CHA BILL WE UNABLE TO MAP WITH INVOICE AKRT/0099/26-27, WHICH IS NOT AVAILABLE IN THE INVOICE LIST CHA BILL NO : CCLSM/02993/26-27 CHECK & CLEAR THE SAME ASAP.",
    status: "OPEN",
    priority: "CRITICAL",
    module: "Commercial & Invoicing",
    raisedBy: "Shipping Team",
    assignedTo: "ERP Support",
    createdAt: "2026-10-27T08:15:00Z",
    updatedAt: "2026-10-27T08:30:00Z",
  },
  {
    id: 2,
    title: "Recover cancelled Purchase Indent - 19339 to make PO",
    description: "Purchase indent - 19339. KIndly recover it. we need to make the PO",
    status: "OPEN",
    priority: "HIGH",
    module: "Purchase & Indents",
    raisedBy: "Purchase Dept",
    assignedTo: "ERP Support",
    createdAt: "2026-10-27T09:00:00Z",
    updatedAt: "2026-10-27T09:15:00Z",
  },
  {
    id: 3,
    title: "Clear Task 31 A in Factory Order FO: O-914/25",
    description: "Dear Mam, Kindly Clear the Taks 31 A in Fo: O-914/25",
    status: "OPEN",
    priority: "HIGH",
    module: "Production Planning (T&A)",
    raisedBy: "Factory Coordinator",
    assignedTo: "Priya S.",
    createdAt: "2026-10-27T09:45:00Z",
    updatedAt: "2026-10-27T10:00:00Z",
  },
  {
    id: 4,
    title: "Add Supplier Name POMS INTERNATIONAL for O-270/26, O-271/26, O-272/26, O-273/26, O-275/26",
    description: "O-270/26,O-271/26,O-272/26,O-273/26,O-275/26.KINDLY ADD THE SUPPILER NAME-POMS INTERNATIONAL",
    status: "OPEN",
    priority: "MEDIUM",
    module: "Master Party & Orders",
    raisedBy: "Merchandiser",
    assignedTo: "ERP Support",
    createdAt: "2026-10-27T10:20:00Z",
    updatedAt: "2026-10-27T10:30:00Z",
  },
  {
    id: 5,
    title: "Order 2600041, Style E27150FY delete request due to revised PO",
    description: "Order no:2600041,Style no: E27150FY this style have to delete because of buyer remove this style in revised PO.",
    status: "OPEN",
    priority: "CRITICAL",
    module: "Merchandising & Styles",
    raisedBy: "Merchandiser Lead",
    assignedTo: "ERP Support",
    createdAt: "2026-10-27T11:00:00Z",
    updatedAt: "2026-10-27T11:15:00Z",
  },
  {
    id: 6,
    title: "Rate change for O-277/26 Sti_Ord-9927/26 to 57/- (Wages + CTC for Outside Supplier)",
    description: "O-277/26 Sti_Ord-9927/26  above work order rate change purpose due to we need wages + ctc price for out side supplier  work order price : 57/-",
    status: "OPEN",
    priority: "HIGH",
    module: "Garment Flow & Job Work",
    raisedBy: "Production Accounts",
    assignedTo: "Priya S.",
    createdAt: "2026-10-27T11:45:00Z",
    updatedAt: "2026-10-27T12:00:00Z",
  },
  {
    id: 7,
    title: "Bulk Rate Change to 55/- for CtP Orders (O-275, O-273, O-272, O-271, O-270)",
    description: "O-275/26 CtP-Ord-9937/26O-273/26 CtP-Ord-9936/26O-272/26 CtP-Ord-9935/26O-271/26 CtP-Ord-9934/26O-270/26 CtP-Ord-9933/26  above work orders rate change purpose due to we need wages + ctc price for out side supplier  work order price : 55/-",
    status: "OPEN",
    priority: "HIGH",
    module: "Garment Flow & Job Work",
    raisedBy: "Subcontracting Team",
    assignedTo: "ERP Support",
    createdAt: "2026-10-27T13:10:00Z",
    updatedAt: "2026-10-27T13:25:00Z",
  },
  {
    id: 8,
    title: "Change Head Part Top Entry for Order O-277/26",
    description: "KINDLY CHANGE THE  HAED PART TOP ENTRY-O-277/26-",
    status: "OPEN",
    priority: "MEDIUM",
    module: "Garment Planning & BOM",
    raisedBy: "Sampling & Tech Team",
    assignedTo: "Priya S.",
    createdAt: "2026-10-27T14:00:00Z",
    updatedAt: "2026-10-27T14:10:00Z",
  },
  {
    id: 9,
    title: "Grant Rights to Make Yarn Dyeing & Knitting Work Order (Emp: 24911)",
    description: "NEED  RAIGHT  TO MAKE THE YARN DYEING WORK ORDER & KNITTING WORK ORDER  :emp : 24911  ,",
    status: "OPEN",
    priority: "MEDIUM",
    module: "User Security & Rights",
    raisedBy: "Plant HR / Dept Head",
    assignedTo: "System Admin",
    createdAt: "2026-10-27T14:40:00Z",
    updatedAt: "2026-10-27T14:50:00Z",
  },
];

// ── TICKET HISTORY ─────────────────────────────────────────────

export const MOCK_HISTORY: Record<number, TicketHistoryRecord[]> = {
  1: [
    { id: 101, ticketId: 1, action: "Ticket logged by Shipping Team", performedBy: "Shipping Desk", performedAt: "2026-10-27T08:15:00Z", note: "Unable to find invoice AKRT/0099/26-27 in CHA billing dropdown" },
    { id: 102, ticketId: 1, action: "Schema verified against tableinvoicemain", performedBy: "ERP Analyzer", performedAt: "2026-10-27T08:30:00Z", note: "Checking CancelDate, DelBy, and YearCode filters" },
  ],
  2: [
    { id: 201, ticketId: 2, action: "Indent recovery requested", performedBy: "Purchase Officer", performedAt: "2026-10-27T09:00:00Z", note: "Indent marked as cancelled accidentally in TableGenIndentMain" },
  ],
  3: [
    { id: 301, ticketId: 3, action: "Task clearance requested", performedBy: "Factory Floor", performedAt: "2026-10-27T09:45:00Z", note: "Task 31 A in ysMasterTask blocking FO O-914/25 in MasterFo" },
  ],
  4: [
    { id: 401, ticketId: 4, action: "Supplier allocation ticket created", performedBy: "Merchandiser", performedAt: "2026-10-27T10:20:00Z", note: "Link MasterParty 'POMS INTERNATIONAL' to 5 MasterFo orders" },
  ],
  5: [
    { id: 501, ticketId: 5, action: "Style removal requested — ⚠️ DESTRUCTIVE ACTION FLAGGED", performedBy: "Merchandising Lead", performedAt: "2026-10-27T11:00:00Z", note: "Buyer removed style. System enforces soft-cancellation in TableBuyOrdMain / MasterStyle." },
  ],
  6: [
    { id: 601, ticketId: 6, action: "Stitching Work Order rate revision requested", performedBy: "Jobwork Incharge", performedAt: "2026-10-27T11:45:00Z", note: "FO O-277/26 rate update to 57/- (Wages + CTC)" },
  ],
  7: [
    { id: 701, ticketId: 7, action: "Bulk Cutting/Printing rate revision logged", performedBy: "Subcontracting Team", performedAt: "2026-10-27T13:10:00Z", note: "5 CtP orders require 55/- outside supplier rate update" },
  ],
  8: [
    { id: 801, ticketId: 8, action: "Head Part component revision request", performedBy: "CAD / Sampling Desk", performedAt: "2026-10-27T14:00:00Z", note: "FO O-277/26 Head part top entry specification revision" },
  ],
  9: [
    { id: 901, ticketId: 9, action: "User permission authorization request", performedBy: "Knitting Unit Incharge", performedAt: "2026-10-27T14:40:00Z", note: "Employee 24911 needs Yarn Dyeing & Knitting Work Order rights in TableWorkAllocation" },
  ],
};

// ── COMPREHENSIVE SOLUTIONS MATCHED TO AKR ERP SOURCE CODE ────

export const MOCK_ANALYSIS: Record<number, AnalysisReport> = {
  // ────────────────────────────────────────────────────────────
  // 1: CHA Bill Mapping
  // ────────────────────────────────────────────────────────────
  1: {
    ticketId: 1,
    analyzedAt: new Date().toISOString(),
    summary: "Export Invoice AKRT/0099/26-27 is missing from the CHA Bill mapping dropdown (CHA Bill CCLSM/02993/26-27). Verified against D:\\NAVEEN\\ErpDevelop source: tableinvoicemain queries filter by yearcode, CompanyId (from MasterInvoiceCompany where InvoicePrefix='AKRT/'), and exclude rows where CancelDate IS NOT NULL or DelBy IS NOT NULL.",
    rootCauseHints: [
      "In tableinvoicemain, yearcode for this invoice does not match active session filter ('26-27')",
      "CancelDate or DelBy is populated on the invoice record, marking it soft-deleted",
      "CompanyId in tableinvoicemain does not match the active CHA billing company session",
    ],
    relatedModules: ["Commercial & Invoicing", "Shipping", "Accounts"],
    pastActionsReview: "Shipping team reported inability to map invoice. Query matches ERP source tableinvoicemain.",
    suggestions: [
      "Inspect tableinvoicemain flags and yearcode for invoice sub number 0099.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Restore Export Invoice AKRT/0099/26-27 to CHA Billing View",
      severity: "CRITICAL",
      isDangerous: false,
      rootCause: "In tableinvoicemain (discovered in Accounts/Merchandising modules), invoices are queried with: 'WHERE yearcode = @yearcode AND CancelDate IS NULL AND isnull(DelBy,0)=0'. Invoice sub-no 99 either has CancelDate populated or yearcode format mismatch.",
      estimatedEffort: "15 minutes",
      requiredRole: "Database Administrator / ERP Support Lead",
      affectedTables: ["tableinvoicemain", "MasterInvoiceCompany"],
      rollbackPlan: "All updates are executed inside a BEGIN TRANSACTION with before/after select verification.",
      steps: [
        {
          stepNumber: 1,
          title: "Diagnostic Query on tableinvoicemain",
          description: "Inspect invoice state in the actual ERP table.",
          code: `-- Check invoice record in AKR ERP tableinvoicemain
SELECT 
    InvoiceId,
    Invoicesubno,
    yearcode,
    CompanyId,
    CancelDate,
    Cancelby,
    DelBy,
    PaymentDay
FROM tableinvoicemain
WHERE (Invoicesubno = 99 OR Invoicesubno = '0099')
  AND yearcode LIKE '%26-27%';

-- Verify Company ID for AKRT prefix
SELECT CompanyId, CompanyName, InvoicePrefix 
FROM MasterInvoiceCompany 
WHERE InvoicePrefix LIKE '%AKRT%';`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Clear Cancellation Flag & Synchronize yearcode",
          description: "Restore the invoice so it appears in the active CHA dropdown.",
          code: `BEGIN TRANSACTION;

UPDATE tableinvoicemain
SET 
    CancelDate = NULL,
    Cancelby = NULL,
    DelBy = 0,
    yearcode = '26-27'
WHERE (Invoicesubno = 99 OR Invoicesubno = '0099')
  AND CompanyId = (SELECT TOP 1 CompanyId FROM MasterInvoiceCompany WHERE InvoicePrefix LIKE '%AKRT%');

IF @@ROWCOUNT = 1
BEGIN
    PRINT 'Invoice AKRT/0099/26-27 successfully activated for CHA mapping.';
    COMMIT TRANSACTION;
END
ELSE
BEGIN
    PRINT 'Check rowcount before commit.';
    ROLLBACK TRANSACTION;
END;`,
          codeLanguage: "sql",
          warning: "Confirm invoice was not legally cancelled by management before clearing CancelDate.",
          requiresManualExecution: true,
        },
        {
          stepNumber: 3,
          title: "Verify Frontend View",
          description: "Re-query to ensure invoice is available for CHA Bill CCLSM/02993/26-27 mapping.",
          code: `SELECT InvoiceId, Invoicesubno, yearcode, CompanyId 
FROM tableinvoicemain 
WHERE Invoicesubno = 99 AND CancelDate IS NULL;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Standardize financial year dropdown formatting to prevent yearcode mismatch.",
        "Add alert when cancelling an export invoice that has pending CHA clearance.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 2: Purchase Indent 19339 Recovery
  // ────────────────────────────────────────────────────────────
  2: {
    ticketId: 2,
    analyzedAt: new Date().toISOString(),
    summary: "Purchase Indent #19339 was marked as deleted/cancelled in TableGenIndentMain (found in Akr_Order/Merchandising modules in D:\\NAVEEN\\ErpDevelop). Purchase PO creation requires DelBy/dltflag = 0.",
    rootCauseHints: [
      "In TableGenIndentMain, IndentNo = 19339 has DelBy > 0 or dltflag = 1",
      "Indent lines in TableGenIndentSub have DelDate populated",
    ],
    relatedModules: ["Purchase & Indents", "Akr_Order", "Stores"],
    pastActionsReview: "Purchase department requested recovery to proceed with PO generation.",
    suggestions: [
      "Reset deletion flags in TableGenIndentMain wrapped in transaction.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Restore Indent 19339 in TableGenIndentMain",
      severity: "WARNING",
      isDangerous: false,
      rootCause: "ERP source uses: 'WHERE IndentNo = @IndentNo AND isnull(dltflag,0)=0 AND isnull(DelBy,0)=0'. Indent 19339 was flagged during store adjustment.",
      estimatedEffort: "10 minutes",
      requiredRole: "ERP Support / Database Administrator",
      affectedTables: ["TableGenIndentMain", "TableGenIndentSub"],
      rollbackPlan: "Set dltflag = 1 and DelBy = 1 if indent was intentionally dropped.",
      steps: [
        {
          stepNumber: 1,
          title: "Check Indent 19339 in TableGenIndentMain",
          description: "Inspect the indent record and its linked items.",
          code: `-- Check Indent in real ERP table
SELECT IndentEnno, IndentNo, Partyid, isnull(dltflag,0) as dltflag, isnull(DelBy,0) as DelBy
FROM TableGenIndentMain
WHERE IndentNo = 19339;

-- Check Sub table items
SELECT * 
FROM TableGenIndentSub
WHERE IndentEnno IN (SELECT IndentEnno FROM TableGenIndentMain WHERE IndentNo = 19339);`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Execute Safe Recovery in TableGenIndentMain",
          description: "Reset deletion flags to 0.",
          code: `BEGIN TRANSACTION;

UPDATE TableGenIndentMain
SET 
    dltflag = 0,
    DelBy = 0,
    DelDate = NULL
WHERE IndentNo = 19339;

UPDATE TableGenIndentSub
SET 
    dltflag = 0,
    DelBy = 0
WHERE IndentEnno IN (SELECT IndentEnno FROM TableGenIndentMain WHERE IndentNo = 19339);

PRINT 'Indent 19339 successfully restored.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 3,
          title: "Verify PO Creation Availability",
          description: "Confirm indent 19339 now populates in the PO creation dropdown.",
          code: `SELECT IndentNo, IndentEnno, Partyid 
FROM TableGenIndentMain 
WHERE IndentNo = 19339 AND isnull(dltflag,0)=0;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Add confirmation dialog in frmAkrOrderIndent before marking indents deleted.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 3: Clear Task 31 A in FO: O-914/25
  // ────────────────────────────────────────────────────────────
  3: {
    ticketId: 3,
    analyzedAt: new Date().toISOString(),
    summary: "Task '31 A' on Factory Order 'O-914/25' is blocked in the T&A tracking tables (ysMasterTask / yv_OrderTaskDayMap discovered in D:\\NAVEEN\\ErpDevelop).",
    rootCauseHints: [
      "In MasterFo, fono = 'O-914/25' has a locked milestone in ysMasterTaskDays / TableFoTask",
      "Task 31 A is halting downstream cutting and sewing release gates",
    ],
    relatedModules: ["Production Planning (T&A)", "MasterFo", "Garment Planning"],
    pastActionsReview: "Factory coordinator requested manual clearance.",
    suggestions: [
      "Identify FoId from MasterFo and clear task status flag.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Clear Task 31 A for Factory Order O-914/25",
      severity: "WARNING",
      isDangerous: false,
      rootCause: "Order O-914/25 in MasterFo has FoId associated with Task 31 A in ysMasterTask/TableTask where completion date is null and lock flag is active.",
      estimatedEffort: "15 minutes",
      requiredRole: "Production ERP Administrator",
      affectedTables: ["MasterFo", "ysMasterTask", "ysMasterTaskDays"],
      rollbackPlan: "Reset task status if clearing was premature.",
      steps: [
        {
          stepNumber: 1,
          title: "Find FoId for Order O-914/25 and Inspect Task 31 A",
          description: "Query MasterFo and ysMasterTask.",
          code: `-- Find FoId from MasterFo
SELECT FoId, FoNo, OrderDate 
FROM MasterFo 
WHERE FoNo LIKE '%O-914/25%';

-- Find Task 31 A definition
SELECT TaskID, Task, Head 
FROM ysMasterTask 
WHERE Task LIKE '%31%A%' OR Task = '31 A';`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Clear Task 31 A for FoId",
          description: "Update completion flag and timestamp for this order's task.",
          code: `BEGIN TRANSACTION;

DECLARE @FoId INT;
SELECT @FoId = FoId FROM MasterFo WHERE FoNo LIKE '%O-914/25%';

-- Update task tracking table
UPDATE TableFoTask
SET 
    Completed = 1,
    CompletedDate = GETDATE(),
    Remarks = 'Cleared as per ticket request'
WHERE FoId = @FoId 
  AND TaskId IN (SELECT TaskId FROM ysMasterTask WHERE Task LIKE '%31%A%');

PRINT 'Task 31 A cleared for FO O-914/25.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Add automated workflow clearing for milestone 31 A upon supervisor sign-off.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 4: Add Supplier Name POMS INTERNATIONAL
  // ────────────────────────────────────────────────────────────
  4: {
    ticketId: 4,
    analyzedAt: new Date().toISOString(),
    summary: "Assign supplier 'POMS INTERNATIONAL' to 5 Factory Orders (O-270/26, O-271/26, O-272/26, O-273/26, O-275/26). Discovered in D:\\NAVEEN\\ErpDevelop: suppliers are stored in MasterParty (PartyDef = 2 / Supplier) and orders in MasterFo / TableBuyOrdMain.",
    rootCauseHints: [
      "In MasterParty, 'POMS INTERNATIONAL' exists with unique PartyId",
      "Orders in MasterFo / TableBuyOrdMain have PartyId = NULL or 0",
    ],
    relatedModules: ["Master Party & Orders", "MasterFo", "TableBuyOrdMain"],
    pastActionsReview: "Merchandiser logged request for 5 factory orders.",
    suggestions: [
      "Find PartyId from MasterParty and update the 5 orders in MasterFo / TableBuyOrdMain.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Link MasterParty 'POMS INTERNATIONAL' to 5 Factory Orders",
      severity: "INFO",
      isDangerous: false,
      rootCause: "The 5 orders were entered without selecting the external party/supplier from MasterParty.",
      estimatedEffort: "10 minutes",
      requiredRole: "ERP Support / Database Administrator",
      affectedTables: ["MasterParty", "MasterFo", "TableBuyOrdMain"],
      rollbackPlan: "Set PartyId = NULL if reverted.",
      steps: [
        {
          stepNumber: 1,
          title: "Find PartyId for 'POMS INTERNATIONAL' in MasterParty",
          description: "Query MasterParty.",
          code: `SELECT PartyId, PartyName, PartyDef, dltflag 
FROM MasterParty 
WHERE PartyName LIKE '%POMS INTERNATIONAL%';`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Update the 5 Factory Orders in MasterFo / TableBuyOrdMain",
          description: "Assign the PartyId to all 5 orders.",
          code: `BEGIN TRANSACTION;

DECLARE @PartyId INT;
SELECT TOP 1 @PartyId = PartyId FROM MasterParty WHERE PartyName LIKE '%POMS INTERNATIONAL%';

IF @PartyId IS NOT NULL
BEGIN
    -- Update MasterFo / TableBuyOrdMain
    UPDATE TableBuyOrdMain
    SET PartyId = @PartyId
    WHERE FoId IN (
        SELECT FoId FROM MasterFo 
        WHERE FoNo IN ('O-270/26', 'O-271/26', 'O-272/26', 'O-273/26', 'O-275/26')
    );

    PRINT 'Linked POMS INTERNATIONAL (PartyId: ' + CAST(@PartyId AS VARCHAR) + ') to 5 orders.';
    COMMIT TRANSACTION;
END
ELSE
BEGIN
    RAISERROR('POMS INTERNATIONAL not found in MasterParty!', 16, 1);
    ROLLBACK TRANSACTION;
END;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Make Party selection mandatory on external orders in frmBuyOrdPlan.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 5: Style Delete Request — DANGEROUS / CRITICAL
  // ────────────────────────────────────────────────────────────
  5: {
    ticketId: 5,
    analyzedAt: new Date().toISOString(),
    summary: "🚨 DANGEROUS REQUEST: User requests to delete Style 'E27150FY' from Order '2600041' because the buyer removed it in revised PO. Verified in D:\\NAVEEN\\ErpDevelop: styles are stored in MasterStyle and linked via TableBuyOrdMain. Hard deletion must NEVER be executed because cutting, fabric planning, and booking records exist.",
    rootCauseHints: [
      "In MasterStyle, StyleName = 'E27150FY'",
      "In TableBuyOrdMain, BuyOrdEnNo = 2600041 has this StyleId",
      "Direct SQL DELETE will corrupt TableFabricPoMain, TableCutting, or throw FK exceptions",
    ],
    relatedModules: ["Merchandising & Styles", "TableBuyOrdMain", "MasterStyle"],
    pastActionsReview: "Ticket flagged by AI as DESTRUCTIVE.",
    suggestions: [
      "DO NOT EXECUTE HARD DELETE. Set Sts = 'Cancelled' in TableBuyOrdMain and Notuse = 1 if style is retired.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Safely Cancel (Do Not Delete) Style E27150FY in Order 2600041",
      severity: "CRITICAL",
      isDangerous: true,
      dangerWarning: "🚨 NEVER EXECUTE 'DELETE FROM TableBuyOrdMain' OR 'DELETE FROM MasterStyle'. Hard deletion corrupts order accounting and inventory bookings. Soft cancellation must be used.",
      rootCause: "Buyer revised the PO. ERP queries filter by 'WHERE sts='Running''. Setting sts='Cancelled' cleanly hides the style without corrupting database integrity.",
      estimatedEffort: "15 minutes",
      requiredRole: "Senior Database Administrator & Senior Merchandiser",
      affectedTables: ["TableBuyOrdMain", "MasterStyle", "TableStyleBooking"],
      rollbackPlan: "Set Sts = 'Running' if buyer reinstates style.",
      steps: [
        {
          stepNumber: 1,
          title: "Pre-check Style and Order in TableBuyOrdMain",
          description: "Inspect the style booking before cancellation.",
          code: `-- Check style in MasterStyle
SELECT StyleId, StyleName, Notuse 
FROM MasterStyle 
WHERE StyleName LIKE '%E27150FY%';

-- Check order in TableBuyOrdMain
SELECT BuyOrdEnNo, FoId, StyleId, Sts, DelBy 
FROM TableBuyOrdMain 
WHERE (BuyOrdEnNo = 2600041 OR FoId IN (SELECT FoId FROM MasterFo WHERE FoNo LIKE '%2600041%'))
  AND StyleId IN (SELECT StyleId FROM MasterStyle WHERE StyleName LIKE '%E27150FY%');`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Execute Safe Soft-Cancellation",
          description: "Update Sts to 'Cancelled' without dropping any rows.",
          code: `BEGIN TRANSACTION;

UPDATE TableBuyOrdMain
SET 
    Sts = 'Cancelled',
    Remarks = 'Buyer removed style in revised PO - Ticket #5',
    DelDate = GETDATE()
WHERE (BuyOrdEnNo = 2600041 OR FoId IN (SELECT FoId FROM MasterFo WHERE FoNo LIKE '%2600041%'))
  AND StyleId IN (SELECT StyleId FROM MasterStyle WHERE StyleName LIKE '%E27150FY%');

PRINT 'Style E27150FY safely cancelled in TableBuyOrdMain.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          warning: "Never run DELETE statements. Always use Sts='Cancelled'.",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Educate merchandising team to use 'Revise PO' screen instead of asking for database deletion.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 6: Rate change for O-277/26 Sti_Ord-9927/26 to 57/-
  // ────────────────────────────────────────────────────────────
  6: {
    ticketId: 6,
    analyzedAt: new Date().toISOString(),
    summary: "Work Order Sti_Ord-9927/26 on Factory Order O-277/26 requires outside supplier stitching rate revision to Rs 57/- (Wages + CTC). Verified against D:\\NAVEEN\\ErpDevelop GarmentFlow module.",
    rootCauseHints: [
      "In MasterFo, fono = 'O-277/26'",
      "Work order rate was generated with base labor rate excluding CTC",
    ],
    relatedModules: ["Garment Flow & Job Work", "MasterFo", "Costing"],
    pastActionsReview: "Production accounts requested rate change to 57/-.",
    suggestions: [
      "Check if any receipt/GRN was already booked, then update rate in work order tables.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Revise Stitching Rate to 57/- for Sti_Ord-9927/26",
      severity: "WARNING",
      isDangerous: false,
      rootCause: "Work order was printed before vendor CTC agreement was approved.",
      estimatedEffort: "15 minutes",
      requiredRole: "Costing Accountant / ERP Database Administrator",
      affectedTables: ["TableGarmentWOMain", "TableGarmentWOSub", "MasterFo"],
      rollbackPlan: "Restore previous rate if requested.",
      steps: [
        {
          stepNumber: 1,
          title: "Query Current Work Order Rate",
          description: "Inspect work order details for Sti_Ord-9927/26.",
          code: `SELECT WONo, FoId, Rate, Qty, TotalAmount 
FROM TableGarmentWOMain 
WHERE WONo LIKE '%Sti_Ord-9927/26%'
   OR FoId IN (SELECT FoId FROM MasterFo WHERE FoNo LIKE '%O-277/26%');`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Update Rate to 57/- and Recalculate Total",
          description: "Apply the revised rate.",
          code: `BEGIN TRANSACTION;

UPDATE TableGarmentWOMain
SET 
    Rate = 57.00,
    TotalAmount = Qty * 57.00,
    Remarks = 'Rate change to 57/- (Wages + CTC) - Ticket #6'
WHERE WONo LIKE '%Sti_Ord-9927/26%';

PRINT 'Stitching rate revised to 57/-.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Include outside vendor CTC tariff verification in the work order creation screen.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 7: Bulk Rate Change to 55/- for CtP Orders
  // ────────────────────────────────────────────────────────────
  7: {
    ticketId: 7,
    analyzedAt: new Date().toISOString(),
    summary: "Bulk rate modification for 5 Cutting/Printing (CtP) work orders (CtP-Ord-9937/26, 9936/26, 9935/26, 9934/26, 9933/26 across orders O-275/26 to O-270/26) to Rs 55/- for outside supplier Wages + CTC.",
    rootCauseHints: [
      "5 work orders generated under orders O-270/26 through O-275/26 in MasterFo",
      "Vendor tariff contract fixed at Rs 55/-, but created at default lower rate",
    ],
    relatedModules: ["Garment Flow & Job Work", "Cutting & Printing", "MasterFo"],
    pastActionsReview: "Subcontracting team submitted batch ticket for 5 orders.",
    suggestions: [
      "Execute batch rate update script wrapped in a transaction.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Batch Update 5 Cutting/Printing Orders to Rs 55/-",
      severity: "WARNING",
      isDangerous: false,
      rootCause: "Blanket vendor contract for cutting/printing outside processing was finalized at Rs 55/- after orders were booked.",
      estimatedEffort: "20 minutes",
      requiredRole: "Database Administrator / Jobwork Accounting Lead",
      affectedTables: ["TableGarmentWOMain", "MasterFo"],
      rollbackPlan: "Audit log records prior rate.",
      steps: [
        {
          stepNumber: 1,
          title: "Audit All 5 CtP Orders",
          description: "Verify current rates.",
          code: `SELECT WONo, Rate, Qty, TotalAmount 
FROM TableGarmentWOMain
WHERE WONo IN (
    'CtP-Ord-9937/26',
    'CtP-Ord-9936/26',
    'CtP-Ord-9935/26',
    'CtP-Ord-9934/26',
    'CtP-Ord-9933/26'
);`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Batch Transactional Rate Update",
          description: "Update headers to Rs 55.00 in a single atomic transaction.",
          code: `BEGIN TRANSACTION;

UPDATE TableGarmentWOMain
SET 
    Rate = 55.00,
    TotalAmount = Qty * 55.00,
    Remarks = 'Bulk rate change to 55/- (Wages + CTC) - Ticket #7'
WHERE WONo IN (
    'CtP-Ord-9937/26',
    'CtP-Ord-9936/26',
    'CtP-Ord-9935/26',
    'CtP-Ord-9934/26',
    'CtP-Ord-9933/26'
);

PRINT 'Updated ' + CAST(@@ROWCOUNT AS VARCHAR) + ' CtP Work Orders to 55/-.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Update the Subcontracting Master Tariff so subsequent CtP orders automatically inherit Rs 55/-.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 8: Change Head Part Top Entry in O-277/26
  // ────────────────────────────────────────────────────────────
  8: {
    ticketId: 8,
    analyzedAt: new Date().toISOString(),
    summary: "Modify 'Head Part Top Entry' specification for Factory Order O-277/26 (in MasterFo). Verified in Garment Planning / Fabric Planning modules in D:\\NAVEEN\\ErpDevelop.",
    rootCauseHints: [
      "In MasterFo, fono = 'O-277/26'",
      "Sampling & CAD team updated head part / collar construction breakdown",
    ],
    relatedModules: ["Garment Planning & BOM", "MasterFo", "Fabric Planning"],
    pastActionsReview: "Sampling team requested technical head part entry update.",
    suggestions: [
      "Locate FoId from MasterFo and update head part specification in garment breakdown.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Modify Head Part Top Component Entry for Order O-277/26",
      severity: "INFO",
      isDangerous: false,
      rootCause: "Garment component specification change on Order O-277/26.",
      estimatedEffort: "15 minutes",
      requiredRole: "Technical Merchandiser / ERP Specialist",
      affectedTables: ["MasterFo", "TableGarmentBreakdown"],
      rollbackPlan: "Restore previous description.",
      steps: [
        {
          stepNumber: 1,
          title: "Query Order Breakdown for O-277/26",
          description: "Find FoId and head part row.",
          code: `SELECT MF.FoId, MF.FoNo, B.PartName, B.ComponentName 
FROM MasterFo MF
INNER JOIN TableGarmentBreakdown B ON MF.FoId = B.FoId
WHERE MF.FoNo LIKE '%O-277/26%'
  AND B.PartName LIKE '%HEAD%';`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Update Head Part Entry",
          description: "Update the component entry as requested.",
          code: `BEGIN TRANSACTION;

UPDATE TableGarmentBreakdown
SET 
    ComponentName = 'HEAD PART TOP ENTRY REVISED',
    Remarks = 'Updated as per tech team request - Ticket #8'
WHERE FoId IN (SELECT FoId FROM MasterFo WHERE FoNo LIKE '%O-277/26%')
  AND PartName LIKE '%HEAD%';

PRINT 'Head part top entry updated for Order O-277/26.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Enable BOM breakdown editing in frmBuyOrdPlan prior to production cut start.",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // 9: User Rights for Yarn Dyeing & Knitting Work Order
  // ────────────────────────────────────────────────────────────
  9: {
    ticketId: 9,
    analyzedAt: new Date().toISOString(),
    summary: "Employee #24911 requires permissions to create Yarn Dyeing and Knitting Work Orders. Verified against D:\\NAVEEN\\ErpDevelop source: permissions are controlled via TableWorkAllocation (columns: StaffId, Rights, DateAndTime, Effectdate, flag) and MasterEmployee.",
    rootCauseHints: [
      "In MasterEmployee, StaffId/EmployeeId = 24911",
      "In TableWorkAllocation, rights for Yarn Dyeing and Knitting Work Orders are not granted",
    ],
    relatedModules: ["User Security & Rights", "TableWorkAllocation", "MasterEmployee"],
    pastActionsReview: "Plant HR / Production Incharge submitted role permission request.",
    suggestions: [
      "Insert work allocation rights in TableWorkAllocation for StaffId 24911.",
    ],
    confidence: "HIGH",
    solution: {
      solutionTitle: "Grant Work Order Rights in TableWorkAllocation for Emp 24911",
      severity: "INFO",
      isDangerous: false,
      rootCause: "ERP source uses: 'Insert into TableWorkAllocation(DateAndTime,UserId,StaffId,Rights,flag,Effectdate)'. StaffId 24911 does not have the Yarn Dyeing & Knitting rights record.",
      estimatedEffort: "10 minutes",
      requiredRole: "ERP System Security Administrator",
      affectedTables: ["MasterEmployee", "TableWorkAllocation"],
      rollbackPlan: "Delete from TableWorkAllocation where StaffId=24911 and Rights in ('Yarn Dyeing Work Order', 'Knitting Work Order').",
      steps: [
        {
          stepNumber: 1,
          title: "Verify Employee 24911 in MasterEmployee",
          description: "Check employee name and existing rights.",
          code: `-- Check MasterEmployee
SELECT EmployeeId, EmployeeName, DepartmentId 
FROM MasterEmployee 
WHERE EmployeeId = '24911' OR EmployeeName LIKE '%24911%';

-- Check current rights in TableWorkAllocation
SELECT * 
FROM TableWorkAllocation 
WHERE StaffId = '24911';`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 2,
          title: "Grant Rights in TableWorkAllocation (Exact ERP Code Syntax)",
          description: "Insert rights records using the exact syntax from D:\\NAVEEN\\ErpDevelop.",
          code: `BEGIN TRANSACTION;

-- Grant Yarn Dyeing Work Order Right
INSERT INTO TableWorkAllocation (DateAndTime, UserId, StaffId, Rights, flag, Effectdate)
VALUES (GETDATE(), 1, '24911', 'Yarn Dyeing Work Order', 1, GETDATE());

-- Grant Knitting Work Order Right
INSERT INTO TableWorkAllocation (DateAndTime, UserId, StaffId, Rights, flag, Effectdate)
VALUES (GETDATE(), 1, '24911', 'Knitting Work Order', 1, GETDATE());

PRINT 'Granted Yarn Dyeing & Knitting rights to StaffId 24911.';
COMMIT TRANSACTION;`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
        {
          stepNumber: 3,
          title: "Instruct User to Restart ERP Client",
          description: "Have Employee 24911 restart Erpdevelop.exe for new menu rights to load.",
          code: `-- Verify active rights
SELECT StaffId, Rights, Effectdate, flag 
FROM TableWorkAllocation 
WHERE StaffId = '24911';`,
          codeLanguage: "sql",
          requiresManualExecution: true,
        },
      ],
      preventionSteps: [
        "Add bulk role templating in TableWorkAllocation to streamline employee department transfers.",
      ],
    },
  },
};

// ── REAL MODULE DIRECTORY (from D:\NAVEEN\ErpDevelop) ─────────

export const MOCK_MODULES: Module[] = [
  {
    name: "invoicing",
    displayLabel: "🚢 Commercial & Invoicing",
    description: "Export invoices, shipping bills, and CHA billing mapping.",
    relatedTables: ["tableinvoicemain", "MasterInvoiceCompany", "TableInvoiceReturn"],
    fields: [
      { fieldName: "Invoicesubno", type: "INT", description: "Sequential Invoice Sub Number" },
      { fieldName: "yearcode", type: "VARCHAR(20)", description: "Financial Year Code (e.g., 26-27)" },
      { fieldName: "CancelDate", type: "DATETIME", description: "Cancellation Timestamp (NULL if active)" },
    ],
  },
  {
    name: "orders",
    displayLabel: "📋 MasterFo & Orders (Akr_Order)",
    description: "Factory Order creation, buyers, styles, and order tracking.",
    relatedTables: ["MasterFo", "TableBuyOrdMain", "MasterStyle"],
    fields: [
      { fieldName: "FoId", type: "DECIMAL(18,0)", description: "Primary Key Factory Order ID" },
      { fieldName: "FoNo", type: "VARCHAR(50)", description: "Factory Order Number (e.g., O-914/25, O-270/26)" },
      { fieldName: "Sts", type: "VARCHAR(30)", description: "Status flag ('Running', 'Cancelled')" },
    ],
  },
  {
    name: "party",
    displayLabel: "🏢 MasterParty (Suppliers & Contractors)",
    description: "Master list of suppliers, buyers, fabric mills, and outside contractors.",
    relatedTables: ["MasterParty", "MasterPartySub"],
    fields: [
      { fieldName: "PartyId", type: "DECIMAL(18,0)", description: "Unique Party ID" },
      { fieldName: "PartyName", type: "VARCHAR(150)", description: "Party / Supplier Company Name" },
      { fieldName: "PartyDef", type: "INT", description: "Role definition (Supplier, Contractor, Buyer)" },
    ],
  },
  {
    name: "garment_flow",
    displayLabel: "✂️ GarmentFlow & Job Work",
    description: "Subcontracting work orders (Stitching, Cutting, Printing) and rate management.",
    relatedTables: ["TableGarmentWOMain", "TableGarmentWOSub", "frmGarmentWOapv"],
    fields: [
      { fieldName: "WONo", type: "VARCHAR(50)", description: "Work Order Number (e.g. Sti_Ord-9927/26)" },
      { fieldName: "Rate", type: "DECIMAL(10,2)", description: "Piece rate for outside supplier" },
      { fieldName: "TotalAmount", type: "DECIMAL(14,2)", description: "Total work order value" },
    ],
  },
  {
    name: "work_allocation",
    displayLabel: "🔐 Security & Work Allocation",
    description: "Employee screen rights, work order generation permissions, and ERP access control.",
    relatedTables: ["MasterEmployee", "TableWorkAllocation"],
    fields: [
      { fieldName: "StaffId", type: "VARCHAR(30)", description: "Employee ID Number" },
      { fieldName: "Rights", type: "VARCHAR(100)", description: "Authorized Screen / Module Action" },
      { fieldName: "flag", type: "INT", description: "Active permission flag (1=Granted, 0=Revoked)" },
    ],
  },
];
