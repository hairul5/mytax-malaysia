import { useState, useRef, useCallback } from "react";

const T = {
  en: {
    appName:"MyTax Malaysia",appSub:"Income Tax",ya:"YA",
    nav:["Home","Expenses","Reliefs","Estimate","Zakat"],
    estTax:"Est. Tax",effRate:"Eff. Rate",reliefs:"Reliefs",
    dashSub:"Assessment Year 2026 · Live Summary",
    annualIncome:"Annual Income",
    totalReliefs:"Total Tax Reliefs (Pelepasan)",reliefSub:"Personal + expenses",
    chargeableInc:"Chargeable Income (Pendapatan Bercukai)",
    chargeableSub:"Gross income minus all reliefs",
    estTaxPayable:"Est. Tax Payable (Cukai Kena Bayar)",estTaxSub:"YA 2026 progressive rates",
    scanCTA:"Scan a Receipt",scanCTASub:"AI reads & auto-categorises for LHDN",
    tipTitle:"💡 Tip",
    tipBody:(rem)=>`RM ${rem.toLocaleString()} remaining in Lifestyle (Gaya Hidup) relief — books, gym, internet qualify.`,
    myExpenses:"My Expenses",
    records:(n,total)=>`${n} records · Total ${total}`,
    scanBtn:"📸 Scan",addBtn:"+ Add",newExpense:"➕ New Expense",
    aiAnalysing:"AI analysing…",aiDone:"✓ AI done",
    attachDoc:"📎 Attach Document",scanReceipt:"📸 Scan Receipt",
    descPlaceholder:"Expense description",amountLabel:"Amount (RM)",dateLabel:"Date",
    vaultNotice:"📎 Document will be saved to Vault automatically",
    saveVault:"✓ Save & Vault",saveOnly:"✓ Save",waitAI:"Wait for AI…",cancel:"Cancel",
    reliefTabSub:"LHDN Tax Relief Categories (Pelepasan Cukai) · YA 2026",
    remaining:(n)=>`RM ${n.toLocaleString()} remaining`,capReached:"⚠ Relief cap reached",
    estimateSub:"Tax Estimate Breakdown",
    grossIncome:"Gross Annual Income (Pendapatan Kasar)",
    personalRelief:"Personal Relief (Pelepasan Individu)",
    expRelief:"Expense Reliefs — capped",
    chargeableRow:"Chargeable Income (Pendapatan Bercukai)",
    taxBeforeRebate:"Tax Before Rebate",taxBeforeSub:"Progressive rate on chargeable income",
    zakatRebateRow:"🌙 Zakat Rebate (Rebat Zakat)",
    zakatRebateSub:"Direct deduction · Subseksyen 6A(3) ACP 1967",
    rebate400:"Personal Rebate (Rebat Individu) RM400",
    rebate400Sub:"Chargeable income ≤ RM35,000 · Subseksyen 6A(2) ACP 1967",
    spouseRebate400:"Spouse Rebate (Rebat Pasangan) RM400",
    spouseRebate400Sub:"Spouse deduction claimed & chargeable income ≤ RM35,000",
    taxPayableRow:"Est. Tax Payable (Cukai Kena Bayar)",taxPayableSub:"After all rebates · Before PCB",
    zakatNudge:"Zakat Pendapatan is a direct Rebat — not merely a Pelepasan. Calculate in the Zakat tab.",
    pcbTitle:"Monthly PCB Estimate (Potongan Cukai Bulanan)",
    pcbSub:(r)=>`/month · Effective Rate ${r}%`,
    disclaimer:"⚠ Disclaimer",
    disclaimerText:"Estimate only. Consult a licensed tax agent or LHDN e-Filing (MyTax) for your official assessment.",
    zakatTitle:"🌙 Zakat Pendapatan",zakatSub:"Direct tax rebate · Subseksyen 6A(3) ITA 1967 · Rate 2.5%",
    zakatClose:"✕ Close",
    zakatExplain:"Zakat Pendapatan paid to a recognised Majlis Agama Islam Negeri reduces tax payable ringgit-for-ringgit — this is a Rebat Cukai, not a Pelepasan Cukai.",
    incomeInfo:"💼 Income Information",grossIncLabel:"Gross Annual Income (RM)",
    deducLabel:"Personal Deductions (RM)",deducHelp:"e.g. Spouse RM1,000 + RM200 per child",
    netIncome:"Net income",nisabLabel:"Nisab (silver, 595g)",
    nisabStatus:(ok)=>ok?"✓ Nisab met":"✗ Below nisab",
    zakatResult:"Estimated Zakat Pendapatan Payable",
    zakatMonthly:(v)=>`≈ ${v} / month`,
    zakatImpact:"🏦 Tax Implication (Implikasi Cukai)",
    zakatImpactText:"After saving, this amount is deducted from your estimated tax as a Rebat under Seksyen 6A.",
    belowNisab:"Net income is below nisab — Zakat Pendapatan is not obligatory.",
    saveRebate:"💾 Save & Apply Tax Rebate",savedRebate:"✓ Saved — Rebate Applied!",
    zakatNote:"⚠ Important",
    zakatNoteText:"Ensure payment is made to a recognised Majlis Agama Islam or Pejabat Zakat in your state.",
    zakatDeclaredLabel:"Amount I Will Pay (RM)",zakatUseCalc:"Use calculated",
    docsTitle:"🗂️ Documents & Receipts",
    docsSub:(n)=>`${n} document${n!==1?"s":""} · Store receipts, EA forms, zakat slips`,
    searchPlaceholder:"Search documents…",
    noDocsYet:"No documents yet",noDocsSub:"Upload receipts, Borang EA, or zakat slips",
    noDocsFilter:"No documents in this category",noDocsFilterSub:"Try changing the filter",
    uploadDoc:"📎 Upload Document",scanDoc:"🔍 Scan Receipt",
    scanPanelTitle:"🔍 Scan Receipt with AI",scanPanelSub:"AI reads receipt & suggests LHDN category",
    scanClose:"✕ Close",dropZoneMain:"Tap to upload receipt",dropZoneSub:"or drag & drop · JPG, PNG, WEBP",
    scanAI:"🔍 Scan with AI",scanning:"Reading your receipt…",scanningsSub:"Extracting merchant, amount & LHDN category",
    highConf:"✓ High confidence",medConf:"~ Medium confidence",lowConf:"⚠ Low confidence",
    nonClaimable:"Non-claimable",reliefCap:"Relief cap",itemsDetected:"Items Detected",
    lhdnNote:"💡 LHDN Note",saveToExp:"✓ Save to Expenses",discard:"Discard",saving:"Saving…",
    savedToExp:"Saved to Expenses!",scanAnother:"Scan Another",viewExpenses:"View Expenses",
    newDoc:"📎 New Document",aiReading:"AI reading…",aiComplete:"✓ AI complete",
    aiSuggest:"💡 AI Suggestion",aiError:"⚠ AI could not read this document. Please fill in details manually.",
    docName:"Document Name",lhdnCategory:"LHDN Category",
    noteLabel:"Note (Catatan)",notePlaceholder:"e.g. Klinik Ikhlas, Jan 2026",
    recordExpense:"Record as Expense",recordSub:"Add to expense list & LHDN relief",
    yes:"✓ Yes",no:"No",amountRM:"Amount (RM)",itemsFound:"Items Detected",
    savingDoc:"Saving…",saveDoc:"✓ Save",saveDocExp:"✓ Save & Record Expense",batal:"Cancel",
    impCukai:"Tax Implication (Implikasi Cukai)",
    settingsTitle:"⚙️ Profile & Settings",settingsSub:"Personal details affect your tax relief calculation",
    profileSection:"👤 Personal Profile (Profil Peribadi)",maritalStatus:"Marital Status",
    single:"Single",married:"Married",divorced:"Divorced / Widowed",
    spouseRelief:"Spouse Relief (Pelepasan Isteri/Suami)",
    spouseReliefSub:"RM4,000 if spouse has no income · s.45(2) ITA 1967",
    spouseHasIncomeLabel:"Spouse has income",
    childrenSection:"👶 Children (Anak)",
    numChildren:"Children (RM2,000 each)",numDisabledChildren:"Disabled children / OKU (RM6,000 each)",
    childRelief:"Child Relief",disabledChildRelief:"Disabled Child Relief",
    selfSection:"🧑 Self Reliefs",selfDisabled:"Self — Disabled (OKU) +RM6,000",
    selfDisabledSub:"Additional RM6,000 on top of standard RM9,000",
    epfSection:"💰 EPF Contribution (Caruman KWSP)",epfRate:"EPF Contribution Rate",
    epfAnnual:"Annual EPF contribution",epfRelief:"EPF Relief (capped RM4,000)",
    epfNote:"EPF sub-limit: RM4,000. Life insurance / takaful sub-limit: RM3,000. Combined cap: RM7,000.",
    rebateSection:"🏷️ Tax Rebates (Rebat Cukai)",
    summarySection:"📊 Relief Summary",totalPersonal:"Total Personal Reliefs",
    settingsNote:"⚠ Note",settingsNoteText:"All figures based on YA 2026 LHDN guidelines. Consult a licensed tax agent for official assessment.",
    saveSettings:"✓ Save Profile",savedSettings:"✓ Profile Saved!",
    footerText:"MYTAX · AI-POWERED · LHDN COMPLIANT · YA 2026",
    footerDocs:"MYTAX · DOCUMENT VAULT · LHDN YA 2026",
    footerZakat:"MYTAX · ZAKAT PENDAPATAN · S.6A ITA 1967 · YA 2026",
    footerSettings:"MYTAX · PROFIL PERIBADI · LHDN TT 2026",
    footerPlan:"MYTAX · TAX PLANNING MODE · YA 2026",
    exportBtn:"📄 Export Tax Summary (PDF)",
    exportTitle:"Malaysian Income Tax Summary",
    exportSubtitle:"Ringkasan Cukai Pendapatan Malaysia",
    exportTaxpayer:"Taxpayer Information",
    exportName:"Name",
    exportEmail:"Email",
    exportYA:"Assessment Year (Tahun Taksiran)",
    exportDate:"Report Generated",
    exportIncome:"Income & Reliefs (Pendapatan & Pelepasan)",
    exportGross:"Gross Annual Income (Pendapatan Kasar)",
    exportPersonal:"Personal Relief (Pelepasan Individu)",
    exportSpouse:"Spouse Relief (Pelepasan Isteri/Suami)",
    exportChild:"Child Relief (Pelepasan Anak)",
    exportDisChild:"Disabled Child Relief",
    exportSelfOku:"Self OKU Relief",
    exportEpf:"EPF / Life Insurance (Insurans Nyawa & KWSP)",
    exportExpenses:"Expense Reliefs (Pelepasan Perbelanjaan)",
    exportTotalRelief:"Total Reliefs (Jumlah Pelepasan)",
    exportChargeable:"Chargeable Income (Pendapatan Bercukai)",
    exportTaxCalc:"Tax Calculation (Pengiraan Cukai)",
    exportTaxBefore:"Tax Before Rebate",
    exportZakatRebate:"Zakat Rebate (Rebat Zakat) — s.6A(3) ACP 1967",
    exportRebate400:"Personal Rebate (Rebat Individu) — s.6A(2) ACP 1967",
    exportSpouseRebate:"Spouse Rebate (Rebat Pasangan)",
    exportTaxPayable:"Estimated Tax Payable (Cukai Kena Bayar)",
    exportPCB:"Monthly PCB Estimate (Potongan Cukai Bulanan)",
    exportExpenseList:"Expense Records (Rekod Perbelanjaan)",
    exportDisclaimer:"This is an estimate only. Please verify with LHDN e-Filing (MyTax) or a licensed tax agent. Zakat rebate is subject to Subseksyen 6A(3) Akta Cukai Pendapatan 1967 (Act 53).",
    exportFooter:"Generated by MyTax Malaysia · mytax.app · YA 2026",
    // Auth
    authTagline:"Your personal Malaysian tax assistant",
    authGoogle:"Continue with Google",
    authOr:"or",
    authEmail:"Email address",
    authPassword:"Password",
    authName:"Full name",
    authLogin:"Sign In",
    authSignup:"Create Account",
    authToggleLogin:"Already have an account? Sign In",
    authToggleSignup:"New here? Create an account",
    authLoading:"Signing in…",
    authError:"Invalid email or password. Please try again.",
    authErrorSignup:"Please fill in all fields.",
    authWelcome:(name)=>`Welcome, ${name}`,
    authSignOut:"Sign Out",
    authGuestNote:"Demo mode — no data is stored on any server.",
    authForgot:"Forgot password?",
    planTitle:"🎯 Tax Planning Mode",
    planSub:"Simulate additional spending to reduce your tax payable",
    planClose:"✕ Close",
    planCurrent:"Current Tax Payable",
    planSimulated:"Simulated Tax Payable",
    planSaving:"Potential Saving",
    planReset:"Reset All",
    planApply:"✓ Apply to Expenses",
    planApplied:"✓ Applied!",
    planAdditional:"Additional spending",
    planGap:"Gap to cap",
    planPerRM:"Tax saved per RM1 spent",
    planSuggestions:"💡 AI Optimiser Suggestions",
    planLoadingSug:"Analysing your tax position…",
    planOptimise:"🤖 Optimise with AI",
    planNoGap:"All relief caps reached — fully optimised!",
    planEffectiveBracket:"Effective marginal rate",
    planNote:"Simulated amounts shown as planned expenses. Consult a tax agent before filing.",
  },
  ms: {
    appName:"MyTax Malaysia",appSub:"Cukai Pendapatan",ya:"TT",
    nav:["Utama","Perbelanjaan","Pelepasan","Anggaran","Zakat"],
    estTax:"Angg. Cukai",effRate:"Kadar Berkesan",reliefs:"Pelepasan",
    dashSub:"Tahun Taksiran 2026 · Ringkasan Semasa",
    annualIncome:"Pendapatan Tahunan",
    totalReliefs:"Jumlah Pelepasan Cukai",reliefSub:"Individu + perbelanjaan",
    chargeableInc:"Pendapatan Bercukai",
    chargeableSub:"Pendapatan kasar tolak semua pelepasan",
    estTaxPayable:"Angg. Cukai Kena Bayar",estTaxSub:"Kadar cukai progresif TT 2026",
    scanCTA:"Imbas Resit",scanCTASub:"AI baca & kategorikan secara automatik untuk LHDN",
    tipTitle:"💡 Petua",
    tipBody:(rem)=>`RM ${rem.toLocaleString()} pelepasan Gaya Hidup berbaki — buku, gimnasium, internet layak dituntut.`,
    myExpenses:"Perbelanjaan Saya",
    records:(n,total)=>`${n} rekod · Jumlah ${total}`,
    scanBtn:"📸 Imbas",addBtn:"+ Tambah Baharu",newExpense:"➕ Perbelanjaan Baharu",
    aiAnalysing:"AI sedang menganalisis…",aiDone:"✓ AI selesai",
    attachDoc:"📎 Lampir Dokumen",scanReceipt:"📸 Imbas Resit",
    descPlaceholder:"Butiran perbelanjaan",amountLabel:"Amaun (RM)",dateLabel:"Tarikh",
    vaultNotice:"📎 Dokumen akan disimpan ke Peti Besi secara automatik",
    saveVault:"✓ Simpan & Peti Besi",saveOnly:"✓ Simpan",waitAI:"Tunggu AI…",cancel:"Batal",
    reliefTabSub:"Kategori Pelepasan Cukai LHDN · TT 2026",
    remaining:(n)=>`RM ${n.toLocaleString()} berbaki`,capReached:"⚠ Had pelepasan dicapai",
    estimateSub:"Pecahan Anggaran Cukai",
    grossIncome:"Pendapatan Kasar Tahunan",
    personalRelief:"Pelepasan Individu",
    expRelief:"Pelepasan Perbelanjaan (had)",
    chargeableRow:"Pendapatan Bercukai",
    taxBeforeRebate:"Cukai Sebelum Rebat",taxBeforeSub:"Kadar progresif atas pendapatan bercukai",
    zakatRebateRow:"🌙 Rebat Zakat",
    zakatRebateSub:"Potongan terus daripada cukai · Subseksyen 6A(3) ACP 1967",
    rebate400:"Rebat Individu RM400",
    rebate400Sub:"Pendapatan bercukai ≤ RM35,000 · Subseksyen 6A(2) ACP 1967",
    spouseRebate400:"Rebat Pasangan RM400",
    spouseRebate400Sub:"Potongan pasangan dituntut & pendapatan bercukai ≤ RM35,000",
    taxPayableRow:"Angg. Cukai Kena Bayar",taxPayableSub:"Selepas semua rebat · Sebelum PCB",
    zakatNudge:"Zakat Pendapatan adalah Rebat Cukai — bukan sekadar Pelepasan. Kira di tab Zakat.",
    pcbTitle:"Anggaran PCB Bulanan (Potongan Cukai Bulanan)",
    pcbSub:(r)=>`/bulan · Kadar Cukai Berkesan ${r}%`,
    disclaimer:"⚠ Penafian",
    disclaimerText:"Anggaran sahaja. Rujuk ejen cukai berlesen atau e-Filing LHDN (MyTax) untuk taksiran rasmi.",
    zakatTitle:"🌙 Zakat Pendapatan",zakatSub:"Rebat cukai langsung · Subseksyen 6A(3) ACP 1967 · Kadar 2.5%",
    zakatClose:"✕ Tutup",
    zakatExplain:"Zakat Pendapatan yang dibayar kepada Majlis Agama Islam Negeri yang diiktiraf mengurangkan cukai kena bayar ringgit-untuk-ringgit — ini adalah Rebat Cukai, bukan Pelepasan Cukai.",
    incomeInfo:"💼 Maklumat Pendapatan",grossIncLabel:"Pendapatan Kasar Tahunan (RM)",
    deducLabel:"Potongan Peribadi (RM)",deducHelp:"cth. Isteri RM1,000 + RM200 setiap anak",
    netIncome:"Pendapatan bersih",nisabLabel:"Nisab (perak, 595g)",
    nisabStatus:(ok)=>ok?"✓ Cukup nisab":"✗ Belum cukup nisab",
    zakatResult:"Anggaran Zakat Pendapatan Wajib",
    zakatMonthly:(v)=>`≈ ${v} / bulan`,
    zakatImpact:"🏦 Implikasi Cukai",
    zakatImpactText:"Setelah disimpan, amaun ini ditolak terus daripada anggaran cukai anda sebagai Rebat di bawah Seksyen 6A.",
    belowNisab:"Pendapatan bersih di bawah nisab — Zakat Pendapatan tidak wajib.",
    saveRebate:"💾 Simpan & Pakai Rebat Cukai",savedRebate:"✓ Disimpan — Rebat Dikira Semula!",
    zakatNote:"⚠ Penting",
    zakatNoteText:"Pastikan pembayaran dibuat kepada Majlis Agama Islam atau Pejabat Zakat yang diiktiraf di negeri anda.",
    zakatDeclaredLabel:"Amaun Yang Akan Dibayar (RM)",zakatUseCalc:"Guna amaun dikira",
    docsTitle:"🗂️ Dokumen & Resit",
    docsSub:(n)=>`${n} dokumen · Simpan resit, Borang EA, slip zakat`,
    searchPlaceholder:"Cari dokumen…",
    noDocsYet:"Tiada dokumen lagi",noDocsSub:"Muat naik resit, Borang EA atau slip zakat",
    noDocsFilter:"Tiada dokumen dalam kategori ini",noDocsFilterSub:"Cuba tukar penapis",
    uploadDoc:"📎 Muat Naik Dokumen",scanDoc:"🔍 Imbas Resit",
    scanPanelTitle:"🔍 Imbas Resit dengan AI",scanPanelSub:"AI baca resit & cadangkan kategori LHDN",
    scanClose:"✕ Tutup",dropZoneMain:"Ketik untuk muat naik resit",dropZoneSub:"atau seret & lepas · JPG, PNG, WEBP",
    scanAI:"🔍 Imbas dengan AI",scanning:"Membaca resit anda…",scanningsSub:"Mengekstrak pedagang, amaun & kategori LHDN",
    highConf:"✓ Tahap keyakinan tinggi",medConf:"~ Tahap keyakinan sederhana",lowConf:"⚠ Tahap keyakinan rendah",
    nonClaimable:"Tidak boleh dituntut",reliefCap:"Had pelepasan",itemsDetected:"Item Dikesan",
    lhdnNote:"💡 Nota LHDN",saveToExp:"✓ Simpan ke Perbelanjaan",discard:"Buang",saving:"Menyimpan…",
    savedToExp:"Disimpan ke Perbelanjaan!",scanAnother:"Imbas Lagi",viewExpenses:"Lihat Perbelanjaan",
    newDoc:"📎 Dokumen Baharu",aiReading:"AI sedang membaca…",aiComplete:"✓ AI selesai",
    aiSuggest:"💡 Cadangan AI",aiError:"⚠ AI tidak dapat membaca dokumen ini. Sila isi butiran secara manual.",
    docName:"Nama Dokumen",lhdnCategory:"Kategori LHDN",
    noteLabel:"Catatan",notePlaceholder:"cth: Klinik Ikhlas, Jan 2026",
    recordExpense:"Rekod sebagai Perbelanjaan",recordSub:"Tambah ke senarai perbelanjaan & pelepasan cukai",
    yes:"✓ Ya",no:"Tidak",amountRM:"Amaun (RM)",itemsFound:"Item Dikesan",
    savingDoc:"Menyimpan…",saveDoc:"✓ Simpan",saveDocExp:"✓ Simpan & Rekod Perbelanjaan",batal:"Batal",
    impCukai:"Implikasi Cukai",
    settingsTitle:"⚙️ Profil & Tetapan",settingsSub:"Maklumat peribadi mempengaruhi pengiraan pelepasan cukai anda",
    profileSection:"👤 Profil Peribadi",maritalStatus:"Status Perkahwinan",
    single:"Bujang",married:"Berkahwin",divorced:"Bercerai / Janda / Duda",
    spouseRelief:"Pelepasan Isteri/Suami",
    spouseReliefSub:"RM4,000 jika pasangan tiada pendapatan · s.45(2) ACP 1967",
    spouseHasIncomeLabel:"Pasangan mempunyai pendapatan",
    childrenSection:"👶 Anak-Anak",
    numChildren:"Anak (RM2,000 setiap orang)",numDisabledChildren:"Anak OKU (RM6,000 setiap orang)",
    childRelief:"Pelepasan Anak",disabledChildRelief:"Pelepasan Anak OKU",
    selfSection:"🧑 Pelepasan Diri",selfDisabled:"Diri Sendiri — OKU +RM6,000",
    selfDisabledSub:"Tambahan RM6,000 atas pelepasan individu standard RM9,000",
    epfSection:"💰 Caruman KWSP",epfRate:"Kadar Caruman KWSP",
    epfAnnual:"Caruman KWSP tahunan",epfRelief:"Pelepasan KWSP (had RM4,000)",
    epfNote:"Had kecil KWSP: RM4,000. Had kecil insurans nyawa / takaful: RM3,000. Had gabungan: RM7,000.",
    rebateSection:"🏷️ Rebat Cukai",
    summarySection:"📊 Ringkasan Pelepasan",totalPersonal:"Jumlah Pelepasan Peribadi",
    settingsNote:"⚠ Nota",settingsNoteText:"Semua angka berdasarkan garis panduan LHDN TT 2026. Rujuk ejen cukai berlesen untuk taksiran rasmi.",
    saveSettings:"✓ Simpan Profil",savedSettings:"✓ Profil Disimpan!",
    footerText:"MYTAX · DIKUASAKAN AI · PEMATUHAN LHDN · TT 2026",
    footerDocs:"MYTAX · PETI BESI DOKUMEN · LHDN TT 2026",
    footerZakat:"MYTAX · ZAKAT PENDAPATAN · SEKSYEN 6A ACP 1967 · TT 2026",
    footerSettings:"MYTAX · PROFIL PERIBADI · LHDN TT 2026",
    footerPlan:"MYTAX · MOD PERANCANGAN CUKAI · TT 2026",
    exportBtn:"📄 Eksport Ringkasan Cukai (PDF)",
    exportTitle:"Ringkasan Cukai Pendapatan Malaysia",
    exportSubtitle:"Malaysian Income Tax Summary",
    exportTaxpayer:"Maklumat Pembayar Cukai",
    exportName:"Nama",
    exportEmail:"E-mel",
    exportYA:"Tahun Taksiran (Assessment Year)",
    exportDate:"Tarikh Laporan Dijana",
    exportIncome:"Pendapatan & Pelepasan",
    exportGross:"Pendapatan Kasar Tahunan",
    exportPersonal:"Pelepasan Individu",
    exportSpouse:"Pelepasan Isteri/Suami",
    exportChild:"Pelepasan Anak",
    exportDisChild:"Pelepasan Anak OKU",
    exportSelfOku:"Pelepasan Diri OKU",
    exportEpf:"Insurans Nyawa & KWSP",
    exportExpenses:"Pelepasan Perbelanjaan",
    exportTotalRelief:"Jumlah Pelepasan",
    exportChargeable:"Pendapatan Bercukai",
    exportTaxCalc:"Pengiraan Cukai",
    exportTaxBefore:"Cukai Sebelum Rebat",
    exportZakatRebate:"Rebat Zakat — Subseksyen 6A(3) ACP 1967",
    exportRebate400:"Rebat Individu — Subseksyen 6A(2) ACP 1967",
    exportSpouseRebate:"Rebat Pasangan",
    exportTaxPayable:"Anggaran Cukai Kena Bayar",
    exportPCB:"Anggaran PCB Bulanan",
    exportExpenseList:"Rekod Perbelanjaan",
    exportDisclaimer:"Ini adalah anggaran sahaja. Sila sahkan dengan e-Filing LHDN (MyTax) atau ejen cukai berlesen. Rebat Zakat tertakluk kepada Subseksyen 6A(3) Akta Cukai Pendapatan 1967 (Akta 53).",
    exportFooter:"Dijana oleh MyTax Malaysia · mytax.app · TT 2026",
    // Auth
    authTagline:"Pembantu cukai peribadi Malaysia anda",
    authGoogle:"Teruskan dengan Google",
    authOr:"atau",
    authEmail:"Alamat e-mel",
    authPassword:"Kata laluan",
    authName:"Nama penuh",
    authLogin:"Log Masuk",
    authSignup:"Daftar Akaun",
    authToggleLogin:"Sudah ada akaun? Log Masuk",
    authToggleSignup:"Baharu di sini? Daftar akaun",
    authLoading:"Sedang log masuk…",
    authError:"E-mel atau kata laluan tidak sah. Sila cuba lagi.",
    authErrorSignup:"Sila isi semua maklumat.",
    authWelcome:(name)=>`Selamat datang, ${name}`,
    authSignOut:"Log Keluar",
    authGuestNote:"Mod demo — tiada data disimpan di mana-mana pelayan.",
    authForgot:"Lupa kata laluan?",
    planTitle:"🎯 Mod Perancangan Cukai",
    planSub:"Simulasi perbelanjaan tambahan untuk mengurangkan cukai kena bayar",
    planClose:"✕ Tutup",
    planCurrent:"Cukai Kena Bayar Semasa",
    planSimulated:"Cukai Kena Bayar Simulasi",
    planSaving:"Penjimatan Berpotensi",
    planReset:"Tetapkan Semula",
    planApply:"✓ Pakai ke Perbelanjaan",
    planApplied:"✓ Dipakai!",
    planAdditional:"Perbelanjaan tambahan",
    planGap:"Jurang ke had",
    planPerRM:"Cukai jimat setiap RM1 dibelanja",
    planSuggestions:"💡 Cadangan Pengoptimum AI",
    planLoadingSug:"Menganalisis kedudukan cukai anda…",
    planOptimise:"🤖 Optimumkan dengan AI",
    planNoGap:"Semua had pelepasan dicapai — telah dioptimumkan!",
    planEffectiveBracket:"Kadar marginal berkesan",
    planNote:"Amaun simulasi ditunjukkan sebagai perbelanjaan dirancang. Rujuk ejen cukai sebelum memfail.",
  }
};

