# DATA OWNERSHIP & DOMAIN BOUNDARY MATRIX
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§16.1)  

| Domain Entity | Authoritative Master Portal | Operations Portal Permitted Actions | Hard Boundary Restrictions |
| :--- | :---: | :--- | :--- |
| **Employee Identity & Payroll** | **HR & Payroll** | Consume read-only eligibility and trade skill. | No access to salary, bank, PF/ESIC, or personal records. |
| **PTW / Height / JSA Clearances** | **Safety Portal** | Consume permit status and validity period. | Cannot create, modify, or approve safety permits. |
| **Site Entry & Muster Roll-Call** | **Gate Entry** | Consume gate muster status for deployed crew. | Cannot override security gate access or muster logs. |
| **Rigging Tackles & Form 11 Certs** | **Store Manager** | Consume Form 11 certificate validity & tool ID. | Cannot create/edit tool records or bypass quarantine. |
| **Heavy Erection Lift Plans** | **Engineering** | Reference approved lift plan drawing & calculation. | Operations cannot calculate crane stability by proxy. |
| **Project WBS & Cost Codes** | **Project Mgmt** | Reference WBS cost codes for work packages. | Cannot alter contractual project baseline. |
| **Commercial Billing & Invoicing**| **Finance** | Submit verified progress milestones. | Cannot generate invoices or modify commercial ledger. |
| **Work Package Execution Records**| **Operations** | Full authority: plan, allocate, execute, record. | Full operational record ownership. |
