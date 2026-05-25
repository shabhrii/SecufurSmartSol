# AWS Amplify Deployment Guide: Secufur Smart Solutions

This guide provides the exact settings and options you need to select in the AWS console to deploy your project successfully.

## Pre-requisites
1. **GitHub Push**: Ensure your latest code (including my fixes) is pushed to your GitHub repository.
2. **Environment Variables**: Have your [.env](file:///d:/Secufur/SecufurSmartSol/secufur-smart-solutions-unified/.env) file ready to copy values into the AWS Console.

---

## Step 1: Connect GitHub to Amplify
1. Log into the **AWS Management Console** and search for **AWS Amplify**.
2. Click **All apps** -> **Create new app**.
3. Select **GitHub** and click **Next**.
4. Authorize AWS Amplify to access your GitHub account if prompted.
5. Select your **Repository** and the **Branch** (`main`).

---

## Step 2: Monorepo / Subdirectory Settings
> [!IMPORTANT]
> Since your project is in the subdirectory `secufur-smart-solutions-unified`, you MUST fulfill these specific settings.

1. In the **Add repository branch** step, click the checkbox **Connecting a monorepo?**.
2. For **App root**, enter: `secufur-smart-solutions-unified`.
3. Amplify will attempt to automatically detect the build settings. If it fails, don't worry, we will fix it in the next step.

---

## Step 3: Build Settings (amplify.yml)
In the **Build settings** section, click **Edit** on the `amplify.yml` configuration and paste the following exactly:

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

**Key Points:**
- `appRoot`: Tells Amplify where the [package.json](file:///d:/Secufur/SecufurSmartSol/secufur-smart-solutions-unified/package.json) is.
- `npx prisma generate`: Ensures the database client is ready before the build starts.
- `npm ci`: Uses the lockfile for a clean, consistent install.

---

## Step 4: Environment Variables
Go to **App settings** -> **Environment variables** in the left sidebar (or during the setup wizard). Add the following keys:

| Key | Value (Copy from your [.env](file:///d:/Secufur/SecufurSmartSol/secufur-smart-solutions-unified/.env)) |
| :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres:secufur789@...sslmode=require` |
| `NEXTAUTH_SECRET` | `uK6LrgmKLjiI...` |
| `NEXTAUTH_URL` | Your Amplify URL (e.g., `https://main.xxxx.amplifyapp.com`) |
| `AWS_ACCESS_KEY_ID` | `AKIAT7HHTHJZ...` |
| `AWS_SECRET_ACCESS_KEY` | `+ChlJgY...` |
| `AWS_REGION` | `ap-south-1` |
| `AWS_S3_BUCKET_NAME` | `secufur-images1` |
| `RAZORPAY_KEY_ID` | *Your Real Razorpay ID* |
| `RAZORPAY_KEY_SECRET` | *Your Real Razorpay Secret* |

> [!TIP]
> Once you have a custom domain, remember to update `NEXTAUTH_URL` to your real domain (e.g., `https://secufursmartsol.com`).

---

## Step 5: Service Role & Build Image
1. Under **App settings** -> **General**, check the **Service role**. If one isn't assigned, follow the prompt to create one with the `AdministratorAccess-Amplify` managed policy.
2. In **Build settings** -> **Build image settings**, ensure you are using the **Latest** image (Amazon Linux 2023). This is required for Node.js 20+ and Next.js 15/16 compatibility.

---

## Step 6: Rewrites and Redirects
Next.js on Amplify usually handles this automatically, but if you encounter "404 on refresh" errors:
1. Go to **App settings** -> **Rewrites and redirects**.
2. Ensure you have the standard Next.js rule:
   - **Source address**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
   - **Target address**: `/index.html` (For SPA) OR it should be detected as **Next.js - Computed**.

---

## Troubleshooting Build Failures
- **Node Version**: If the build fails with "Unsupported engine", add an environment variable `_CUSTOM_IMAGE_NODE_VERSION` with value `20` or `22`.
- **Prisma**: If you get "Prisma Client could not find the binary", double check that `npx prisma generate` is in your `preBuild` commands.
