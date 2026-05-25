# 🚶‍♂️ Walkthrough: AWS Amplify Deployment Guide Expansion

I have expanded the AWS Amplify deployment guide to provide the "more detail" you requested, specifically focusing on hosting your website at **`https://secufur.in/`**.

## Key Improvements

### 1. 🏗️ Detailed Repository Context
I've clarified the subdirectory setup (`secufur-smart-solutions-unified`) to ensure Amplify correctly identifies your project root.

### 2. ⚙️ Environment Variable Clarity
I've listed all **9 critical environment variables** derived from your current [.env](file:///d:/Secufur/SecufurSmartSol/secufur-smart-solutions-unified/.env) file, ensuring no step is missed during the Amplify configuration.

### 3. 🌐 Custom Domain Strategy
The guide now includes a dedicated phase for **Domain Management**, covering:
- Adding `secufur.in` and `www.secufur.in`.
- DNS validation steps (CNAME/ALIAS records).
- Automated SSL/TLS certificate handling.

### 4. 🛠️ Optimized Build Config
The `amplify.yml` has been refined for **Next.js 16** and **Prisma**, ensuring `npx prisma generate` runs before the build and that caching is correctly configured for faster subsequent builds.

### 5. 💡 New Clarifications Added
Based on your questions, I've added:
- **No Quotes Policy**: Instructions to avoid double quotes in the AWS Console.
- **Redeploy Logic**: Guidance on how to apply variable changes (like `NEXTAUTH_URL` or Razorpay) without needing new commits.
- **Local vs Live**: Confirmation that your local [.env](file:///d:/Secufur/SecufurSmartSol/secufur-smart-solutions-unified/.env) is safe and independent.
- **AWS Prefix Fix**: Renamed reserved `AWS_` variables to `SEC_AWS_` to fix the Amplify build error.
- **Free Tier Domain Fix**: Provided two paths: "Manual configuration" (Free) or "Manual Route 53 creation" (Paid workaround for the wizard error).

## Final Result
You now have a step-by-step roadmap to go from your local repository to a live, secure website at `https://secufur.in/`.

[📄 View Detailed Deployment Guide](file:///c:/Users/USER/.gemini/antigravity/brain/f334cf4b-e595-49c5-b184-a10c8f3ce738/amplify_deployment_detailed_guide.md)
