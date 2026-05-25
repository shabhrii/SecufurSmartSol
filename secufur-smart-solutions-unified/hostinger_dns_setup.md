# Hostinger DNS Setup for secufur.in → AWS Amplify

## Where to Go
1. Login at **hpanel.hostinger.com**
2. Click **Manage** next to `secufur.in`
3. Left sidebar → **DNS / Nameservers** → **DNS Records** tab

---

## Records to Add

> [!IMPORTANT]
> Use the exact values below — copy directly from the Amplify console copy buttons (📋). Do NOT type manually.

---

### Record 1 — SSL Certificate Validation
> Proves to AWS that you own the domain. Required for HTTPS.

| Field | Value |
| :--- | :--- |
| **Type** | `CNAME` |
| **Name** | `_f971da984c3abe61d9e473911907f264` |
| **Target** | `_0c6283897b88213268fa5d2adbae01fc.jkddztszm.acm-validations.aws` |
| **TTL** | `3600` (or leave default) |

---

### Record 2 — Root Domain (`secufur.in`)
> Routes visitors who type `secufur.in` directly to your app.

| Field | Value |
| :--- | :--- |
| **Type** | `ANAME` (also called ALIAS — NOT a regular CNAME) |
| **Name** | `@` |
| **Target** | `dqhlhs6sy8q33.cloudfront.net` |
| **TTL** | `3600` (or leave default) |

> [!WARNING]
> Delete any existing **A records** for `@` (Hostinger's default parking page records) before adding this. If Hostinger doesn't support ANAME/ALIAS, use a `CNAME` for `@` instead.

---

### Record 3 — WWW Subdomain (`www.secufur.in`)
> Routes visitors who type `www.secufur.in` to your app.

| Field | Value |
| :--- | :--- |
| **Type** | `CNAME` |
| **Name** | `www` |
| **Target** | `dqhlhs6sy8q33.cloudfront.net` |
| **TTL** | `3600` (or leave default) |

---

## After Adding All 3 Records

1. Go back to **AWS Amplify → Hosting → Domain management**
2. Status will show **"Pending verification"** — this is normal
3. Wait **15 minutes to 1 hour** for DNS to propagate
4. Status turns **"Active" ✅** → `https://secufur.in` is live!

---

## Summary Checklist

- [ ] Record 1 (SSL CNAME) added in Hostinger
- [ ] Record 2 (Root `@` ANAME/ALIAS) added — old A records deleted first
- [ ] Record 3 (WWW CNAME) added
- [ ] Back on Amplify — domain shows "Pending verification"
- [ ] Wait for green "Active" status