const TAX_RELIEF_CATEGORIES = [
  {id:"medical",   en:"Medical & Health",                ms:"Perubatan & Kesihatan",          icon:"🏥",limit:10000,color:"#52B788"},
  {id:"education", en:"Education Fees (Self)",           ms:"Yuran Pendidikan (Diri Sendiri)",icon:"📚",limit:7000, color:"#40916C"},
  {id:"lifestyle", en:"Lifestyle",                       ms:"Gaya Hidup",                     icon:"🛍️",limit:2500, color:"#74C69D"},
  {id:"equipment", en:"Computing Devices",               ms:"Komputer / Tablet / Telefon",    icon:"💻",limit:2500, color:"#95D5B2"},
  {id:"ev",        en:"EV Charging Equipment",           ms:"Peralatan Pengecasan EV",        icon:"⚡",limit:2500, color:"#00BCD4"},
  {id:"tourism",   en:"Tourism — Visit Malaysia 2026",   ms:"Pelancongan — Melawat Malaysia", icon:"🏖️",limit:1000, color:"#FF7043"},
  {id:"epf",       en:"EPF / Life Insurance",            ms:"KWSP / Insurans Nyawa",          icon:"🛡️",limit:7000, color:"#2D6A4F"},
  {id:"socso",     en:"SOCSO / EIS Contribution",        ms:"Caruman PERKESO / SIP",          icon:"🏛️",limit:350,  color:"#607D8B"},
  {id:"childcare", en:"Childcare & Kindergarten (≤12)",  ms:"Taska & Tadika (≤12 tahun)",     icon:"👶",limit:3000, color:"#1B4332"},
  {id:"donations", en:"Donations (Approved Bodies)",     ms:"Derma (Institusi Diluluskan)",   icon:"🤲",limit:7000, color:"#B7E4C7"},
  {id:"zakat",     en:"Zakat",                           ms:"Zakat",                          icon:"🌙",limit:null, color:"#D4AF37"},
  {id:"sspn",      en:"SSPN Savings",                    ms:"Simpanan SSPN",                  icon:"🎓",limit:8000, color:"#4A90D9"},
  {id:"prs",       en:"Private Retirement Scheme (PRS)", ms:"Skim Persaraan Swasta (PRS)",    icon:"🏦",limit:3000, color:"#7B5EA7"},
  {id:"other",     en:"Other (Non-claimable)",           ms:"Lain-lain (Tidak Dituntut)",     icon:"📋",limit:null, color:"#555"},
];

const INCOME_BANDS = [
  {max:5000,rate:0},{max:20000,rate:0.01},{max:35000,rate:0.03},{max:50000,rate:0.08},
  {max:70000,rate:0.13},{max:100000,rate:0.21},{max:250000,rate:0.24},
  {max:400000,rate:0.245},{max:600000,rate:0.25},{max:Infinity,rate:0.26},
];

const SAMPLE_EXPENSES = [
  {id:1,desc:"Spectacles / Cermin Mata",amount:450, category:"medical",  date:"2026-01-15",thumb:null},
  {id:2,desc:"Udemy Course – Data Sci", amount:299, category:"education",date:"2026-02-03",thumb:null},
  {id:3,desc:"Books – Islamic Finance", amount:120, category:"lifestyle", date:"2026-02-18",thumb:null},
  {id:4,desc:"Laptop for Work",         amount:3200,category:"equipment", date:"2026-03-05",thumb:null},
  {id:5,desc:"Medical Check-up",        amount:780, category:"medical",  date:"2026-03-22",thumb:null},
  {id:6,desc:"Zakat Pendapatan",        amount:1200,category:"zakat",   date:"2026-04-01",thumb:null,zakatSubtype:"pendapatan"},
];

const DOC_CATS = [
  {id:"all",      en:"All",              ms:"Semua",                     icon:"🗂️",color:"#74C69D"},
  {id:"medical",  en:"Medical",          ms:"Perubatan",                 icon:"🏥",color:"#52B788"},
  {id:"education",en:"Education",        ms:"Pendidikan",                icon:"📚",color:"#40916C"},
  {id:"lifestyle",en:"Lifestyle",        ms:"Gaya Hidup",                icon:"🛍️",color:"#74C69D"},
  {id:"equipment",en:"Computing",        ms:"Komputer / Telefon",        icon:"💻",color:"#95D5B2"},
  {id:"ev",       en:"EV Charging",      ms:"Pengecasan EV",             icon:"⚡",color:"#00BCD4"},
  {id:"tourism",  en:"Tourism",          ms:"Pelancongan",               icon:"🏖️",color:"#FF7043"},
  {id:"epf",      en:"EPF / Insurance",  ms:"KWSP / Insurans",           icon:"🛡️",color:"#2D6A4F"},
  {id:"socso",    en:"SOCSO / EIS",      ms:"PERKESO / SIP",             icon:"🏛️",color:"#607D8B"},
  {id:"childcare",en:"Childcare",        ms:"Taska & Tadika",            icon:"👶",color:"#1B4332"},
  {id:"donations",en:"Donations",        ms:"Derma",                     icon:"🤲",color:"#B7E4C7"},
  {id:"zakat",    en:"Zakat",            ms:"Zakat",                     icon:"🌙",color:"#D4AF37"},
  {id:"sspn",     en:"SSPN",             ms:"SSPN",                      icon:"🎓",color:"#4A90D9"},
  {id:"prs",      en:"PRS",              ms:"PRS",                       icon:"🏦",color:"#7B5EA7"},
  {id:"income",   en:"Income / EA Form", ms:"Pendapatan / Borang EA",    icon:"💼",color:"#D4AF37"},
  {id:"other",    en:"Others",           ms:"Lain-lain",                 icon:"📋",color:"#555"},
];

const FILE_TYPES = {
  "application/pdf":{ext:"PDF",color:"#FF6B6B",icon:"📕"},
  "image/jpeg":{ext:"JPG",color:"#74C69D",icon:"🖼️"},
  "image/png":{ext:"PNG",color:"#74C69D",icon:"🖼️"},
  "image/webp":{ext:"WEBP",color:"#74C69D",icon:"🖼️"},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":{ext:"DOCX",color:"#4A90D9",icon:"📘"},
  "default":{ext:"FILE",color:"#888",icon:"📎"},
};

const NISAB_SILVER_RM = 595 * 4.50;
const ZAKAT_RATE = 0.025;
const NAV_ICONS = ["⊞","📄","📊","🧮","🌙"];
const SCAN = {IDLE:"idle",SCANNING:"scanning",REVIEW:"review",SAVING:"saving",SAVED:"saved"};

function calcZakatPendapatan(inc,ded){const net=inc-ded;return net>=NISAB_SILVER_RM?net*ZAKAT_RATE:0;}
function calcTax(c){let t=0,p=0;for(const b of INCOME_BANDS){if(c<=p)break;t+=(Math.min(c,b.max)-p)*b.rate;p=b.max;if(b.max>=c)break;}return Math.max(0,t);}
function fmt(v){return"RM "+parseFloat(v||0).toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2});}
function catFor(id){return TAX_RELIEF_CATEGORIES.find(c=>c.id===id)||TAX_RELIEF_CATEGORIES[TAX_RELIEF_CATEGORIES.length-1];}
function fileInfo(t){return FILE_TYPES[t]||FILE_TYPES["default"];}
function fmtSize(b){if(b<1024)return b+" B";if(b<1048576)return(b/1024).toFixed(1)+" KB";return(b/1048576).toFixed(1)+" MB";}

