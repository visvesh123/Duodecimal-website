# Deploying the website

The website is the `frontend/` folder. It runs on Cloud Run as the service **`duodecimal-website`** in project **`muone-qtap`**, region **`asia-south1`**:
https://duodecimal-website-ggoqswadia-el.a.run.app

`frontend/Dockerfile` builds the React app and serves it with nginx (`frontend/nginx.conf`). nginx sends every unknown path, such as `/privacy-policy`, to `index.html`, so direct links work.

The site is static: no API is deployed, and nginx answers `/api/...` with 404. The contact form, blog, happenings and client stories need the API in `backend/`, so they show errors or empty states on the live site.

## 1. Run it locally first

Development server, with live reload:

```bash
cd frontend && npm start
```

Or the exact production container (needs Docker Desktop running), then open http://localhost:8080:

```bash
docker build -t duodecimal-website frontend && docker run --rm -p 8080:8080 duodecimal-website
```

## 2. Deploy by hand

```bash
gcloud run deploy duodecimal-website --source frontend --project muone-qtap --region asia-south1
```

## 3. Deploy automatically on every push to `main`

[.github/workflows/deploy.yml](../.github/workflows/deploy.yml) runs the same command. It stays switched off until this one-time setup is done.

Run once, as a `muone-qtap` owner:

```bash
PROJECT_ID=muone-qtap
GITHUB_REPO=visvesh123/Duodecimal-website
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

gcloud services enable iamcredentials.googleapis.com --project $PROJECT_ID

gcloud iam service-accounts create github-website-deployer --project $PROJECT_ID
SA=github-website-deployer@$PROJECT_ID.iam.gserviceaccount.com
for ROLE in roles/run.sourceDeveloper roles/iam.serviceAccountUser roles/serviceusage.serviceUsageConsumer; do
  gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:$SA --role=$ROLE
done

gcloud iam workload-identity-pools create github --location=global --project $PROJECT_ID
gcloud iam workload-identity-pools providers create-oidc github \
  --project $PROJECT_ID --location=global --workload-identity-pool=github \
  --issuer-uri=https://token.actions.githubusercontent.com \
  --attribute-mapping=google.subject=assertion.sub,attribute.repository=assertion.repository \
  --attribute-condition="assertion.repository=='$GITHUB_REPO'"
gcloud iam service-accounts add-iam-policy-binding $SA --project $PROJECT_ID \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/attribute.repository/$GITHUB_REPO"

echo "GCP_WORKLOAD_IDENTITY_PROVIDER = projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/github"
echo "GCP_SERVICE_ACCOUNT = $SA"
```

Then in **GitHub → Settings → Secrets and variables → Actions**:

| Type | Name | Value |
|---|---|---|
| Secret | `GCP_WORKLOAD_IDENTITY_PROVIDER` | First line printed above |
| Secret | `GCP_SERVICE_ACCOUNT` | Second line printed above |
| Variable | `GCP_DEPLOY_ENABLED` | `true` (switches the workflow on) |

From then on, every push to `main` redeploys the site. Progress shows under **Actions** on GitHub. To roll back, open the service in Cloud Run → **Revisions** and send traffic to an earlier revision.
