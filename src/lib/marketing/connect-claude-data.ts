/**
 * /[locale]/connect/claude — "Connect Tonbab to Claude", the landing page for
 * Tonbab's listing in Anthropic's Claude Connectors Directory. The page, its
 * Markdown twin (/md/<locale>/connect/claude, llms-full.txt), the FAQPage
 * JSON-LD and the /claude short link all read from here.
 *
 * Claims follow ai-data.ts (checked against codustry/workflow on 2026-11-20):
 * the MCP server is $lib/server/api/mcp.ts (OAuth 2.1 + PKCE, consent screen
 * with a default company and "Also allow these companies"), tools come from
 * the operation registry (ops-read.ts / ops-read-more.ts / ops-write.ts /
 * ops-phase1.ts / ops-phase2.ts / ops-sales.ts — the tool names below are
 * real registry names; 107 tools after codustry/tonbab#1589), writes create
 * drafts (incl. quotation, stock adjustment, stock transfer, delivery note),
 * requests a person approves (leave), the person's own CRM records, or
 * products / warehouses (create, edit, photo), never approve / post / pay, and
 * take a client_request_id so retries save once. Every
 * call is re-checked against the person's role in that company, and MCP never
 * spends Tonbab AI credits (it counts toward the plan's API quota). Revoking
 * lives in Settings › API & connectors › Connected apps.
 *
 * Branding: the built-in assistant is "Tonbab AI"; never name the AI vendor
 * behind it. Claude is named as plain text only (no logo — see AssistantMark).
 */
import type { Bi } from "./compare-data";
import { MCP_URL } from "./ai-data";

/**
 * Tonbab's listing in the Claude Connectors Directory. Empty until the listing
 * is live — then paste the listing URL here and both the "Add to Claude"
 * button and the /claude short link switch to it on the next deploy.
 */
export const CLAUDE_DIRECTORY_URL = "";

/** True once the directory listing URL is set. */
export const CLAUDE_LISTED = CLAUDE_DIRECTORY_URL !== "";

/** Claude's own connector settings page (fallback: add a custom connector). */
export const CLAUDE_CONNECTORS_SETTINGS =
  "https://claude.ai/settings/connectors";

/** Anthropic's help article for custom connectors (remote MCP). */
export const CLAUDE_CUSTOM_CONNECTOR_HELP =
  "https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp";

/** Where /claude and /[locale]/claude send people. */
export function claudeShortLinkTarget(locale: string): string {
  return CLAUDE_LISTED ? CLAUDE_DIRECTORY_URL : `/${locale}/connect/claude`;
}

export { MCP_URL };

export interface ModuleExamples {
  key: string;
  module: Bi;
  /** draft = creates a draft; request = sends a request a person approves. */
  prompts: { prompt: Bi; tools: string[]; draft?: boolean; request?: boolean }[];
}