function ScanLine(){return(<div style={{position:"absolute",inset:0,overflow:"hidden",borderRadius:16,pointerEvents:"none"}}><div style={{position:"absolute",left:12,right:12,height:2,background:"linear-gradient(90deg,transparent,#74C69D,#B7E4C7,#74C69D,transparent)",boxShadow:"0 0 12px #74C69D",animation:"scanMove 1.8s ease-in-out infinite",borderRadius:2}}/></div>);}
function CornerMarkers(){const m=(p)=>{const s={position:"absolute",width:24,height:24,borderColor:"#74C69D",borderStyle:"solid",borderWidth:0,...p};if(p.top!==undefined&&p.left!==undefined){s.borderTopWidth=3;s.borderLeftWidth=3;s.borderTopLeftRadius=4;}if(p.top!==undefined&&p.right!==undefined){s.borderTopWidth=3;s.borderRightWidth=3;s.borderTopRightRadius=4;}if(p.bottom!==undefined&&p.left!==undefined){s.borderBottomWidth=3;s.borderLeftWidth=3;s.borderBottomLeftRadius=4;}if(p.bottom!==undefined&&p.right!==undefined){s.borderBottomWidth=3;s.borderRightWidth=3;s.borderBottomRightRadius=4;}return<div style={s}/>;};return(<div style={{position:"absolute",inset:8}}>{m({top:0,left:0})}{m({top:0,right:0})}{m({bottom:0,left:0})}{m({bottom:0,right:0})}</div>);}
function ZInput({label,value,onChange,help}){return(<div style={{marginBottom:12}}><div style={{color:"#64748B",fontSize:11,marginBottom:4}}>{label}</div>{help&&<div style={{color:"#D4AF37",fontSize:10,marginBottom:4}}>{help}</div>}<input type="number" value={value} onChange={e=>onChange(parseFloat(e.target.value)||0)} style={{width:"100%",background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:10,padding:"10px 12px",color:"#1E293B",fontSize:14,boxSizing:"border-box",fontFamily:"Arial,sans-serif"}}/></div>);}

