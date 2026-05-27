# 🗺️ Secufur Smart Solutions: Developer Site Map

This document outlines the complete architectural routing scheme of the **Secufur Smart Solutions** unified e-commerce platform. It provides developers with a clear and understandable directory map of all available pages, layouts, and route segments in the application.

---

## 🧭 1. Unified Landing Router

- **`http://localhost:3000/`** (Root entry point: `src/app/page.tsx`)
  - **Start Shopping Card** ➔ Redirects to `/buyer`
  - **Become a Seller Card** ➔ Redirects to `/seller`

---

## 🛒 2. Buyer Storefront Ecosystem (`/buyer/*`)

The buyer storefront comprises layouts, legal guidelines, order processes, and dynamic configuration tools located under `src/app/buyer`.

### 🏠 A. Home & Catalog Pages
- **`/buyer`** (Storefront Homepage: `src/app/buyer/page.tsx`)
- **`/buyer/batteries`** (Standard Battery Listings Catalog)
- **`/buyer/electronics`** (Standard Electronics Listings Catalog)
- **`/buyer/search`** (Global product search & filtering controls)
- **`/buyer/product/[slug]`** (Single product detail, specifications review, and QA)

### 🛍️ B. Cart & Checkout Processes
- **`/buyer/cart`** (Shopping cart item inventory review & coupon inputs)
- **`/buyer/checkout`** (Multi-step shipping, pincode validation, and payments verification)
- **`/buyer/compare`** (Side-by-side battery and electronics comparison grids)
- **`/buyer/wishlist`** (Saved lists for registered buyer accounts)

### ⚡ C. Customized Product Builders
- **`/buyer/customized-batteries`** (Interactive cell configuration builder)
- **`/buyer/customized-electronics`** (Circuit module design request manager)

### 🔒 D. Buyer Authentication
- **`/buyer/sign-in`** (Database-backed secure login)
- **`/buyer/sign-up`** (Real DB merchant-compliant registration)
- **`/buyer/forgot-password`** (Credential recovery request form)

### 📋 E. Legal Policies & Safeties
- **`/buyer/about`** (Brand narrative & story for Secufur Smart Solutions)
- **`/buyer/terms`** (Platform usage terms)
- **`/buyer/privacy`** (PII data masking & encryption declarations)
- **`/buyer/cookie-policy`** (Essential, analytics, and marketing cookie audit)
- **`/buyer/return-policy`** (30-day merchant returns policy rules)
- **`/buyer/warranty`** (1-year product warranty coverage guide)
- **`/buyer/battery-safety`** (Important Lithium Ion storage & operation guidelines)

---

## 💼 3. Seller Central Dashboard (`/seller/*`)

The merchant-facing system enables sellers to list products, execute order fulfillments, and review payout schedules. Uses persisted client-side context models (`src/context/seller/AppContext.tsx`) loaded under `src/app/seller`.

- **`/seller`** (Dashboard Homepage: overview charts, performance metrics, alerts)
- **`/seller/auth`** (Multi-step corporate registration & secure credentials login)
- **`/seller/under-review`** (Onboarding status for accounts undergoing compliance validation)
- **`/seller/products`** (Catalog list manager, draft creation, approval submits, stock adjust)
- **`/seller/orders`** (Merchant order tracking, tracking code assign, SLAs control)
- **`/seller/financials`** (Settlements lists, platform fee ledgers, commission summaries)
- **`/seller/audit-logs`** (Merchant action security auditing database logs)
- **`/seller/notifications`** (System order logs & safety alerts feeds)
- **`/seller/settings`** (Payout details, trusted devices, notification settings)
- **`/seller/support`** (Real-time customer chat channels & support ticket entries)

---

## 🛡️ 4. Admin Management Portal (`/admin/*`)

The secure administrative platform allows operators to verify new sellers, review global listings, and supervise payment distributions. Located under `src/app/admin`.

- **`/admin/login`** (Operator portal secure credentials entry page)
- **`/admin/dashboard`** (Overall platform turnover, merchant count, product ratings charts)
- **`/admin/sellers`** (Audit logs and document verification workflows for applied merchants)
- **`/admin/users`** (Platform buyer, seller, and administrator accounts manager)
- **`/admin/products`** (Global product catalog verification, live toggles, rejection logs)
- **`/admin/orders`** (Platform-wide tracking, delay monitoring, delivery partner checks)
- **`/admin/payments`** (Payout releases, platform commission metrics)
- **`/admin/settings`** (System backups, backup logs, security access rules)