/** Example questions per module; every tool is a real registry tool. */
export const claudeExamples: ModuleExamples[] = [
  {
    key: "crm",
    module: { th: "CRM", en: "CRM" },
    prompts: [
      {
        prompt: {
          th: "ดีลที่ยังเปิดอยู่ของฉันมีอะไรบ้าง แต่ละดีลคุยล่าสุดเมื่อไหร่",
          en: "List my open deals and when we last talked to each",
        },
        tools: ["list_deals", "list_crm_activities"],
      },
      {
        prompt: {
          th: "บันทึกว่าโทรหาลูกค้า ABC แล้ว เขาขอใบเสนอราคาสัปดาห์หน้า",
          en: "Log a call with ABC Co. — they want a quotation next week",
        },
        tools: ["list_companies", "log_crm_activity"],
        draft: true,
      },
      {
        prompt: {
          th: "ไปป์ไลน์ของทีมเดือนนี้เป็นยังไง อัตราปิดการขายและเหตุผลที่แพ้ดีลบ่อยที่สุดคืออะไร",
          en: "How does the team's pipeline look this month — win rate and top lost reasons?",
        },
        tools: ["crm_pipeline_report"],
      },
      {
        prompt: {
          th: "บันทึกอัปเดตงาน: วันนี้เข้าพบคุณสมชายที่ ABC ลูกค้าอยากได้เดโม นัดติดตามวันศุกร์",
          en: "Log a work update: met Khun Somchai at ABC today, they want a demo, follow up Friday",
        },
        tools: ["list_companies", "log_work_update"],
        draft: true,
      },
    ],
  },
  {
    key: "approvals",
    module: { th: "งานรออนุมัติ", en: "Approvals" },
    prompts: [
      {
        prompt: {
          th: "มีอะไรรอฉันอนุมัติบ้าง อันไหนรอนานที่สุด",
          en: "What's waiting for my approval, and what has waited longest?",
        },
        tools: ["list_my_approvals"],
      },
    ],
  },
  {
    key: "accounting",
    module: { th: "บัญชี", en: "Accounting" },
    prompts: [
      {
        prompt: {
          th: "ลูกค้าคนไหนค้างจ่ายเกิน 30 วัน",
          en: "Which customers are more than 30 days overdue?",
        },
        tools: ["ar_aging"],
      },
      {
        prompt: {
          th: "กำไรขาดทุนเดือนนี้เทียบกับเดือนที่แล้ว",
          en: "Profit and loss this month versus last month",
        },
        tools: ["profit_and_loss"],
      },
    ],
  },
  {
    key: "inventory",
    module: { th: "สต็อก", en: "Inventory" },
    prompts: [
      {
        prompt: {
          th: "สกรู M6 เหลือคลังไหนเท่าไหร่",
          en: "How many M6 screws are left in each warehouse?",
        },
        tools: ["get_stock_levels"],
      },
      {
        prompt: {
          th: "เตรียมใบตรวจนับสต็อกคลังหลักให้หน่อย",
          en: "Prepare a stock count for the main warehouse",
        },
        tools: ["list_warehouses", "create_stock_count_draft"],
        draft: true,
      },
      {
        prompt: {
          th: "ร่างใบโอนสกรู M6 200 ตัวจากโรงงานไปหน้าร้าน",
          en: "Draft a transfer of 200 M6 screws from the factory to the shop",
        },
        tools: ["list_warehouses", "list_products", "create_stock_transfer_draft"],
        draft: true,
      },
      {
        prompt: {
          th: "ร่างใบส่งของให้ลูกค้ารายนี้ ตามรายการที่สั่ง",
          en: "Draft a delivery note for this customer with the items they ordered",
        },
        tools: ["list_companies", "list_products", "create_delivery_note_draft"],
        draft: true,
      },
    ],
  },
  {
    key: "procurement",
    module: { th: "จัดซื้อ", en: "Purchasing" },
    prompts: [
      {
        prompt: {
          th: "PO ไหนยังค้างรับของบ้าง",
          en: "Which POs are still waiting for delivery?",
        },
        tools: ["list_purchase_orders", "get_purchase_order"],
      },
      {
        prompt: {
          th: "สร้างใบขอซื้อสกรู M6 500 ตัว",
          en: "Create a purchase request for 500 M6 screws",
        },
        tools: ["list_products", "create_purchase_request_draft"],
        draft: true,
      },
    ],
  },
  {
    key: "people",
    module: { th: "บุคลากร", en: "People" },
    prompts: [
      {
        prompt: {
          th: "ฉันเหลือวันลาพักร้อนกี่วัน",
          en: "How many vacation days do I have left?",
        },
        tools: ["my_leave_balance"],
      },
      {
        prompt: {
          th: "สัปดาห์นี้ทีมฉันใครลาบ้าง",
          en: "Who on my team is on leave this week?",
        },
        tools: ["list_leave_requests"],
      },
      {
        prompt: {
          th: "ขอลาพักร้อนวันศุกร์หน้าครึ่งวันบ่าย",
          en: "Request annual leave next Friday afternoon",
        },
        tools: ["my_leave_balance", "request_leave"],
        request: true,
      },
      {
        prompt: {
          th: "เปิดใบเบิกค่าแท็กซี่ไปหาลูกค้าเมื่อวาน 450 บาท",
          en: "Start an expense claim for yesterday's 450-baht taxi to a customer",
        },
        tools: ["create_expense_claim_draft"],
        draft: true,
      },
    ],
  },
];