export default function MyTaxApp(){
  const[lang,setLang]=useState("en");
  const s=T[lang];
  const[authMode,setAuthMode]=useState("login"); // login | signup
  const[authUser,setAuthUser]=useState(null);    // null = not logged in
  const[authForm,setAuthForm]=useState({name:"",email:"",password:""});
  const[authLoading,setAuthLoading]=useState(false);
  const[authError,setAuthError]=useState("");
  const[authGoogleLoading,setAuthGoogleLoading]=useState(false);

  function handleAuthSubmit(){
    setAuthError("");
    if(authMode==="signup"&&(!authForm.name||!authForm.email||!authForm.password)){setAuthError(s.authErrorSignup);return;}
    if(authMode==="login"&&(!authForm.email||!authForm.password)){setAuthError(s.authErrorSignup);return;}
    setAuthLoading(true);
    setTimeout(()=>{
      setAuthUser({name:authForm.name||(authForm.email.split("@")[0]),email:authForm.email,avatar:null});
      setAuthLoading(false);
    },1200);
  }

  function handleGoogleAuth(){
    setAuthGoogleLoading(true);
    setTimeout(()=>{
      setAuthUser({name:"Google User",email:"user@gmail.com",avatar:"G",provider:"google"});
      setAuthGoogleLoading(false);
    },1500);
  }

  function handleSignOut(){
    setAuthUser(null);
    setAuthForm({name:"",email:"",password:""});
    setAuthError("");
  }

  const[tab,setTab]=useState(0);
  const[expenses,setExpenses]=useState(SAMPLE_EXPENSES);
  const[annualIncome,setIncome]=useState(84000);
  const[showAdd,setShowAdd]=useState(false);
  const[newExp,setNewExp]=useState({desc:"",amount:"",date:new Date().toISOString().slice(0,10),category:"medical"});
  const[expAttach,setExpAttach]=useState(null);
  const[expAiState,setExpAiState]=useState("idle");
  const[expAiNote,setExpAiNote]=useState("");
  const expFileRef=useRef(null);const expCamRef=useRef(null);
  const[scanState,setScan]=useState(SCAN.IDLE);
  const[previewUrl,setPreview]=useState(null);
  const[imgB64,setImgB64]=useState(null);
  const[extracted,setExtracted]=useState(null);
  const[edited,setEdited]=useState(null);
  const[scanError,setScanError]=useState(null);
  const[dragOver,setDragOver]=useState(false);
  const fileRef=useRef(null);
  const[zakatSaved,setZakatSaved]=useState(false);
  const[zakatIncome,setZakatIncome]=useState(84000);
  const[zakatDeduc,setZakatDeduc]=useState(9000);
  const[zakatDeclared,setZakatDeclared]=useState(0);
  const zakatAmt=calcZakatPendapatan(zakatIncome,zakatDeduc);
  const[docs,setDocs]=useState([]);
  const[docFilter,setDocFilter]=useState("all");
  const[docSearch,setDocSearch]=useState("");
  const[docUploading,setDocUploading]=useState(false);
  const[docExtracting,setDocExtracting]=useState(false);
  const[docPreview,setDocPreview]=useState(null);
  const[docMode,setDocMode]=useState("browse");
  const[showDocAdd,setShowDocAdd]=useState(false);
  const[pendingDoc,setPendingDoc]=useState(null);
  const docFileRef=useRef(null);
  const[profile,setProfile]=useState({marital:"single",spouseHasIncome:false,numChildren:0,numDisabledChildren:0,selfDisabled:false,epfRate:11});
  const[settingsSaved,setSettingsSaved]=useState(false);
  const[showPlan,setShowPlan]=useState(false);
  const[showDocs,setShowDocs]=useState(false);
  const[showSettings,setShowSettings]=useState(false);
  const[showKebabMenu,setShowKebabMenu]=useState(false);
  const[planAmounts,setPlanAmounts]=useState({medical:0,education:0,lifestyle:0,equipment:0,ev:0,tourism:0,epf:0,childcare:0,donations:0,sspn:0,prs:0});
  const[planApplied,setPlanApplied]=useState(false);
  const[planSuggestions,setPlanSuggestions]=useState(null);
  const[planLoading,setPlanLoading]=useState(false);
  function resetPlan(){setPlanAmounts({medical:0,education:0,lifestyle:0,equipment:0,ev:0,tourism:0,epf:0,childcare:0,donations:0,sspn:0,prs:0});setPlanSuggestions(null);setPlanApplied(false);}
  function applyPlan(){
    const today=new Date().toISOString().slice(0,10);
    const newExp=Object.entries(planAmounts).filter(([,v])=>v>0).map(([cat,amt])=>({
      id:Date.now()+Math.random(),desc:`${lang==="ms"?"Dirancang":"Planned"}: ${TAX_RELIEF_CATEGORIES.find(c=>c.id===cat)?.[lang]||cat}`,
      amount:amt,category:cat,date:today,thumb:null,planned:true,
    }));
    if(newExp.length>0){setExpenses(prev=>[...prev,...newExp]);setPlanApplied(true);setTimeout(()=>{setShowPlan(false);resetPlan();},1500);}
  }
  async function fetchPlanSuggestions(){
    setPlanLoading(true);setPlanSuggestions(null);
    const gaps=TAX_RELIEF_CATEGORIES.filter(c=>c.limit&&c.id!=="other").map(c=>{
      const spent=mergedEpf&&c.id==="epf"?mergedEpf:reliefTotals[c.id]||0;
      const gap=Math.max(0,c.limit-spent);
      return{id:c.id,label:c[lang],gap,spent,limit:c.limit};
    }).filter(g=>g.gap>0);
    const marginalRate=(calcTax(chargeable)-calcTax(Math.max(0,chargeable-1000)))/1000;
    const prompt=`Malaysian taxpayer YA 2026. Annual income: RM${annualIncome}. Chargeable income: RM${chargeable}. Tax payable: RM${taxAfterRebate.toFixed(2)}. Marginal rate: ${(marginalRate*100).toFixed(1)}%.
Relief gaps (room remaining before cap): ${JSON.stringify(gaps)}.
Suggest top 3 relief categories to spend on for maximum tax reduction. For each, give: category id, specific actionable suggestion (1 sentence, Malaysian context), and estimated tax saving if gap fully filled.
Return ONLY JSON array: [{"id":"category_id","suggestion":"...","saving":0}]`;
    try{
      const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,
          messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const parsed=JSON.parse(data.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());
      setPlanSuggestions(parsed);
    }catch{setPlanSuggestions([]);}
    finally{setPlanLoading(false);}
  }
  function updateProfile(key,val){setProfile(prev=>({...prev,[key]:val}));}
  function saveProfile(){setSettingsSaved(true);setTimeout(()=>setSettingsSaved(false),2500);}
  function exportPDF(){
    const today = new Date().toLocaleDateString(lang==="ms"?"ms-MY":"en-MY",{year:"numeric",month:"long",day:"numeric"});
    const userName = authUser?.name || (lang==="ms"?"Pembayar Cukai":"Taxpayer");
    const userEmail = authUser?.email || "";
    const rows = (items) => items.filter(i=>i.v>0).map(i=>`
      <tr><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;color:#333">${i.l}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;text-align:right;font-weight:600;color:#1a5c2e">${fmt(i.v)}</td></tr>`).join("");
    const expRows = expenses.map(e=>{
      const cat=catFor(e.category);
      return `<tr><td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:12px">${e.date}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:12px">${e.desc}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:12px">${cat[lang]}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:12px;text-align:right;font-weight:600">${fmt(e.amount)}</td></tr>`;
    }).join("");

    const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8">
<title>${s.exportTitle} — ${userName}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:Georgia,"Times New Roman",serif;color:#222;background:#fff;padding:32px;max-width:800px;margin:0 auto;font-size:13px;}
  .header{background:linear-gradient(135deg,#CC0001,#003087);color:white;padding:24px 28px;border-radius:8px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;}
  .header h1{font-size:20px;letter-spacing:-0.3px;}
  .header .sub{font-size:11px;opacity:0.75;margin-top:4px;}
  .header .badge{background:rgba(255,255,255,0.18);border-radius:20px;padding:4px 14px;font-size:12px;}
  .flag{font-size:28px;margin-bottom:6px;}
  .section{margin-bottom:20px;}
  .section-title{background:#1a5c2e;color:white;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:bold;letter-spacing:0.5px;margin-bottom:0;text-transform:uppercase;}
  table{width:100%;border-collapse:collapse;}
  .info-table td{padding:7px 10px;border-bottom:1px solid #f0f0f0;font-size:13px;}
  .info-table td:first-child{color:#555;width:45%;}
  .info-table td:last-child{font-weight:600;}
  .total-row td{background:#f0f7f2;font-weight:bold;font-size:14px;padding:9px 8px;}
  .total-row td:last-child{color:#1a5c2e;font-size:15px;}
  .tax-payable td{background:#1a5c2e;color:white;font-weight:bold;font-size:15px;padding:11px 8px;border-radius:4px;}
  .rebate-row td{color:#1a5c2e;}
  .disclaimer{background:#fff8e1;border:1px solid #ffe082;border-radius:6px;padding:12px;font-size:11px;color:#555;line-height:1.6;margin-top:20px;}
  .footer{text-align:center;color:#aaa;font-size:10px;margin-top:24px;padding-top:12px;border-top:1px solid #eee;letter-spacing:1px;}
  .pcb-box{background:#e8f5e9;border:1px solid #a5d6a7;border-radius:6px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;margin-top:8px;}
  .pcb-box .label{font-size:12px;color:#555;}
  .pcb-box .value{font-size:18px;font-weight:bold;color:#1a5c2e;}
  @media print{body{padding:16px;} .no-print{display:none;}}
</style></head><body>
<div class="header">
  <div><div class="flag">🇲🇾</div><h1>${s.exportTitle}</h1><div class="sub">${s.exportSubtitle}</div></div>
  <div class="badge">${s.ya} 2026</div>
</div>

<div class="section">
<div class="section-title">${s.exportTaxpayer}</div>
<table class="info-table"><tbody>
  <tr><td>${s.exportName}</td><td>${userName}</td></tr>
  ${userEmail?`<tr><td>${s.exportEmail}</td><td>${userEmail}</td></tr>`:""}
  <tr><td>${s.exportYA}</td><td>2026</td></tr>
  <tr><td>${s.exportDate}</td><td>${today}</td></tr>
</tbody></table></div>

<div class="section">
<div class="section-title">${s.exportIncome}</div>
<table><tbody>
  <tr><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;color:#333">${s.exportGross}</td><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;text-align:right;font-weight:600">${fmt(annualIncome)}</td></tr>
  ${rows([
    {l:s.exportPersonal,v:9000},
    {l:s.exportSelfOku,v:selfDisRelief},
    {l:s.exportSpouse,v:spouseReliefAmt},
    {l:s.exportChild,v:childReliefAmt+disChildRelief},
    {l:s.exportEpf,v:mergedEpf},
    {l:s.exportExpenses,v:cappedReliefs-mergedEpf},
  ])}
  <tr class="total-row"><td>${s.exportTotalRelief}</td><td style="text-align:right">${fmt(totalRelief)}</td></tr>
  <tr class="total-row"><td>${s.exportChargeable}</td><td style="text-align:right">${fmt(chargeable)}</td></tr>
</tbody></table></div>

<div class="section">
<div class="section-title">${s.exportTaxCalc}</div>
<table><tbody>
  <tr><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;color:#333">${s.exportTaxBefore}</td><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;text-align:right;font-weight:600;color:#c62828">${fmt(estTax)}</td></tr>
  ${zakatRebate>0?`<tr class="rebate-row"><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9">${s.exportZakatRebate}</td><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;text-align:right;font-weight:600">- ${fmt(zakatRebate)}</td></tr>`:""}
  ${rebate400>0?`<tr class="rebate-row"><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9">${s.exportRebate400}</td><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;text-align:right;font-weight:600">- ${fmt(rebate400)}</td></tr>`:""}
  ${spouseRebate400>0?`<tr class="rebate-row"><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9">${s.exportSpouseRebate}</td><td style="padding:6px 8px;border-bottom:1px solid #e8f5e9;text-align:right;font-weight:600">- ${fmt(spouseRebate400)}</td></tr>`:""}
  <tr class="tax-payable"><td>${s.exportTaxPayable}</td><td style="text-align:right">${fmt(taxAfterRebate)}</td></tr>
</tbody></table>
<div class="pcb-box"><span class="label">${s.exportPCB}</span><span class="value">${fmt(taxAfterRebate/12)}</span></div>
</div>

${expenses.length>0?`
<div class="section">
<div class="section-title">${s.exportExpenseList}</div>
<table><thead><tr>
  <th style="padding:6px 8px;text-align:left;border-bottom:2px solid #1a5c2e;font-size:11px;color:#555">${lang==="ms"?"Tarikh":"Date"}</th>
  <th style="padding:6px 8px;text-align:left;border-bottom:2px solid #1a5c2e;font-size:11px;color:#555">${lang==="ms"?"Butiran":"Description"}</th>
  <th style="padding:6px 8px;text-align:left;border-bottom:2px solid #1a5c2e;font-size:11px;color:#555">${lang==="ms"?"Kategori":"Category"}</th>
  <th style="padding:6px 8px;text-align:right;border-bottom:2px solid #1a5c2e;font-size:11px;color:#555">${lang==="ms"?"Amaun":"Amount"}</th>
</tr></thead><tbody>${expRows}</tbody>
<tfoot><tr><td colspan="3" style="padding:8px;font-weight:bold;border-top:2px solid #1a5c2e">${lang==="ms"?"JUMLAH":"TOTAL"}</td>
<td style="padding:8px;text-align:right;font-weight:bold;border-top:2px solid #1a5c2e;color:#1a5c2e">${fmt(expenses.reduce((t,e)=>t+e.amount,0))}</td></tr></tfoot>
</table></div>`:""}

<div class="disclaimer">⚠ ${s.exportDisclaimer}</div>
<div class="footer">${s.exportFooter}</div>
</body></html>`;

    const win = window.open("","_blank");
    if(win){
      win.document.write(html);
      win.document.close();
      setTimeout(()=>win.print(),500);
    }
  }

  const spouseReliefAmt=(profile.marital==="married"&&!profile.spouseHasIncome)?4000:0;
  const childReliefAmt=profile.numChildren*2000;
  const disChildRelief=profile.numDisabledChildren*6000;
  const selfDisRelief=profile.selfDisabled?6000:0;
  const epfContrib=Math.round(annualIncome*(profile.epfRate/100));
  const epfReliefAmt=Math.min(epfContrib,4000);
  const personalReliefTotal=9000+selfDisRelief+spouseReliefAmt+childReliefAmt+disChildRelief;

  const reliefTotals={};
  TAX_RELIEF_CATEGORIES.forEach(c=>{reliefTotals[c.id]=0;});
  expenses.forEach(e=>{if(reliefTotals[e.category]!==undefined)reliefTotals[e.category]+=e.amount;});
  const mergedEpf=Math.min(Math.max(reliefTotals["epf"]||0,epfContrib),7000);
  const cappedReliefs=TAX_RELIEF_CATEGORIES.reduce((sum,c)=>{
    if(c.id==="epf")return sum+mergedEpf;
    if(c.id==="zakat")return sum; // Zakat is a Rebat (tax rebate), not a Pelepasan (relief)
    return sum+(c.limit?Math.min(reliefTotals[c.id]||0,c.limit):reliefTotals[c.id]||0);
  },0);
  const totalRelief=personalReliefTotal+cappedReliefs;
  const chargeable=Math.max(0,annualIncome-totalRelief);
  const estTax=calcTax(chargeable);
  const effRate=annualIncome>0?(estTax/annualIncome)*100:0;
  const zakatPaid=expenses.filter(e=>e.zakatSubtype==="pendapatan").reduce((s,e)=>s+e.amount,0);
  const zakatRebate=Math.min(zakatPaid,estTax);
  const rebate400=chargeable<=35000?400:0;
  const spouseRebate400=(spouseReliefAmt>0&&chargeable<=35000)?400:0;
  const taxAfterRebate=Math.max(0,estTax-zakatRebate-rebate400-spouseRebate400);
  // Plan mode derived values
  const totalPlanExtra=Object.values(planAmounts).reduce((a,b)=>a+b,0);
  const planSimChargeable=Math.max(0,annualIncome-totalRelief-totalPlanExtra);
  const planSimTax=Math.max(0,calcTax(planSimChargeable)-zakatRebate-rebate400-spouseRebate400);
  const planSaving=Math.max(0,taxAfterRebate-planSimTax);
  const planMarginalRate=(calcTax(chargeable)-calcTax(Math.max(0,chargeable-1000)))/1000;

  async function handleExpAttach(file){
    if(!file)return;
    const isImg=file.type.startsWith("image/");
    const dataUrl=await new Promise(res=>{const r=new FileReader();r.onload=e=>res(e.target.result);r.readAsDataURL(file);});
    setExpAttach({dataUrl,previewUrl:isImg?dataUrl:null,file,type:file.type,size:file.size,name:file.name});
    if(!isImg)return;
    setExpAiState("loading");setExpAiNote("");
    try{
      const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,
          system:`Malaysian LHDN tax assistant. Return ONLY JSON: {"merchant":"","date":"YYYY-MM-DD","amount":0,"lhdn_category":"medical|education|lifestyle|equipment|ev|tourism|epf|socso|childcare|donations|sspn|prs|other","tax_claimable":true,"treatment":"implikasi cukai explanation","confidence":"high|medium|low"}`,
          messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:file.type,data:dataUrl.split(",")[1]}},{type:"text",text:"Analyse for LHDN."}]}]})});
      const data=await res.json();
      const parsed=JSON.parse(data.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());
      setNewExp(prev=>({...prev,desc:prev.desc||parsed.merchant||"",amount:prev.amount||(parsed.amount?String(parsed.amount):""),date:parsed.date||prev.date,category:parsed.lhdn_category||prev.category}));
      setExpAiNote(parsed.treatment||"");setExpAiState("done");
    }catch{setExpAiState("error");}
  }

  function resetExpForm(){setNewExp({desc:"",amount:"",date:new Date().toISOString().slice(0,10),category:"medical"});setExpAttach(null);setExpAiState("idle");setExpAiNote("");setShowAdd(false);}

  function addManual(){
    if(!newExp.desc||!newExp.amount)return;
    const eid=Date.now();
    setExpenses(prev=>[...prev,{id:eid,desc:newExp.desc,amount:parseFloat(newExp.amount),category:newExp.category,date:newExp.date,thumb:expAttach?.previewUrl||null}]);
    if(expAttach)setDocs(prev=>[...prev,{id:eid+1,name:newExp.desc||expAttach.name,category:newExp.category,note:`${lang==="ms"?"Perbelanjaan":"Expense"}: RM ${newExp.amount}`,type:expAttach.type,size:expAttach.size,dataUrl:expAttach.dataUrl,previewUrl:expAttach.previewUrl,date:newExp.date}]);
    resetExpForm();
  }

  const processFile=useCallback((file)=>{
    if(!file||!file.type.startsWith("image/")){setScanError("Please upload an image file.");return;}
    setScanError(null);const reader=new FileReader();
    reader.onload=(e)=>{setPreview(e.target.result);setImgB64(e.target.result.split(",")[1]);setScan(SCAN.IDLE);};
    reader.readAsDataURL(file);
  },[]);

  async function scanReceipt(){
    if(!imgB64)return;setScan(SCAN.SCANNING);setScanError(null);
    try{
      const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:`Malaysian tax receipt OCR. Return ONLY JSON: {"merchant":"","date":"YYYY-MM-DD","total":0,"items":[],"category":"medical|education|lifestyle|equipment|ev|tourism|epf|socso|childcare|donations|zakat|sspn|prs|other","category_reason":"","tax_claimable":true,"confidence":"high|medium|low","notes":""}`,
          messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:imgB64}},{type:"text",text:"Extract and classify for LHDN."}]}]})});
      const data=await res.json();
      const parsed=JSON.parse(data.content?.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());
      setExtracted(parsed);setEdited({desc:parsed.merchant||"",date:parsed.date||new Date().toISOString().slice(0,10),amount:parsed.total||0,category:parsed.category||"other"});setScan(SCAN.REVIEW);
    }catch{setScanError("Scan failed.");setScan(SCAN.IDLE);}
  }

  function saveScan(){setScan(SCAN.SAVING);setTimeout(()=>{setExpenses(prev=>[...prev,{id:Date.now(),desc:edited.desc,amount:parseFloat(edited.amount)||0,category:edited.category,date:edited.date,thumb:previewUrl}]);setScan(SCAN.SAVED);},700);}
  function resetScan(){setScan(SCAN.IDLE);setPreview(null);setImgB64(null);setExtracted(null);setEdited(null);setScanError(null);if(fileRef.current)fileRef.current.value="";}

  async function handleDocFile(file){
    if(!file)return;
    const isImg=file.type.startsWith("image/");
    const dataUrl=await new Promise(res=>{const r=new FileReader();r.onload=e=>res(e.target.result);r.readAsDataURL(file);});
    setPendingDoc({file,dataUrl,previewUrl:isImg?dataUrl:null,name:file.name.replace(/\.[^.]+$/,""),category:"other",note:"",type:file.type,size:file.size,amount:null,docDate:new Date().toISOString().slice(0,10),isExpense:false,aiDone:false,aiError:false});
    setShowDocAdd(true);
    if(!isImg)return;
    setDocExtracting(true);
    try{
      const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:`Malaysian tax doc OCR. Return ONLY JSON: {"doc_type":"receipt|invoice|form|other","merchant":"","date":"YYYY-MM-DD","amount":0,"items":[],"lhdn_category":"medical|education|lifestyle|equipment|ev|tourism|epf|socso|childcare|donations|zakat|sspn|prs|income|other","category_reason":"","tax_claimable":true,"is_expense":true,"confidence":"high|medium|low","suggested_name":"","notes":""}`,
          messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:file.type,data:dataUrl.split(",")[1]}},{type:"text",text:"Extract and classify for LHDN."}]}]})});
      const data=await res.json();
      const p=JSON.parse(data.content?.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());
      setPendingDoc(prev=>({...prev,name:p.suggested_name||prev.name,category:p.lhdn_category||prev.category,note:p.notes||prev.note,amount:p.amount||null,docDate:p.date||prev.docDate,items:p.items||[],isExpense:p.is_expense??false,claimable:p.tax_claimable??true,confidence:p.confidence||"medium",reason:p.category_reason||"",aiDone:true}));
    }catch{setPendingDoc(prev=>({...prev,aiDone:true,aiError:true}));}
    finally{setDocExtracting(false);}
  }

  function saveDoc(){
    if(!pendingDoc)return;setDocUploading(true);
    setDocs(prev=>[...prev,{id:Date.now(),name:pendingDoc.name,category:pendingDoc.category,note:pendingDoc.note,type:pendingDoc.type,size:pendingDoc.size,dataUrl:pendingDoc.dataUrl,previewUrl:pendingDoc.previewUrl,date:pendingDoc.docDate||new Date().toISOString().slice(0,10)}]);
    if(pendingDoc.isExpense&&pendingDoc.amount>0)setExpenses(prev=>[...prev,{id:Date.now()+1,desc:pendingDoc.name,amount:parseFloat(pendingDoc.amount)||0,category:pendingDoc.category,date:pendingDoc.docDate||new Date().toISOString().slice(0,10),thumb:pendingDoc.previewUrl}]);
    setDocUploading(false);setPendingDoc(null);setShowDocAdd(false);
  }
  function deleteDoc(id){setDocs(prev=>prev.filter(d=>d.id!==id));}
  function saveZakat(){
    if(zakatDeclared<=0)return;
    setExpenses(prev=>[...prev.filter(e=>e.zakatSubtype!=="pendapatan"),{id:Date.now(),desc:`Zakat Pendapatan (${new Date().getFullYear()})`,amount:Math.round(zakatDeclared*100)/100,category:"zakat",zakatSubtype:"pendapatan",date:new Date().toISOString().slice(0,10),thumb:null}]);
    setZakatSaved(true);setTimeout(()=>setZakatSaved(false),3000);
  }

  const filteredDocs=docs.filter(d=>(docFilter==="all"||d.category===docFilter)&&(d.name.toLowerCase().includes(docSearch.toLowerCase())||(d.note||"").toLowerCase().includes(docSearch.toLowerCase())));
  const scannedCat=extracted?catFor(extracted.category):null;
  const card=(ex={})=>({background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid #E2E8F0",...ex});
  const iStyle={width:"100%",background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:12,padding:"11px 14px",color:"#1E293B",fontSize:13,boxSizing:"border-box",fontFamily:"Arial,sans-serif",marginBottom:10};
  const confColor=(c)=>c==="high"?"#74C69D":c==="medium"?"#F4A261":"#FF9999";
  const confLabel=(c)=>c==="high"?s.highConf:c==="medium"?s.medConf:s.lowConf;

  return(
<div style={{fontFamily:"Arial,sans-serif",background:"#F0F4F8",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"20px 16px"}}>
{!authUser&&(
<div style={{width:"100%",maxWidth:390,background:"#FFFFFF",borderRadius:32,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.12)",minHeight:780,display:"flex",flexDirection:"column"}}>
<div style={{background:"linear-gradient(135deg,#CC0001 0%,#9B0000 45%,#003087 100%)",padding:"48px 32px 36px",position:"relative",overflow:"hidden",textAlign:"center"}}>
<div style={{position:"absolute",top:-30,right:-30,width:160,height:160,background:"rgba(255,255,255,0.04)",borderRadius:"50%"}}/>
<div style={{position:"absolute",bottom:-20,left:-20,width:100,height:100,background:"rgba(255,255,255,0.03)",borderRadius:"50%"}}/>
<div style={{fontSize:52,marginBottom:12}}>🇲🇾</div>
<div style={{color:"white",fontSize:26,fontWeight:"bold",letterSpacing:-0.5}}>MyTax</div>
<div style={{color:"rgba(255,255,255,0.6)",fontSize:13,marginTop:4}}>{s.authTagline}</div>
<div style={{display:"flex",justifyContent:"center",gap:6,marginTop:16}}>
{["🧾","🏥","📚","🌙","📊"].map((ic,i)=>(
<div key={i} style={{background:"rgba(255,255,255,0.1)",borderRadius:10,padding:"6px 8px",fontSize:16}}>{ic}</div>
))}
</div>
</div>
<div style={{flex:1,overflowY:"auto",padding:"28px 24px 32px"}}>
<div style={{display:"flex",background:"#F1F5F9",borderRadius:16,padding:4,marginBottom:24}}>
{[["login",s.authLogin],["signup",s.authSignup]].map(([mode,label])=>(
<button key={mode} onClick={()=>{setAuthMode(mode);setAuthError("");}} style={{flex:1,background:authMode===mode?"rgba(116,198,157,0.2)":"transparent",border:`1px solid ${authMode===mode?"rgba(116,198,157,0.4)":"transparent"}`,borderRadius:12,padding:"9px",color:authMode===mode?"#74C69D":"#94A3B8",fontWeight:authMode===mode?"bold":"normal",fontSize:13,cursor:"pointer",fontFamily:"Arial,sans-serif"}}>{label}</button>
))}
</div>
<button onClick={handleGoogleAuth} disabled={authGoogleLoading} style={{width:"100%",background:"white",border:"1px solid #E2E8F0",borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:authGoogleLoading?"not-allowed":"pointer",marginBottom:20,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
{authGoogleLoading
? (<div style={{width:18,height:18,border:"2px solid rgba(0,0,0,0.15)",borderTopColor:"#4285F4",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>)
: (<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A353" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"/></svg>)
}
<span style={{color:"#333",fontWeight:"600",fontSize:14,fontFamily:"Arial,sans-serif"}}>{authGoogleLoading?s.authLoading:s.authGoogle}</span>
</button>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
<div style={{flex:1,height:1,background:"#E2E8F0"}}/>
<span style={{color:"#94A3B8",fontSize:12}}>{s.authOr}</span>
<div style={{flex:1,height:1,background:"#E2E8F0"}}/>
</div>
{authMode==="signup"&&(
<div style={{animation:"fadeIn 0.2s ease"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:5}}>{s.authName}</div>
<input value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})} placeholder="e.g. Ahmad Hairul" style={{width:"100%",background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:12,padding:"12px 14px",color:"#1E293B",fontSize:14,boxSizing:"border-box",fontFamily:"Arial,sans-serif",marginBottom:12,outline:"none"}}/>
</div>
)}
<div style={{color:"#64748B",fontSize:11,marginBottom:5}}>{s.authEmail}</div>
<input type="email" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} placeholder="you@example.com" style={{width:"100%",background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:12,padding:"12px 14px",color:"#1E293B",fontSize:14,boxSizing:"border-box",fontFamily:"Arial,sans-serif",marginBottom:12,outline:"none"}}/>
<div style={{color:"#64748B",fontSize:11,marginBottom:5}}>{s.authPassword}</div>
<input type="password" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handleAuthSubmit()} placeholder="••••••••" style={{width:"100%",background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:12,padding:"12px 14px",color:"#1E293B",fontSize:14,boxSizing:"border-box",fontFamily:"Arial,sans-serif",marginBottom:authMode==="login"?6:16,outline:"none"}}/>
{authMode==="login"&&<div style={{textAlign:"right",marginBottom:16}}><span style={{color:"rgba(116,198,157,0.7)",fontSize:11,cursor:"pointer"}}>{s.authForgot}</span></div>}
{authError&&<div style={{background:"rgba(204,68,68,0.07)",border:"1px solid rgba(204,68,68,0.2)",borderRadius:10,padding:"8px 12px",marginBottom:12,color:"#DC2626",fontSize:12}}>{authError}</div>}
<button onClick={handleAuthSubmit} disabled={authLoading} style={{width:"100%",background:authLoading?"#F1F5F9":"linear-gradient(135deg,#2D6A4F,#52B788)",border:"none",borderRadius:14,color:authLoading?"#94A3B8":"white",fontWeight:"bold",fontSize:15,padding:"14px",cursor:authLoading?"not-allowed":"pointer",fontFamily:"Arial,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
{authLoading&&(<div style={{width:16,height:16,border:"2px solid #E2E8F0",borderTopColor:"#64748B",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>)}
{authLoading?s.authLoading:authMode==="login"?s.authLogin:s.authSignup}
</button>
<div style={{textAlign:"center",marginTop:16,color:"#74C69D",fontSize:12,cursor:"pointer"}} onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setAuthError("");}}>
{authMode==="login"?s.authToggleSignup:s.authToggleLogin}
</div>
<div style={{textAlign:"center",marginTop:20,color:"#94A3B8",fontSize:10,lineHeight:1.6}}>{s.authGuestNote}</div>
</div>
<div style={{textAlign:"center",padding:"8px 0 14px",color:"#CBD5E1",fontSize:9,letterSpacing:1}}>MYTAX · MALAYSIA · YA 2026</div>
</div>
)}
{authUser&&(
<div style={{width:"100%",maxWidth:390,background:"#FFFFFF",borderRadius:32,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.12)",minHeight:780,display:"flex",flexDirection:"column",position:"relative"}}>
<style>{`
@keyframes scanMove{0%{top:12px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:calc(100% - 12px);opacity:0}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
input[type=range]{accent-color:#74C69D;}::-webkit-scrollbar{width:0;}
`}</style>

<div style={{background:"linear-gradient(135deg,#CC0001 0%,#9B0000 45%,#003087 100%)",padding:"20px 24px 24px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-20,right:-20,width:130,height:130,background:"rgba(255,255,255,0.05)",borderRadius:"50%"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><div style={{color:"rgba(255,255,255,0.65)",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{s.appName}</div><div style={{color:"white",fontSize:21,fontWeight:"bold",marginTop:3}}>{s.appSub}</div></div>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<button onClick={()=>setLang(lang==="en"?"ms":"en")} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"5px 14px",color:"white",fontSize:13,fontWeight:"bold",cursor:"pointer"}}>{lang==="en"?"BM":"EN"}</button>
<button onClick={()=>setShowKebabMenu(true)} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"5px 11px",color:"white",fontSize:18,fontWeight:"bold",cursor:"pointer",lineHeight:1}}>⋮</button>
{authUser?(
<button onClick={handleSignOut} style={{background:"rgba(255,255,255,0.14)",borderRadius:20,padding:"4px 10px",color:"white",fontSize:11,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
<div style={{width:22,height:22,borderRadius:"50%",background:authUser.provider==="google"?"#4285F4":"#74C69D",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:"bold",color:"white",flexShrink:0}}>
{authUser.avatar||(authUser.name?authUser.name[0].toUpperCase():"U")}
</div>
<span style={{maxWidth:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{authUser.name.split(" ")[0]}</span>
</button>
):(
<div style={{background:"rgba(255,255,255,0.14)",borderRadius:20,padding:"4px 12px",color:"white",fontSize:12}}>{s.ya} 2026</div>
)}
</div></div>
<div style={{display:"flex",gap:12,marginTop:18}}>
{[{l:s.estTax,v:fmt(taxAfterRebate),c:"white"},{l:s.effRate,v:effRate.toFixed(1)+"%",c:"#74C69D"},{l:s.reliefs,v:fmt(cappedReliefs),c:"#95D5B2"}].map((x,i)=>(
<div key={i} style={{flex:1,background:"rgba(0,0,0,0.25)",borderRadius:14,padding:"10px 12px",border:"1px solid rgba(255,255,255,0.09)"}}>
<div style={{color:"rgba(255,255,255,0.55)",fontSize:9,letterSpacing:1,textTransform:"uppercase"}}>{x.l}</div>
<div style={{color:x.c,fontSize:14,fontWeight:"bold",marginTop:4}}>{x.v}</div>
</div>))}
</div></div>

<div style={{background:"#F8FAFC",borderBottom:"1px solid #E2E8F0",overflowX:"auto",scrollbarWidth:"none"}}>
<div style={{display:"flex",minWidth:"max-content",padding:"0 4px"}}>
{s.nav.map((n,i)=>(
<button key={i} onClick={()=>{setTab(i);resetScan();}} style={{flex:"0 0 auto",width:52,border:"none",background:"none",color:tab===i?"#74C69D":"#94A3B8",fontSize:8.5,fontWeight:tab===i?"bold":"normal",padding:"11px 2px 7px",borderBottom:tab===i?"2px solid #74C69D":"2px solid transparent",cursor:"pointer",transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
<span style={{fontSize:tab===i?17:15}}>{NAV_ICONS[i]}</span>
<span style={{whiteSpace:"nowrap"}}>{n}</span>
</button>))}
</div></div>

<div style={{flex:1,overflowY:"auto",padding:"20px 20px 30px"}}>

{tab===0&&(
<div style={{animation:"fadeIn 0.3s ease"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:14}}>{s.dashSub}</div>
<div style={card({padding:"16px 18px",marginBottom:14})}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{color:"#475569",fontSize:13}}>{s.annualIncome}</span><span style={{color:"#1E293B",fontWeight:"bold",fontSize:14}}>{fmt(annualIncome)}</span></div>
<input type="range" min={10000} max={500000} step={1000} value={annualIncome} onChange={e=>setIncome(+e.target.value)} style={{width:"100%"}}/>
<div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{color:"#94A3B8",fontSize:10}}>RM 10k</span><span style={{color:"#94A3B8",fontSize:10}}>RM 500k</span></div>
</div>
{[{l:s.totalReliefs,v:fmt(totalRelief),sub:s.reliefSub,c:"#52B788"},{l:s.chargeableInc,v:fmt(chargeable),sub:s.chargeableSub,c:"#F4A261"},{l:s.estTaxPayable,v:fmt(taxAfterRebate),sub:s.estTaxSub,c:"#FF6B6B"}].map((r,i)=>(
<div key={i} style={card({display:"flex",justifyContent:"space-between",alignItems:"center"})}>
<div><div style={{color:"#64748B",fontSize:11}}>{r.l}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{r.sub}</div></div>
<div style={{color:r.c,fontWeight:"bold",fontSize:15}}>{r.v}</div>
</div>))}
<button onClick={()=>setShowDocs(true)} style={{width:"100%",background:"linear-gradient(135deg,#1B4332,#2D6A4F)",border:"1px solid #52B78840",borderRadius:16,padding:"14px",color:"white",cursor:"pointer",textAlign:"left",marginTop:4,display:"flex",alignItems:"center",gap:12}}>
<span style={{fontSize:28}}>📸</span><div><div style={{fontWeight:"bold",fontSize:14}}>{s.scanCTA}</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginTop:2}}>{s.scanCTASub}</div></div>
<span style={{marginLeft:"auto",color:"#74C69D",fontSize:18}}>›</span>
</button>
{(()=>{const rem=2500-Math.min(reliefTotals["lifestyle"],2500);if(rem<10)return null;return(<div style={{background:"rgba(116,198,157,0.08)",border:"1px solid rgba(116,198,157,0.25)",borderRadius:14,padding:"12px 14px",marginTop:12}}><div style={{color:"#40916C",fontSize:11,marginBottom:4}}>{s.tipTitle}</div><div style={{color:"#475569",fontSize:12,lineHeight:1.6}}>{s.tipBody(rem)}</div></div>);})()}
</div>
)}

{tab===1&&(
<div style={{animation:"fadeIn 0.3s ease"}}>
<input ref={expFileRef} type="file" accept="image/*,application/pdf" onChange={e=>handleExpAttach(e.target.files?.[0])} style={{display:"none"}}/>
<input ref={expCamRef} type="file" accept="image/*" capture="environment" onChange={e=>handleExpAttach(e.target.files?.[0])} style={{display:"none"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
<div><div style={{color:"#1E293B",fontWeight:"bold",fontSize:16}}>{s.myExpenses}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>{(()=>{const e=expenses.filter(x=>x.category!=="zakat");return s.records(e.length,fmt(e.reduce((t,x)=>t+x.amount,0)));})()}</div></div>
<div style={{display:"flex",gap:8}}>
<button onClick={()=>setShowDocs(true)} style={{background:"rgba(116,198,157,0.12)",border:"1px solid rgba(116,198,157,0.3)",borderRadius:20,color:"#2D6A4F",fontSize:12,padding:"7px 12px",cursor:"pointer"}}>{s.scanBtn}</button>
<button onClick={()=>setShowAdd(!showAdd)} style={{background:"#74C69D",border:"none",borderRadius:20,color:"#FFFFFF",fontWeight:"bold",fontSize:12,padding:"7px 14px",cursor:"pointer"}}>{s.addBtn}</button>
</div></div>
{showAdd&&(
<div style={{background:"rgba(116,198,157,0.05)",borderRadius:20,border:"1px solid rgba(116,198,157,0.2)",marginBottom:16,overflow:"hidden",animation:"fadeIn 0.25s ease"}}>
<div style={{padding:"14px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<div style={{color:"#40916C",fontWeight:"bold",fontSize:14}}>{s.newExpense}</div>
{expAiState==="loading"&&<div style={{display:"flex",alignItems:"center",gap:6,color:"#74C69D",fontSize:11}}><div style={{width:12,height:12,border:"2px solid rgba(116,198,157,0.3)",borderTopColor:"#74C69D",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>{s.aiAnalysing}</div>}
{expAiState==="done"&&<span style={{color:"#40916C",fontSize:11,background:"rgba(116,198,157,0.15)",borderRadius:20,padding:"2px 10px"}}>{s.aiDone}</span>}
</div>
<div style={{margin:"0 16px 12px"}}>
{!expAttach?(
<div style={{display:"flex",gap:8}}>
<button onClick={()=>expFileRef.current?.click()} style={{flex:1,background:"#F8FAFC",border:"1px dashed #CBD5E1",borderRadius:14,padding:"12px 8px",cursor:"pointer",color:"#64748B",fontSize:12,textAlign:"center"}}>{s.attachDoc}</button>
<button onClick={()=>expCamRef.current?.click()} style={{flex:1,background:"#F8FAFC",border:"1px dashed #CBD5E1",borderRadius:14,padding:"12px 8px",cursor:"pointer",color:"#64748B",fontSize:12,textAlign:"center"}}>{s.scanReceipt}</button>
</div>
):(
<div style={{position:"relative",borderRadius:14,overflow:"hidden",border:"1px solid rgba(116,198,157,0.3)"}}>
{expAttach.previewUrl?<img src={expAttach.previewUrl} alt="" style={{width:"100%",maxHeight:120,objectFit:"cover",display:"block"}}/>:<div style={{background:"#F8FAFC",padding:"14px",textAlign:"center"}}><span style={{fontSize:24}}>{fileInfo(expAttach.type).icon}</span><div style={{color:"#64748B",fontSize:11,marginTop:4}}>{expAttach.name}</div></div>}
<button onClick={()=>{setExpAttach(null);setExpAiState("idle");setExpAiNote("");}} style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,0.55)",border:"none",borderRadius:"50%",width:24,height:24,color:"white",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
{expAiState==="loading"&&<div style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.8)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}><div style={{width:28,height:28,border:"3px solid rgba(116,198,157,0.3)",borderTopColor:"#74C69D",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{color:"#40916C",fontSize:11}}>{s.aiAnalysing}</span></div>}
</div>
)}
</div>
{expAiState==="done"&&expAiNote&&(<div style={{margin:"0 16px 12px",background:"rgba(116,198,157,0.06)",border:"1px solid rgba(116,198,157,0.18)",borderRadius:12,padding:"10px 12px"}}><div style={{color:"#40916C",fontSize:11,fontWeight:"bold",marginBottom:4}}>💡 {s.impCukai}</div><div style={{color:"#475569",fontSize:12,lineHeight:1.6}}>{expAiNote}</div></div>)}
{expAiState==="error"&&(<div style={{margin:"0 16px 12px",background:"rgba(204,68,68,0.06)",border:"1px solid rgba(204,68,68,0.18)",borderRadius:12,padding:"8px 12px"}}><div style={{color:"#DC2626",fontSize:11}}>{s.aiError}</div></div>)}
<div style={{padding:"0 16px 16px",display:"flex",flexDirection:"column",gap:8}}>
<input placeholder={s.descPlaceholder} value={newExp.desc} onChange={e=>setNewExp({...newExp,desc:e.target.value})} style={iStyle}/>
<div style={{display:"flex",gap:8}}>
<input placeholder="0.00" type="number" value={newExp.amount} onChange={e=>setNewExp({...newExp,amount:e.target.value})} style={{...iStyle,flex:1,marginBottom:0}}/>
<input type="date" value={newExp.date} onChange={e=>setNewExp({...newExp,date:e.target.value})} style={{...iStyle,flex:1,marginBottom:0}}/>
</div>
<select value={newExp.category} onChange={e=>setNewExp({...newExp,category:e.target.value})} style={{...iStyle,background:"#F8FAFC",marginBottom:0}}>
{TAX_RELIEF_CATEGORIES.filter(c=>c.id!=="zakat").map(c=><option key={c.id} value={c.id}>{c.icon} {c[lang]}</option>)}
</select>
{expAttach&&<div style={{fontSize:11,color:"#40916C",background:"rgba(116,198,157,0.08)",borderRadius:8,padding:"6px 10px"}}>{s.vaultNotice}</div>}
<div style={{display:"flex",gap:8,marginTop:4}}>
<button onClick={addManual} disabled={expAiState==="loading"} style={{flex:2,background:expAiState==="loading"?"#F1F5F9":"linear-gradient(135deg,#2D6A4F,#52B788)",border:"none",borderRadius:12,color:expAiState==="loading"?"#94A3B8":"white",fontWeight:"bold",padding:"12px",cursor:expAiState==="loading"?"not-allowed":"pointer",fontSize:13,fontFamily:"Arial,sans-serif"}}>{expAiState==="loading"?s.waitAI:expAttach?s.saveVault:s.saveOnly}</button>
<button onClick={resetExpForm} style={{flex:1,background:"#F1F5F9",border:"1px solid #E2E8F0",borderRadius:12,color:"#64748B",padding:"12px",cursor:"pointer",fontSize:13}}>{s.cancel}</button>
</div></div>
</div>
)}
{[...expenses].filter(e=>e.category!=="zakat").reverse().map(e=>{const c=catFor(e.category);return(
<div key={e.id} style={{background:"#FFFFFF",borderRadius:14,padding:"12px 14px",marginBottom:10,border:"1px solid #E2E8F0",display:"flex",alignItems:"center",gap:12}}>
{e.thumb?<img src={e.thumb} alt="" style={{width:40,height:40,objectFit:"cover",borderRadius:10,flexShrink:0}}/>:<div style={{width:40,height:40,borderRadius:12,background:`${c.color}22`,border:`1px solid ${c.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{c.icon}</div>}
<div style={{flex:1,minWidth:0}}><div style={{color:"#1E293B",fontSize:13,fontWeight:"500",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.desc}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>{c[lang]} · {e.date}</div></div>
<div style={{color:"#52B788",fontWeight:"bold",fontSize:14,whiteSpace:"nowrap"}}>RM {e.amount.toLocaleString()}</div>
</div>);})}
</div>
)}

{tab===2&&(
<div style={{animation:"fadeIn 0.3s ease"}}>

<div style={{color:"#64748B",fontSize:11,marginBottom:14}}>{s.reliefTabSub}</div>
{TAX_RELIEF_CATEGORIES.filter(c=>c.id!=="other"&&c.id!=="zakat").map(cat=>{
const spent=cat.id==="epf"?mergedEpf:reliefTotals[cat.id]||0;
const capped=cat.limit?Math.min(spent,cat.limit):spent;
const pct=cat.limit?Math.min((spent/cat.limit)*100,100):0;
const rem=cat.limit?Math.max(0,cat.limit-spent):null;
return(<div key={cat.id} style={card()}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{cat.icon}</span><span style={{color:"#1E293B",fontSize:13}}>{cat[lang]}</span></div>
<div><span style={{color:"#52B788",fontWeight:"bold",fontSize:13}}>RM {capped.toLocaleString()}</span>{cat.limit&&<span style={{color:"#94A3B8",fontSize:11}}> / {cat.limit.toLocaleString()}</span>}</div>
</div>
{cat.limit&&<div style={{background:"#F1F5F9",borderRadius:6,height:6,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:pct>=100?"#DC2626":cat.color,borderRadius:6}}/></div>}
{rem!==null&&rem>0&&<div style={{color:"#94A3B8",fontSize:10,marginTop:5}}>{s.remaining(rem)}</div>}
{pct>=100&&cat.limit&&<div style={{color:"#DC2626",fontSize:10,marginTop:5}}>{s.capReached}</div>}
</div>);})}

<div style={{display:"flex",alignItems:"center",gap:10,margin:"18px 0 12px"}}>
<div style={{flex:1,height:1,background:"#E2E8F0"}}/>
<span style={{color:"#B7860B",fontSize:10,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase"}}>{lang==="ms"?"Rebat Cukai":"Tax Rebate"}</span>
<div style={{flex:1,height:1,background:"#E2E8F0"}}/>
</div>

<div style={{background:"rgba(212,175,55,0.06)",border:"1px solid rgba(212,175,55,0.25)",borderRadius:16,padding:"14px 16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:18}}>🌙</span>
<div>
<div style={{color:"#1E293B",fontSize:13}}>{lang==="ms"?"Zakat Pendapatan":"Zakat Pendapatan"}</div>
<div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{s.zakatRebateSub}</div>
</div>
</div>
<div style={{textAlign:"right"}}>
<div style={{color:"#D4AF37",fontWeight:"bold",fontSize:15}}>RM {zakatPaid.toLocaleString()}</div>
<div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{lang==="ms"?"Dibayar":"Declared"}</div>
</div>
</div>
{zakatPaid>0&&(
<div style={{borderTop:"1px solid rgba(212,175,55,0.2)",paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{color:"#64748B",fontSize:11}}>{lang==="ms"?"Rebat berkesan (had kepada cukai kena bayar)":"Effective rebate (capped at tax payable)"}</div>
<div style={{color:"#B7860B",fontWeight:"bold",fontSize:13}}>- RM {zakatRebate.toLocaleString()}</div>
</div>
)}
{zakatPaid===0&&(
<div style={{color:"#94A3B8",fontSize:11,textAlign:"center",padding:"4px 0"}}>{s.zakatNudge}</div>
)}
</div>

</div>
)}

{tab===3&&(
<div style={{animation:"fadeIn 0.3s ease"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:14}}>{s.estimateSub}</div>
{[{l:s.grossIncome,v:annualIncome,c:"#1E293B"},{l:s.personalRelief,v:-personalReliefTotal,c:"#52B788"},{l:s.expRelief,v:-cappedReliefs,c:"#52B788"},{l:s.chargeableRow,v:chargeable,c:"#F4A261",b:true}].map((r,i)=>(
<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #E2E8F0"}}>
<span style={{color:"#475569",fontSize:13}}>{r.l}</span>
<span style={{color:r.c,fontSize:14,fontWeight:r.b?"bold":"normal"}}>{r.v<0?`- RM ${Math.abs(r.v).toLocaleString()}`:`RM ${r.v.toLocaleString()}`}</span>
</div>))}
<div style={{background:"rgba(204,68,68,0.06)",borderRadius:16,padding:16,marginTop:18,border:"1px solid rgba(204,68,68,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#475569",fontSize:12}}>{s.taxBeforeRebate}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{s.taxBeforeSub}</div></div>
<div style={{color:"#DC2626",fontWeight:"bold",fontSize:20}}>{fmt(estTax)}</div>
</div>
{zakatRebate>0&&(
<div style={{background:"rgba(212,175,55,0.07)",borderRadius:14,padding:"12px 16px",marginTop:8,border:"1px solid rgba(212,175,55,0.25)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#B7860B",fontSize:13,fontWeight:"bold"}}>{s.zakatRebateRow}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{s.zakatRebateSub}</div></div>
<div style={{color:"#D4AF37",fontWeight:"bold",fontSize:16}}>- {fmt(zakatRebate)}</div>
</div>
)}
{rebate400>0&&(
<div style={{background:"rgba(116,198,157,0.07)",borderRadius:14,padding:"10px 16px",marginTop:8,border:"1px solid rgba(116,198,157,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#40916C",fontSize:12}}>{s.rebate400}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:1}}>{s.rebate400Sub}</div></div>
<div style={{color:"#52B788",fontWeight:"bold",fontSize:14}}>- {fmt(rebate400)}</div>
</div>
)}
{spouseRebate400>0&&(
<div style={{background:"rgba(116,198,157,0.07)",borderRadius:14,padding:"10px 16px",marginTop:8,border:"1px solid rgba(116,198,157,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#40916C",fontSize:12}}>{s.spouseRebate400}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:1}}>{s.spouseRebate400Sub}</div></div>
<div style={{color:"#52B788",fontWeight:"bold",fontSize:14}}>- {fmt(spouseRebate400)}</div>
</div>
)}
<div style={{background:zakatRebate>0?"rgba(82,183,136,0.08)":"rgba(204,68,68,0.06)",borderRadius:16,padding:18,marginTop:8,border:"1px solid #E2E8F0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#1E293B",fontSize:13,fontWeight:"bold"}}>{s.taxPayableRow}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{s.taxPayableSub}</div></div>
<div style={{color:taxAfterRebate===0?"#52B788":"#DC2626",fontWeight:"bold",fontSize:24}}>{fmt(taxAfterRebate)}</div>
</div>
{zakatRebate===0&&(<div style={{background:"rgba(212,175,55,0.06)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:12,padding:"10px 14px",marginTop:8,display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>🌙</span><div style={{color:"#64748B",fontSize:11,lineHeight:1.5}}>{s.zakatNudge}</div></div>)}
<div style={card({marginTop:12})}><div style={{color:"#64748B",fontSize:12,marginBottom:8}}>{s.pcbTitle}</div><div style={{color:"#52B788",fontSize:22,fontWeight:"bold"}}>{fmt(taxAfterRebate/12)}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:4}}>{s.pcbSub(annualIncome>0?((taxAfterRebate/annualIncome)*100).toFixed(2):0)}</div></div>
<div style={card()}><div style={{color:"#64748B",fontSize:11,marginBottom:6}}>{s.disclaimer}</div><div style={{color:"#94A3B8",fontSize:11,lineHeight:1.6}}>{s.disclaimerText}</div></div>
<div style={{display:"flex",gap:10,marginTop:4}}>
<button onClick={exportPDF} style={{flex:1,background:"linear-gradient(135deg,#7B1A1A,#B71C1C)",border:"1px solid rgba(255,100,100,0.3)",borderRadius:16,color:"white",fontWeight:"bold",fontSize:13,padding:"14px 8px",cursor:"pointer",fontFamily:"Arial,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
<span style={{fontSize:18}}>📄</span>{s.exportBtn}
</button>
<button onClick={()=>setShowPlan(true)} style={{flex:1,background:"linear-gradient(135deg,#1B3A6B,#2952A3)",border:"1px solid rgba(100,150,255,0.3)",borderRadius:16,color:"white",fontWeight:"bold",fontSize:13,padding:"14px 8px",cursor:"pointer",fontFamily:"Arial,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
<span style={{fontSize:18}}>🎯</span>{lang==="ms"?"Perancangan":"Plan"}
</button>
</div>
</div>
)}

</div>

<div style={{textAlign:"center",padding:"8px 0 14px",color:"#CBD5E1",fontSize:9,letterSpacing:1}}>{s.footerText}</div>

{tab===4&&(
<div style={{position:"absolute",inset:0,background:"#FFFFFF",borderRadius:32,overflowY:"auto",zIndex:10,display:"flex",flexDirection:"column"}}>
<div style={{background:"linear-gradient(135deg,#1a0a2e 0%,#2D1B4E 50%,#1B3A4B 100%)",padding:"22px 24px 20px",flexShrink:0}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><div style={{color:"rgba(212,175,55,0.7)",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{s.appName}</div><div style={{color:"white",fontSize:20,fontWeight:"bold",marginTop:3}}>{s.zakatTitle}</div></div>
<button onClick={()=>setTab(0)} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:20,color:"rgba(255,255,255,0.5)",fontSize:11,padding:"5px 12px",cursor:"pointer"}}>{s.zakatClose}</button>
</div>
<div style={{color:"rgba(255,255,255,0.4)",fontSize:11,marginTop:8}}>{s.zakatSub}</div>
</div>
<div style={{flex:1,overflowY:"auto",padding:"20px 20px 30px"}}>
<div style={{background:"rgba(212,175,55,0.06)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:14,padding:"12px 14px",marginBottom:18,display:"flex",gap:10}}>
<span style={{fontSize:20,flexShrink:0}}>💡</span><div style={{color:"#475569",fontSize:12,lineHeight:1.6}}>{s.zakatExplain}</div>
</div>
<div style={{background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:16,padding:16,marginBottom:16}}>
<div style={{color:"#B7860B",fontWeight:"bold",fontSize:13,marginBottom:14}}>{s.incomeInfo}</div>
<ZInput label={s.grossIncLabel} value={zakatIncome} onChange={setZakatIncome}/>
<ZInput label={s.deducLabel} value={zakatDeduc} onChange={setZakatDeduc} help={s.deducHelp}/>
<div style={{background:"rgba(212,175,55,0.05)",borderRadius:10,padding:"10px 12px",fontSize:11,lineHeight:1.8}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#64748B"}}>{s.netIncome}</span><span style={{color:"#1E293B"}}>RM {Math.max(0,zakatIncome-zakatDeduc).toLocaleString()}</span></div>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#64748B"}}>{s.nisabLabel}</span><span style={{color:"#94A3B8"}}>RM {NISAB_SILVER_RM.toLocaleString()}</span></div>
<div style={{display:"flex",justifyContent:"space-between",paddingTop:6,borderTop:"1px solid rgba(212,175,55,0.15)",marginTop:4}}><span style={{color:"#64748B"}}>Status</span><span style={{color:zakatAmt>0?"#B7860B":"#DC2626",fontWeight:"bold"}}>{s.nisabStatus(zakatAmt>0)}</span></div>
</div></div>
<div style={{background:zakatAmt>0?"linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.04))":"#F8FAFC",border:`1px solid ${zakatAmt>0?"rgba(212,175,55,0.35)":"#E2E8F0"}`,borderRadius:20,padding:20,marginBottom:14}}>
<div style={{color:"#64748B",fontSize:12,marginBottom:6}}>{s.zakatResult}</div>
<div style={{color:zakatAmt>0?"#D4AF37":"#CBD5E1",fontSize:34,fontWeight:"bold"}}>{fmt(zakatAmt)}</div>
{zakatAmt>0&&(<>
<div style={{color:"#94A3B8",fontSize:12,marginTop:4}}>{s.zakatMonthly(fmt(zakatAmt/12))}</div>
<div style={{marginTop:14,paddingTop:12,borderTop:"1px solid rgba(212,175,55,0.2)"}}><div style={{color:"#B7860B",fontSize:11,marginBottom:4}}>{s.zakatImpact}</div><div style={{color:"#64748B",fontSize:11,lineHeight:1.6}}>{s.zakatImpactText}</div></div>
</>)}
{zakatAmt===0&&<div style={{color:"#94A3B8",fontSize:12,marginTop:8}}>{s.belowNisab}</div>}
</div>
<div style={{background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:16,padding:"14px 16px",marginBottom:14}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<div style={{color:"#B7860B",fontWeight:"bold",fontSize:13}}>{s.zakatDeclaredLabel}</div>
{zakatAmt>0&&<button onClick={()=>setZakatDeclared(Math.round(zakatAmt*100)/100)} style={{background:"rgba(212,175,55,0.1)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:20,color:"#B7860B",fontSize:10,padding:"3px 10px",cursor:"pointer"}}>{s.zakatUseCalc}: {fmt(zakatAmt)}</button>}
</div>
<input type="number" value={zakatDeclared||""} placeholder="0.00" onChange={e=>setZakatDeclared(parseFloat(e.target.value)||0)} style={{width:"100%",background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:10,padding:"12px 14px",color:"#1E293B",fontSize:20,fontWeight:"bold",boxSizing:"border-box",fontFamily:"Arial,sans-serif",outline:"none"}}/>
{zakatDeclared>0&&(()=>{const effectiveRebate=Math.min(zakatDeclared,estTax);const capped=zakatDeclared>estTax;return(<div style={{marginTop:8,background:capped?"rgba(212,175,55,0.08)":"rgba(116,198,157,0.08)",border:`1px solid ${capped?"rgba(212,175,55,0.25)":"rgba(116,198,157,0.2)"}`,borderRadius:8,padding:"7px 10px",fontSize:11,color:capped?"#B7860B":"#40916C"}}>{capped?`⚠ Rebate capped at your tax payable — effective rebate: ${fmt(effectiveRebate)}`:`✓ Tax rebate: ${fmt(effectiveRebate)}`}</div>);})()}
</div>
{zakatDeclared>0&&(<button onClick={saveZakat} style={{width:"100%",background:zakatSaved?"linear-gradient(135deg,#1B4332,#2D6A4F)":"linear-gradient(135deg,#7B5E00,#C9A100)",border:"none",borderRadius:16,color:"white",fontWeight:"bold",fontSize:15,padding:"15px",cursor:"pointer",fontFamily:"Arial,sans-serif",transition:"all 0.4s",marginBottom:16}}>{zakatSaved?s.savedRebate:s.saveRebate}</button>)}
<div style={{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:14,padding:"12px 14px"}}><div style={{color:"#D4AF37",fontSize:11,marginBottom:6}}>{s.zakatNote}</div><div style={{color:"#64748B",fontSize:11,lineHeight:1.7}}>{s.zakatNoteText}</div></div>
</div>
<div style={{textAlign:"center",padding:"8px 0 14px",color:"#CBD5E1",fontSize:9,letterSpacing:1,flexShrink:0}}>{s.footerZakat}</div>
</div>
)}

{showDocs&&(
<div style={{position:"absolute",inset:0,background:"#FFFFFF",borderRadius:32,zIndex:10,display:"flex",flexDirection:"column"}}>
<div style={{background:"linear-gradient(135deg,#0B1E3A 0%,#122A50 60%,#0D2233 100%)",padding:"22px 24px 18px",flexShrink:0}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><div style={{color:"rgba(116,198,157,0.7)",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{s.appName}</div><div style={{color:"white",fontSize:20,fontWeight:"bold",marginTop:3}}>{s.docsTitle}</div></div>
<button onClick={()=>{setShowDocs(false);resetScan();}} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:20,color:"rgba(255,255,255,0.5)",fontSize:11,padding:"5px 12px",cursor:"pointer"}}>✕</button>
</div>
<div style={{color:"#94A3B8",fontSize:11,marginTop:6}}>{s.docsSub(docs.length)}</div>
<div style={{marginTop:14,position:"relative"}}>
<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:0.4}}>🔍</span>
<input placeholder={s.searchPlaceholder} value={docSearch} onChange={e=>setDocSearch(e.target.value)} style={{width:"100%",background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:12,padding:"9px 12px 9px 34px",color:"#1E293B",fontSize:13,boxSizing:"border-box",fontFamily:"Arial,sans-serif"}}/>
</div></div>
<div style={{display:"flex",gap:6,padding:"12px 16px 8px",overflowX:"auto",flexShrink:0,scrollbarWidth:"none"}}>
{DOC_CATS.map(cat=>(
<button key={cat.id} onClick={()=>setDocFilter(cat.id)} style={{background:docFilter===cat.id?`${cat.color}20`:"#F1F5F9",border:`1px solid ${docFilter===cat.id?cat.color+"60":"#E2E8F0"}`,borderRadius:20,padding:"5px 12px",cursor:"pointer",whiteSpace:"nowrap",color:docFilter===cat.id?cat.color:"#64748B",fontSize:11,fontWeight:docFilter===cat.id?"bold":"normal"}}>
{cat.icon} {cat[lang]}{cat.id!=="all"&&docs.filter(d=>d.category===cat.id).length>0&&<span style={{marginLeft:5,background:"#E2E8F0",borderRadius:10,padding:"1px 5px",fontSize:10}}>{docs.filter(d=>d.category===cat.id).length}</span>}
</button>))}
</div>
<div style={{flex:1,overflowY:"auto",padding:"8px 16px 16px"}}>
{filteredDocs.length===0&&(<div style={{textAlign:"center",padding:"40px 20px",color:"#94A3B8"}}>
<div style={{fontSize:48,marginBottom:12}}>🗂️</div>
<div style={{fontSize:13}}>{docs.length===0?s.noDocsYet:s.noDocsFilter}</div>
<div style={{fontSize:11,marginTop:6,color:"#CBD5E1"}}>{docs.length===0?s.noDocsSub:s.noDocsFilterSub}</div>
</div>)}
{filteredDocs.map(doc=>{const fi=fileInfo(doc.type);const cat=DOC_CATS.find(c=>c.id===doc.category)||DOC_CATS[DOC_CATS.length-1];return(
<div key={doc.id} style={{background:"#FFFFFF",border:"1px solid #E2E8F0",borderRadius:16,padding:"12px 14px",marginBottom:10,display:"flex",gap:12,alignItems:"center"}}>
<div onClick={()=>doc.previewUrl&&setDocPreview(doc)} style={{width:48,height:48,borderRadius:12,overflow:"hidden",flexShrink:0,cursor:doc.previewUrl?"pointer":"default",background:`${fi.color}18`,border:`1px solid ${fi.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
{doc.previewUrl?<img src={doc.previewUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:fi.icon}
</div>
<div style={{flex:1,minWidth:0}}>
<div style={{color:"#1E293B",fontSize:13,fontWeight:"500",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{doc.name}</div>
<div style={{display:"flex",gap:6,alignItems:"center",marginTop:4,flexWrap:"wrap"}}>
<span style={{background:`${fi.color}20`,color:fi.color,fontSize:10,fontWeight:"bold",padding:"2px 7px",borderRadius:8}}>{fi.ext}</span>
<span style={{background:`${cat.color}15`,color:cat.color,fontSize:10,padding:"2px 7px",borderRadius:8}}>{cat.icon} {cat[lang]}</span>
<span style={{color:"#94A3B8",fontSize:10}}>{fmtSize(doc.size)}</span>
</div>
{doc.note&&<div style={{color:"#94A3B8",fontSize:11,marginTop:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{doc.note}</div>}
</div>
<div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
<a href={doc.dataUrl} download={doc.name} style={{background:"rgba(116,198,157,0.1)",border:"1px solid rgba(116,198,157,0.25)",borderRadius:8,padding:"5px 8px",color:"#40916C",fontSize:11,textDecoration:"none",textAlign:"center"}}>⬇</a>
<button onClick={()=>deleteDoc(doc.id)} style={{background:"rgba(204,68,68,0.07)",border:"1px solid rgba(204,68,68,0.18)",borderRadius:8,padding:"5px 8px",color:"#DC2626",fontSize:11,cursor:"pointer"}}>🗑</button>
</div>
</div>);})}
</div>
<div style={{padding:"12px 16px 18px",flexShrink:0,borderTop:"1px solid #E2E8F0"}}>
<input ref={docFileRef} type="file" accept="image/*,application/pdf,.doc,.docx" onChange={e=>handleDocFile(e.target.files?.[0])} style={{display:"none"}}/>
<div style={{display:"flex",gap:10}}>
<button onClick={()=>docFileRef.current?.click()} style={{flex:1,background:"linear-gradient(135deg,#1B4332,#2D6A4F)",border:"1px solid #52B78840",borderRadius:16,color:"white",fontWeight:"bold",fontSize:13,padding:"13px 8px",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>{s.uploadDoc}</button>
<button onClick={()=>{setDocMode(docMode==="scan"?"browse":"scan");resetScan();}} style={{flex:1,background:docMode==="scan"?"rgba(116,198,157,0.12)":"#F1F5F9",border:`1px solid ${docMode==="scan"?"rgba(116,198,157,0.4)":"#E2E8F0"}`,borderRadius:16,color:docMode==="scan"?"#40916C":"#64748B",fontWeight:"bold",fontSize:13,padding:"13px 8px",cursor:"pointer"}}>{s.scanDoc}</button>
</div></div>
{docMode==="scan"&&(
<div style={{position:"absolute",inset:0,background:"#F8FAFC",borderRadius:32,zIndex:15,display:"flex",flexDirection:"column"}}>
<div style={{background:"linear-gradient(135deg,#0B1E3A,#122A50)",padding:"20px 20px 16px",flexShrink:0,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"rgba(116,198,157,0.7)",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{s.appName}</div><div style={{color:"white",fontSize:18,fontWeight:"bold",marginTop:2}}>{s.scanPanelTitle}</div><div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:4}}>{s.scanPanelSub}</div></div>
<button onClick={()=>{setDocMode("browse");resetScan();}} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:20,color:"rgba(255,255,255,0.5)",fontSize:11,padding:"6px 14px",cursor:"pointer",flexShrink:0}}>{s.scanClose}</button>
</div>
<div style={{flex:1,overflowY:"auto",padding:"16px 20px 24px"}}>
{scanState===SCAN.SAVED&&(
<div style={{background:"linear-gradient(135deg,#1B4332,#2D6A4F)",borderRadius:20,padding:24,border:"1px solid #52B78850",textAlign:"center",animation:"slideUp 0.4s ease"}}>
<div style={{fontSize:44,marginBottom:8}}>✅</div>
<div style={{color:"white",fontWeight:"bold",fontSize:18}}>{s.savedToExp}</div>
<div style={{color:"#74C69D",fontSize:13,marginTop:4}}>{fmt(edited?.amount)} · {catFor(edited?.category)[lang]}</div>
<div style={{display:"flex",gap:10,marginTop:18,justifyContent:"center"}}>
<button onClick={resetScan} style={{background:"#74C69D",border:"none",borderRadius:20,color:"#FFFFFF",fontWeight:"bold",padding:"10px 20px",cursor:"pointer",fontSize:13}}>{s.scanAnother}</button>
<button onClick={()=>{resetScan();setDocMode("browse");setTab(1);}} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:20,color:"white",padding:"10px 18px",cursor:"pointer",fontSize:13}}>{s.viewExpenses}</button>
</div>
</div>
)}
{scanState!==SCAN.SAVED&&(
<div>
<div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);processFile(e.dataTransfer.files?.[0]);}} onClick={()=>!previewUrl&&fileRef.current?.click()} style={{position:"relative",borderRadius:20,minHeight:180,border:`2px dashed ${dragOver?"#74C69D":previewUrl?"rgba(116,198,157,0.4)":"#CBD5E1"}`,background:dragOver?"rgba(116,198,157,0.05)":previewUrl?"rgba(0,0,0,0.04)":"#F8FAFC",overflow:"hidden",cursor:previewUrl?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
{previewUrl?(
<div style={{width:"100%",position:"relative"}}>
<img src={previewUrl} alt="Receipt" style={{width:"100%",maxHeight:240,objectFit:"contain",borderRadius:18}}/>
{scanState===SCAN.SCANNING&&<ScanLine/>}
<CornerMarkers/>
{scanState!==SCAN.SCANNING&&<button onClick={e=>{e.stopPropagation();resetScan();}} style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.55)",border:"none",borderRadius:"50%",width:28,height:28,color:"white",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
</div>
):(
<div style={{textAlign:"center",padding:28}}>
<div style={{fontSize:44,marginBottom:10,opacity:0.3}}>📸</div>
<div style={{color:"#475569",fontSize:14,marginBottom:4}}>{s.dropZoneMain}</div>
<div style={{color:"#94A3B8",fontSize:11}}>{s.dropZoneSub}</div>
</div>
)}
</div>
<input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={e=>processFile(e.target.files?.[0])} style={{display:"none"}}/>
{scanError&&<div style={{background:"rgba(204,68,68,0.07)",border:"1px solid rgba(204,68,68,0.2)",borderRadius:12,padding:"10px 14px",marginBottom:12,color:"#DC2626",fontSize:12}}>⚠ {scanError}</div>}
{previewUrl&&scanState===SCAN.IDLE&&<button onClick={scanReceipt} style={{width:"100%",background:"linear-gradient(135deg,#2D6A4F,#52B788)",border:"none",borderRadius:16,color:"white",fontWeight:"bold",fontSize:15,padding:"14px",cursor:"pointer",boxShadow:"0 8px 24px rgba(82,183,136,0.3)",fontFamily:"Arial,sans-serif",marginBottom:10}}>{s.scanAI}</button>}
{scanState===SCAN.SCANNING&&(<div style={{textAlign:"center",padding:16,color:"#40916C"}}><div style={{width:32,height:32,border:"3px solid rgba(116,198,157,0.2)",borderTopColor:"#74C69D",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/><div style={{animation:"pulse 1.5s ease infinite",fontSize:14}}>{s.scanning}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:4}}>{s.scanningsSub}</div></div>)}
{scanState===SCAN.REVIEW&&extracted&&edited&&(
<div style={{animation:"slideUp 0.4s ease"}}>
<div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
<div style={{background:`${confColor(extracted.confidence)}15`,border:`1px solid ${confColor(extracted.confidence)}55`,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:"bold",color:confColor(extracted.confidence)}}>{confLabel(extracted.confidence)}</div>
{!extracted.tax_claimable&&<div style={{background:"rgba(204,68,68,0.07)",border:"1px solid rgba(204,68,68,0.2)",borderRadius:20,padding:"4px 12px",color:"#DC2626",fontSize:11}}>{s.nonClaimable}</div>}
</div>
{scannedCat&&(
<div style={{background:`${scannedCat.color}10`,border:`1px solid ${scannedCat.color}35`,borderRadius:14,padding:"12px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"flex-start"}}>
<span style={{fontSize:22}}>{scannedCat.icon}</span>
<div><div style={{color:"#1E293B",fontWeight:"bold",fontSize:13}}>{scannedCat[lang]}</div><div style={{color:"#64748B",fontSize:11,marginTop:2,lineHeight:1.5}}>{extracted.category_reason}</div>{scannedCat.limit&&<div style={{color:scannedCat.color,fontSize:11,marginTop:4}}>{s.reliefCap}: RM {scannedCat.limit.toLocaleString()}</div>}</div>
</div>
)}
<div style={{marginBottom:12}}>
{[{label:lang==="ms"?"Pedagang / Butiran":"Merchant / Description",key:"desc",type:"text"},{label:s.dateLabel,key:"date",type:"date"},{label:s.amountLabel,key:"amount",type:"number"}].map(f=>(
<div key={f.key}>
<div style={{color:"#64748B",fontSize:11,marginBottom:4}}>{f.label}</div>
<input type={f.type} value={edited[f.key]} onChange={e=>setEdited({...edited,[f.key]:f.type==="number"?parseFloat(e.target.value)||0:e.target.value})} style={iStyle}/>
</div>
))}
<div style={{color:"#64748B",fontSize:11,marginBottom:4}}>{s.lhdnCategory}</div>
<select value={edited.category} onChange={e=>setEdited({...edited,category:e.target.value})} style={{...iStyle,background:"#F8FAFC"}}>
{TAX_RELIEF_CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.icon} {c[lang]}</option>)}
</select>
</div>
{extracted.items?.length>0&&(<div style={card({marginBottom:12})}><div style={{color:"#64748B",fontSize:11,marginBottom:6}}>{s.itemsDetected}</div>{extracted.items.map((item,i)=><div key={i} style={{color:"#475569",fontSize:12,padding:"3px 0"}}>· {item}</div>)}</div>)}
{extracted.notes&&(<div style={{background:"rgba(116,198,157,0.06)",border:"1px solid rgba(116,198,157,0.18)",borderRadius:12,padding:"10px 14px",marginBottom:14}}><div style={{color:"#40916C",fontSize:11,marginBottom:3}}>{s.lhdnNote}</div><div style={{color:"#64748B",fontSize:11,lineHeight:1.6}}>{extracted.notes}</div></div>)}
<div style={{display:"flex",gap:10}}>
<button onClick={saveScan} style={{flex:2,background:"linear-gradient(135deg,#2D6A4F,#52B788)",border:"none",borderRadius:14,color:"white",fontWeight:"bold",fontSize:14,padding:"14px",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>{s.saveToExp}</button>
<button onClick={resetScan} style={{flex:1,background:"#F1F5F9",border:"1px solid #E2E8F0",borderRadius:14,color:"#64748B",fontSize:13,padding:"14px",cursor:"pointer"}}>{s.discard}</button>
</div>
</div>
)}
{scanState===SCAN.SAVING&&<div style={{textAlign:"center",padding:20,color:"#40916C"}}><div style={{width:28,height:28,border:"3px solid rgba(116,198,157,0.2)",borderTopColor:"#74C69D",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 10px"}}/>{s.saving}</div>}
</div>
)}
</div>
</div>
)}
{showDocAdd&&pendingDoc&&(
<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",borderRadius:32,zIndex:20,display:"flex",alignItems:"flex-end",backdropFilter:"blur(6px)"}}>
<div style={{width:"100%",maxHeight:"92%",background:"#FFFFFF",borderRadius:"24px 24px 32px 32px",padding:"20px 20px 28px",border:"1px solid #E2E8F0",overflowY:"auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
<div style={{color:"#1E293B",fontWeight:"bold",fontSize:16}}>{s.newDoc}</div>
{docExtracting&&<div style={{display:"flex",alignItems:"center",gap:6,color:"#74C69D",fontSize:11}}><div style={{width:14,height:14,border:"2px solid rgba(116,198,157,0.3)",borderTopColor:"#74C69D",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>{s.aiReading}</div>}
{pendingDoc.aiDone&&!pendingDoc.aiError&&<div style={{color:"#40916C",fontSize:11,background:"rgba(116,198,157,0.1)",borderRadius:20,padding:"3px 10px"}}>{s.aiComplete}</div>}
</div>
{pendingDoc.previewUrl&&<img src={pendingDoc.previewUrl} alt="" style={{width:"100%",maxHeight:130,objectFit:"cover",borderRadius:12,marginBottom:12}}/>}
{!pendingDoc.previewUrl&&<div style={{background:"#F8FAFC",borderRadius:12,padding:"14px",marginBottom:12,textAlign:"center"}}><span style={{fontSize:28}}>{fileInfo(pendingDoc.type).icon}</span><div style={{color:"#64748B",fontSize:12,marginTop:6}}>{pendingDoc.file?.name}</div></div>}
{pendingDoc.aiDone&&!pendingDoc.aiError&&pendingDoc.reason&&(
<div style={{background:"rgba(116,198,157,0.06)",border:"1px solid rgba(116,198,157,0.18)",borderRadius:12,padding:"10px 12px",marginBottom:12}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
<span style={{color:"#40916C",fontSize:11,fontWeight:"bold"}}>{s.aiSuggest}</span>
<span style={{fontSize:10,color:confColor(pendingDoc.confidence),background:"#F1F5F9",borderRadius:10,padding:"2px 8px"}}>{confLabel(pendingDoc.confidence)}</span>
</div>
<div style={{color:"#64748B",fontSize:11,lineHeight:1.5}}>{pendingDoc.reason}</div>
</div>
)}
{pendingDoc.aiError&&<div style={{background:"rgba(204,68,68,0.06)",borderRadius:12,padding:"8px 12px",marginBottom:12,color:"#DC2626",fontSize:11}}>{s.aiError}</div>}
<div style={{color:"#64748B",fontSize:11,marginBottom:4}}>{s.docName}</div>
<input value={pendingDoc.name} onChange={e=>setPendingDoc({...pendingDoc,name:e.target.value})} style={iStyle}/>
<div style={{color:"#64748B",fontSize:11,marginBottom:4}}>{s.lhdnCategory}</div>
<select value={pendingDoc.category} onChange={e=>setPendingDoc({...pendingDoc,category:e.target.value})} style={{...iStyle,background:"#F8FAFC"}}>
{DOC_CATS.filter(c=>c.id!=="all").map(c=><option key={c.id} value={c.id}>{c.icon} {c[lang]}</option>)}
</select>
<div style={{color:"#64748B",fontSize:11,marginBottom:4}}>{s.noteLabel}</div>
<input placeholder={s.notePlaceholder} value={pendingDoc.note} onChange={e=>setPendingDoc({...pendingDoc,note:e.target.value})} style={iStyle}/>
<div style={{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:14,padding:"12px 14px",marginBottom:14}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:pendingDoc.isExpense?10:0}}>
<div><div style={{color:"#1E293B",fontSize:13,fontWeight:"500"}}>{s.recordExpense}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>{s.recordSub}</div></div>
<button onClick={()=>setPendingDoc({...pendingDoc,isExpense:!pendingDoc.isExpense})} style={{background:pendingDoc.isExpense?"rgba(116,198,157,0.15)":"#F1F5F9",border:`1px solid ${pendingDoc.isExpense?"rgba(116,198,157,0.4)":"#E2E8F0"}`,borderRadius:20,padding:"6px 16px",color:pendingDoc.isExpense?"#40916C":"#64748B",fontWeight:"bold",fontSize:12,cursor:"pointer"}}>{pendingDoc.isExpense?s.yes:s.no}</button>
</div>
{pendingDoc.isExpense&&(
<div style={{display:"flex",gap:10}}>
<div style={{flex:1}}><div style={{color:"#64748B",fontSize:10,marginBottom:4}}>{s.amountRM}</div><input type="number" value={pendingDoc.amount||""} placeholder="0.00" onChange={e=>setPendingDoc({...pendingDoc,amount:e.target.value})} style={{width:"100%",background:"#FFFFFF",border:"1px solid rgba(116,198,157,0.3)",borderRadius:10,padding:"9px 10px",color:"#1E293B",fontSize:13,boxSizing:"border-box",fontFamily:"Arial,sans-serif"}}/></div>
<div style={{flex:1}}><div style={{color:"#64748B",fontSize:10,marginBottom:4}}>{s.dateLabel}</div><input type="date" value={pendingDoc.docDate||new Date().toISOString().slice(0,10)} onChange={e=>setPendingDoc({...pendingDoc,docDate:e.target.value})} style={{width:"100%",background:"#FFFFFF",border:"1px solid rgba(116,198,157,0.3)",borderRadius:10,padding:"9px 10px",color:"#1E293B",fontSize:13,boxSizing:"border-box"}}/></div>
</div>
)}
</div>
<div style={{display:"flex",gap:10}}>
<button onClick={saveDoc} disabled={docUploading||docExtracting} style={{flex:2,background:(docUploading||docExtracting)?"#F1F5F9":"linear-gradient(135deg,#2D6A4F,#52B788)",border:"none",borderRadius:12,color:(docUploading||docExtracting)?"#94A3B8":"white",fontWeight:"bold",fontSize:14,padding:"13px",cursor:(docUploading||docExtracting)?"not-allowed":"pointer",fontFamily:"Arial,sans-serif"}}>{docUploading?s.savingDoc:docExtracting?s.aiReading:pendingDoc.isExpense?s.saveDocExp:s.saveDoc}</button>
<button onClick={()=>{setShowDocAdd(false);setPendingDoc(null);setDocExtracting(false);}} style={{flex:1,background:"#F1F5F9",border:"1px solid #E2E8F0",borderRadius:12,color:"#64748B",fontSize:13,padding:"13px",cursor:"pointer"}}>{s.batal}</button>
</div>
</div>
</div>
)}
{docPreview&&(
<div onClick={()=>setDocPreview(null)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.92)",borderRadius:32,zIndex:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
<div onClick={e=>e.stopPropagation()} style={{width:"90%",position:"relative"}}>
<img src={docPreview.previewUrl} alt="" style={{width:"100%",maxHeight:"70vh",objectFit:"contain",borderRadius:16}}/>
<div style={{color:"white",textAlign:"center",marginTop:10,fontSize:13}}>{docPreview.name}</div>
<button onClick={()=>setDocPreview(null)} style={{position:"absolute",top:-12,right:-12,background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:32,height:32,color:"white",cursor:"pointer",fontSize:16}}>✕</button>
</div>
</div>
)}
<div style={{textAlign:"center",padding:"6px 0 12px",color:"#CBD5E1",fontSize:9,letterSpacing:1,flexShrink:0}}>{s.footerDocs}</div>
</div>
)}

{showSettings&&(
<div style={{position:"absolute",inset:0,background:"#FFFFFF",borderRadius:32,zIndex:10,display:"flex",flexDirection:"column"}}>
<div style={{background:"linear-gradient(135deg,#0B1E3A 0%,#122A50 60%,#0D2233 100%)",padding:"22px 24px 18px",flexShrink:0}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><div style={{color:"rgba(116,198,157,0.7)",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{s.appName}</div><div style={{color:"white",fontSize:20,fontWeight:"bold",marginTop:3}}>{s.settingsTitle}</div></div>
<button onClick={()=>setShowSettings(false)} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:20,color:"rgba(255,255,255,0.5)",fontSize:11,padding:"5px 12px",cursor:"pointer"}}>✕</button>
</div>
<div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:5}}>{s.settingsSub}</div>
</div>
<div style={{flex:1,overflowY:"auto",padding:"18px 20px 30px"}}>
<div style={{color:"#40916C",fontWeight:"bold",fontSize:13,marginBottom:12}}>{s.profileSection}</div>
<div style={{background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid #E2E8F0"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:10}}>{s.maritalStatus}</div>
<div style={{display:"flex",gap:8}}>
{[["single",s.single],["married",s.married],["divorced",s.divorced]].map(([v,l])=>(
<button key={v} onClick={()=>updateProfile("marital",v)} style={{flex:1,background:profile.marital===v?"rgba(116,198,157,0.15)":"#F1F5F9",border:`1px solid ${profile.marital===v?"rgba(116,198,157,0.4)":"#E2E8F0"}`,borderRadius:12,padding:"9px 4px",color:profile.marital===v?"#40916C":"#64748B",fontSize:11,cursor:"pointer",fontWeight:profile.marital===v?"bold":"normal"}}>{l}</button>
))}
</div>
{profile.marital==="married"&&(
<div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #E2E8F0"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#1E293B",fontSize:13}}>{s.spouseRelief}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{s.spouseReliefSub}</div></div>
<button onClick={()=>updateProfile("spouseHasIncome",!profile.spouseHasIncome)} style={{background:profile.spouseHasIncome?"rgba(204,68,68,0.08)":"rgba(116,198,157,0.12)",border:`1px solid ${profile.spouseHasIncome?"rgba(204,68,68,0.3)":"rgba(116,198,157,0.35)"}`,borderRadius:20,padding:"6px 14px",color:profile.spouseHasIncome?"#DC2626":"#40916C",fontSize:12,fontWeight:"bold",cursor:"pointer"}}>
{profile.spouseHasIncome?s.spouseHasIncomeLabel:"✓ RM4,000"}
</button>
</div>
{!profile.spouseHasIncome&&<div style={{marginTop:8,color:"#40916C",fontSize:12,background:"rgba(116,198,157,0.08)",borderRadius:10,padding:"6px 10px"}}>✓ Pelepasan Isteri/Suami: RM4,000</div>}
</div>
)}
</div>
<div style={{background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid #E2E8F0"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:12}}>{s.childrenSection}</div>
{[{label:s.numChildren,key:"numChildren",rateLabel:s.childRelief,rate:2000,max:10},{label:s.numDisabledChildren,key:"numDisabledChildren",rateLabel:s.disabledChildRelief,rate:6000,max:5}].map(f=>(
<div key={f.key} style={{marginBottom:12}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<div style={{color:"#1E293B",fontSize:13,flex:1}}>{f.label}</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<button onClick={()=>updateProfile(f.key,Math.max(0,profile[f.key]-1))} style={{background:"#F1F5F9",border:"1px solid #E2E8F0",borderRadius:"50%",width:28,height:28,color:"#475569",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
<span style={{color:"#1E293B",fontWeight:"bold",fontSize:16,minWidth:20,textAlign:"center"}}>{profile[f.key]}</span>
<button onClick={()=>updateProfile(f.key,Math.min(f.max,profile[f.key]+1))} style={{background:"rgba(116,198,157,0.12)",border:"1px solid rgba(116,198,157,0.3)",borderRadius:"50%",width:28,height:28,color:"#40916C",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
</div>
</div>
{profile[f.key]>0&&<div style={{color:"#40916C",fontSize:12,background:"rgba(116,198,157,0.08)",borderRadius:10,padding:"5px 10px"}}>✓ {f.rateLabel}: RM {(profile[f.key]*f.rate).toLocaleString()}</div>}
</div>
))}
</div>
<div style={{background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid #E2E8F0"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:10}}>{s.selfSection}</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#1E293B",fontSize:13}}>{s.selfDisabled}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:2}}>{s.selfDisabledSub}</div></div>
<button onClick={()=>updateProfile("selfDisabled",!profile.selfDisabled)} style={{background:profile.selfDisabled?"rgba(116,198,157,0.15)":"#F1F5F9",border:`1px solid ${profile.selfDisabled?"rgba(116,198,157,0.4)":"#E2E8F0"}`,borderRadius:20,padding:"6px 16px",color:profile.selfDisabled?"#40916C":"#64748B",fontWeight:"bold",fontSize:12,cursor:"pointer"}}>
{profile.selfDisabled?"✓ RM6,000":s.no}
</button>
</div>
</div>
<div style={{background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid #E2E8F0"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:10}}>{s.epfSection}</div>
<div style={{color:"#64748B",fontSize:11,marginBottom:8}}>{s.epfRate}</div>
<div style={{display:"flex",gap:8,marginBottom:10}}>
{[9,11,13].map(r=>(
<button key={r} onClick={()=>updateProfile("epfRate",r)} style={{flex:1,background:profile.epfRate===r?"rgba(116,198,157,0.15)":"#F1F5F9",border:`1px solid ${profile.epfRate===r?"rgba(116,198,157,0.4)":"#E2E8F0"}`,borderRadius:12,padding:"9px",color:profile.epfRate===r?"#40916C":"#64748B",fontSize:13,fontWeight:profile.epfRate===r?"bold":"normal",cursor:"pointer"}}>{r}%</button>
))}
</div>
<div style={{background:"rgba(212,175,55,0.04)",borderRadius:10,padding:"8px 12px",fontSize:11,lineHeight:1.8}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#64748B"}}>{s.epfAnnual}</span><span style={{color:"#1E293B"}}>RM {epfContrib.toLocaleString()}</span></div>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#64748B"}}>{s.epfRelief}</span><span style={{color:"#52B788",fontWeight:"bold"}}>RM {epfReliefAmt.toLocaleString()}</span></div>
</div>
<div style={{color:"#94A3B8",fontSize:10,marginTop:6}}>{s.epfNote}</div>
</div>
<div style={{background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:12,border:"1px solid #E2E8F0"}}>
<div style={{color:"#64748B",fontSize:11,marginBottom:10}}>{s.rebateSection}</div>
{[{l:s.rebate400,sub:s.rebate400Sub,v:rebate400,active:rebate400>0},{l:s.spouseRebate400,sub:s.spouseRebate400Sub,v:spouseRebate400,active:spouseRebate400>0}].map((r,i)=>(
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i===0?"1px solid #E2E8F0":"none"}}>
<div><div style={{color:r.active?"#1E293B":"#94A3B8",fontSize:12}}>{r.l}</div><div style={{color:"#94A3B8",fontSize:10,marginTop:1}}>{r.sub}</div></div>
<div style={{color:r.active?"#52B788":"#CBD5E1",fontWeight:"bold",fontSize:13}}>{r.active?`RM ${r.v}`:lang==="ms"?"Tidak layak":"N/A"}</div>
</div>
))}
</div>
<div style={{background:"rgba(116,198,157,0.06)",borderRadius:16,padding:"14px 16px",marginBottom:16,border:"1px solid rgba(116,198,157,0.18)"}}>
<div style={{color:"#40916C",fontWeight:"bold",fontSize:13,marginBottom:10}}>{s.summarySection}</div>
{[{l:lang==="ms"?"Pelepasan Individu":"Personal (Self)",v:9000,show:true},{l:lang==="ms"?"OKU Diri":"Self OKU",v:selfDisRelief,show:selfDisRelief>0},{l:lang==="ms"?"Pelepasan Isteri/Suami":"Spouse Relief",v:spouseReliefAmt,show:spouseReliefAmt>0},{l:lang==="ms"?"Pelepasan Anak":"Child Relief",v:childReliefAmt,show:childReliefAmt>0},{l:lang==="ms"?"Pelepasan Anak OKU":"Disabled Child",v:disChildRelief,show:disChildRelief>0},{l:lang==="ms"?"Caruman KWSP":"EPF Contribution",v:epfReliefAmt,show:true}].filter(r=>r.show).map((r,i)=>(
<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(116,198,157,0.1)"}}>
<span style={{color:"#64748B",fontSize:12}}>{r.l}</span>
<span style={{color:"#1E293B",fontSize:12}}>RM {r.v.toLocaleString()}</span>
</div>
))}
<div style={{display:"flex",justifyContent:"space-between",paddingTop:8,marginTop:4,borderTop:"1px solid rgba(116,198,157,0.2)"}}>
<span style={{color:"#40916C",fontWeight:"bold",fontSize:13}}>{s.totalPersonal}</span>
<span style={{color:"#40916C",fontWeight:"bold",fontSize:15}}>RM {(personalReliefTotal+epfReliefAmt).toLocaleString()}</span>
</div>
</div>
<div style={{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:12,padding:"10px 14px",marginBottom:16}}>
<div style={{color:"#94A3B8",fontSize:10,marginBottom:4}}>{s.settingsNote}</div>
<div style={{color:"#94A3B8",fontSize:11,lineHeight:1.6}}>{s.settingsNoteText}</div>
</div>
<button onClick={saveProfile} style={{width:"100%",background:settingsSaved?"linear-gradient(135deg,#1B4332,#2D6A4F)":"linear-gradient(135deg,#2D6A4F,#52B788)",border:"none",borderRadius:16,color:"white",fontWeight:"bold",fontSize:15,padding:"14px",cursor:"pointer",fontFamily:"Arial,sans-serif",transition:"all 0.4s"}}>
{settingsSaved?s.savedSettings:s.saveSettings}
</button>
</div>
<div style={{textAlign:"center",padding:"8px 0 14px",color:"#CBD5E1",fontSize:9,letterSpacing:1,flexShrink:0}}>{s.footerSettings}</div>
</div>
)}

{showPlan&&(
<div style={{position:"absolute",inset:0,background:"#FFFFFF",borderRadius:32,zIndex:15,display:"flex",flexDirection:"column"}}>
<div style={{background:"linear-gradient(135deg,#0D1B3E 0%,#1B3A6B 60%,#0D2233 100%)",padding:"22px 24px 18px",flexShrink:0}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div>
<div style={{color:"rgba(100,150,255,0.7)",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{s.appName}</div>
<div style={{color:"white",fontSize:20,fontWeight:"bold",marginTop:3}}>{s.planTitle}</div>
<div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:5}}>{s.planSub}</div>
</div>
<button onClick={()=>{setShowPlan(false);resetPlan();}} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:20,color:"rgba(255,255,255,0.5)",fontSize:11,padding:"5px 12px",cursor:"pointer"}}>{s.planClose}</button>
</div>
<div style={{display:"flex",gap:10,marginTop:16}}>
{[
{l:s.planCurrent,v:fmt(taxAfterRebate),c:"#FF6B6B"},
{l:s.planSimulated,v:fmt(planSimTax),c:"#74C69D"},
{l:s.planSaving,v:fmt(planSaving),c:"#D4AF37"},
].map((x,i)=>(
<div key={i} style={{flex:1,background:"rgba(0,0,0,0.3)",borderRadius:12,padding:"10px 10px",border:"1px solid rgba(255,255,255,0.07)"}}>
<div style={{color:"rgba(255,255,255,0.45)",fontSize:9,letterSpacing:0.5,textTransform:"uppercase",marginBottom:4}}>{x.l}</div>
<div style={{color:x.c,fontSize:13,fontWeight:"bold"}}>{x.v}</div>
</div>
))}
</div>
</div>
<div style={{flex:1,overflowY:"auto",padding:"16px 20px 24px"}}>
<div style={{background:"rgba(100,150,255,0.06)",border:"1px solid rgba(100,150,255,0.18)",borderRadius:14,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{color:"#64748B",fontSize:12}}>{s.planEffectiveBracket}</span>
<span style={{color:"#3B6FD4",fontWeight:"bold",fontSize:14}}>{(planMarginalRate*100).toFixed(1)}%</span>
</div>
{TAX_RELIEF_CATEGORIES.filter(c=>c.id!=="other"&&c.id!=="zakat"&&c.id!=="socso").map(cat=>{
const spent=cat.id==="epf"?mergedEpf:(reliefTotals[cat.id]||0);
const cap=cat.limit||0;
const gap=cat.limit?Math.max(0,cap-spent):9999;
const extra=planAmounts[cat.id]||0;
const maxAdd=Math.min(cat.limit?Math.max(0,gap):50000,cat.limit||50000);
const pctBase=cap>0?Math.min(100,(spent/cap)*100):0;
const pctPlan=cap>0?Math.min(100,((spent+extra)/cap)*100):0;
const saving=Math.round(extra*planMarginalRate);
return(
<div key={cat.id} style={{background:"#FFFFFF",borderRadius:16,padding:"14px 16px",marginBottom:10,border:"1px solid #E2E8F0"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{cat.icon}</span><span style={{color:"#1E293B",fontSize:13,fontWeight:"500"}}>{cat[lang]}</span></div>
<div style={{textAlign:"right"}}>
{extra>0&&<div style={{color:"#B7860B",fontSize:10,marginBottom:2}}>+RM{extra.toLocaleString()} → {lang==="ms"?"jimat":"saves"} RM{saving}</div>}
<div style={{color:"#94A3B8",fontSize:11}}>{cat.limit?`RM ${(spent+extra).toLocaleString()} / ${cap.toLocaleString()}`:"No cap"}</div>
</div>
</div>
{cap>0&&(
<div style={{background:"#F1F5F9",borderRadius:6,height:6,overflow:"hidden",marginBottom:8,position:"relative"}}>
<div style={{position:"absolute",left:0,top:0,width:`${pctBase}%`,height:"100%",background:cat.color,borderRadius:6}}/>
{extra>0&&<div style={{position:"absolute",left:`${pctBase}%`,top:0,width:`${pctPlan-pctBase}%`,height:"100%",background:"#D4AF37",borderRadius:6}}/>}
</div>
)}
{maxAdd>0?(
<div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
<span style={{color:"#94A3B8",fontSize:10}}>{s.planAdditional}: RM {extra.toLocaleString()}</span>
{cap>0&&<span style={{color:"#94A3B8",fontSize:10}}>{s.planGap}: RM {Math.max(0,gap-extra).toLocaleString()}</span>}
</div>
<input type="range" min={0} max={maxAdd} step={100} value={extra}
onChange={e=>setPlanAmounts(prev=>({...prev,[cat.id]:parseInt(e.target.value)}))}
style={{width:"100%",accentColor:cat.color}}/>
<div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
<span style={{color:"#CBD5E1",fontSize:10}}>RM 0</span>
<span style={{color:"#CBD5E1",fontSize:10}}>RM {maxAdd.toLocaleString()}</span>
</div>
</div>
):(
<div style={{color:"#52B788",fontSize:11,background:"rgba(82,183,136,0.07)",borderRadius:8,padding:"4px 10px",textAlign:"center"}}>✓ {lang==="ms"?"Had dicapai":"Cap reached"}</div>
)}
</div>
);
})}
{totalPlanExtra>0&&(
<div style={{background:"rgba(212,175,55,0.07)",borderRadius:16,padding:"14px 16px",marginTop:4,border:"1px solid rgba(212,175,55,0.25)"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<span style={{color:"#B7860B",fontWeight:"bold",fontSize:13}}>{s.planSaving}</span>
<span style={{color:"#D4AF37",fontWeight:"bold",fontSize:18}}>RM {Math.round(planSaving).toLocaleString()}</span>
</div>
<div style={{color:"#64748B",fontSize:11}}>{s.planNote}</div>
</div>
)}
<div style={{background:"rgba(100,150,255,0.04)",border:"1px solid rgba(100,150,255,0.15)",borderRadius:14,padding:"14px 16px",marginTop:12,marginBottom:4}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:planSuggestions?12:0}}>
<span style={{color:"#3B6FD4",fontWeight:"bold",fontSize:13}}>{s.planSuggestions}</span>
<button onClick={fetchPlanSuggestions} disabled={planLoading} style={{background:"rgba(100,150,255,0.1)",border:"1px solid rgba(100,150,255,0.25)",borderRadius:20,color:"#3B6FD4",fontSize:11,padding:"5px 12px",cursor:planLoading?"not-allowed":"pointer",fontWeight:"bold"}}>
{planLoading?(
<span style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{width:10,height:10,border:"2px solid rgba(100,150,255,0.25)",borderTopColor:"#3B6FD4",borderRadius:"50%",display:"inline-block",animation:"spin 0.8s linear infinite"}}/>
{s.planLoadingSug}
</span>
):s.planOptimise}
</button>
</div>
{planSuggestions&&planSuggestions.length===0&&<div style={{color:"#64748B",fontSize:12}}>{s.planNoGap}</div>}
{planSuggestions&&planSuggestions.map((sg,i)=>{
const cat=TAX_RELIEF_CATEGORIES.find(c=>c.id===sg.id);
return(
<div key={i} style={{background:"#F8FAFC",borderRadius:12,padding:"10px 12px",marginTop:8,border:"1px solid rgba(100,150,255,0.12)"}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
{cat&&<span style={{fontSize:16}}>{cat.icon}</span>}
<span style={{color:"#1E293B",fontSize:12,fontWeight:"bold"}}>{cat?cat[lang]:sg.id}</span>
{sg.saving>0&&<span style={{marginLeft:"auto",color:"#52B788",fontSize:11,background:"rgba(116,198,157,0.1)",borderRadius:10,padding:"2px 8px"}}>-RM{sg.saving}</span>}
</div>
<div style={{color:"#64748B",fontSize:11,lineHeight:1.6}}>{sg.suggestion}</div>
</div>
);
})}
</div>
</div>
<div style={{padding:"12px 16px 18px",flexShrink:0,borderTop:"1px solid #E2E8F0"}}>
<div style={{display:"flex",gap:10}}>
<button onClick={applyPlan} disabled={Object.values(planAmounts).every(v=>v===0)} style={{flex:2,background:planApplied?"linear-gradient(135deg,#1B4332,#2D6A4F)":Object.values(planAmounts).every(v=>v===0)?"#F1F5F9":"linear-gradient(135deg,#1B3A6B,#2952A3)",border:"none",borderRadius:14,color:Object.values(planAmounts).every(v=>v===0)?"#94A3B8":"white",fontWeight:"bold",fontSize:14,padding:"13px",cursor:Object.values(planAmounts).every(v=>v===0)?"not-allowed":"pointer",fontFamily:"Arial,sans-serif",transition:"all 0.4s"}}>
{planApplied?s.planApplied:s.planApply}
</button>
<button onClick={resetPlan} style={{flex:1,background:"#F1F5F9",border:"1px solid #E2E8F0",borderRadius:14,color:"#64748B",fontSize:13,padding:"13px",cursor:"pointer"}}>{s.planReset}</button>
</div>
</div>
<div style={{textAlign:"center",padding:"4px 0 10px",color:"#CBD5E1",fontSize:9,letterSpacing:1,flexShrink:0}}>{s.footerPlan}</div>
</div>
)}

{showKebabMenu&&(
<div onClick={()=>setShowKebabMenu(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",borderRadius:32,zIndex:60,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
<div onClick={e=>e.stopPropagation()} style={{background:"#FFFFFF",borderRadius:"24px 24px 0 0",padding:"12px 20px 32px",animation:"slideUp 0.25s ease"}}>
<div style={{width:36,height:4,background:"#E2E8F0",borderRadius:2,margin:"0 auto 20px"}}/>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
<button onClick={()=>{setShowKebabMenu(false);setShowDocs(true);}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",border:"1px solid #E2E8F0",background:"#F8FAFC",borderRadius:16,cursor:"pointer",width:"100%",textAlign:"left",fontFamily:"Arial,sans-serif"}}>
<span style={{fontSize:24}}>🗂️</span>
<div style={{flex:1}}><div style={{color:"#1E293B",fontWeight:"bold",fontSize:14}}>{s.docsTitle}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>{s.docsSub(docs.length)}</div></div>
<span style={{color:"#94A3B8",fontSize:20}}>›</span>
</button>
<button onClick={()=>{setShowKebabMenu(false);setShowSettings(true);}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",border:"1px solid #E2E8F0",background:"#F8FAFC",borderRadius:16,cursor:"pointer",width:"100%",textAlign:"left",fontFamily:"Arial,sans-serif"}}>
<span style={{fontSize:24}}>⚙️</span>
<div style={{flex:1}}><div style={{color:"#1E293B",fontWeight:"bold",fontSize:14}}>{s.settingsTitle}</div><div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>{s.settingsSub}</div></div>
<span style={{color:"#94A3B8",fontSize:20}}>›</span>
</button>
</div>
</div>
</div>
)}

</div>
)}
</div>
);
}
