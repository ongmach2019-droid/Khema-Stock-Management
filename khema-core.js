/**
 * SmartStock ERP · Unified Global Core Engine
 * Handles Navigation, Real Interactivity, All Modals, Khmer Typography & Toast Alerts
 */
(function() {
  'use strict';

  // 12 Modules Directory Definition
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

  // Helper: Determine URL to a target module relative to the current file
  function getModuleUrl(targetId) {
    const mod = MODULES.find(m => m.id === targetId || m.dir === targetId);
    if (!mod) return '#';

    const path = window.location.pathname.replace(/\\/g, '/');
    const isInsideSubfolder = path.includes('/code.html') || 
      MODULES.some(m => path.includes('/' + m.dir + '/'));

    if (isInsideSubfolder) {
      return `../${mod.dir}/${mod.file}`;
    } else {
      return `./${mod.dir}/${mod.file}`;
    }
  }

  function getPortalUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const isInsideSubfolder = path.includes('/code.html') || 
      MODULES.some(m => path.includes('/' + m.dir + '/'));
    return isInsideSubfolder ? '../index.html' : './index.html';
  }

  // Toast Notification System
  function showToast(message, type = 'success') {
    let toast = document.getElementById('khema-global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'khema-global-toast';
      toast.className = 'khema-toast';
      document.body.appendChild(toast);
    }

    const icon = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
    const iconColor = type === 'success' ? 'text-emerald-600' : (type === 'error' ? 'text-rose-600' : 'text-secondary');

    toast.className = `khema-toast ${type} show`;
    toast.innerHTML = `
      <span class="material-symbols-outlined ${iconColor} text-[22px]">${icon}</span>
      <span class="font-medium text-slate-800">${message}</span>
    `;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
  window.khemaToast = showToast;

  // Initialize
  function init() {
    setupSidebarNavigation();
    setupHeaderActions();
    setupRoleLoginPage();
    setupDashboardActions();
    setupInventoryItemsActions();
    setupStockMovementsActions();
    setupRequisitionActions();
    setupStockAdjustmentActions();
    setupSuppliersActions();
    setupExcelImportActions();
    setupRolesPermissionsActions();
    setupSettingsActions();
    setupQuickModuleSwitcher();
  }

  // 1. Sidebar Navigation
  function setupSidebarNavigation() {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    
    // Find matching active module for current page
    let activeMod = MODULES.find(m => currentPath.includes(m.dir));
    if (!activeMod && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
      // Portal page
    }

    document.querySelectorAll('nav a, aside nav a').forEach(link => {
      const dataPath = link.getAttribute('data-path');
      const href = link.getAttribute('href');
      let targetMod = null;

      if (dataPath) {
        targetMod = MODULES.find(m => m.id === dataPath || m.dir === dataPath || dataPath.includes(m.id));
      }
      
      if (!targetMod) {
        const text = link.innerText.toLowerCase();
        if (text.includes('dashboard') || text.includes('ផ្ទាំងគ្រប់គ្រង')) targetMod = MODULES.find(m => m.id === 'dashboard');
        else if (text.includes('item') || text.includes('ទំនិញក្នុងស្តុក')) targetMod = MODULES.find(m => m.id === 'inventory-items');
        else if (text.includes('movement') || text.includes('ចរន្តស្តុក')) targetMod = MODULES.find(m => m.id === 'stock-movements');
        else if (text.includes('excel') || text.includes('នាំចូលទិន្នន័យ')) targetMod = MODULES.find(m => m.id === 'excel-import');
        else if (text.includes('role') || text.includes('តួនាទី')) targetMod = MODULES.find(m => m.id === 'roles-and-permissions');
        else if (text.includes('setting') || text.includes('កំណត់ប្រព័ន្ធ')) targetMod = MODULES.find(m => m.id === 'settings');
        else if (text.includes('audit') || text.includes('សវនកម្ម')) targetMod = MODULES.find(m => m.id === 'audit-logs');
      }

      if (targetMod) {
        link.href = getModuleUrl(targetMod.id);
        
        // Highlight active link
        if (activeMod && targetMod.id === activeMod.id) {
          link.classList.add('bg-primary-container', 'text-on-primary', 'font-title-md', 'rounded-lg', 'shadow-sm');
          link.classList.remove('text-on-surface-variant');
        }
      }
    });

    // Make Brand Logo in Sidebar navigate to Portal Home
    const brand = document.querySelector('aside .h-16');
    if (brand) {
      brand.classList.add('cursor-pointer');
      brand.title = 'ត្រឡប់ទៅកាន់ទំព័រដើម (Back to Portal Home)';
      brand.addEventListener('click', () => {
        window.location.href = getPortalUrl();
      });
    }
  }

  // 2. Header Actions: Search, Excel Import, Notifications, User Dropdown
  function setupHeaderActions() {
    // Top Bar Search
    const searchInputs = document.querySelectorAll('header input[type="text"]');
    searchInputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = input.value.trim();
          if (query) {
            showToast(`កំពុងស្វែងរកទំនិញ "${query}"...`, 'info');
            setTimeout(() => {
              window.location.href = getModuleUrl('inventory-items') + `?search=${encodeURIComponent(query)}`;
            }, 500);
          }
        }
      });
    });

    // Header Excel Import Button
    document.querySelectorAll('header button').forEach(btn => {
      if (btn.innerText.includes('នាំចូល Excel') || btn.innerText.includes('Excel')) {
        btn.addEventListener('click', () => {
          const modal = document.getElementById('import-modal-backdrop') || document.getElementById('excel-import-modal');
          if (modal) {
            modal.classList.remove('hidden');
          } else {
            window.location.href = getModuleUrl('excel-import');
          }
        });
      }
    });

    // Notification Bell
    const notifBtns = document.querySelectorAll('header button[aria-label="Notifications"], header button:has(.material-symbols-outlined:contains("notifications"))');
    notifBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNotificationsPanel(btn);
      });
    });

    // User Profile in Header
    const userProfiles = document.querySelectorAll('header .cursor-pointer:has(.material-symbols-outlined:contains("person")), header div.flex.items-center.gap-space-sm.pl-space-sm');
    userProfiles.forEach(prof => {
      prof.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleUserDropdown(prof);
      });
    });

    // Sync saved user name if available
    const savedName = localStorage.getItem('khema_user_name');
    const savedRole = localStorage.getItem('khema_user_role');
    if (savedName) {
      document.querySelectorAll('header span.text-on-surface.font-semibold, header span.font-title-md.text-\\[13px\\]').forEach(el => {
        el.innerText = savedName;
      });
    }
    if (savedRole) {
      document.querySelectorAll('header span.bg-surface-container-high').forEach(el => {
        el.innerText = savedRole;
      });
    }
  }

  // Notifications Flyout
  function toggleNotificationsPanel(btn) {
    let panel = document.getElementById('khema-notif-panel');
    if (panel) {
      panel.remove();
      return;
    }

    panel = document.createElement('div');
    panel.id = 'khema-notif-panel';
    panel.className = 'fixed top-16 right-20 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150';
    panel.innerHTML = `
      <div class="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[19px] text-primary">notifications_active</span>
          <span class="font-bold text-xs text-primary">ការជូនដំណឹងថ្មី (4)</span>
        </div>
        <button id="mark-notifs-read" class="text-[11px] text-secondary font-semibold hover:underline">សម្គាល់ថាបានអាន</button>
      </div>
      <div class="divide-y divide-slate-100 max-h-80 overflow-y-auto">
        <div class="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
          <div class="flex items-start gap-2.5">
            <span class="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
            <div>
              <p class="text-xs font-bold text-slate-800">ស្តុកទាប: Paracetamol 500mg</p>
              <p class="text-[11px] text-slate-500">នៅសល់តែ 42 ប្រអប់ (ទាបជាងកម្រិតសុវត្ថិភាព 100)</p>
              <span class="text-[10px] text-slate-400 mt-1 inline-block">10 នាទីមុន</span>
            </div>
          </div>
        </div>
        <div class="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
          <div class="flex items-start gap-2.5">
            <span class="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
            <div>
              <p class="text-xs font-bold text-slate-800">ប័ណ្ណស្នើសុំថ្មី #REQ-2026-104</p>
              <p class="text-[11px] text-slate-500">ពីផ្នែកសង្គ្រោះបន្ទាន់ (Emergency Room) រង់ចាំអនុម័ត</p>
              <span class="text-[10px] text-slate-400 mt-1 inline-block">35 នាទីមុន</span>
            </div>
          </div>
        </div>
        <div class="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
          <div class="flex items-start gap-2.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
            <div>
              <p class="text-xs font-bold text-slate-800">បានទទួលទំនិញចូលស្តុក</p>
              <p class="text-[11px] text-slate-500">ប័ណ្ណ PO-2026-089 ចំនួន 500 ប្រអប់ត្រូវបានបញ្ចូល</p>
              <span class="text-[10px] text-slate-400 mt-1 inline-block">1 ម៉ោងមុន</span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 bg-slate-50 border-t border-slate-200 text-center">
        <a href="${getModuleUrl('audit-logs')}" class="text-[11px] text-primary font-bold hover:underline">មើលកំណត់ត្រាទាំងអស់ (View All)</a>
      </div>
    `;

    document.body.appendChild(panel);

    panel.querySelector('#mark-notifs-read').addEventListener('click', () => {
      showToast('បានសម្គាល់ការជូនដំណឹងទាំងអស់ថាបានអានរួច!');
      panel.remove();
    });

    const closeHandler = (e) => {
      if (!panel.contains(e.target)) {
        panel.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  // User Profile Dropdown
  function toggleUserDropdown(prof) {
    let dropdown = document.getElementById('khema-user-dropdown');
    if (dropdown) {
      dropdown.remove();
      return;
    }

    const currentName = localStorage.getItem('khema_user_name') || 'Sokha Chan';
    const currentRole = localStorage.getItem('khema_user_role') || 'SUPER ADMIN';

    dropdown = document.createElement('div');
    dropdown.id = 'khema-user-dropdown';
    dropdown.className = 'fixed top-16 right-6 z-50 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150';
    dropdown.innerHTML = `
      <div class="p-4 bg-slate-50 border-b border-slate-200">
        <p class="text-xs font-bold text-primary">${currentName}</p>
        <span class="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-on-primary">${currentRole}</span>
        <p class="text-[11px] text-slate-500 mt-1">Phnom Penh Central Hub Depot A</p>
      </div>
      <div class="p-1.5 flex flex-col gap-0.5">
        <a href="${getModuleUrl('login')}" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
          <span class="material-symbols-outlined text-[18px] text-secondary">switch_account</span>
          <span>ផ្លាស់ប្តូរតួនាទី (Switch Role)</span>
        </a>
        <a href="${getModuleUrl('settings')}" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
          <span class="material-symbols-outlined text-[18px] text-slate-500">settings</span>
          <span>ការកំណត់ប្រព័ន្ធ (Settings)</span>
        </a>
        <a href="${getPortalUrl()}" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
          <span class="material-symbols-outlined text-[18px] text-primary">apps</span>
          <span>ទំព័រដើម (Portal Home)</span>
        </a>
        <div class="border-t border-slate-100 my-1"></div>
        <button id="khema-signout-btn" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left">
          <span class="material-symbols-outlined text-[18px]">logout</span>
          <span>ចាកចេញ (Sign Out)</span>
        </button>
      </div>
    `;

    document.body.appendChild(dropdown);

    dropdown.querySelector('#khema-signout-btn').addEventListener('click', () => {
      showToast('បានចាកចេញពីប្រព័ន្ធដោយជោគជ័យ!', 'info');
      setTimeout(() => {
        window.location.href = getModuleUrl('login');
      }, 600);
    });

    const closeHandler = (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  // 3. Role Login & Switch Account Page (Image 2)
  function setupRoleLoginPage() {
    const isLoginPage = window.location.pathname.includes('role_login_switch_account') || 
                        window.location.pathname.includes('login');
    if (!isLoginPage) return;

    // Role definitions
    const roles = {
      admin: { name: 'Sokha Chan', title: 'អ្នកគ្រប់គ្រងជាន់ខ្ពស់', role: 'Admin', badge: 'ADMIN', badgeClass: 'bg-primary-container text-on-primary', email: 'sokha.chan@smartstock.kh', hub: 'pp-a', icon: 'shield_person' },
      manager: { name: 'Vireak Rith', title: 'ប្រធានឃ្លាំងកណ្តាល', role: 'Warehouse Manager', badge: 'MANAGER', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed', email: 'vireak.rith@smartstock.kh', hub: 'pp-a', icon: 'warehouse' },
      staff: { name: 'Thida Mao', title: 'បុគ្គលិកប្រតិបត្តិការ', role: 'Warehouse Operator', badge: 'STAFF', badgeClass: 'bg-indigo-100 text-indigo-800', email: 'thida.mao@smartstock.kh', hub: 'sr-a', icon: 'inventory' },
      auditor: { name: 'Kosal An', title: 'សវនករខាងក្រៅ', role: 'External Auditor', badge: 'AUDITOR', badgeClass: 'bg-surface-container text-on-surface-variant', email: 'kosal.an@smartstock.kh', hub: 'pp-a', icon: 'policy' }
    };

    window.selectRole = function(roleKey) {
      const p = roles[roleKey];
      if (!p) return;

      document.querySelectorAll('.role-card').forEach(c => c.classList.remove('ring-2', 'ring-primary'));
      const activeCard = document.getElementById(`role-card-${roleKey}`);
      if (activeCard) activeCard.classList.add('ring-2', 'ring-primary');

      const nameEl = document.getElementById('selected-user-name');
      const emailEl = document.getElementById('selected-user-email');
      const badgeEl = document.getElementById('selected-user-badge');
      const iconEl = document.getElementById('selected-role-icon');
      const inputUsername = document.getElementById('input-username');
      const selectHub = document.getElementById('select-hub');
      const inputPass = document.getElementById('input-password');

      if (nameEl) nameEl.innerText = p.name;
      if (emailEl) emailEl.innerText = p.email;
      if (badgeEl) {
        badgeEl.innerText = p.badge;
        badgeEl.className = `px-1.5 py-0.5 rounded text-[10px] font-semibold ${p.badgeClass}`;
      }
      if (iconEl) iconEl.innerText = p.icon;
      if (inputUsername) inputUsername.value = p.email;
      if (selectHub) selectHub.value = p.hub;
      if (inputPass) inputPass.value = '••••••••••••';

      localStorage.setItem('khema_user_name', p.name);
      localStorage.setItem('khema_user_role', p.badge);
      showToast(`បានជ្រើសរើសតួនាទី: ${p.name} (${p.badge})`, 'info');
    };

    // Password visibility toggle
    window.togglePasswordVisibility = function() {
      const input = document.getElementById('input-password');
      const icon = document.getElementById('password-toggle-icon');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.innerText = 'visibility_off';
      } else {
        input.type = 'password';
        if (icon) icon.innerText = 'visibility';
      }
    };

    // Mode Switcher (Direct Sign In vs Shift Switch)
    window.switchLoginMode = function(mode) {
      const directBtn = document.getElementById('tab-direct-btn');
      const switchBtn = document.getElementById('tab-switch-btn');
      const btnText = document.getElementById('btn-text');

      if (mode === 'direct') {
        if (directBtn) directBtn.className = "py-2 text-center rounded-md font-title-md text-[13px] bg-surface-container-lowest text-primary shadow-sm transition-all";
        if (switchBtn) switchBtn.className = "py-2 text-center rounded-md font-title-md text-[13px] text-on-surface-variant hover:text-on-surface transition-all";
        if (btnText) btnText.innerText = "ចូលប្រព័ន្ធ (Sign In to SmartStock)";
      } else {
        if (switchBtn) switchBtn.className = "py-2 text-center rounded-md font-title-md text-[13px] bg-surface-container-lowest text-primary shadow-sm transition-all";
        if (directBtn) directBtn.className = "py-2 text-center rounded-md font-title-md text-[13px] text-on-surface-variant hover:text-on-surface transition-all";
        if (btnText) btnText.innerText = "ផ្លាស់ប្តូរវេនភ្លាមៗ (Switch Active Shift)";
      }
    };

    // Forgot Password
    const forgotLinks = document.querySelectorAll('a:contains("ភ្លេចពាក្យសម្ងាត់"), span:contains("ភ្លេចពាក្យសម្ងាត់")');
    forgotLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('តំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នក!', 'info');
      });
    });

    // Primary Sign In Button
    const submitBtn = document.getElementById('submit-login-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span><span>កំពុងផ្ទៀងផ្ទាត់... (Authenticating)</span>`;

        setTimeout(() => {
          submitBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">check_circle</span><span>ជោគជ័យ! កំពុងបញ្ជូន...</span>`;
          submitBtn.classList.add('bg-emerald-700');
          showToast('ចូលប្រព័ន្ធជោគជ័យ! សូមស្វាគមន៍មកកាន់ SmartStock ERP');

          setTimeout(() => {
            window.location.href = getModuleUrl('dashboard');
          }, 800);
        }, 800);
      });
    }
  }

  // 4. Dashboard Actions
  function setupDashboardActions() {
    const isDash = window.location.pathname.includes('inventory_dashboard') || 
                   window.location.pathname.includes('dashboard');
    if (!isDash) return;

    // "កត់ត្រាទំនិញចូល (Stock In)" Quick Button
    document.querySelectorAll('button:contains("កត់ត្រាទំនិញចូល"), button:contains("Stock In")').forEach(btn => {
      btn.addEventListener('click', () => {
        openQuickStockModal('in');
      });
    });

    // "កត់ត្រាទំនិញចេញ (Stock Out)" Quick Button
    document.querySelectorAll('button:contains("កត់ត្រាទំនិញចេញ"), button:contains("Stock Out")').forEach(btn => {
      btn.addEventListener('click', () => {
        openQuickStockModal('out');
      });
    });
  }

  // Quick Stock Modal (Stock In / Stock Out)
  function openQuickStockModal(mode) {
    const isStockIn = mode === 'in';
    const title = isStockIn ? 'កត់ត្រាទំនិញចូលស្តុក (Stock In Entry)' : 'កត់ត្រាទំនិញចេញពីស្តុក (Stock Out Entry)';
    const btnColor = isStockIn ? 'bg-secondary' : 'bg-primary';

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg ${btnColor} text-white flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">${isStockIn ? 'add_box' : 'indeterminate_check_box'}</span>
            </div>
            <h3 class="font-bold text-base text-primary">${title}</h3>
          </div>
          <button class="close-modal text-slate-400 hover:text-slate-600">
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>
        <form id="quick-stock-form" class="mt-4 flex flex-col gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">កូដទំនិញ / ឈ្មោះ (SKU or Item)</label>
            <input type="text" required placeholder="ឧទាហរណ៍: SKU-MED-001 (Paracetamol)" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">បរិមាណ (Quantity)</label>
              <input type="number" required min="1" placeholder="100" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ឃ្លាំងស្តុក (Warehouse)</label>
              <select class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none">
                <option>Phnom Penh Depot A</option>
                <option>Sihanoukville Hub</option>
                <option>Siem Reap Depot</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">${isStockIn ? 'អ្នកផ្គត់ផ្គង់ / លេខ PO' : 'ដេប៉ាតឺម៉ង់ទទួល / មូលហេតុ'}</label>
            <input type="text" placeholder="${isStockIn ? 'ឧ. Mega Lifesciences (PO-2026-092)' : 'ឧ. Emergency Department (ICU)'}" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
          </div>
          <div class="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-200">
            <button type="button" class="close-modal px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">បោះបង់</button>
            <button type="submit" class="px-5 py-2 rounded-lg text-xs font-bold text-white ${btnColor} hover:opacity-95 shadow-sm">កត់ត្រាទិន្នន័យ (Submit)</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', () => modal.remove()));
    modal.querySelector('#quick-stock-form').addEventListener('submit', (e) => {
      e.preventDefault();
      modal.remove();
      showToast(isStockIn ? 'បានកត់ត្រាទំនិញចូលស្តុកដោយជោគជ័យ!' : 'បានកត់ត្រាទំនិញចេញពីស្តុកដោយជោគជ័យ!');
    });
  }

  // 5. Inventory Items Master List
  function setupInventoryItemsActions() {
    const isItems = window.location.pathname.includes('inventory_items') || 
                    window.location.pathname.includes('inventory-items');
    if (!isItems) return;

    // Export CSV Button
    document.querySelectorAll('button:contains("នាំចេញ"), button:contains("CSV")').forEach(btn => {
      btn.addEventListener('click', () => {
        downloadSampleInventoryCSV();
      });
    });

    // Add New Item Button
    document.querySelectorAll('button:contains("បន្ថែមទំនិញថ្មី"), button:contains("Add")').forEach(btn => {
      btn.addEventListener('click', () => {
        openAddItemModal();
      });
    });

    // Live search filter in items page
    const searchInput = document.querySelector('input[placeholder*="ស្វែងរក"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('table tbody tr').forEach(row => {
          const text = row.innerText.toLowerCase();
          if (text.includes(q)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }
  }

  function downloadSampleInventoryCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "SKU,Item Name (Khmer),Item Name (English),Category,Quantity,Unit,Min Stock,Unit Price (USD),Warehouse\n" +
      "MED-001,ប៉ារ៉ាសេតាម៉ុល 500mg,Paracetamol 500mg Tablets,ថ្នាំពេទ្យ,1250,ប្រអប់,100,2.50,Phnom Penh Depot A\n" +
      "MED-002,អាម៉ុកស៊ីស៊ីលីន 500mg,Amoxicillin 500mg Capsules,ថ្នាំពេទ្យ,840,ប្រអប់,50,4.20,Phnom Penh Depot A\n" +
      "MED-003,ស្រោមដៃវេជ្ជសាស្ត្រ M,Medical Gloves Nitrile Size M,សម្ភារៈពេទ្យ,3500,ប្រអប់,500,6.00,Phnom Penh Depot A\n" +
      "MED-004,ម៉ាស់ពេទ្យ 3 ស្រទាប់,Surgical Face Mask 3-Ply,សម្ភារៈពេទ្យ,5200,ប្រអប់,1000,1.80,Phnom Penh Depot A\n" +
      "MED-005,ទឹកសម្លាប់មេរោគ 500ml,Hand Sanitizer Gel 500ml,សម្ភារៈអនាម័យ,450,ដប,100,3.50,Sihanoukville Hub\n" +
      "MED-006,បង់រុំរបួស 10cm,Sterile Gauze Bandage 10cm,សម្ភារៈពេទ្យ,1100,ដុំ,200,0.80,Phnom Penh Depot A";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "khema_inventory_items.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("បានទាញយកឯកសារបញ្ជីទំនិញ khema_inventory_items.csv រួចរាល់!");
  }

  function openAddItemModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">add_box</span>
            </div>
            <h3 class="font-bold text-base text-primary">បន្ថែមទំនិញថ្មីក្នុងស្តុក (Add New Item)</h3>
          </div>
          <button class="close-modal text-slate-400 hover:text-slate-600">
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>
        <form id="add-item-form" class="mt-4 flex flex-col gap-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">កូដទំនិញ (SKU)</label>
              <input type="text" required placeholder="SKU-MED-999" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ប្រភេទ (Category)</label>
              <select class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none">
                <option>ថ្នាំពេទ្យ (Pharmaceuticals)</option>
                <option>សម្ភារៈពេទ្យ (Medical Supplies)</option>
                <option>ឧបករណ៍ (Equipment)</option>
                <option>សម្ភារៈការិយាល័យ (Office Supplies)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">ឈ្មោះទំនិញជាភាសាខ្មែរ</label>
            <input type="text" required placeholder="ឧ. ថ្នាំបន្តក់ភ្នែក អង់ទីប៊ីយ៉ូទិក" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Item Name (English)</label>
            <input type="text" placeholder="Antibiotic Eye Drops 10ml" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ចំនួនស្តុក (Qty)</label>
              <input type="number" required min="1" placeholder="100" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ឯកតា (UOM)</label>
              <input type="text" placeholder="ដប / ប្រអប់" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">តម្លៃឯកតា ($)</label>
              <input type="number" step="0.01" placeholder="3.50" class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-secondary focus:outline-none"/>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-200">
            <button type="button" class="close-modal px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">បោះបង់</button>
            <button type="submit" class="px-5 py-2 rounded-lg text-xs font-bold text-white bg-primary hover:bg-primary-container shadow-sm">រក្សាទុកទំនិញ (Save Item)</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', () => modal.remove()));
    modal.querySelector('#add-item-form').addEventListener('submit', (e) => {
      e.preventDefault();
      modal.remove();
      showToast('ទំនិញថ្មីត្រូវបានបញ្ចូលទៅក្នុងប្រព័ន្ធដោយជោគជ័យ!');
    });
  }

  // 6. Stock Movements Actions
  function setupStockMovementsActions() {
    const isMov = window.location.pathname.includes('stock_movements') || 
                  window.location.pathname.includes('stock-movements');
    if (!isMov) return;

    document.querySelectorAll('button:contains("នាំចេញ"), button:contains("របាយការណ៍")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('កំពុងទាញយកកំណត់ត្រាចរន្តស្តុក (Exporting CSV)...');
        setTimeout(() => downloadSampleInventoryCSV(), 600);
      });
    });
  }

  // 7. Material Requisition & Approval Actions
  function setupRequisitionActions() {
    const isReq = window.location.pathname.includes('material_requisition_multi_level_approval') || 
                  window.location.pathname.includes('requisition');
    if (!isReq) return;

    // Approve buttons
    document.querySelectorAll('button:contains("អនុម័ត"), button:contains("Approve")').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span><span>បានអនុម័តរួច</span>`;
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white flex items-center gap-1';
        showToast('ប័ណ្ណស្នើសុំត្រូវបានអនុម័តជាស្ថាពរ!');
      });
    });

    // Reject buttons
    document.querySelectorAll('button:contains("បដិសេធ"), button:contains("Reject")').forEach(btn => {
      btn.addEventListener('click', () => {
        const reason = prompt('សូមបញ្ចូលមូលហេតុបដិសេធ (Rejection Reason):');
        if (reason) {
          btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">cancel</span><span>បានបដិសេធ</span>`;
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white flex items-center gap-1';
          showToast(`ប័ណ្ណស្នើសុំត្រូវបានបដិសេធ (មូលហេតុ: ${reason})`, 'error');
        }
      });
    });

    // Print
    document.querySelectorAll('button:contains("បោះពុម្ព"), button:contains("Print")').forEach(btn => {
      btn.addEventListener('click', () => window.print());
    });
  }

  // 8. Stock Adjustment Actions
  function setupStockAdjustmentActions() {
    const isAdj = window.location.pathname.includes('stock_adjustment') || 
                  window.location.pathname.includes('stock-adjustments');
    if (!isAdj) return;

    document.querySelectorAll('button:contains("រក្សាទុក"), button:contains("Save")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('សេចក្តីព្រាងរាប់ស្តុកត្រូវបានរក្សាទុក!');
      });
    });

    document.querySelectorAll('button:contains("អនុម័ត"), button:contains("Approve")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('ការកែតម្រូវស្តុកជាក់ស្តែងត្រូវបានអនុម័ត និងធ្វើបច្ចុប្បន្នភាពរួចរាល់!');
      });
    });

    document.querySelectorAll('button:contains("បោះពុម្ព"), button:contains("Print")').forEach(btn => {
      btn.addEventListener('click', () => window.print());
    });
  }

  // 9. Suppliers & Purchase Orders
  function setupSuppliersActions() {
    const isSup = window.location.pathname.includes('suppliers_purchase_orders') || 
                  window.location.pathname.includes('suppliers');
    if (!isSup) return;

    document.querySelectorAll('button:contains("បង្កើតការបញ្ជាទិញ"), button:contains("Create PO")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('ទម្រង់បង្កើតប័ណ្ណ PO ថ្មីត្រូវបានបើកដំណើរការ!', 'info');
      });
    });

    document.querySelectorAll('button:contains("ផ្ញើ PO"), button:contains("Send")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('ប័ណ្ណបញ្ជាទិញ PO ត្រូវបានផ្ញើទៅកាន់អ្នកផ្គត់ផ្គង់តាមអ៊ីមែលរួចរាល់!');
      });
    });
  }

  // 10. Excel Import Actions
  function setupExcelImportActions() {
    const isImp = window.location.pathname.includes('excel_excel_import') || 
                  window.location.pathname.includes('excel-import');
    if (!isImp) return;

    // Download template
    document.querySelectorAll('button:contains("ទម្រង់គំរូ"), a:contains("ទម្រង់គំរូ"), button:contains("Template")').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        downloadSampleInventoryCSV();
      });
    });

    // Start Import
    document.querySelectorAll('button:contains("ចាប់ផ្តើមនាំចូល"), button:contains("Start Import")').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>កំពុងវិភាគទិន្នន័យ (45%)...</span>`;
        setTimeout(() => {
          btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>កំពុងនាំចូលទិន្នន័យ (85%)...</span>`;
          setTimeout(() => {
            btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">check_circle</span><span>នាំចូលជោគជ័យ 100%!</span>`;
            btn.className = 'px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 flex items-center gap-1.5';
            showToast('បាននាំចូលទិន្នន័យទំនិញ 240 ជួរដោយជោគជ័យ!');
          }, 600);
        }, 600);
      });
    });
  }

  // 11. Roles & Permissions Actions
  function setupRolesPermissionsActions() {
    const isRole = window.location.pathname.includes('roles_permissions') || 
                   window.location.pathname.includes('roles-and-permissions');
    if (!isRole) return;

    document.querySelectorAll('button:contains("រក្សាទុក"), button:contains("Save")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('ការកំណត់សិទ្ធិ និងតួនាទីត្រូវបានរក្សាទុកដោយជោគជ័យ!');
      });
    });
  }

  // 12. Settings Actions
  function setupSettingsActions() {
    const isSet = window.location.pathname.includes('system_warehouse_settings') || 
                  window.location.pathname.includes('settings');
    if (!isSet) return;

    document.querySelectorAll('button:contains("រក្សាទុក"), button:contains("Save")').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('ការកំណត់ប្រព័ន្ធ និងឃ្លាំងស្តុកត្រូវបានធ្វើបច្ចុប្បន្នភាព!');
      });
    });
  }

  // 13. Floating Quick Switcher (Ctrl+K)
  function setupQuickModuleSwitcher() {
    if (document.getElementById('khema-quick-switcher-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'khema-quick-switcher-btn';
    btn.className = 'fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-full shadow-2xl hover:bg-primary-container transition-all cursor-pointer font-title-md text-[13px] border border-white/20 select-none backdrop-blur-md';
    btn.innerHTML = `
      <span class="material-symbols-outlined text-[19px] text-secondary-container animate-pulse">apps</span>
      <span class="font-bold">ម៉ូឌុលទាំងអស់ (12 Modules)</span>
      <span class="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-on-primary ml-1 hidden sm:inline">Ctrl+K</span>
    `;

    const modal = document.createElement('div');
    modal.id = 'khema-quick-switcher-modal';
    modal.className = 'fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 hidden';

    const categories = {};
    MODULES.forEach(m => {
      if (!categories[m.cat]) categories[m.cat] = [];
      categories[m.cat].push(m);
    });

    let catHtml = '';
    for (const [catName, list] of Object.entries(categories)) {
      catHtml += `
        <div class="mb-4">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span>${catName}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${list.map(mod => `
              <a href="${getModuleUrl(mod.id)}" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 bg-slate-50 transition-all text-slate-800 group border border-transparent hover:border-secondary/30">
                <div class="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <span class="material-symbols-outlined text-[20px]">${mod.icon}</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs font-bold text-primary truncate">${mod.nameKh}</span>
                  <span class="text-[11px] text-slate-500 truncate">${mod.nameEn}</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span class="material-symbols-outlined text-[19px]">apps</span>
            </div>
            <div>
              <h3 class="text-sm font-bold text-primary">ជ្រើសរើសម៉ូឌុលប្រព័ន្ធ (Switch ERP Module)</h3>
              <p class="text-[11px] text-slate-500">SmartStock ERP · Khema Stock Management</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
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

  // Safe document ready loader
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
