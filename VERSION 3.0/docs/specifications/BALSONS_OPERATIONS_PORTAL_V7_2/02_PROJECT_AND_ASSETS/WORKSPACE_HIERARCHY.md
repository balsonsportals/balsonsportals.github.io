# PROJECT & WORKSPACE HIERARCHY
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§02)  
**Context:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  

### 1. The Umbrella Project Context Rule
`JUPITER` is the umbrella project context only. It represents the broader industrial facility and contract context.
- **Rule:** `JUPITER` is **NOT** a third Schuler forging line.
- **Prohibition:** No execution workspace or work package may be assigned directly to `JUPITER`.
- **Top-Level Workspaces:** Exactly three operational workspaces are permitted:

```
[PROJECT CONTEXT: JUPITER]
       │
       ├── [WORKSPACE 1: LINE-AXLE] (Schuler Axle Forging Press Cell)
       ├── [WORKSPACE 2: LINE-WHEEL] (Schuler Wheel Forging Press Cell)
       └── [WORKSPACE 3: AREA-MACHINE-SHOP-AXLE] (Axle Machining Bay)
```

### 2. Workspace Specifications

#### 2.1 `LINE-AXLE`
- **Scope:** Schuler Axle Forging Press line mechanical installation, hydraulic puller mobilization, multi-axle trailer haulage, and bed positioning.
- **Historical Baseline:** 717 Man-Days (6,453 hours at 9 h/MD) over 44 planning weeks.
- **Primary Machinery:** Schuler Axle Forging Press, manipulators, tool changing systems.

#### 2.2 `LINE-WHEEL`
- **Scope:** Schuler Wheel Forging Press line mechanical installation, furnace shell rigging, rotary hearth manipulator setting, and press bed rough levelling.
- **Historical Baseline:** 1,075 Man-Days (9,675 hours at 9 h/MD) over 44 planning weeks.
- **Primary Machinery:** Schuler Wheel Forging Press, descaler, rotary hearth furnace, quench press.

#### 2.3 `AREA-MACHINE-SHOP-AXLE`
- **Scope:** Complete Axle Machining Bay installation, including turning, testing, grinding, gantry robotics, and automated handling.
- **Historical Baseline:** **ZERO Man-Days.** No historical baseline assumed. All manpower must be planned from first principles.
