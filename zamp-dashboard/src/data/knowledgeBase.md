# Claim Ops - Standard Operating Procedure

## Process Overview

**Process Name:** Claim Ops  
**Process Owner:** Finance Operations Team  
**Last Updated:** December 5, 2025  
**Version:** 1.0  
**Frequency:** As Required  
**Estimated Duration:** 5-10 minutes

---

## 1. Purpose & Scope

### 1.1 Purpose
This document outlines the standard procedure for accessing the UHC management system, applying date filters to the Claim report, and generating a PDF document of the filtered results for record-keeping and analysis purposes.

### 1.2 Scope
This procedure covers:
- Authentication and login to the Kyriba platform
- Authentication and login to the UHC platform
- Navigation to the Claim reporting module
- Application of 15-day date range filters
- Report generation and PDF export
- File naming and storage conventions

### 1.3 Business Context
The Claim report provides critical visibility into the organization's liquidity across all bank accounts and entities. Regular extraction of this data supports:
- Treasury forecasting and planning
- Audit trail requirements
- Financial statement reconciliation
- Cash flow variance analysis
- Compliance documentation

---

## 2. Prerequisites

### 2.1 Access Requirements
- Active Kyriba user account with Cash Position viewing permissions
- Appropriate role assignment (minimum: Treasury Analyst or equivalent)
- Network access to Kyriba platform (VPN if remote)

### 2.2 System Requirements
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- Browser print functionality enabled
- PDF creation capability (native or Adobe Acrobat)
- Stable internet connection

### 2.3 Knowledge Requirements
- Basic understanding of treasury management concepts
- Familiarity with date range selection
- Knowledge of organizational file storage structure

---

## 3. Detailed Process Steps

### Step 1: System Access & Authentication

**Objective:** Securely log into the Kyriba platform

**Actions:**
1. Navigate to the Kyriba login portal (URL provided by system administrator)
2. Enter your assigned username in the "Username" field
3. Enter your password in the "Password" field
4. If Multi-Factor Authentication (MFA) is enabled:
   - Retrieve the authentication code from your registered device/authenticator app
   - Enter the 6-digit code in the MFA prompt
   - Click "Verify" or "Submit"
5. Click the "Login" or "Sign In" button
6. Wait for the Kyriba dashboard to load completely

**Success Criteria:**
- Successful authentication without error messages
- Kyriba dashboard displays with full navigation menu visible
- User profile icon appears in the top-right corner

**Common Issues & Resolutions:**
- **Locked account:** Contact IT Service Desk to unlock
- **Expired password:** Follow password reset workflow
- **MFA failure:** Verify device time synchronization or request MFA reset

---

### Step 2: Navigate to Cash Position Module

**Objective:** Access the Cash Position reporting interface

**Actions:**
1. From the main Kyriba dashboard, locate the primary navigation menu (typically left sidebar or top menu bar)
2. Identify and click on the "Cash Management" or "Treasury" section
3. Within the expanded menu, look for "Cash Position" or "Cash Visibility"
4. Click on "Cash Position" to open the reporting module
5. Wait for the Cash Position interface to fully load
6. Verify that the default view displays current cash position data

**Navigation Path:**
```
Dashboard → Claim Ops → Claim Status
```
*Note: Menu structure may vary based on Kyriba configuration and version*

**Success Criteria:**
- Cash Position report interface is displayed
- Date filter controls are visible
- Account hierarchy or entity list is populated
- Data grid or summary view shows cash balances

---

### Step 3: Apply 15-Day Date Filter

**Objective:** Configure the report to display cash positions for a 15-day period

**Actions:**
1. Locate the date filter controls (typically at the top of the Cash Position interface)
2. Identify the "Date Range" or "Period" selector
3. Click on the date range dropdown or calendar icon
4. **Option A - Using Preset Range:**
   - Look for a "Last 15 Days" or "15 Days" preset option
   - Click to apply automatically
