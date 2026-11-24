# ENTERPRISE INTEGRATION CONTRACTS SPECIFICATION
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§16)  

### 1. Integration Event Envelope Schema
Every data exchange between Operations and other ecosystem nodes must use this standard envelope:

```json
{
  "eventId": "EVT-OPS-20261121-0001",
  "schemaVersion": "1.0.0",
  "sourcePortal": "BALSONS_OPERATIONS",
  "sourceRecordId": "WP-AXLE-PRS-001",
  "sourceRecordRevision": 3,
  "eventType": "WORK_PACKAGE_PROGRESS_UPDATED",
  "eventTimestamp": "2026-11-21T16:45:00Z",
  "correlationId": "CORR-JTRWF-SHIFT-A-492",
  "idempotencyKey": "IDEMP-892147912847",
  "purposeCode": "OPERATIONAL_PROGRESS_REPORTING",
  "dataClassification": "INTERNAL_OPERATIONAL",
  "payload": {
    "workspaceId": "LINE-AXLE",
    "assetId": "AST-AXLE-SCH-01",
    "progressPercentage": 72.5,
    "completedMilestone": "CROWN_ROUGH_LEVELLING"
  },
  "producerSignature": "ECDSA_VERIFIED"
}
```

### 2. Integration Status Lifecycle
Integration events must progress through 7 distinct, evidence-backed states:

$$\text{QUEUED} \longrightarrow \text{SENT} \longrightarrow \text{ACCEPTED} \longrightarrow \text{RECONCILED}$$
$$\text{With error states: } \text{REJECTED} \mid \text{RETRY\_WAIT} \mid \text{DEAD\_LETTER}$$

- **Truthfulness Rule:** `SENT` does not mean `ACCEPTED`. `ACCEPTED` does not mean `RECONCILED`. A green sync pill is prohibited unless server acknowledgement is cryptographically verified.