/** Connect steps. Step 1 depends on whether the directory listing is live. */
export function claudeSteps(
  listed: boolean,
): { title: Bi; body: Bi; code?: string }[] {
  return [
    listed
      ? {
          title: { th: "หา Tonbab ใน Claude", en: "Find Tonbab in Claude" },
          body: {
            th: "ใน Claude เปิด Settings › Connectors แล้วค้นหา “Tonbab” ในรายการตัวเชื่อม (หรือกด Add custom connector แล้ววาง URL ด้านล่าง)",
            en: "In Claude, open Settings › Connectors and search the connector list for “Tonbab” (or choose Add custom connector and paste the URL below).",
          },
          code: MCP_URL,
        }
      : {
          title: { th: "เพิ่ม Tonbab ใน Claude", en: "Add Tonbab in Claude" },
          body: {
            th: "ใน Claude เปิด Settings › Connectors กด Add custom connector ตั้งชื่อ Tonbab แล้ววาง URL ด้านล่าง (เมื่อ Tonbab อยู่ในรายการตัวเชื่อมของ Claude แล้ว ค้นหา “Tonbab” ได้เลย)",
            en: "In Claude, open Settings › Connectors, choose Add custom connector, name it Tonbab and paste the URL below. (Once Tonbab is in Claude's connector list, just search for “Tonbab”.)",
          },
          code: MCP_URL,
        },
    {
      title: { th: "กด Connect", en: "Click Connect" },
      body: {
        th: "Claude จะเปิดหน้าเข้าสู่ระบบของ Tonbab ให้",
        en: "Claude opens Tonbab's sign-in page for you.",
      },
    },
    {
      title: { th: "เข้าสู่ระบบ Tonbab", en: "Sign in to Tonbab" },
      body: {
        th: "ใช้บัญชี Tonbab เดิมของคุณ ยังไม่มีบัญชีก็สมัครฟรีได้",
        en: "Use your usual Tonbab account. No account yet? Sign up free.",
      },
    },
    {
      title: {
        th: "เลือกบริษัทที่อนุญาต",
        en: "Choose which companies to allow",
      },
      body: {
        th: "เลือกบริษัทหลัก ติ๊กบริษัทอื่นที่ให้ Claude ใช้ได้ (ถ้ามี) เลือกว่าให้อ่านข้อมูลส่วนไหน และให้สร้างฉบับร่างได้หรือไม่ แล้วกดอนุญาต",
        en: "Pick your default company, tick any other companies Claude may use, choose what it may read and whether it may create drafts, then allow.",
      },
    },
    {
      title: { th: "เสร็จแล้ว", en: "Done" },
      body: {
        th: "กลับไปที่ Claude แล้วถามได้เลย เช่น “สรุปยอดขายเดือนนี้ตามลูกค้า”",
        en: "Back in Claude, just ask — for example “Summarize this month's sales by customer”.",
      },
    },
  ];
}

export const claudeOrgNote: Bi = {
  th: "ใช้ Claude แบบ Team หรือ Enterprise? เจ้าของบัญชีองค์กรต้องเพิ่ม Tonbab ให้ทั้งองค์กรก่อน แล้วสมาชิกแต่ละคนกด Connect และเข้าสู่ระบบ Tonbab ด้วยบัญชีของตัวเอง",
  en: "On Claude Team or Enterprise, an organization owner adds Tonbab for the whole organization first; then each member clicks Connect and signs in to Tonbab with their own account.",
};

export const claudeSecurity: { key: string; title: Bi; body: Bi }[] = [
  {
    key: "as-you",
    title: { th: "ทำงานในนามคุณ", en: "Acts as you" },
    body: {
      th: "Claude เห็นและทำได้เท่าที่บทบาทและสิทธิ์ของคุณใน Tonbab อนุญาต ถ้าสิทธิ์ของคุณเปลี่ยน สิ่งที่ Claude ทำได้ก็เปลี่ยนตามทันที เงินเดือน เลขบัตรประชาชน และค่าคอมมิชชันไม่เปิดให้เลย",
      en: "Claude sees and does only what your Tonbab role and permissions allow. If your permissions change, so does what Claude can do, right away. Salary, ID numbers and commission are never available.",
    },
  },
  {
    key: "companies",
    title: { th: "เลือกทีละบริษัท", en: "You choose each company" },
    body: {
      th: "Claude ใช้ได้เฉพาะบริษัทที่คุณติ๊กตอนเชื่อมต่อ ทุกครั้งที่ถาม ระบบตรวจสิทธิ์ใหม่ในบริษัทนั้น และไม่รวมยอดข้ามบริษัท",
      en: "Claude can use only the companies you tick when you connect. Every call is re-checked in that company, and figures are never added across companies.",
    },
  },
  {
    key: "drafts",
    title: { th: "ฉบับร่างและคำขอเท่านั้น", en: "Drafts and requests only" },
    body: {
      th: "เครื่องมือที่เขียนข้อมูลสร้างได้แค่ฉบับร่าง (ใบขอซื้อ ใบตรวจนับ ใบเบิกค่าใช้จ่าย ใบเสนอราคา ใบปรับยอดและใบโอนย้ายสต็อก ใบส่งของ) คำขอที่รอคนอนุมัติ (ใบลา) งาน CRM ของคุณเอง (ลีด อัปเดตงาน ขั้นตอนของดีล) หรือเพิ่มและแก้ไขสินค้าและคลัง คนยังเป็นผู้ตรวจ ส่ง อนุมัติ ลงบัญชี และจ่ายเงินใน Tonbab เสมอ ถ้าการเชื่อมต่อหลุดแล้ว Claude ส่งซ้ำ ระบบบันทึกเพียงครั้งเดียว",
      en: "Tools that write only create drafts (a purchase request, a stock count, an expense claim, a quotation, a stock adjustment or transfer, a delivery note), requests a person approves (leave), your own CRM work (a lead, a work update, a deal's stage), or add and edit products and warehouses. A person still checks, submits, approves, posts and pays in Tonbab. If a connection drops and Claude sends the same request again, it is saved once.",
    },
  },
  {
    key: "revoke",
    title: { th: "ยกเลิกได้ทุกเมื่อ", en: "Revoke any time" },
    body: {
      th: "ยกเลิกการเชื่อมต่อได้ที่ Tonbab › ตั้งค่า › API และการเชื่อมต่อ › แอปที่เชื่อมต่อ มีผลทันที ผู้ดูแลระบบปิดการเชื่อมต่อ AI ทั้งบริษัทได้จากหน้าเดียวกัน",
      en: "Disconnect in Tonbab › Settings › API & connectors › Connected apps, effective immediately. An admin can switch AI connectors off for the whole company on the same page.",
    },
  },
];

