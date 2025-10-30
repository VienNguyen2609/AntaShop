// Application constants
export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ADMIN: '/admin',
  CART: '/cart',
  MEGA_SALE: '/collections/san-pham-mega-sale'
};

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh'
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: '/api/products/:id',
    SEARCH: '/api/products/search'
  },
  CART: {
    ADD: '/api/cart/add',
    REMOVE: '/api/cart/remove',
    UPDATE: '/api/cart/update'
  }
};

export const STORAGE_KEYS = {
  TOKEN: 'anta_token',
  CART: 'anta_cart',
  USER: 'anta_user'
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export const MENU_ITEMS = [
  { id: 1, name: "TRANG CHỦ", link: '/home' },
  { id: 2, name: "🔥 UP TO 50%", link: '/collections/san-pham-mega-sale', highlight: true },
  { id: 3, name: "HÀNG MỚI", link: '/new' },
  { id: 4, name: "ĐỘC QUYỀN ONLINE", link: '/exclusive' },
  {
    id: 5,
    name: "NAM",
    link: '/men',
    hasDropdown: true,
    dropdown: [
      { title: "GIÀY NAM", items: ["Giày chạy", "Giày bóng rổ", "Giày lifestyle", "Giày đế bằng"] },
      { title: "QUẦN ÁO NAM", items: ["Áo thun", "Áo khoác", "Quần short", "Quần dài"] },
      { title: "BỘ SƯU TẬP", items: ["PG7 Nam", "Running", "Training", "Basketball"] }
    ]
  },
  {
    id: 6,
    name: "NỮ",
    link: '/women',
    hasDropdown: true,
    dropdown: [
      { title: "GIÀY NỮ", items: ["Giày chạy", "Giày lifestyle", "Giày thời trang"] },
      { title: "QUẦN ÁO NỮ", items: ["Áo thun", "Áo khoác", "Quần short", "Quần dài"] },
      { title: "BỘ SƯU TẬP", items: ["PG7 Nữ", "Running", "Training"] }
    ]
  },
  {
    id: 7,
    name: "PHỤ KIỆN",
    link: '/accessories',
    hasDropdown: true,
    dropdown: [
      { title: "TÚI & BALO", items: ["Balo thể thao", "Túi tote", "Túi đeo chéo"] },
      { title: "PHỤ KIỆN KHÁC", items: ["Tất, vớ", "Mũ, nón", "Vợt cầu lông", "Phụ kiện giày"] }
    ]
  },
  { id: 8, name: "KIDS", link: '/kids' }
];

export const ADMIN_MENU_ITEMS = [
  { id: 'products', label: 'Sản phẩm', icon: '🛒' },
  { id: 'shipping', label: 'Vận chuyển', icon: '📦' },
  { id: 'messages', label: 'Tin nhắn', icon: '💬', badge: 49 },
  { id: 'notifications', label: 'Thông báo', icon: '🔔' },
  { id: 'settings', label: 'Cài đặt', icon: '⚙️' }
];
