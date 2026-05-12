# 🚀 Upgrading OmniRoute (Durable Strategy)

Follow this guide to update your OmniRoute instance to the latest upstream version while keeping your configuration and data intact.

## 1. Preparation (Before Pulling)

Always take a snapshot of your current configuration before an upgrade.

```bash
# Ensure OmniRoute is running
./scripts/config-snapshot.sh backup
```

## 2. Pull Upstream Changes

Fetch the latest code from the upstream repository and merge it into your fork.

```bash
# Assuming 'upstream' is the official OmniRoute repo
git fetch upstream
git merge upstream/main
```

> [!NOTE]
> Thanks to `.gitattributes`, your `docker-compose.yml` and other deployment files will be protected from merge conflicts.

## 3. Check for Environment Changes

Check if upstream added any new required environment variables to `.env.example`.

```bash
./scripts/env-diff.sh
```

If new variables are listed, add them to your `.env` (or `./data/.env`).

## 4. Redeploy with Release Image

Since your `docker-compose.override.yml` is set to use the `latest` image, you just need to pull the new image and restart the stack.

```bash
# Pull the latest official image
docker compose pull

# Restart the stack (Komodo will usually pick this up automatically if configured)
docker compose --profile base up -d
```

## 5. Verification

1.  **Check logs:** `docker logs omniroute --tail 50`
2.  **Check migrations:** Ensure no errors in the startup logs.
3.  **Check Dashboard:** Log in and verify that your Providers, Combos, and API Keys are still there.

---

## Why this strategy works:
1.  **Data Isolation:** Your `storage.sqlite` and `server.env` live in the `./data` volume, which is never touched by `git pull` or container updates.
2.  **Config Durability:** Your `.env` and `docker-compose.override.yml` are gitignored, so they are never overwritten.
3.  **Conflict Prevention:** `.gitattributes` tells git to favor your local deployment configs during merges.
4.  **No Local Builds:** Using `image: diegosouzapw/omniroute:latest` avoids the 10-minute build process and ensures you are on a verified release.