5. **Option B - Manual Date Selection:**
   - Click on the "From Date" or "Start Date" field
   - Select a date 15 days prior to today's date using the calendar picker
   - Click on the "To Date" or "End Date" field
   - Select today's date (or the desired end date)
   - Ensure the span equals 15 days
6. Click "Apply," "Submit," or "Go" to execute the filter
7. Wait for the report to refresh with filtered data

**Date Calculation Example:**
- If today is December 5, 2025
- Start Date: November 20, 2025
- End Date: December 5, 2025
- Total Days: 15 days inclusive

**Success Criteria:**
- Report refreshes and displays only data within the 15-day window
- Date range indicator confirms the selected period (e.g., "11/20/2025 - 12/05/2025")
- All cash position entries fall within the specified date range
- No error messages appear

**Validation Checkpoint:**
- Review the earliest and latest dates visible in the report
- Confirm they align with your intended 15-day period
- Verify that all relevant accounts and entities are included in the filtered view

---

### Step 4: Generate PDF Report

**Objective:** Create a print-formatted version and export as PDF

**Actions:**
1. Review the filtered report on screen to ensure completeness and accuracy
2. Locate the "Print" button or icon (typically in the toolbar or top-right corner)
3. Click the "Print" button to open the print dialog
4. **Configure Print Settings:**
   - **Destination:** Select "Save as PDF" or "Microsoft Print to PDF"
   - **Pages:** Select "All" to include the entire filtered report
   - **Layout:** Choose "Portrait" or "Landscape" based on report width
   - **Margins:** Set to "Default" or "Narrow" for optimal space usage
   - **Scale:** Set to "Fit to page" or "100%" as appropriate
5. Review the print preview pane to ensure:
   - All data columns are visible and not cut off
   - Headers and footers display correctly
   - Page breaks occur at logical points
   - Company logo and report title are present (if applicable)
6. Click "Print" or "Save" to generate the PDF
7. **File Naming Convention:**
   - Navigate to the designated save location
   - Name the file using the format: `Kyriba_CashPosition_[StartDate]_to_[EndDate]_[Timestamp].pdf`
   - Example: `Kyriba_CashPosition_20251120_to_20251205_143025.pdf`
8. Click "Save" to complete the PDF creation
9. Wait for confirmation that the file has been saved successfully

**File Naming Best Practices:**
- Use YYYYMMDD date format for proper sorting
- Include timestamp (HHMMSS) if multiple extractions occur same day
- Avoid special characters except underscores and hyphens
- Keep filename under 100 characters for compatibility

**Success Criteria:**
- PDF file is created without errors
- File size is reasonable (typically 500KB - 5MB depending on data volume)
- PDF opens correctly and displays all report content
- All data is legible and properly formatted

---

### Step 5: File Storage & Verification

**Objective:** Save the PDF to the appropriate location and verify integrity

**Actions:**
1. Navigate to the designated network drive or SharePoint folder for Kyriba reports
2. Locate the appropriate subfolder based on year/month structure:
   ```
   Treasury Reports → Kyriba → Cash Position → 2025 → December
   ```
3. Copy or move the generated PDF to this location
4. Open the saved PDF to perform a final verification:
   - Confirm all pages are present
   - Verify date range matches intended filter (15 days)
   - Check that account balances are displayed
   - Ensure no sensitive data requires redaction
5. Update the tracking log or index file (if applicable) with:
   - Report date range
   - File name
   - Generated by (your name)
   - Timestamp
   - Purpose/notes (optional)

