# MANAGEMENT KPI CATALOGUE
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§19.6)  

| KPI Code | KPI Name | Mathematical Formula | Reporting Unit | Data Freshness | Source System |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **`KPI-OPS-01`** | Erection Progress | $\frac{\sum \text{Completed Milestone Weight}}{\sum \text{Total Scope Weight}} \times 100$ | Percentage (%) | Shift End | Operations Logbook |
| **`KPI-OPS-02`** | Schedule Variance | $\text{Actual Completed Packages} - \text{Planned Packages}$ | Count | Daily | Work Package Plan |
| **`KPI-OPS-03`** | Manpower Utilization | $\frac{\text{Actual Deployed Man-Hours}}{\text{Mobilized Available Man-Hours}} \times 100$ | Percentage (%) | Daily | Shift Handover Log |
| **`KPI-OPS-04`** | Tackle Compliance | $\frac{\text{Certified Form 11 Tackles In Use}}{\text{Total Active Rigging Tackles}} \times 100$ | Percentage (Must be 100%) | Real-time | Store Tackle DB |
| **`KPI-OPS-05`** | PTW Clearance Rate | $\frac{\text{Work Packages with Active PTW}}{\text{Total Packages In Progress}} \times 100$ | Percentage (Must be 100%) | Real-time | Safety PTW DB |
| **`KPI-OPS-06`** | Hold Point Age | $\text{Current Time} - \text{Hold Start Time}$ | Hours | Real-time | Hold Register |
