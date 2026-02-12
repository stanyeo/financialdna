/**
 * CONTENT LIBRARY
 * 
 * Master library of all narrative content used in PDF generation.
 * Provides templates for different archetypes, phases, blind spots, etc.
 * Adapted from Apps Script content library.
 */

export const contentLibrary = {
  /**
   * EXECUTIVE STORIES
   * 5 narrative phases (A-E) based on life stage/situation
   */
  executive: {
    A: `**⏳ ACCUMULATION PHASE**

Your behavioral profile places you firmly in the Accumulation Phase of the financial life cycle. At this stage, your greatest asset is not the cash in your bank account, but your **TIME EQUITY**. You have decades ahead of you, which allows the mathematical force of compound interest to do the heavy lifting.

**🚧 CAPITAL CONSTRAINTS**

However, you are likely operating under constraints. You have the energy and the time, but perhaps not the capital base yet to make massive moves.

Fundamentally, there are only two ways to earn income in this world:
1. **You at Work** (Labor)
2. **Your Money at Work** (Capital)

The strategic objective for you right now is to efficiently convert your human capital into financial capital. We must build a system that automatically captures your earnings and deploys them into assets. We must also avoid the **'EXPLORER'S TRAP'**—upgrading your lifestyle faster than your savings rate.`,

    B: `**🧱 CONSOLIDATION PHASE**

You are currently navigating the Consolidation Phase. Most Singaporeans cite this as the most stressful financial period of their lives, and the data suggests you are right in the thick of it.

**💧 LIQUIDITY SQUEEZE**

You are likely managing a squeeze. Your Net Worth is growing on paper because you are paying down your property mortgage and accumulating CPF, but your actual free cash flow feels restricted. You might feel 'wealthy' when you look at your annual statement, but 'tight' when you pay the monthly bills.

The objective here is a delicate balancing act. We must manage your short-term cash flow to cover mortgage obligations and rising family costs today, while simultaneously planting seeds for long-term needs like retirement.`,

    C: `**🛡️ PRESERVATION PHASE**

You have successfully fought the battles of accumulation and have acquired core assets. Therefore, the strategic objective must shift. We are moving from **ALPHA GENERATION** (taking risks to beat the market) to **WEALTH PRESERVATION** (managing risks to keep what you have).

The focus is no longer just on wealth creation. It is about:

**• TAX EFFICIENCY:** Ensuring you aren't paying unnecessary fees.
**• LEGACY PLANNING:** Ensuring assets pass to loved ones without friction.
**• LONGEVITY RISK:** The risk of living longer than your money lasts.

The goal now is to construct a safety net that is guaranteed to remain intact for as long as you do.`,

    D: `**🥪 DUAL-DEPENDENCY STRUCTURE**

Critically, your data indicates you are in the **SANDWICH CLASS**. You serve as the primary economic engine for two generations simultaneously. On one hand, you may have to provide for your parents' living expenses. On the other, you must cater to your children's education.

**⚖️ LEVERAGED RISK PROFILE**

For a single person, a loss of income is a hurdle. For you, a disruption to your income is a structural failure. It does not merely pause your savings; it destabilizes the entire ecosystem of loved ones who rely on your cash flow. Because you carry a heavier load, your foundation must be stronger than average.`,

    E: `**📉 ASSET-LIABILITY MISMATCH**

The central tension in your portfolio is a misalignment between your assets and your needs. A significant portion of your net worth is **ILLIQUID**—locked away in CPF accounts or Property equity which you cannot touch. Meanwhile, your liabilities such as mortgages, tuition, and bills remain **LIQUID** and immediate.

This opens you up to significant risk. While you are technically 'solvent' on paper, your daily cash flow lacks the flexibility required to absorb life's shocks. If a sudden expense arises, you cannot pay it with a brick from your house. Our goal is to unlock liquidity.`,
  },

  /**
   * ARCHETYPE DEEP DESCRIPTIONS
   */
  archetype: {
    Explorer: `You are **THE EXPLORER** 🧭.

You exhibit a preference for **FUTURE POTENTIAL**, but you are currently operating with **LIMITED CAPITAL**. Your greatest asset right now is not the cash in your bank account, but your **TIME EQUITY**.

The trap here is **THE PROCRASTINATION TAX**. Because retirement feels 40 years away, it is easy to say 'I will start later'. But the math of compound interest is brutal: $1 saved at age 20 is worth $10 saved at age 40. You don't need to be rich to start; you just need to start.`,

    Maverick: `You are **THE MAVERICK** 🚀.

You exhibit a preference for **ALPHA GENERATION**, which means you view money as a tool for leverage and volatility as an opportunity. However, this pursuit of growth introduces **SEQUENCE OF RETURNS RISK**.

Think of this like driving a sports car without a spare tire. While you are built for speed, you lack a defensive buffer. If a market downturn hits when you need cash (e.g., retrenchment), you force a permanent loss of capital. You are winning the offense game, but risking the defense game.`,

    Architect: `You are **THE ARCHITECT** 🏗️.

You exhibit a preference for an **ENGINEERING MINDSET**, which means you prioritize system optimization, yield, and efficiency above all else. The risk here is **KEY PERSON DEPENDENCY**.

You have built a 'Black Box' ecosystem that relies entirely on you to run it. It works perfectly when you are the pilot, but if you were incapacitated, your family wouldn't know which buttons to push. A system that only works when you are present is not a system—it is a job.`,

    'Zen Master': `You are **THE ZEN MASTER** 🧘.

You exhibit a preference for **CAPITAL PRESERVATION**, which means you value certainty, liquidity, and guaranteed returns above growth. While this protects you from market crashes, it exposes you to **THE INFLATIONARY GAP**.

Think of your cash like a **Melting Ice Cube**. By keeping it 'safe' in a low-interest environment, you are paying a 'Safety Tax'. Your money is physically there, but its purchasing power is evaporating every year.`,

    Firefighter: `You are **THE FIREFIGHTER** 🚒.

You exhibit a preference for **IMMEDIATE LIQUIDITY**, which means your current cash flow needs are overriding your ability to plan for the long term. You feel like you are treading water.

A common mistake here is attempting to 'invest out of debt' by taking high risks to catch up. Strategically, this is dangerous. We must focus on **BALANCE SHEET STABILIZATION** first. You cannot build a skyscraper on a swamp.`,

    Sleeper: `You are **THE SLEEPER** 🛌.

You exhibit a preference for **PASSIVE ACCUMULATION**, which means you value simplicity and low cognitive load over maximizing returns. However, you are paying the **COST OF INACTION**.

By defaulting to the 'Base State' (Bank Deposits/CPF OA), you are accepting a return that often trails inflation. The goal is not to become a trader, but to enable **AUTOMATED COMPETENCE**—building an 'Autopilot' system that grows your wealth even when you aren't watching.`,
  },

  /**
   * ORIGIN STORIES
   * Based on childhood money dynamics
   */
  origin: {
    'Silent Film': `**🤐 'TABOO' DYNAMIC**

Your financial socialization suggests the **OSTRICH EFFECT**. This is a subconscious defense where you avoid looking at your numbers to avoid anxiety. But avoiding the health checkup doesn't prevent the illness.

Our goal is to shift from emotional avoidance to **Data-Driven Clarity**. When you understand your numbers, you remove the mystery, and with it, the anxiety.`,

    Drama: `**🎭 SCARCITY MINDSET**

A background of financial conflict often imprints anxiety. You may find that liquidity triggers a 'Boom and Bust' cycle. Think of this like a **FINANCIAL THERMOSTAT**. Whenever you save 'too much', you subconsciously find a way to spend it to return to your familiar baseline of zero.

The antidote is awareness. Once you see the pattern, you can interrupt it.`,

    Fantasy: `**🌟 ABUNDANCE MINDSET (CAUTION)**

A childhood marked by availability can create two opposite outcomes in adulthood. Either you continue the abundance (disciplined high earner) or you attempt to recreate it (high consumer, low preservationist).

The key is intentionality. Abundance is not about having unlimited money; it is about having unlimited **choices**.`,

    Documentary: `**🧠 RATIONAL-LOGICAL**

You possess a solid framework for money. While excellent for execution, be mindful of **SPREADSHEET MYOPIA**. Financial planning involves human variables. Emotions, health shocks, and dreams don't always fit in a linear model.

A robust plan must account for the fact that we are humans, not robots.`,
  },

  /**
   * EMOTIONAL DRIVERS
   * Z-Axis: Guardian / Freedom Seeker / Legacy Builder
   */
  driver: {
    Guardian: `🛡️ **THE GUARDIAN (Protection Focused)**

Your anxiety isn't about money; it's about failure to provide. You carry the weight of the world on your shoulders. You aren't trying to get rich; you are trying to make sure your family never gets poor.

**THE STRATEGY:** The Golden Goose Defense. We must insure the Goose (You), not just the eggs. If the Goose gets sick, the eating stops.`,

    'Freedom Seeker': `🏖️ **THE FREEDOM SEEKER (Cash Flow Focused)**

You don't want a Ferrari; you want to delete your alarm clock. Your primary metric of success is 'Passive Income vs. Monthly Expenses.'

**THE STRATEGY:** The Bridge Asset. Most plans lock money away for 30 years. You need instruments that provide liquidity or payouts **now**, not just at age 65.`,

    'Legacy Builder': `🏛️ **THE LEGACY BUILDER (Dynasty Focused)**

You are thinking about your name living on. You want to be the ancestor who changed the family's trajectory forever.

**THE STRATEGY:** The Multiplier. If you leave cash, it's just cash. If we wrap that cash in the right legal or insurance structure, we can multiply its value instantly for your grandkids.`,
  },

  /**
   * COGNITIVE GAPS (Blind Spots)
   */
  cognitive: {
    'Fake Brave': `**🎢 OBSERVATION: STATED VS. REVEALED PREFERENCE**

There is a gap between your self-identification as an 'Aggressive Investor' and your 'Panic' response to market drops. You are intellectually aggressive but emotionally conservative.

Think of this like a **ROLLERCOASTER**. You like the idea of the speed, but when the drop comes, you want to get off.

**The Fix:** Accept your true risk tolerance. There is no shame in being conservative. The shame is in pretending to be aggressive and then panic-selling.`,

    'Uninsured Pillar': `**🚗 OBSERVATION: LIABILITY-COVERAGE MISMATCH**

You are the primary economic engine for your family, yet your Risk Transfer mechanisms are insufficient. This is like **DRIVING WITHOUT A SEATBELT**. You are a skilled driver, but you cannot control the other cars on the road.

A cessation of your income doesn't just pause your savings. It crashes the family vehicle.

**The Fix:** Secure catastrophic protection first. Then optimize.`,

    'Lifestyle Creep': `**💸 OBSERVATION: CONSUMPTION SMOOTHING FAILURE**

You report monthly liquidity constraints, yet you consume capital injections like bonuses immediately. This indicates **LIFESTYLE CREEP**, where your spending expands to fill your income.

You have a **Leaky Bucket**. Pouring more water or earning more won't solve the problem until we patch the holes.

**The Fix:** Automate the savings before you see the money. One psychology hack: Treat a bonus as "Found Money," not "Extra Income."`,
  },

  /**
   * FRAGILITY ASSESSMENT
   */
  fragility: {
    'Solvency Risk': `**🛑 STATUS: SOLVENCY RISK**

Your portfolio is currently swimming upstream. You are likely carrying liabilities (Debt) that are compounding against you at a rate higher than your assets can grow.

Mathematically, you cannot 'out-invest' a structural leak. Your immediate fragility is not market risk; it is **Interest Rate Drag**.

**Priority:** Debt elimination before wealth building.`,

    'Liquidity Constrained': `**💧 STATUS: LIQUIDITY CONSTRAINED**

While your Net Worth is positive, your portfolio is **ASSET RICH, CASH POOR**. Your wealth is locked in bricks (Property) and government schemes (CPF).

In a crisis, you cannot pay groceries with a brick. This exposes you to **Liquidity Risk**. If your income stops, you lack the liquid fuel to keep the engine running.

**Priority:** Build a liquid emergency buffer outside of CPF.`,

    'Capital Inefficient': `**💤 STATUS: CAPITAL INEFFICIENT**

You are likely holding on to more cash than needed (3 to 6 months of expenses) while also losing track of your monthly spending. On one hand, inflation is eroding your idle savings, which 'unassigned' dollars are disappearing due to lifestyle creep.

We need to identify your 'unemployed' monies and assign it a job!

**Priority:** Segment cash flows and deploy idle capital.`,

    'High Human Capital Dependency': `**🦢 STATUS: HIGH HUMAN CAPITAL DEPENDENCY**

Your Human Capital (the total value of your future paychecks) is your **'GOLDEN GOOSE'**. Currently, your family relies entirely on the Goose laying eggs every month.

Protecting this asset against illness or disability is not an optional expense. It is a structural necessity to ensure the eggs keep coming.

**Priority:** Catastrophic health & disability insurance.`,
  },

  /**
   * STRATEGY GUIDANCE
   */
  strategy: {
    Explorer: `**PHASE 1 (DEFENSE): INSURABILITY LOCK-IN 🛡️**

Your health is perfect right now. You need to lock in your 'Insurability' while you have no pre-existing conditions. If you wait until you start working, a minor health issue could make you uninsurable for life.

**PHASE 2 (GROWTH): THE HABIT ENGINE 📈**

Forget about 'beating the market'. Your goal is to build the muscle of saving. Set up a small, automated transfer (even $100/month). We are not trying to get rich today; we are trying to build the **System** that will make you rich later.

**PHASE 3 (ADMIN): ADULTING 101 ⚙️**

You need to separate your money. Open two bank accounts: one for 'Spending' and one for 'Saving'. Never let them touch. This simple separation prevents you from accidentally spending your future.`,

    Maverick: `**PHASE 1 (DEFENSE): CATASTROPHIC HEDGING 🛡️**

You drive fast, so you need powerful brakes. You need to leverage high-coverage term policies to secure protections against Death and Critical Illness. This structure keeps monthly premiums low, freeing up cash for investing.

**PHASE 2 (GROWTH): THE CORE-SATELLITE SANDBOX 📈**

You need to establish a **Two-Bucket System**. The 'Core Bucket' (80%) must go into a boring, diversified portfolio which you are not allowed to touch. The 'Satellite Bucket' (20%) is your Sandbox for stock picking.

**PHASE 3 (ADMIN): ARTIFICIAL SCARCITY ⚙️**

You have a tendency to spend available liquidity. You need to set up **Automated Sweeps**. On payday, your savings and investments must be deducted instantly.`,

    Architect: `**PHASE 1 (DEFENSE): EFFICIENCY AUDIT 🛡️**

You likely have coverage, but it might be fragmented. You need to perform an **'OVERLAP AUDIT'**. We often find Architects are paying for duplicate features.

**PHASE 2 (GROWTH): TAX & YIELD OPTIMIZATION 📈**

You need to explore **SRS (Supplementary Retirement Scheme)** for immediate tax relief and **CPF Shielding** strategies.

**PHASE 3 (ADMIN): THE BREAK-GLASS PROTOCOL 🏛️**

You need to create a **MASTER MANUAL**. This is a single, secure document that explains to your family exactly where the assets are and how to access them.`,

    'Zen Master': `**PHASE 1 (DEFENSE): RETENTION AUDIT 🛡️**

You likely have a strong defensive moat and might even be over-insured. You need to audit your portfolio for inefficient premiums and redirect them into your Growth bucket.

**PHASE 2 (GROWTH): PRIVATE LIQUIDITY TRANCHING 📈**

You need to establish a **'Third Pot'** outside of CPF. Build a portfolio of assets capable of generating fixed income, regardless of market conditions.

**PHASE 3 (ADMIN): THE NOMINATION LOCK 🏛️**

Execute both **CPF AND INSURANCE NOMINATIONS**. This ensures instant transfer to beneficiaries, bypassing probate.`,

    Sleeper: `**PHASE 1 (DEFENSE): THE CALIBRATED AUTOPILOT 🛡️**

You don't want to think about insurance daily. You need to set up a comprehensive plan that takes care of you **NO MATTER WHAT HAPPENS**.

**PHASE 2 (GROWTH): THE AUTOMATIC ENGINE 📈**

Deploy **RECURRING INVESTMENTS** or Regular Premium Policies. Every month, a fixed amount automatically moves from your bank into a diversified strategy.

**PHASE 3 (ADMIN): THE ONE-PAGE VIEW ⚙️**

Establish a consolidated **FINANCIAL SUMMARY** that pulls your CPF, Bank, and Investment numbers into one view.`,

    Firefighter: `**PHASE 1 (DEFENSE): THE CATASTROPHE SHIELD 🛡️**

Consider getting a **LOW-COST TERM INSURANCE** to protect you in case anything happens. Secure maximum coverage for the minimum price.

**PHASE 2 (GROWTH): LIQUIDITY DAMMING 📈**

Pause on investing. Your growth strategy is actually a **CASH FLOW STRATEGY**. Identify the leak and plug it first.

**PHASE 3 (ADMIN): SIMPLIFICATION ⚙️**

Consolidate your bank accounts into one for 'Fixed Bills' and one for 'Living'. Automate the transfer to the Bills account on payday.`,
  },

  /**
   * PIVOT STRATEGIES
   * Specific questions/challenges for each archetype
   */
  pivot: {
    Explorer: `You have the greatest leverage of all: Time. But I have to ask:

**__'Are you waiting to be "rich" before you start managing money?'__**

The truth is, you don't manage money because you are rich; you get rich because you manage money. The habit must come before the harvest.`,

    Sandwich: `You are the pillar for your parents and your children. You are the engine of the family. But engines overheat, and engines break.

I have to ask the uncomfortable question: **__'If your income stopped for 36 months starting tomorrow due to an illness, exactly which asset would you sell to pay for your parents' medical bills?'__**

If the answer is 'I don't know', or 'I would sell my retirement shares', then the plan is structurally unsound.`,

    Maverick: `You are undeniably skilled at Capital Generation or making money. But looking at your volatility profile, I have to ask:

**__'Do you have a system for Capital Retention, or is your Net Worth just a temporary high score?'__**

History is full of people who made millions in a bull market and gave it all back because they lacked a defensive floor.`,

    'Zen Master': `You have won the game of safety. You sleep well at night because your cash is secure. But looking at the inflation data, I have to ask:

**__'Are you prioritizing feeling safe today at the expense of actually being safe tomorrow?'__**

By accepting a return lower than inflation, you are guaranteeing that your future self will be poorer than your current self.`,

    Architect: `You have built a sophisticated machine. But looking at the complexity of your structure, I have to ask:

**__'If you didn't come home tomorrow, would this portfolio be a blessing to your family, or a burden?'__**

Currently, your wealth is locked behind a wall of logic that only exists in your head.`,

    Sleeper: `You value simplicity. But currently, your strategy is 'Default'. I have to ask:

**__'Are you aware that the cost of your inactivity is roughly thousands per year?'__**

That is the difference between the bank interest you are earning and the market return you could be earning with a simple automated system.`,

    Firefighter: `You are working incredibly hard, yet the water level (debt/bills) doesn't seem to go down. I have to ask:

**__'If we don't plug the leak in the boat today, how long can you keep bailing water before you get tired?'__**

You cannot out-earn a structural leak. We need to stop trying to 'win big' to solve this, and start doing the boring work of patching the hull.`,
  },
};

/**
 * Get narrative content for a specific section
 */
export function getContent(category, key) {
  if (contentLibrary[category] && contentLibrary[category][key]) {
    return contentLibrary[category][key];
  }

  console.warn(`Content not found: ${category}.${key}`);
  return '';
}

/**
 * Get all content for a category
 */
export function getCategoryContent(category) {
  return contentLibrary[category] || {};
}

export default contentLibrary;
