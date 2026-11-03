/**
 * SmartStock ERP - Khema Digital Dental Solution Core Engine
 * Unified Interactivity, Official Purchase Request Form (Version 1.1),
 * Dynamic Role Switcher, Excel Export/Import, Live Filtering & Toast Alerts.
 */
(function() {
  'use strict';

  // 12 Core System Modules
  const MODULES = [
    { id: 'dashboard', dir: 'inventory_dashboard', file: 'code.html', nameKh: 'ផ្ទាំងគ្រប់គ្រងទូទៅ', nameEn: 'Executive Dashboard', icon: 'grid_view', cat: 'ប្រតិបត្តិការ (Operations)' },
    { id: 'inventory-items', dir: 'inventory_items', file: 'code.html', nameKh: 'ទំនិញក្នុងស្តុក', nameEn: 'Inventory Items & Catalog', icon: 'warehouse', cat: 'ប្រតិបត្តិការ (Operations)' },
    { id: 'stock-movements', dir: 'stock_movements', file: 'code.html', nameKh: 'ចរន្តស្តុក នាំចូល/បញ្ចេញ', nameEn: 'Stock Movements (In/Out)', icon: 'sync_alt', cat: 'ប្រតិបត្តិការ (Operations)' },
    { id: 'stock-adjustments', dir: 'stock_adjustment', file: 'code.html', nameKh: 'ការកែតម្រូវ និងរាប់ស្តុក', nameEn: 'Stock Adjustment & Count', icon: 'fact_check', cat: 'ប្រតិបត្តិការ (Operations)' },
    { id: 'requisitions', dir: 'material_requisition_multi_level_approval', file: 'code.html', nameKh: 'ការស្នើសុំដកទំនិញ & អនុម័ត', nameEn: 'Material Requisition & Approval', icon: 'assignment_turned_in', cat: 'ប្រតិបត្តិការ (Operations)' },
    { id: 'suppliers-and-purchases', dir: 'suppliers_purchase_orders', file: 'code.html', nameKh: 'អ្នកផ្គត់ផ្គង់ & បញ្ជាទិញ (PO)', nameEn: 'Suppliers & Purchase Orders', icon: 'local_shipping', cat: 'ប្រតិបត្តិការ (Operations)' },
    { id: 'excel-import', dir: 'excel_excel_import', file: 'code.html', nameKh: 'នាំចូលទិន្នន័យពី Excel', nameEn: 'Excel Bulk Data Import', icon: 'upload_file', cat: 'ឧបករណ៍ (Tools)' },
    { id: 'roles-and-permissions', dir: 'roles_permissions', file: 'code.html', nameKh: 'ការកំណត់តួនាទី & សិទ្ធិ', nameEn: 'Roles & Permissions', icon: 'admin_panel_settings', cat: 'រដ្ឋបាល & សវនកម្ម (Admin)' },
    { id: 'audit-logs', dir: 'audit_login_logs', file: 'code.html', nameKh: 'កំណត់ត្រាសវនកម្ម', nameEn: 'Audit & Login Logs', icon: 'history', cat: 'រដ្ឋបាល & សវនកម្ម (Admin)' },
    { id: 'security-report', dir: 'monthly_security_audit_report', file: 'code.html', nameKh: 'របាយការណ៍សវនកម្មសុវត្ថិភាព', nameEn: 'Monthly Security Audit Report', icon: 'security', cat: 'រដ្ឋបាល & សវនកម្ម (Admin)' },
    { id: 'settings', dir: 'system_warehouse_settings', file: 'code.html', nameKh: 'ការកំណត់ប្រព័ន្ធ & ឃ្លាំង', nameEn: 'System & Warehouse Settings', icon: 'settings', cat: 'រដ្ឋបាល & សវនកម្ម (Admin)' },
    { id: 'login', dir: 'role_login_switch_account', file: 'code.html', nameKh: 'ច្រកចូលប្រព័ន្ធ / ប្តូរតួនាទី', nameEn: 'Role Login & Switch Account', icon: 'switch_account', cat: 'គណនី (Authentication)' }
  ];

  // Khema Digital Dental Solution - Departments & Preset Catalog
  const KHEMA_DEPARTMENTS = [
    { id: 'molding', nameKh: 'ផ្នែកចាក់ពុម្ព (Molding Dept)' },
    { id: 'metal', nameKh: 'ផ្នែកឆាបដែក (Metal Grinding Dept)' },
    { id: 'wax', nameKh: 'ផ្នែកក្រមួន (Wax Dept)' },
    { id: 'ceramic_grinding', nameKh: 'ផ្នែកឆាបសេរ៉ាមិច (Ceramic Grinding Dept)' },
    { id: 'ceramic_buildup', nameKh: 'ផ្នែកសេរ៉ាមិចបៀល (Ceramic Build-up Dept)' },
    { id: 'digital', nameKh: 'ផ្នែកDigital (CAD/CAM Dept)' },
    { id: 'denture', nameKh: 'ផ្នែកDenture (Denture Dept)' }
  ];

  const KHEMA_CATALOG = {
    molding: [
      { name: 'ម្សៅពុម្ពថ្មបៃតង GC Fuji (Green Stone)', unit: 'ធុង', price: 45.00, supplier: 'Bayon Dental Supply' },
      { name: 'ម្សៅពុម្ពថ្មលឿង Type 3 Stone', unit: 'ធុង', price: 35.00, supplier: 'RMS Dental Supply' },
      { name: 'ដីស្អិត Base Wax / Clay', unit: 'ដុំ', price: 3.50, supplier: 'DK Dental Supply' },
      { name: 'ជ័រ Red Resin Pattern', unit: 'ដប', price: 18.00, supplier: 'Camdent Pro' },
      { name: 'ម្ជុលចាក់ពុម្ព Dowel Pin (1000pcs)', unit: 'ប្រអប់', price: 22.00, supplier: 'Lay Srue Dental' },
      { name: 'ទឹក Hardener លាបពុម្ព', unit: 'ដប', price: 12.00, supplier: 'Aone Dental Supply' },
      { name: 'ស្កុតក្រដាស Paper Tape 24mm', unit: 'ដុំ', price: 1.20, supplier: 'បណ្ណាគារ' },
      { name: 'ជ័រស្អិត Sticky Wax', unit: 'ប្រអប់', price: 6.50, supplier: 'Camdent Pro' }
    ],
    metal: [
      { name: 'ដែកសេរ៉ាមិច Co-Cr Ceramic Alloy (1kg)', unit: 'ប្រអប់', price: 120.00, supplier: 'RMS Dental Supply' },
      { name: 'គ្រាប់ខ្សាច់ Sandblast 50um (5kg)', unit: 'ធុង', price: 28.00, supplier: 'Bayon Dental Supply' },
      { name: 'គ្រាប់ខ្សាច់ Sandblast 110um (5kg)', unit: 'ធុង', price: 28.00, supplier: 'Bayon Dental Supply' },
      { name: 'ក្បាលឆាបពេជ្រ Diamond Disc/Bur (5pcs)', unit: 'ប្រអប់', price: 15.00, supplier: 'Camdent Pro' },
      { name: 'ក្បាលខាត់កៅស៊ូ Rubber Wheel (100pcs)', unit: 'ប្រអប់', price: 16.50, supplier: 'DK Dental Supply' },
      { name: 'ថាសកាត់ដែក Cutting Disc 0.5mm (100pcs)', unit: 'ប្រអប់', price: 25.00, supplier: 'RMS Dental Supply' }
    ],
    wax: [
      { name: 'ក្រមួនបន្ទះ Base Plate Wax (500g)', unit: 'ប្រអប់', price: 8.50, supplier: 'Bayon Dental Supply' },
      { name: 'ក្រមួនឆ្លាក់ Inlay Wax Blue/Green', unit: 'កំប៉ុង', price: 12.00, supplier: 'Camdent Pro' },
      { name: 'ក្រមួនបាញ់ Spruing Wax Wire 2.5mm/3.0mm', unit: 'ដុំ', price: 14.00, supplier: 'DK Dental Supply' },
      { name: 'កូនចានលាយក្រមួន Wax Pot', unit: 'គ្រឿង', price: 25.00, supplier: 'RMS Dental Supply' }
    ],
    ceramic_grinding: [
      { name: 'ក្បាលឆាប Diamond Bur Zirconia Grinder (3pcs)', unit: 'ប្រអប់', price: 32.00, supplier: 'Camdent Pro' },
      { name: 'ក្បាលខាត់ Ceramic Polisher Fine/Medium (6pcs)', unit: 'ឈុត', price: 24.00, supplier: 'Lay Srue Dental' },
      { name: 'ថាសកាត់ Zirconia Diamond Disc (5pcs)', unit: 'ប្រអប់', price: 38.00, supplier: 'Bayon Dental Supply' }
    ],
    ceramic_buildup: [
      { name: 'ម្សៅសេរ៉ាមិច Noritake Super Porcelain EX-3 (50g)', unit: 'ដប', price: 48.00, supplier: 'Camdent Pro' },
      { name: 'ទឹកបៀល Noritake Liquid Form (100ml)', unit: 'ដប', price: 18.00, supplier: 'Camdent Pro' },
      { name: 'ជក់បៀល Kolinsky Ceramic Brush #6, #8', unit: 'ដើម', price: 26.00, supplier: 'RMS Dental Supply' },
      { name: 'ថាសលាយម្សៅ Agate Mixing Palette', unit: 'ផ្ទាំង', price: 55.00, supplier: 'Bayon Dental Supply' },
      { name: 'ថ្នាំពណ៌ Stains & Glaze Kit', unit: 'ឈុត', price: 180.00, supplier: 'Camdent Pro' }
    ],
    digital: [
      { name: 'ដុំ Zirconia Block ST/HT Multilayer 98x14mm', unit: 'ដុំ', price: 65.00, supplier: 'Camdent Pro' },
      { name: 'ដុំ Zirconia Block ST/HT Multilayer 98x18mm', unit: 'ដុំ', price: 78.00, supplier: 'Camdent Pro' },
      { name: 'ដុំ Wax Blank CAD/CAM 98x16mm', unit: 'ដុំ', price: 18.00, supplier: 'RMS Dental Supply' },
      { name: 'ដុំ PMMA Blank A2 98x16mm', unit: 'ដុំ', price: 22.00, supplier: 'Bayon Dental Supply' },
      { name: 'ក្បាល Milling Bur 0.6mm', unit: 'ដើម', price: 25.00, supplier: 'Camdent Pro' },
      { name: 'ក្បាល Milling Bur 1.0mm', unit: 'ដើម', price: 25.00, supplier: 'Camdent Pro' },
      { name: 'ក្បាល Milling Bur 2.0mm', unit: 'ដើម', price: 28.00, supplier: 'Camdent Pro' },
      { name: 'ទឹកជ្រលក់ពណ៌ Color Liquid 16 Vita Shades', unit: 'ឈុត', price: 210.00, supplier: 'Camdent Pro' },
      { name: 'ជ័រ 3D Resin Model / Surgical Guide (1kg)', unit: 'ដប', price: 75.00, supplier: 'DK Dental Supply' }
    ],
    denture: [
      { name: 'ធ្មេញជ័រ Acrylic Teeth (ឈុតពេញ)', unit: 'ឈុត', price: 14.00, supplier: 'Lay Srue Dental' },
      { name: 'ម្សៅដាំជ័រ Acron Cold Cure (1kg)', unit: 'កំប៉ុង', price: 32.00, supplier: 'Bayon Dental Supply' },
      { name: 'ម្សៅដាំជ័រ Heat Cure Powder (1kg)', unit: 'កំប៉ុង', price: 35.00, supplier: 'RMS Dental Supply' },
      { name: 'ទឹកដាំជ័រ Liquid Monomer (500ml)', unit: 'ដប', price: 16.00, supplier: 'Bayon Dental Supply' },
      { name: 'ក្រដាសខាត់ Sandpaper #240, #400, #800', unit: 'កញ្ចប់', price: 6.50, supplier: 'គ្រឿងសំណង់' },
      { name: 'ម្សៅខាត់កំបោរ Pumice Powder (5kg)', unit: 'ធុង', price: 15.00, supplier: 'DK Dental Supply' }
    ]
  };

  // User Profiles Definition
  const PROFILES = [
    { name: 'Sokha Chan', role: 'ADMIN', titleKh: 'អ្នកគ្រប់គ្រងជាន់ខ្ពស់', email: 'sokha.chan@smartstock.kh', avatar: 'person' },
    { name: 'Vireak Rith', role: 'MANAGER', titleKh: 'ប្រធានឃ្លាំងទូទៅ', email: 'vireak.rith@smartstock.kh', avatar: 'engineering' },
    { name: 'Thida Mao', role: 'STAFF', titleKh: 'បុគ្គលិកបញ្ចេញ/បញ្ចូលស្តុក', email: 'thida.mao@smartstock.kh', avatar: 'badge' },
    { name: 'Kosal An', role: 'AUDITOR', titleKh: 'អ្នកសវនកម្មទិន្នន័យ', email: 'kosal.an@smartstock.kh', avatar: 'verified_user' }
  ];

  function getCurrentUser() {
    try {
      const saved = localStorage.getItem('khema_current_user');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return PROFILES[0];
  }

  function setCurrentUser(profile) {
    try {
      localStorage.setItem('khema_current_user', JSON.stringify(profile));
    } catch(e) {}
  }

  function getModuleUrl(targetId) {
    const mod = MODULES.find(m => m.id === targetId || m.dir === targetId);
    if (!mod) return '#';
    const path = window.location.pathname.replace(/\\/g, '/');
    const isInsideSubfolder = path.includes('/code.html') || 
      MODULES.some(m => path.includes('/' + m.dir + '/'));
    return isInsideSubfolder ? `../${mod.dir}/${mod.file}` : `./${mod.dir}/${mod.file}`;
  }

  function getPortalUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const isInsideSubfolder = path.includes('/code.html') || 
      MODULES.some(m => path.includes('/' + m.dir + '/'));
    return isInsideSubfolder ? '../index.html' : './index.html';
  }

  // Toast Notification System
  function showToast(title, message, type = 'info') {
    let container = document.getElementById('khema-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'khema-toast-container';
      container.className = 'fixed bottom-5 right-5 z-[99999] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xl transition-all duration-300 transform translate-y-3 opacity-0';

    const colors = {
      success: { border: 'border-emerald-500', text: 'text-emerald-600', icon: 'check_circle' },
      error: { border: 'border-rose-500', text: 'text-rose-600', icon: 'error' },
      warning: { border: 'border-amber-500', text: 'text-amber-600', icon: 'warning' },
      info: { border: 'border-blue-500', text: 'text-blue-600', icon: 'info' }
    };
    const c = colors[type] || colors.info;

    toast.classList.add(c.border);
    toast.innerHTML = `
      <span class="material-symbols-outlined ${c.text} text-[22px] flex-shrink-0 mt-0.5">${c.icon}</span>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 leading-snug">${title}</h4>
        <p class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">${message}</p>
      </div>
      <button class="text-slate-400 hover:text-slate-600 p-0.5" onclick="this.parentElement.remove()">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    });

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  // Setup Global Module Navigation
  function setupNavigation() {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const currentModule = MODULES.find(m => currentPath.includes('/' + m.dir + '/')) || MODULES[0];

    // Map navigation links
    document.querySelectorAll('nav a, aside nav a').forEach(a => {
      const dataPath = a.getAttribute('data-path');
      const href = a.getAttribute('href');
      let target = null;

      if (dataPath) {
        target = MODULES.find(m => m.id === dataPath || m.dir === dataPath);
      } else if (href && (href.startsWith('#') || href.startsWith('/'))) {
        const text = a.textContent.toLowerCase();
        if (text.includes('dashboard') || text.includes('ទូទៅ')) target = MODULES[0];
        else if (text.includes('item') || text.includes('ទំនិញ')) target = MODULES[1];
        else if (text.includes('movement') || text.includes('ចរន្ត')) target = MODULES[2];
        else if (text.includes('adjust') || text.includes('កែតម្រូវ')) target = MODULES[3];
        else if (text.includes('requisi') || text.includes('ស្នើសុំ')) target = MODULES[4];
        else if (text.includes('supplier') || text.includes('ផ្គត់ផ្គង់') || text.includes('po')) target = MODULES[5];
        else if (text.includes('excel') || text.includes('នាំចូល')) target = MODULES[6];
        else if (text.includes('role') || text.includes('តួនាទី')) target = MODULES[7];
        else if (text.includes('audit') || text.includes('សវនកម្ម')) target = MODULES[8];
        else if (text.includes('security') || text.includes('សុវត្ថិភាព')) target = MODULES[9];
        else if (text.includes('setting') || text.includes('កំណត់ប្រព័ន្ធ')) target = MODULES[10];
        else if (text.includes('login') || text.includes('ប្តូរ')) target = MODULES[11];
      }

      if (target) {
        a.setAttribute('href', getModuleUrl(target.id));
        if (target.id === currentModule.id) {
          a.classList.add('bg-primary-container', 'text-on-primary', 'font-title-md', 'shadow-sm');
          a.classList.remove('text-on-surface-variant');
        }
      }
    });

    // Make Logo clickable to portal
    const logoEl = document.querySelector('aside .h-16, header .h-16');
    if (logoEl) {
      logoEl.style.cursor = 'pointer';
      logoEl.setAttribute('title', 'ទៅកាន់គេហទំព័រដើម (Go to Hub Portal)');
      logoEl.addEventListener('click', () => {
        window.location.href = getPortalUrl();
      });
    }
  }

  // Setup User Profile Display & Switcher Dropdown
  function setupUserMenu() {
    const userContainer = document.querySelector('header .flex.items-center.gap-space-sm.pl-space-sm, header .cursor-pointer');
    if (!userContainer) return;

    const user = getCurrentUser();
    const nameEl = userContainer.querySelector('.font-title-md, .font-semibold');
    const badgeEl = userContainer.querySelector('.text-\\[10px\\], .bg-surface-container-high');
    const titleEl = userContainer.querySelector('.font-label-sm, .text-\\[11px\\]');

    if (nameEl) nameEl.textContent = user.name;
    if (badgeEl) badgeEl.textContent = user.role;
    if (titleEl) titleEl.textContent = user.titleKh;

    // Dropdown for switching roles
    const menu = document.createElement('div');
    menu.id = 'khema-user-dropdown';
    menu.className = 'hidden absolute top-14 right-6 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150';
    menu.innerHTML = `
      <div class="px-3.5 py-2 border-b border-slate-100">
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ប្តូរគណនី (Switch Profile)</p>
        <p class="text-xs font-semibold text-slate-800 mt-0.5">${user.name} (${user.role})</p>
      </div>
      <div class="py-1">
        ${PROFILES.map(p => `
          <button class="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${p.role === user.role ? 'bg-primary/5 font-semibold text-primary' : 'text-slate-700'}" data-role="${p.role}">
            <div>
              <p class="text-xs">${p.name} <span class="text-[10px] px-1 rounded bg-slate-100 text-slate-600">${p.role}</span></p>
              <p class="text-[10px] text-slate-500">${p.titleKh}</p>
            </div>
            ${p.role === user.role ? '<span class="material-symbols-outlined text-[16px] text-primary">check</span>' : ''}
          </button>
        `).join('')}
      </div>
      <div class="border-t border-slate-100 pt-1 mt-1">
        <a href="${getModuleUrl('login')}" class="w-full block px-3.5 py-1.5 text-xs text-secondary hover:bg-slate-50 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">switch_account</span>
          <span>ទំព័រគ្រប់គ្រងគណនីពេញលេញ</span>
        </a>
      </div>
    `;

    userContainer.style.position = 'relative';
    document.body.appendChild(menu);

    userContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = userContainer.getBoundingClientRect();
      menu.style.top = `${rect.bottom + 6}px`;
      menu.style.left = `${rect.right - 256}px`;
      menu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !userContainer.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });

    menu.querySelectorAll('button[data-role]').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        const chosen = PROFILES.find(p => p.role === role);
        if (chosen) {
          setCurrentUser(chosen);
          showToast('បានប្តូរតួនាទីជោគជ័យ', `ឥឡូវនេះអ្នកកំពុងប្រើជា ${chosen.name} (${chosen.role})`, 'success');
          setTimeout(() => window.location.reload(), 400);
        }
      });
    });
  }

  // Live Search Across Tables
  function setupLiveSearch() {
    const searchInputs = document.querySelectorAll('header input[type="text"], input[placeholder*="ស្វែងរក"]');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const tables = document.querySelectorAll('table tbody');
        if (!tables.length) return;

        tables.forEach(tbody => {
          tbody.querySelectorAll('tr').forEach(row => {
            const text = row.textContent.toLowerCase();
            if (!query || text.includes(query)) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
          });
        });
      });
    });
  }

  // Export Table to UTF-8 CSV with Khmer support
  function setupExcelExport() {
    document.querySelectorAll('button').forEach(btn => {
      const t = btn.textContent.toLowerCase();
      if ((t.includes('excel') && t.includes('នាំចេញ')) || t.includes('download excel') || t.includes('export') || btn.id === 'btnExport') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          exportActiveTableToCSV();
        });
      }
    });
  }

  function exportActiveTableToCSV() {
    const table = document.querySelector('table');
    if (!table) {
      showToast('ទិន្នន័យ', 'មិនមានតារាងទិន្នន័យនៅលើទំព័រនេះទេ', 'warning');
      return;
    }

    let csvContent = '\uFEFF'; // UTF-8 BOM for Microsoft Excel Khmer readability
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
      if (row.style.display === 'none') return;
      const cols = row.querySelectorAll('th, td');
      const rowData = [];
      cols.forEach(col => {
        if (col.querySelector('button') && col.textContent.trim().length < 5) return;
        let text = col.innerText.replace(/"/g, '""').replace(/\r?\n|\r/g, ' ').trim();
        rowData.push(`"${text}"`);
      });
      if (rowData.length > 0) {
        csvContent += rowData.join(',') + '\r\n';
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const filename = `Khema_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('នាំចេញជោគជ័យ', `បានរក្សាទុកឯកសារ: ${filename}`, 'success');
  }

  // Quick Excel Import Modal
  function setupExcelImportModal() {
    document.querySelectorAll('button').forEach(btn => {
      const t = btn.textContent.toLowerCase();
      if ((t.includes('excel') && t.includes('នាំចូល')) || t.includes('quick import') || btn.id === 'open-import-modal') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openImportModal();
        });
      }
    });
  }

  function openImportModal() {
    let modal = document.getElementById('khema-import-dialog');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'khema-import-dialog';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">upload_file</span>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">នាំចូលទិន្នន័យ Excel / CSV</h3>
                <p class="text-[11px] text-slate-500">ជ្រើសរើសឯកសារទិន្នន័យសម្ភារៈ ឬបញ្ជីស្តុក</p>
              </div>
            </div>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600" onclick="document.getElementById('khema-import-dialog').classList.add('hidden')">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div class="my-5 border-2 border-dashed border-slate-200 hover:border-secondary rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50">
            <input type="file" id="khema-file-input" accept=".csv, .xlsx, .xls" class="hidden"/>
            <span class="material-symbols-outlined text-secondary text-[40px] mb-2">cloud_upload</span>
            <p class="text-xs font-semibold text-slate-800">ចុចទីនេះ ឬទម្លាក់ឯកសារ Excel/CSV មកទីនេះ</p>
            <p class="text-[10px] text-slate-400 mt-1">គាំទ្រទម្រង់ .xlsx, .xls, .csv (UTF-8)</p>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button class="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100" onclick="document.getElementById('khema-import-dialog').classList.add('hidden')">បោះបង់</button>
            <button id="khema-btn-confirm-import" class="px-4 py-2 text-xs font-semibold rounded-lg bg-secondary text-white hover:bg-secondary/90 shadow-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">check</span>
              <span>ចាប់ផ្តើមនាំចូល (Start Import)</span>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const dropArea = modal.querySelector('.border-dashed');
      const fileInput = modal.querySelector('#khema-file-input');
      dropArea.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          dropArea.querySelector('p.font-semibold').textContent = `ឯកសារ: ${fileInput.files[0].name}`;
        }
      });

      modal.querySelector('#khema-btn-confirm-import').addEventListener('click', () => {
        modal.classList.add('hidden');
        showToast('ដំណើរការជោគជ័យ', 'ទិន្នន័យ Excel ត្រូវបានត្រួតពិនិត្យ និងបញ្ចូលទៅក្នុងប្រព័ន្ធ SmartStock ដោយជោគជ័យ', 'success');
      });
    }
    modal.classList.remove('hidden');
  }

  // =========================================================================
  // KHEMA DIGITAL DENTAL SOLUTION - OFFICIAL PURCHASE REQUEST (VERSION 1.1)
  // =========================================================================
  function setupOfficialPurchaseRequestModal() {
    let modal = document.getElementById('khema-official-pr-modal');
    if (modal) return;

    modal = document.createElement('div');
    modal.id = 'khema-official-pr-modal';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 md:p-6 overflow-y-auto';

    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <!-- Action Control Top Header (Hidden in Print) -->
        <div class="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-amber-400 text-[22px]">verified</span>
            <div>
              <h2 class="text-xs font-bold tracking-wide uppercase">KHEMA DIGITAL DENTAL SOLUTION</h2>
              <p class="text-[11px] text-slate-300">ទម្រង់ផ្លូវការប័ណ្ណស្នើសុំទិញទំនិញ · PURCHASE REQUEST FORM (Version 1.1)</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="pr-btn-print" class="px-3.5 py-1.5 bg-secondary text-white hover:bg-secondary/90 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
              <span class="material-symbols-outlined text-[16px]">print</span>
              <span>បោះពុម្ពប័ណ្ណ (Print / PDF)</span>
            </button>
            <button id="pr-btn-close" class="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        <!-- Printable Document Canvas -->
        <div class="p-6 md:p-8 overflow-y-auto max-h-[calc(94vh-65px)] bg-white text-slate-900" id="khema-pr-print-area">
          <!-- Document Header -->
          <div class="border-b-2 border-slate-900 pb-4 mb-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                  <span>ខ</span>
                </div>
                <div>
                  <h1 class="text-base md:text-lg font-black text-primary tracking-tight leading-snug">KHEMA DIGITAL DENTAL SOLUTION (ខេមរា)</h1>
                  <h2 class="text-sm md:text-base font-bold text-slate-800">ប័ណ្ណស្នើសុំទិញទំនិញ / PURCHASE REQUEST</h2>
                </div>
              </div>
              <div class="text-right flex flex-col items-end">
                <span class="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700 uppercase">Version 1.1</span>
                <span class="text-xs font-mono font-semibold text-secondary mt-1" id="pr-doc-id">PR-2026-11-089</span>
              </div>
            </div>
          </div>

          <!-- Document Meta Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl mb-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">ថ្ងៃស្នើសុំ (Request Date):</label>
              <input type="date" id="pr-date" class="w-full h-8 px-2.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"/>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">ផ្នែកស្នើសុំ (Department): *</label>
              <select id="pr-dept-select" class="w-full h-8 px-2 text-xs bg-white border border-slate-300 rounded-lg font-medium">
                ${KHEMA_DEPARTMENTS.map(d => `<option value="${d.id}">${d.nameKh}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">អ្នកស្នើសុំ (Requested by):</label>
              <input type="text" id="pr-requester" class="w-full h-8 px-2.5 text-xs bg-white border border-slate-300 rounded-lg font-medium" value="Sokha Chan (ADMIN)"/>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1">ស្ថានភាពប័ណ្ណ (Status):</label>
              <div class="h-8 px-2.5 bg-amber-50 border border-amber-300 rounded-lg flex items-center justify-between text-xs font-bold text-amber-700">
                <span>កំពុងត្រួតពិនិត្យ (Pending)</span>
                <span class="material-symbols-outlined text-[16px]">hourglass_top</span>
              </div>
            </div>
          </div>

          <!-- Fast Catalog Quick-Picker Toolbar (No-Print) -->
          <div class="p-3 bg-blue-50/70 border border-blue-200 rounded-xl mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 no-print">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[20px]">library_add</span>
              <div>
                <p class="text-xs font-bold text-slate-900">ជ្រើសរើសមុខទំនិញគំរូតាមផ្នែក (Pick from Department Catalog)</p>
                <p class="text-[10px] text-slate-600">ជ្រើសរើសមុខទំនិញធ្មេញពិតប្រាកដដើម្បីបញ្ចូលដោយស្វ័យប្រវត្តិ</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <select id="pr-catalog-picker" class="h-8 px-2.5 text-xs bg-white border border-blue-300 rounded-lg max-w-xs"></select>
              <button id="pr-btn-add-catalog" class="px-3 h-8 bg-primary text-white hover:bg-primary/90 text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-colors">
                <span class="material-symbols-outlined text-[16px]">add</span>
                <span>បញ្ចូល</span>
              </button>
            </div>
          </div>

          <!-- Items Table -->
          <div class="border border-slate-300 rounded-xl overflow-hidden mb-4 shadow-sm">
            <table class="w-full text-left text-xs border-collapse" id="pr-items-table">
              <thead>
                <tr class="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <th class="py-2.5 px-2 text-center w-10 border-r border-slate-300">ល.រ</th>
                  <th class="py-2.5 px-3 border-r border-slate-300">ឈ្មោះសម្ភារៈ (Item Description)</th>
                  <th class="py-2.5 px-2 text-center w-20 border-r border-slate-300">ចំនួនស្នើសុំ</th>
                  <th class="py-2.5 px-2 text-center w-16 border-r border-slate-300">ខ្នាត</th>
                  <th class="py-2.5 px-2 text-center w-20 border-r border-slate-300">ចំនួនអនុម័ត</th>
                  <th class="py-2.5 px-2 text-right w-24 border-r border-slate-300">តម្លៃរាយ ($)</th>
                  <th class="py-2.5 px-2 text-right w-24 border-r border-slate-300">សរុប ($)</th>
                  <th class="py-2.5 px-3 border-r border-slate-300">អ្នកផ្គត់ផ្គង់ (Supplier)</th>
                  <th class="py-2.5 px-3 border-r border-slate-300">សម្គាល់</th>
                  <th class="py-2.5 px-2 text-center w-10 no-print">លុប</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200" id="pr-table-body">
                <!-- Dynamically Populated Rows -->
              </tbody>
              <tfoot>
                <tr class="bg-slate-50 font-bold border-t-2 border-slate-300">
                  <td colspan="6" class="py-2.5 px-4 text-right text-xs text-slate-700">សរុបរួម (Grand Total USD):</td>
                  <td class="py-2.5 px-2 text-right text-sm font-black text-primary font-mono" id="pr-grand-total-usd">$0.00</td>
                  <td colspan="3" class="py-2.5 px-3 text-xs text-slate-500">
                    ស្មើប្រមាណ: <span id="pr-grand-total-khr" class="font-bold text-secondary">0 ៛</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Add Manual Row Button (No-print) -->
          <div class="flex justify-between items-center mb-6 no-print">
            <button id="pr-btn-add-row" class="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-[16px] text-primary">add_circle</span>
              <span>+ បន្ថែមជួរថ្មី (Add Row)</span>
            </button>
            <span class="text-[11px] text-slate-500">* អត្រាប្តូរប្រាក់គិតជាមធ្យម 4,100 KHR / 1 USD</span>
          </div>

          <!-- 5-Level Approval Signatures Section -->
          <div class="border border-slate-300 rounded-xl p-4 bg-slate-50/60 mb-5">
            <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 text-center border-b border-slate-200 pb-2">
              ហត្ថលេខា និងការអនុម័តតាមឋានានុក្រម (Hierarchical Approval Signatures)
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              <!-- Sign 1: Originator -->
              <div class="bg-white p-2.5 border border-slate-200 rounded-lg flex flex-col justify-between text-center relative sign-box" id="sign-originator">
                <div>
                  <p class="text-[11px] font-bold text-slate-900">អ្នកស្នើសុំ</p>
                  <p class="text-[9px] text-slate-500 uppercase">Originator</p>
                </div>
                <div class="h-16 flex items-center justify-center my-1 sign-stamp-area">
                  <span class="text-[10px] text-slate-400 italic">មិនទាន់ចុះហត្ថលេខា</span>
                </div>
                <div>
                  <button class="w-full py-1 text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded text-slate-700 transition-colors no-print btn-sign">ចុចចុះហត្ថលេខា</button>
                  <p class="text-[10px] font-medium text-slate-700 mt-1 border-t border-slate-100 pt-0.5 sign-name">ឈ្មោះ: ....................</p>
                  <p class="text-[9px] text-slate-400 sign-date">កាលបរិច្ឆេទ: .../.../2026</p>
                </div>
              </div>

              <!-- Sign 2: Checked By -->
              <div class="bg-white p-2.5 border border-slate-200 rounded-lg flex flex-col justify-between text-center relative sign-box" id="sign-checker">
                <div>
                  <p class="text-[11px] font-bold text-slate-900">អ្នកត្រួតពិនិត្យ</p>
                  <p class="text-[9px] text-slate-500 uppercase">Checked By</p>
                </div>
                <div class="h-16 flex items-center justify-center my-1 sign-stamp-area">
                  <span class="text-[10px] text-slate-400 italic">មិនទាន់ចុះហត្ថលេខា</span>
                </div>
                <div>
                  <button class="w-full py-1 text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded text-slate-700 transition-colors no-print btn-sign">ចុចចុះហត្ថលេខា</button>
                  <p class="text-[10px] font-medium text-slate-700 mt-1 border-t border-slate-100 pt-0.5 sign-name">ឈ្មោះ: ....................</p>
                  <p class="text-[9px] text-slate-400 sign-date">កាលបរិច្ឆេទ: .../.../2026</p>
                </div>
              </div>

              <!-- Sign 3: Approved By -->
              <div class="bg-white p-2.5 border border-slate-200 rounded-lg flex flex-col justify-between text-center relative sign-box" id="sign-approver">
                <div>
                  <p class="text-[11px] font-bold text-slate-900">អ្នកសម្រេច</p>
                  <p class="text-[9px] text-slate-500 uppercase">Approved By</p>
                </div>
                <div class="h-16 flex items-center justify-center my-1 sign-stamp-area">
                  <span class="text-[10px] text-slate-400 italic">មិនទាន់ចុះហត្ថលេខា</span>
                </div>
                <div>
                  <button class="w-full py-1 text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded text-slate-700 transition-colors no-print btn-sign">ចុចចុះហត្ថលេខា</button>
                  <p class="text-[10px] font-medium text-slate-700 mt-1 border-t border-slate-100 pt-0.5 sign-name">ឈ្មោះ: ....................</p>
                  <p class="text-[9px] text-slate-400 sign-date">កាលបរិច្ឆេទ: .../.../2026</p>
                </div>
              </div>

              <!-- Sign 4: General Manager -->
              <div class="bg-white p-2.5 border border-slate-200 rounded-lg flex flex-col justify-between text-center relative sign-box" id="sign-gm">
                <div>
                  <p class="text-[11px] font-bold text-slate-900">ប្រធានគ្រប់គ្រងទូទៅ</p>
                  <p class="text-[9px] text-slate-500 uppercase">General Manager</p>
                </div>
                <div class="h-16 flex items-center justify-center my-1 sign-stamp-area">
                  <span class="text-[10px] text-slate-400 italic">មិនទាន់ចុះហត្ថលេខា</span>
                </div>
                <div>
                  <button class="w-full py-1 text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded text-slate-700 transition-colors no-print btn-sign">ចុចចុះហត្ថលេខា</button>
                  <p class="text-[10px] font-medium text-slate-700 mt-1 border-t border-slate-100 pt-0.5 sign-name">ឈ្មោះ: ....................</p>
                  <p class="text-[9px] text-slate-400 sign-date">កាលបរិច្ឆេទ: .../.../2026</p>
                </div>
              </div>

              <!-- Sign 5: Purchase Officer -->
              <div class="bg-white p-2.5 border border-slate-200 rounded-lg flex flex-col justify-between text-center relative sign-box" id="sign-purchaser">
                <div>
                  <p class="text-[11px] font-bold text-slate-900">អ្នកទិញទំនិញ</p>
                  <p class="text-[9px] text-slate-500 uppercase">Purchase Officer</p>
                </div>
                <div class="h-16 flex items-center justify-center my-1 sign-stamp-area">
                  <span class="text-[10px] text-slate-400 italic">មិនទាន់ចុះហត្ថលេខា</span>
                </div>
                <div>
                  <button class="w-full py-1 text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded text-slate-700 transition-colors no-print btn-sign">ចុចចុះហត្ថលេខា</button>
                  <p class="text-[10px] font-medium text-slate-700 mt-1 border-t border-slate-100 pt-0.5 sign-name">ឈ្មោះ: ....................</p>
                  <p class="text-[9px] text-slate-400 sign-date">កាលបរិច្ឆេទ: .../.../2026</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Official Document Note (Version 1.1 Mandatory Disclaimer) -->
          <div class="p-3 bg-amber-50 border border-amber-300 rounded-xl text-[11px] text-amber-900 leading-relaxed font-medium">
            <span class="font-bold">បញ្ជាក់៖</span> រាល់ការស្នើសុំទិញសម្ភារៈ នឹងទទួលបានក្នុងរយៈពេលចន្លោះពី ៣ថ្ងៃ ទៅ មួយសប្តាហ៍ ឬ ទៅតាមអីវ៉ាន់ជាក់ស្តែង មានក្នុងស្រុក ឬ ក្រៅស្រុក។
          </div>
        </div>

        <!-- Document Bottom Action Toolbar (No-Print) -->
        <div class="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <span class="material-symbols-outlined text-[18px] text-emerald-600">cloud_done</span>
            <span>ប្រព័ន្ធត្រៀមរក្សាទុកទៅក្នុងបញ្ជីស្នើសុំ និងកំណត់ត្រាស្តុកទូទៅ</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="pr-btn-cancel" class="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-200 transition-colors">បោះបង់</button>
            <button id="pr-btn-submit" class="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5 transition-all">
              <span class="material-symbols-outlined text-[18px]">send</span>
              <span>រក្សាទុក & បញ្ជូនប័ណ្ណស្នើសុំ (Submit Request)</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Attach Event Handlers
    const closeBtn = modal.querySelector('#pr-btn-close');
    const cancelBtn = modal.querySelector('#pr-btn-cancel');
    const printBtn = modal.querySelector('#pr-btn-print');
    const submitBtn = modal.querySelector('#pr-btn-submit');
    const addRowBtn = modal.querySelector('#pr-btn-add-row');
    const deptSelect = modal.querySelector('#pr-dept-select');
    const catalogPicker = modal.querySelector('#pr-catalog-picker');
    const addCatalogBtn = modal.querySelector('#pr-btn-add-catalog');
    const tbody = modal.querySelector('#pr-table-body');
    const dateInput = modal.querySelector('#pr-date');

    // Default Date to today
    dateInput.value = new Date().toISOString().slice(0, 10);

    const closeModal = () => modal.classList.add('hidden');
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Populate Catalog items based on Department
    function updateCatalogPicker() {
      const deptId = deptSelect.value;
      const items = KHEMA_CATALOG[deptId] || [];
      catalogPicker.innerHTML = items.map((it, idx) => `
        <option value="${idx}">${it.name} (${it.unit}) - $${it.price.toFixed(2)}</option>
      `).join('');
    }

    deptSelect.addEventListener('change', () => {
      updateCatalogPicker();
    });
    updateCatalogPicker();

    // Add Row Helper
    let rowCounter = 0;
    function addTableRow(data = {}) {
      rowCounter++;
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors text-slate-800';
      const itemDesc = data.name || '';
      const qtyReq = data.qtyReq !== undefined ? data.qtyReq : 1;
      const unit = data.unit || 'ប្រអប់';
      const qtyAppr = data.qtyAppr !== undefined ? data.qtyAppr : qtyReq;
      const price = data.price !== undefined ? data.price : 0.00;
      const supplier = data.supplier || 'Camdent Pro';
      const remark = data.remark || 'ទំនិញស្តុកបន្ទាន់';

      tr.innerHTML = `
        <td class="py-2 px-2 text-center text-slate-500 font-mono border-r border-slate-200 row-idx">${rowCounter}</td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="text" class="w-full px-2 py-1 bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs font-medium input-name" value="${itemDesc}" placeholder="បញ្ចូលឈ្មោះសម្ភារៈ..."/>
        </td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="number" min="1" class="w-full px-1.5 py-1 text-center bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs font-semibold input-qty" value="${qtyReq}"/>
        </td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="text" class="w-full px-1 py-1 text-center bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs input-unit" value="${unit}"/>
        </td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="number" min="0" class="w-full px-1.5 py-1 text-center bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs font-semibold input-qty-appr" value="${qtyAppr}"/>
        </td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="number" step="0.01" min="0" class="w-full px-1.5 py-1 text-right bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs font-mono font-semibold input-price" value="${price.toFixed(2)}"/>
        </td>
        <td class="py-2 px-2 border-r border-slate-200 text-right font-mono font-bold text-slate-900 row-total">$0.00</td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="text" class="w-full px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs input-supplier" value="${supplier}"/>
        </td>
        <td class="py-2 px-2 border-r border-slate-200">
          <input type="text" class="w-full px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-secondary rounded text-xs input-remark" value="${remark}"/>
        </td>
        <td class="py-2 px-2 text-center no-print">
          <button class="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors btn-del-row" title="លុបជួរ">
            <span class="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </td>
      `;

      tbody.appendChild(tr);

      // Bind dynamic calculations
      const qtyInput = tr.querySelector('.input-qty');
      const priceInput = tr.querySelector('.input-price');
      const delBtn = tr.querySelector('.btn-del-row');

      const calcRow = () => {
        const q = parseFloat(qtyInput.value) || 0;
        const p = parseFloat(priceInput.value) || 0;
        const tot = q * p;
        tr.querySelector('.row-total').textContent = `$${tot.toFixed(2)}`;
        calcGrandTotal();
      };

      qtyInput.addEventListener('input', calcRow);
      priceInput.addEventListener('input', calcRow);
      delBtn.addEventListener('click', () => {
        tr.remove();
        refreshRowIndexes();
        calcGrandTotal();
      });

      calcRow();
    }

    function refreshRowIndexes() {
      tbody.querySelectorAll('tr').forEach((tr, i) => {
        tr.querySelector('.row-idx').textContent = (i + 1);
      });
      rowCounter = tbody.querySelectorAll('tr').length;
    }

    function calcGrandTotal() {
      let sum = 0;
      tbody.querySelectorAll('.row-total').forEach(el => {
        const val = parseFloat(el.textContent.replace('$', '')) || 0;
        sum += val;
      });
      modal.querySelector('#pr-grand-total-usd').textContent = `$${sum.toFixed(2)}`;
      const khr = Math.round(sum * 4100);
      modal.querySelector('#pr-grand-total-khr').textContent = `${khr.toLocaleString()} ៛`;
    }

    // Add row from button
    addRowBtn.addEventListener('click', () => {
      addTableRow();
    });

    // Add preset item from catalog
    addCatalogBtn.addEventListener('click', () => {
      const deptId = deptSelect.value;
      const idx = parseInt(catalogPicker.value);
      const item = (KHEMA_CATALOG[deptId] || [])[idx];
      if (item) {
        addTableRow({
          name: item.name,
          unit: item.unit,
          price: item.price,
          supplier: item.supplier,
          qtyReq: 1,
          remark: 'ស្នើសុំប្រចាំខែ'
        });
        showToast('បានបន្ថែមមុខទំនិញ', `បានបញ្ចូល ${item.name} ទៅក្នុងប័ណ្ណស្នើសុំ`, 'info');
      }
    });

    // Populate initial default 4 rows from Molding & Digital departments
    const defaultMolding = KHEMA_CATALOG.molding[0];
    const defaultDigital = KHEMA_CATALOG.digital[0];
    const defaultMetal = KHEMA_CATALOG.metal[0];
    const defaultBuildup = KHEMA_CATALOG.ceramic_buildup[0];

    addTableRow({ name: defaultMolding.name, unit: defaultMolding.unit, price: defaultMolding.price, supplier: defaultMolding.supplier, qtyReq: 2, remark: 'ប្រញាប់' });
    addTableRow({ name: defaultDigital.name, unit: defaultDigital.unit, price: defaultDigital.price, supplier: defaultDigital.supplier, qtyReq: 3, remark: 'ស្តុកបន្ទាន់' });
    addTableRow({ name: defaultMetal.name, unit: defaultMetal.unit, price: defaultMetal.price, supplier: defaultMetal.supplier, qtyReq: 1, remark: 'ធម្មតា' });
    addTableRow({ name: defaultBuildup.name, unit: defaultBuildup.unit, price: defaultBuildup.price, supplier: defaultBuildup.supplier, qtyReq: 2, remark: 'ស្នើសុំប្រចាំខែ' });

    // Interactive Digital Signature Stamp System
    modal.querySelectorAll('.sign-box').forEach(box => {
      const btn = box.querySelector('.btn-sign');
      const stampArea = box.querySelector('.sign-stamp-area');
      const nameEl = box.querySelector('.sign-name');
      const dateEl = box.querySelector('.sign-date');

      btn.addEventListener('click', () => {
        const user = getCurrentUser();
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        stampArea.innerHTML = `
          <div class="px-2 py-1 bg-emerald-50 border-2 border-emerald-600 rounded-lg text-emerald-800 flex flex-col items-center justify-center shadow-inner animate-in zoom-in-75 duration-150">
            <div class="flex items-center gap-1 font-black text-[10px] text-emerald-700 uppercase tracking-wider">
              <span class="material-symbols-outlined text-[14px]">verified</span>
              <span>APPROVED</span>
            </div>
            <p class="text-[9px] font-bold text-slate-800 leading-tight">${user.name}</p>
            <p class="text-[8px] text-emerald-600 font-mono">${dateStr}</p>
          </div>
        `;

        nameEl.textContent = `ឈ្មោះ: ${user.name}`;
        dateEl.textContent = `កាលបរិច្ឆេទ: ${now.toLocaleDateString('en-GB')}`;
        btn.textContent = 'បានចុះហត្ថលេខា ✓';
        btn.disabled = true;
        btn.className = 'w-full py-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded cursor-default no-print';

        showToast('ចុះហត្ថលេខាជោគជ័យ', `${user.name} បានអនុម័ត និងចុះហត្ថលេខាលើប័ណ្ណស្នើសុំ`, 'success');
      });
    });

    // Print Handling with High-Res Layout
    printBtn.addEventListener('click', () => {
      window.print();
    });

    // Save & Submit Handling
    submitBtn.addEventListener('click', () => {
      const docId = modal.querySelector('#pr-doc-id').textContent;
      const grandTotal = modal.querySelector('#pr-grand-total-usd').textContent;
      const dept = deptSelect.options[deptSelect.selectedIndex].text;

      // Save to localStorage
      try {
        const savedPRs = JSON.parse(localStorage.getItem('khema_saved_prs') || '[]');
        savedPRs.unshift({
          id: docId,
          date: dateInput.value,
          dept: dept,
          requester: modal.querySelector('#pr-requester').value,
          total: grandTotal,
          status: 'បានបញ្ជូន (Submitted)',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('khema_saved_prs', JSON.stringify(savedPRs));
      } catch(e) {}

      modal.classList.add('hidden');
      showToast('រក្សាទុកប័ណ្ណស្នើសុំជោគជ័យ', `ប័ណ្ណ ${docId} ចំនួនទឹកប្រាក់ ${grandTotal} ត្រូវបានបញ្ជូនទៅកាន់ផ្នែកលទ្ធកម្ម និងអ្នកអនុម័ត`, 'success');
    });
  }

  function openPurchaseRequestModal() {
    setupOfficialPurchaseRequestModal();
    const modal = document.getElementById('khema-official-pr-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  // Hook all Purchase Request / Requisition buttons across all 12 modules
  function setupRequisitionTriggers() {
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.toLowerCase();
      if (
        btn.id === 'btnNewReq' ||
        text.includes('ស្នើសុំទំនិញថ្មី') ||
        text.includes('new requisition') ||
        text.includes('បង្កើតប័ណ្ណស្នើសុំ') ||
        text.includes('បង្កើតប័ណ្ណបញ្ជាទិញថ្មី') ||
        (text.includes('កត់ត្រាទំនិញចេញ') && text.includes('stock out'))
      ) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openPurchaseRequestModal();
        });
      }
    });

    // Stock In buttons
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.toLowerCase();
      if (text.includes('កត់ត្រាទំនិញចូល') || text.includes('stock in')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          showStockInPrompt();
        });
      }
    });

    // Table Approval & Rejection buttons
    document.querySelectorAll('button#btnApproveRequisition, button:has(.material-symbols-outlined:contains("check_circle"))').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('អនុម័តរួចរាល់', 'ប័ណ្ណស្នើសុំត្រូវបានអនុម័ត និងបញ្ជូនបន្តទៅកាន់ប្រធានឃ្លាំង', 'success');
        updateRowStatus(btn, 'បានអនុម័ត (Approved)', 'bg-emerald-100 text-emerald-800');
      });
    });

    document.querySelectorAll('button#btnRejectRequisition, button:has(.material-symbols-outlined:contains("cancel"))').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('បដិសេធ', 'ប័ណ្ណស្នើសុំត្រូវបានបដិសេធ', 'error');
        updateRowStatus(btn, 'បដិសេធ (Rejected)', 'bg-rose-100 text-rose-800');
      });
    });

    // Notification bell button
    const notifBtn = document.querySelector('button[aria-label="Notifications"]');
    if (notifBtn) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNotificationsDropdown(notifBtn);
      });
    }

    // Warehouse sync button
    const syncBtn = document.querySelector('button[aria-label="Warehouse Sync"]');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        const icon = syncBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.classList.add('animate-spin');
        setTimeout(() => {
          if (icon) icon.classList.remove('animate-spin');
          showToast('សមកាលកម្មទិន្នន័យ', 'ទិន្នន័យឃ្លាំងកណ្តាលភ្នំពេញ (Hub Terminal 01) ត្រូវបាន Sync ជោគជ័យ', 'success');
        }, 800);
      });
    }
  }

  function updateRowStatus(btn, text, classList) {
    const tr = btn.closest('tr');
    if (!tr) return;
    const badge = tr.querySelector('.rounded-full, .px-2\\.5, .px-2, span[class*="rounded"]');
    if (badge) {
      badge.textContent = text;
      badge.className = `px-2.5 py-0.5 rounded-full text-xs font-bold ${classList}`;
    }
  }

  function showStockInPrompt() {
    const item = prompt('បញ្ចូលឈ្មោះទំនិញចូលស្តុក (Enter Stock-In Item):', 'ម្សៅពុម្ពថ្មបៃតង GC Fuji');
    if (!item) return;
    const qty = prompt('បញ្ចូលចំនួន (Quantity):', '10');
    if (!qty) return;
    showToast('កត់ត្រាទំនិញចូលជោគជ័យ', `បានកត់ត្រាការនាំចូល ${item} ចំនួន ${qty} ឯកតា ទៅក្នុងឃ្លាំង Phnom Penh Depot A`, 'success');
  }

  function toggleNotificationsDropdown(anchor) {
    let dropdown = document.getElementById('khema-notif-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'khema-notif-dropdown';
      dropdown.className = 'fixed z-50 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 animate-in fade-in zoom-in-95 duration-150';
      dropdown.innerHTML = `
        <div class="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <h4 class="text-xs font-bold text-slate-800">ការជូនដំណឹង (Notifications)</h4>
          <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-white font-bold">3 ថ្មី</span>
        </div>
        <div class="divide-y divide-slate-100 text-xs">
          <div class="p-3 hover:bg-slate-50 cursor-pointer">
            <p class="font-bold text-slate-900">ប័ណ្ណស្នើសុំថ្មី: PR-2026-11-089</p>
            <p class="text-[11px] text-slate-500 mt-0.5">ផ្នែកDigital បានស្នើសុំ Zirconia Block និង Milling Bur</p>
            <span class="text-[10px] text-amber-600 font-semibold mt-1 inline-block">រង់ចាំការអនុម័ត · 10 នាទីមុន</span>
          </div>
          <div class="p-3 hover:bg-slate-50 cursor-pointer">
            <p class="font-bold text-slate-900">ទំនិញជិតអស់ពីស្តុក (Low Stock Alert)</p>
            <p class="text-[11px] text-slate-500 mt-0.5">ម្សៅពុម្ពថ្មបៃតង GC Fuji នៅសល់ត្រឹមតែ ៤ ធុង</p>
            <span class="text-[10px] text-rose-600 font-semibold mt-1 inline-block">បន្ទាន់ · 35 នាទីមុន</span>
          </div>
          <div class="p-3 hover:bg-slate-50 cursor-pointer">
            <p class="font-bold text-slate-900">ទំនិញដឹកជញ្ជូនចូលឃ្លាំង (PO Delivered)</p>
            <p class="text-[11px] text-slate-500 mt-0.5">Bayon Dental Supply បានដឹកទំនិញ PO-8840 មកដល់ Depot A</p>
            <span class="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">បានបញ្ចប់ · 2 ម៉ោងមុន</span>
          </div>
        </div>
        <div class="pt-2 px-4 border-t border-slate-100 text-center">
          <a href="#" onclick="window.khemaOpenPR(); return false;" class="text-[11px] text-secondary font-bold hover:underline">បើកប័ណ្ណស្នើសុំទិញទំនិញថ្មី (Open PR Form)</a>
        </div>
      `;
      document.body.appendChild(dropdown);

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !anchor.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    }

    const rect = anchor.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + 8}px`;
    dropdown.style.left = `${Math.max(10, rect.right - 320)}px`;
    dropdown.classList.toggle('hidden');
  }

  // Floating Quick Module Switcher & Keyboard Shortcut (Ctrl+K)
  function setupQuickModuleSwitcher() {
    if (document.getElementById('khema-quick-switcher')) return;

    const btn = document.createElement('button');
    btn.id = 'khema-quick-switcher-btn';
    btn.className = 'fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 flex items-center gap-2 text-xs font-semibold cursor-pointer border border-white/20 transition-all hover:scale-105 no-print';
    btn.innerHTML = `
      <span class="material-symbols-outlined text-[18px]">apps</span>
      <span>ម៉ូឌុលទាំងអស់ (12 Modules)</span>
      <span class="px-1.5 py-0.5 text-[10px] bg-white/20 rounded font-mono">Ctrl+K</span>
    `;

    const modal = document.createElement('div');
    modal.id = 'khema-quick-switcher';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 no-print';

    const categories = [...new Set(MODULES.map(m => m.cat))];
    let catHtml = '';

    categories.forEach(cat => {
      const mods = MODULES.filter(m => m.cat === cat);
      catHtml += `
        <div class="mb-4">
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">${cat}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${mods.map(m => `
              <a href="${getModuleUrl(m.id)}" class="p-2.5 rounded-xl border border-slate-200 hover:border-secondary hover:bg-slate-50 transition-all flex items-center gap-3 group">
                <div class="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-secondary group-hover:text-white flex items-center justify-center text-primary transition-colors">
                  <span class="material-symbols-outlined text-[20px]">${m.icon}</span>
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="text-xs font-bold text-slate-900 truncate">${m.nameKh}</h4>
                  <p class="text-[10px] text-slate-500 truncate">${m.nameEn}</p>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    });

    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span class="material-symbols-outlined text-[19px]">apps</span>
            </div>
            <div>
              <h3 class="text-sm font-bold text-primary">ជ្រើសរើសម៉ូឌុលប្រព័ន្ធ (Switch ERP Module)</h3>
              <p class="text-[11px] text-slate-500">SmartStock ERP · Khema Digital Dental Solution</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.khemaOpenPR()" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[16px]">receipt_long</span>
              <span>ប័ណ្ណស្នើសុំ PR 1.1</span>
            </button>
            <a href="${getPortalUrl()}" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-200 text-primary hover:bg-slate-300">ទំព័រដើម (Portal)</a>
            <button id="close-quick-switcher" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 text-slate-500">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
        <div class="p-5 overflow-y-auto max-h-[calc(88vh-80px)]">
          ${catHtml}
        </div>
      </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(modal);

    const toggle = () => modal.classList.toggle('hidden');
    btn.addEventListener('click', toggle);
    modal.querySelector('#close-quick-switcher').addEventListener('click', toggle);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) toggle();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        toggle();
      }
    });
  }

  // Inject High-Fidelity Print Style
  function injectPrintStyle() {
    if (document.getElementById('khema-print-css')) return;
    const style = document.createElement('style');
    style.id = 'khema-print-css';
    style.textContent = `
      @media print {
        body * { visibility: hidden !important; }
        #khema-official-pr-modal,
        #khema-official-pr-modal #khema-pr-print-area,
        #khema-official-pr-modal #khema-pr-print-area * {
          visibility: visible !important;
        }
        #khema-official-pr-modal {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: auto !important;
          padding: 0 !important;
          background: white !important;
          display: block !important;
        }
        #khema-official-pr-modal > div {
          max-width: 100% !important;
          width: 100% !important;
          border: none !important;
          box-shadow: none !important;
        }
        .no-print { display: none !important; }
        @page {
          size: A4 portrait;
          margin: 12mm 10mm;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Expose Global Helper
  window.khemaOpenPR = openPurchaseRequestModal;

  // Initialize
  function init() {
    injectPrintStyle();
    setupNavigation();
    setupUserMenu();
    setupLiveSearch();
    setupExcelExport();
    setupExcelImportModal();
    setupRequisitionTriggers();
    setupQuickModuleSwitcher();
    setupOfficialPurchaseRequestModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
