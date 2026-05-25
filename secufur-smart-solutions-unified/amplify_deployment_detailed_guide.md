# 🚀 Ultimate AWS Amplify Deployment Guide for Secufur

This guide provides the **exact configurations**, **detailed steps**, and **troubleshooting tips** to host your website on your custom domain: **`https://secufur.in/`**.

---

## 🏗️ Phase 1: Preparation

### 1. Repository Structure
Your repository has a subdirectory containing the project:
`d:/Secufur/SecufurSmartSol/secufur-smart-solutions-unified`

Ensure all your latest changes (including Prisma schema and Next.js code) are pushed to your **GitHub** (or GitLab/Bitbucket) branch (e.g., `main`).

### 2. AWS Account & Amplify Console
- Log into the [AWS Management Console](https://console.aws.amazon.com/).
- Search for **AWS Amplify** in the search bar.

---

## ⚓ Phase 2: Connecting and Building

### 1. Create New App
1. Click **All apps** -> **Create new app**.
2. Select **GitHub** and click **Next**.
3. Authorize AWS if needed, then select:
   - **Repository**: `SecufurSmartSol` (or your repo name)
   - **Branch**: `main`

### 2. Monorepo / Subdirectory Settings
> [!IMPORTANT]
> Since your project is in a subdirectory, you must enable these settings during the "App settings" step.

1. Check the box: **"Connecting a monorepo?"**.
2. For **App root**, enter: `secufur-smart-solutions-unified`.
3. Amplify will attempt to auto-detect settings, but we will override them next.

### 3. Advanced Build Settings (`amplify.yml`)
Click **Edit** on the build specification and paste this exactly:

```yaml
version: 1
applications:
  - appRoot: secufur-smart-solutions-unified
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
            - npx prisma generate
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .next/cache/**/*
```

### 4. Environment Variables
Add these in **App settings** -> **Environment variables**. 

> [!IMPORTANT]
> **Formatting Note**: Do **NOT** include double quotes (`"`) in the AWS Console values. For example, use `ap-south-1`, not `"ap-south-1"`.

| Category | Key | Value |
| :--- | :--- | :--- |
| **Database** | `DATABASE_URL` | *Your RDS Connection String* |
| **Auth** | `NEXTAUTH_SECRET` | *Generated Secret* |
| **Auth** | `NEXTAUTH_URL` | `https://secufur.in` (See Note below) |
| **AWS S3** | `SEC_AWS_ACCESS_KEY_ID` | `AKIAT7HHTHJZDNGI644N` |
| **AWS S3** | `SEC_AWS_SECRET_ACCESS_KEY` | *Your Secret Key* |
| **AWS S3** | `SEC_AWS_REGION` | `ap-south-1` |
| **AWS S3** | `SEC_AWS_S3_BUCKET_NAME` | `secufur-images1` |
| **Payment** | `RAZORPAY_KEY_ID` | *Your Razorpay Key* |
| **Payment** | `RAZORPAY_KEY_SECRET` | *Your Razorpay Secret* |

---

## 🌐 Phase 3: Custom Domain & Updates

### 1. `NEXT_AUTH_URL` Update Process
You do **not** need to update your local `.env` file for the website to work. The local `.env` is only for your computer.

**How to update and apply changes:**
1. Once your domain `https://secufur.in` is active in Phase 3, go to **Environment variables** in Amplify.
2. Update `NEXTAUTH_URL` to `https://secufur.in`.
3. **Crucial**: After saving, go to **All apps** -> [Your App] -> **main branch** and click **Redeploy this version**. 
   - *Why?* Next.js often "bakes" environment variables into the code during the build. To ensure the site uses the new URL, a redeploy is required.
   - *Do I need a new commit?* No, you can just click "Redeploy this version" on the existing commit.

To make `https://secufur.in/` work, follow these exact steps:

### 1. Add Custom Domain in Amplify
1. Go to your app in the Amplify Console.
2. Click **App settings** -> **Domain management** in the left sidebar.
3. Click **Add domain**.
4. Enter `secufur.in`.

#### Option A: Use Route 53 (Recommended if you want AWS to manage it)
If the "Automatic hosted zone creation" fails with a "Free Tier" error, you must do it manually:
1. Open the [Route 53 Console](https://console.aws.amazon.com/route53/v2/home#Dashboard).
2. Click **Hosted zones** -> **Create hosted zone**.
3. **Domain name**: `secufur.in`.
4. **Type**: Public hosted zone.
5. Click **Create hosted zone**. (Note: This costs $0.50/month).
6. **Update Name Servers**: 
   - Copy the 4 **Name Servers** (NS records) provided by Route 53.
   - Go to your domain registrar (GoDaddy, etc.) and replace their name servers with these 4 AWS ones.
7. **Return to Amplify**: Refresh the page. It should now detect the domain as a Route 53 domain and allow you to proceed.

#### Option B: Manual Configuration (Free Workaround)
If you don't want to use Route 53:
1. Select **Manual configuration** on the Amplify screen.
2. Click **Configure domain**.
3. Follow the DNS record steps provided by Amplify (adding CNAMEs to your current provider).

### 2. DNS Validation & Configuration (GoDaddy/Namecheap/etc.)
Once you click "Configure domain" with Manual Configuration:
1. Amplify will show a table named **"DNS records for your domain"**.
2. **Action**: Log into your domain provider (where you bought `secufur.in`).
3. **Add CNAME for Validation**:
   - AWS will provide a "CNAME" record (e.g., `_xxxxxxxx.secufur.in`). 
   - Add this to your provider's DNS settings. This proves you own the domain.
4. **Add CNAME for Web Traffic**:
   - Look for the record for `www.secufur.in`. 
   - Point it to the CloudFront URL provided by AWS (it looks like `xxxxxxxx.cloudfront.net`).
5. **Root Domain (secufur.in)**:
   - Some providers allow an **ALIAS** or **ANAME** record for the root. 
   - If yours doesn't, AWS handles the redirect from `secufur.in` to `www.secufur.in` automatically once validated.

---

## 🛡️ Phase 4: Final Touches

### 1. SSL Certificate
AWS Amplify provides a **free managed SSL certificate** via Amazon Trust Services. It will automatically renew. Once the "Domain activation" step turns green, your site is secure (`https`).

### 2. Service Role
Ensure your app has a service role with permissions. Go to **App settings** -> **General** and check the **Service role**. If empty, follow the prompt to create one.

### 3. Rewrites and Redirects (Next.js)
If you see "404 on refresh" or "Access Denied" on subpages:
1. Go to **App settings** -> **Rewrites and redirects**.
2. Click **Edit**.
3. Ensure you have the **Next.js - Computed** rule. If not, add a rule:
   - **Source**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
   - **Target**: `/index.html` (Status: 200 - Rewrite)

---

## ✅ Deployment Checklist
- [ ] Code pushed to GitHub branch `main`.
- [ ] `amplify.yml` updated with Prisma generate.
- [ ] All 9 environment variables added.
- [ ] Domain management shows `secufur.in` as **AVAILABLE**.
- [ ] `NEXTAUTH_URL` environment variable updated to `https://secufur.in`.
- [ ] AWS variables renamed with `SEC_` prefix (e.g., `SEC_AWS_ACCESS_KEY_ID`).
- [ ] **Build successfully completed** in the Amplify dashboard.

---

## 🛠️ Post-Deployment Tips

### 1. Razorpay Setup
It is perfectly fine to add Razorpay keys later. Just leave the values as placeholders for now. When you are ready:
1. Add the real keys to **Environment variables**.
2. **Redeploy** the latest build in the Amplify console to apply the changes.

### 2. Updating Environment Variables
Whenever you change an environment variable in the Amplify console, you must **redploy** the latest version for the changes to take effect in your Next.js application.