**Storage Location Standards:**
- **Primary:** `\\network\Treasury\Kyriba\CashPosition\YYYY\MM\`
- **Backup:** Cloud storage per organizational policy
- **Retention:** Per document retention policy (typically 7 years)

**Success Criteria:**
- File is saved in correct folder location
- File permissions are set appropriately (read access for authorized users)
- Verification confirms report integrity
- Documentation/logging is complete

---

## 4. Quality Control & Validation

### 4.1 Data Validation Checkpoints
- [ ] Date range accurately reflects 15-day period
- [ ] All relevant bank accounts are included
- [ ] Currency amounts display correctly with proper decimal places
- [ ] Opening and closing balances reconcile appropriately
- [ ] No obvious data anomalies or missing values
- [ ] Report timestamp reflects actual generation time

### 4.2 PDF Quality Checks
- [ ] All pages rendered completely
- [ ] Text is legible and not pixelated
- [ ] Tables and grids maintain alignment
- [ ] Headers and footers present on each page
- [ ] No truncated columns or rows
- [ ] File size appropriate for content volume

---

## 5. Expected Outputs

### 5.1 Primary Output
**PDF Report:** Kyriba Cash Position Report
- **Content:** Detailed cash position data for all accounts over 15-day period
- **Format:** PDF document, landscape or portrait orientation
- **File Size:** Typically 1-3 MB depending on transaction volume
- **Pages:** Variable (usually 5-20 pages)

### 5.2 Report Components
The generated PDF should include:
- Report header with company name and report title
- Date range indicator (e.g., "Cash Position: 11/20/2025 - 12/05/2025")
- Account hierarchy or entity breakdown
- Daily cash balances by account
- Currency denomination
- Opening and closing balance summaries
- Generation timestamp and user identifier (if configured)

---

## 6. Troubleshooting Guide

### Issue: Unable to Login
**Symptoms:** Login fails, credentials rejected, account locked
**Resolution:**
1. Verify username and password (check for caps lock)
2. Clear browser cache and cookies
3. Try alternate browser
4. Contact IT Service Desk for account status check
5. Request password reset if necessary

### Issue: Cash Position Menu Not Visible
**Symptoms:** Menu option missing, greyed out, or inaccessible
**Resolution:**
1. Verify user permissions with Kyriba administrator
2. Check if user role includes Cash Position access rights
3. Confirm no system maintenance is in progress
4. Log out and log back in to refresh session
5. Escalate to Kyriba support if issue persists

### Issue: Date Filter Not Working
**Symptoms:** Report doesn't update after applying filter, wrong date range displayed
**Resolution:**
1. Clear any existing filters before reapplying
2. Verify date format matches system expectations (MM/DD/YYYY vs DD/MM/YYYY)
3. Ensure start date is before end date
4. Check that dates don't exceed available data range
5. Refresh the page and reapply filter

### Issue: PDF Generation Fails
**Symptoms:** Print dialog doesn't open, PDF save fails, blank pages generated
**Resolution:**
1. Verify browser print functionality with test page
2. Check available disk space on local drive
3. Disable browser extensions that may interfere with printing
4. Try "Print to PDF" instead of browser's native save
5. Export report to Excel first, then convert to PDF as workaround
6. Contact IT if printer drivers need updating

### Issue: Incomplete Data in Report
**Symptoms:** Missing accounts, blank balances, partial data display
**Resolution:**
1. Verify all entities/accounts are selected (check filter settings)
2. Confirm data exists for the selected date range
3. Check for pending data synchronization processes
4. Refresh the report and allow full data load time
5. Contact Kyriba administrator if specific accounts consistently missing

---

## 7. Process Metrics & KPIs

### 7.1 Performance Indicators
- **Execution Time:** Target < 10 minutes per report
- **Accuracy Rate:** 100% (zero data entry errors)
- **Completion Rate:** 100% of scheduled extractions
- **Error Rate:** < 1% of total report generations

### 7.2 Monitoring
- Track number of reports generated per month
- Document any system access issues or downtime
- Record average time to complete process
- Note any recurring data quality concerns

---

## 8. Compliance & Audit Considerations

### 8.1 Data Security
- Never share Kyriba login credentials
- Ensure PDFs are stored in secure, access-controlled locations
- Do not email PDFs to unauthorized recipients
- Redact sensitive information if sharing outside Treasury
- Follow data classification policies for handling financial data

### 8.2 Audit Trail
- Kyriba automatically logs all user activities
- PDF file metadata includes generation date and user
- Maintain extraction log with report date ranges and purpose
- Retain all reports per document retention schedule
- Be prepared to demonstrate process compliance during audits

### 8.3 Regulatory Requirements
- Ensure process aligns with SOX controls for cash management
- Support financial statement preparation and audit requirements
- Maintain documentation for regulatory examinations
- Follow organizational policies for financial data handling

---

## 9. Roles & Responsibilities

| Role | Responsibilities |
|------|------------------|
| **Treasury Analyst** | Execute daily/weekly cash position reports, ensure accuracy, maintain file organization |
| **Senior Treasury Analyst** | Review reports for anomalies, validate data quality, approve process exceptions |
| **Treasury Manager** | Oversee process compliance, approve procedure updates, resolve escalated issues |
| **Kyriba Administrator** | Manage user access, configure system settings, troubleshoot technical issues |
| **IT Support** | Resolve login/authentication issues, maintain network access, support PDF generation |

---

## 10. Related Processes & Documentation

### 10.1 Related Procedures
- Kyriba Daily Cash Forecasting Process
- Bank Reconciliation Standard Operating Procedure
- Treasury Month-End Close Process
- Cash Position Variance Analysis Workflow

### 10.2 Reference Materials
- Kyriba User Guide (link to internal knowledge base)
- Treasury Operations Manual
- Financial Systems Access Request Form
- Document Retention Policy

### 10.3 Training Resources
- Kyriba Basic Navigation (eLearning Module)
- Treasury Systems Overview (Recorded Webinar)
- Cash Management Fundamentals (Instructor-Led Training)

---

## 11. Process Improvement & Feedback

### 11.1 Continuous Improvement
This process should be reviewed quarterly and updated when:
- Kyriba system is upgraded or configuration changes
- New regulatory requirements emerge
- User feedback indicates inefficiencies
- Audit findings require procedure modifications
- Organizational structure or reporting needs change

### 11.2 Feedback Mechanism
Users are encouraged to submit feedback on this procedure through:
- Direct communication with Treasury Manager
- Process improvement suggestion portal
- Quarterly Treasury operations review meetings
- Annual process documentation review sessions

### 11.3 Version Control
All updates to this procedure must include:
- Version number increment
- "Last Updated" date revision
- Summary of changes in revision history
- Approval from Treasury Manager
- Communication to all affected users

---

## 12. Appendices

### Appendix A: Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Print Dialog | Ctrl+P (Windows) / Cmd+P (Mac) |
| Refresh Page | F5 or Ctrl+R |
| Open New Tab | Ctrl+T |
| Save As | Ctrl+S |

### Appendix B: Common Error Codes
| Error Code | Description | Resolution |
|------------|-------------|------------|
| KYR-401 | Unauthorized Access | Verify login credentials and permissions |
| KYR-404 | Report Not Found | Check date range and account filters |
| KYR-500 | Server Error | Contact Kyriba support |
| KYR-503 | Service Unavailable | Retry after system maintenance window |

### Appendix C: Contact Information
| Function | Contact | Extension | Email |
|----------|---------|-----------|-------|
| Kyriba Support | Helpdesk | x5555 | kyriba.support@company.com |
| Treasury Operations | Manager | x4444 | treasury.ops@company.com |
| IT Service Desk | Support Team | x3333 | it.helpdesk@company.com |

---

## Document Control

**Document Owner:** Treasury Operations  
**Approval Authority:** Chief Financial Officer  
**Review Frequency:** Quarterly  
**Next Review Date:** March 5, 2026  
**Distribution:** All Treasury and Finance Operations staff with Kyriba access

**Revision History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 5, 2025 | Treasury Operations | Initial document creation |

---

**End of Document**