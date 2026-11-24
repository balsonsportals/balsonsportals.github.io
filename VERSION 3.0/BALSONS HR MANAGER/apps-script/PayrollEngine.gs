/**
 * BALSONS HR & PAYROLL MANAGER - PAYROLL ENGINE
 * Deterministic Dual Workforce Payroll Computation Engine
 * 
 * Rules:
 *   - MONTHLY BASIS:
 *       Payable Days = Present + Weekly Off + Paid Leave (e.g. 30 d)
 *       Basic (50%), HRA (25%), Site Allowance (25%)
 *       OT Pay = (Basic / 208) * 2 * OT_Hours
 *       PF = Min(1800, Basic * 12%)
 *       ESIC = (Gross <= 21000) ? Round(Gross * 0.75%) : 158
 *       PT = 200
 *   - DAILY PAY WORKFORCE:
 *       Payable Days = Present (P) days worked only (Weekly Off Unpaid)
 *       Base = PresentDays * DailyRate
 *       OT Pay = (DailyRate / 8) * 2 * OT_Hours
 *       PF = ZERO (Statutory Exempt)
 *       ESIC = ZERO (Statutory Exempt)
 *       PT = ZERO (Exempt)
 *       Deductions = Advance Recovery only
 */

var PayrollEngine = {

  /**
   * Deterministic calculation for a single employee
   */
  calculate: function(emp, att, adv) {
    att = att || { present: 26, wo: 4, pl: 0, payable: 30, otHours: 0 };
    adv = adv || { monthly: 0, balance: 0 };

    var isMonthly = (emp.wageType === 'MONTHLY');

    if (isMonthly) {
      var ctc = Number(emp.ctc || emp.dailyRateOrCTC) || 50000;
      var basic = Math.round(ctc * 0.50);
      var hra = Math.round(ctc * 0.25);
      var allow = ctc - basic - hra;
      var otHours = Number(att.otHours) || 0;
      var hourlyRate = basic / 208.0;
      var otPay = Math.round(hourlyRate * 2.0 * otHours);
      var gross = basic + hra + allow + otPay;

      var pf = Math.min(1800, Math.round(basic * 0.12));
      var esic = (gross <= 21000) ? Math.round(gross * 0.0075) : 158;
      var pt = 200;
      var advanceDeduction = Number(adv.monthly) || 0;
      var totalDeductions = advanceDeduction + pf + esic + pt;
      var net = gross - totalDeductions;

      return {
        empId: emp.empId,
        name: emp.name,
        wageType: 'MONTHLY',
        payableDays: 30,
        presentDays: att.present || 26,
        baseRate: ctc,
        baseEarned: ctc,
        basic: basic,
        hra: hra,
        allowance: allow,
        otHours: otHours,
        otPay: otPay,
        gross: gross,
        advanceDeduction: advanceDeduction,
        pfDeduction: pf,
        esicDeduction: esic,
        ptDeduction: pt,
        totalDeductions: totalDeductions,
        netPayable: net,
        statutoryNotice: 'Covered under EPF (12%) and ESIC (0.75%)'
      };

    } else {
      var dailyRate = Number(emp.dailyRate || emp.dailyRateOrCTC) || 950;
      var presentDays = Number(att.present) || 26;
      var otHoursDaily = Number(att.otHours) || 0;
      var baseEarnedDaily = presentDays * dailyRate;
      var hourlyRateDaily = dailyRate / 8.0;
      var otPayDaily = Math.round(hourlyRateDaily * 2.0 * otHoursDaily);
      var grossDaily = baseEarnedDaily + otPayDaily;

      var advanceDeductionDaily = Number(adv.monthly) || 0;
      // Strictly Zero for Daily Pay
      var pfDaily = 0;
      var esicDaily = 0;
      var ptDaily = 0;
      var totalDeductionsDaily = advanceDeductionDaily;
      var netDaily = grossDaily - totalDeductionsDaily;

      return {
        empId: emp.empId,
        name: emp.name,
        wageType: 'DAILY_PAY',
        payableDays: presentDays,
        presentDays: presentDays,
        baseRate: dailyRate,
        baseEarned: baseEarnedDaily,
        basic: 0,
        hra: 0,
        allowance: 0,
        otHours: otHoursDaily,
        otPay: otPayDaily,
        gross: grossDaily,
        advanceDeduction: advanceDeductionDaily,
        pfDeduction: 0,     // STRICT ZERO
        esicDeduction: 0,   // STRICT ZERO
        ptDeduction: 0,     // STRICT ZERO
        totalDeductions: totalDeductionsDaily,
        netPayable: netDaily,
        statutoryNotice: 'Statutory Exempt: Zero PF, Zero ESIC'
      };
    }
  },

  /**
   * Process complete payroll batch for a month
   */
  processMonthlyPayroll: function(payPeriod, actor) {
    payPeriod = payPeriod || 'NOV-2026';
    var employees = EmployeeService.getEmployees('ALL');
    var records = [];
    var monthlyNetTotal = 0;
    var dailyNetTotal = 0;

    for (var i = 0; i < employees.length; i++) {
      var emp = employees[i];
      // Default attendance mock
      var att = {
        present: emp.wageType === 'MONTHLY' ? 26 : 24,
        wo: 4,
        pl: 0,
        payable: emp.wageType === 'MONTHLY' ? 30 : 24,
        otHours: 16
      };
      var adv = { monthly: 0, balance: 0 };

      var calc = this.calculate(emp, att, adv);
      records.push(calc);

      if (calc.wageType === 'MONTHLY') {
        monthlyNetTotal += calc.netPayable;
      } else {
        dailyNetTotal += calc.netPayable;
      }
    }

    var ssId = HR_CONFIG.getSpreadsheetId();
    if (ssId) {
      var ss = SpreadsheetApp.openById(ssId);
      var regSheet = ss.getSheetByName('PAYROLL_REGISTER');
      if (regSheet) {
        records.forEach(function(r) {
          regSheet.appendRow([
            'PAY-' + new Date().getTime() + '-' + r.empId,
            payPeriod,
            r.empId,
            r.wageType,
            r.presentDays,
            r.payableDays,
            r.baseEarned,
            (r.hra + r.allowance),
            r.otPay,
            r.gross,
            r.advanceDeduction,
            r.pfDeduction,
            r.esicDeduction,
            r.ptDeduction,
            r.netPayable,
            'CALCULATED'
          ]);
        });
      }

      // Log in AUDIT_LOG
      var auditSheet = ss.getSheetByName('AUDIT_LOG');
      if (auditSheet) {
        auditSheet.appendRow([
          'AUDIT-' + new Date().getTime(),
          new Date().toISOString(),
          actor || 'HR Head',
          'HR_ADMIN',
          'PAYROLL_RECALCULATE',
          payPeriod,
          'SUCCESS',
          'Processed payroll for ' + records.length + ' employees (Monthly Net: ₹' + monthlyNetTotal + ', Daily Net: ₹' + dailyNetTotal + ')'
        ]);
      }
    }

    return {
      payPeriod: payPeriod,
      totalCount: records.length,
      monthlyNetTotal: monthlyNetTotal,
      dailyNetTotal: dailyNetTotal,
      totalNetDisbursal: monthlyNetTotal + dailyNetTotal,
      records: records
    };
  }
};