export const claudeFaq: { q: Bi; a: Bi }[] = [
  {
    q: {
      th: "ใช้ได้กับแพ็กเกจไหนของ Tonbab?",
      en: "Which Tonbab plans can use it?",
    },
    a: {
      th: "ทุกแพ็กเกจ รวมถึง Free แพ็กเกจฟรีอ่านข้อมูลได้อย่างเดียว ส่วนการให้ Claude สร้างฉบับร่างและคำขอเริ่มที่ Starter ฝั่ง Claude ให้ดูเงื่อนไขของแพ็กเกจ Claude ที่คุณใช้",
      en: "Every plan, Free included. Free is read-only; letting Claude create drafts and requests starts at Starter. On the Claude side, check what your Claude plan allows.",
    },
  },
  {
    q: { th: "มีค่าใช้จ่ายเพิ่มไหม?", en: "Does it cost extra?" },
    a: {
      th: "ไม่มีค่าใช้จ่ายเพิ่มจาก Tonbab และไม่ใช้เครดิต Tonbab AI Claude คิดและตอบด้วยบัญชี Claude ของคุณเอง ฝั่ง Tonbab นับแค่จำนวนครั้งที่ดึงข้อมูลตามโควตา API ของแพ็กเกจ (Free 300 ครั้งต่อวัน Starter 3,000 ครั้งต่อวัน)",
      en: "Nothing extra from Tonbab, and it doesn't use Tonbab AI credits. Claude thinks and answers on your own Claude account; Tonbab only counts data calls against your plan's API quota (Free 300 a day, Starter 3,000 a day).",
    },
  },
  {
    q: {
      th: "ดูแลหลายบริษัท ใช้ได้ไหม?",
      en: "I run several companies — does that work?",
    },
    a: {
      th: "ได้ ตอนเชื่อมต่อให้เลือกบริษัทหลักแล้วติ๊กบริษัทอื่นที่ต้องการ Claude จะเห็นแต่ละบริษัทตามบทบาทของคุณในบริษัทนั้น ถ้าถามรวมทุกบริษัท คำตอบจะแยกทีละบริษัท ไม่รวมยอดกัน อยากเพิ่มหรือลดบริษัทภายหลัง ให้ยกเลิกแล้วเชื่อมต่อใหม่",
      en: "Yes. When you connect, pick a default company and tick the others you want. Claude sees each one through your role in that company. Ask across all of them and the answer comes back one company at a time, never added together. To change the companies later, disconnect and connect again.",
    },
  },
  {
    q: { th: "ยกเลิกการเชื่อมต่อยังไง?", en: "How do I disconnect?" },
    a: {
      th: "ใน Tonbab ไปที่ ตั้งค่า › API และการเชื่อมต่อ › แอปที่เชื่อมต่อ แล้วกดยกเลิก มีผลทันที หรือลบ Tonbab ออกจาก Settings › Connectors ใน Claude ก็ได้ ผู้ดูแลระบบปิดสวิตช์ “อนุญาตการเชื่อมต่อ AI (MCP)” เพื่อหยุดทุกการเชื่อมต่อของบริษัทได้",
      en: "In Tonbab, go to Settings › API & connectors › Connected apps and disconnect — it takes effect immediately. You can also remove Tonbab from Settings › Connectors in Claude. An admin can switch off “Allow AI connectors (MCP)” to stop every connection for the company.",
    },
  },
  {
    q: { th: "ข้อมูลของเราไปอยู่ที่ไหน?", en: "Where does our data go?" },
    a: {
      th: "Claude ดึงเฉพาะข้อมูลที่ต้องใช้ตอบคำถามของคุณ ภายใต้สิทธิ์ของคุณ ข้อมูลที่ Claude ได้รับอยู่ภายใต้เงื่อนไขของ Anthropic และการตั้งค่าข้อมูลในแพ็กเกจ Claude ของคุณ ส่วนฝั่ง Tonbab เป็นไปตามนโยบายความเป็นส่วนตัวของเรา",
      en: "Claude fetches only what it needs to answer you, within your permissions. What Claude receives falls under Anthropic's terms and the data settings of your Claude plan; on Tonbab's side, our privacy policy applies.",
    },
  },
];
