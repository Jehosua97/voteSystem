# Let's Vote: Operator Dashboard & Voter API

🏆 **Part of the project that won 1st Place at the Virtualization and Cloud Computing Capstone Project Presentations, Conestoga College 2025.** 📣 [See the announcement](https://www.linkedin.com/posts/conestoga-college-school-of-applied-computer-science-information-technology_celebrating-success-virtualization-and-activity-7317560897239937024-F5YF)

The operator-facing side of the [Let's Vote](https://github.com/Jehosua97/dockersVoteSystem) decentralized voting platform: a Vue/Quasar dashboard plus an Express API in front of MySQL, deployed as the `Web Server` tier (`10.173.8.114`) talking to a dedicated `govDbServer` (`10.173.8.115`) in the full architecture. The vote log itself is replicated separately across Kafka-connected nodes; see [dockersVoteSystem](https://github.com/Jehosua97/dockersVoteSystem) for that piece and the full system diagram.

## What this repo contains

- **`query.js`**: Express API backed by MySQL: voter login, look-up by citizen number, recording a vote (`voted`, `party`), and a live `/voteStatistics` endpoint that aggregates results per party.
- **Vue 3 / Quasar frontend** (`src/`): login flow, admin view of incoming votes, and a live results dashboard, built on top of the [Quasar Prime Admin](https://github.com/pratik227/quasar-admin) template.
- **`Citizen PWD.sql`**: table schema plus synthetic seed data for demo/local runs (real deployment data lived in the actual `govDbServer`, not in this repo).

## Team

Part of a project built by Chetan Aggarwal, Parag Bhrahmbhatt, Jehosua Alan Joya Venegas, Varun Pradeep Kakkar, and Vaibhavi Tembhare. This dashboard specifically was built with [@kakkarvarun](https://github.com/kakkarvarun) (login/admin layout, vote-log display) alongside [@Jehosua97](https://github.com/Jehosua97) (API integration, CORS/networking across the VM tiers, live results view).

## Running it

Backend API:
```bash
cp .env.example .env   # set DB_HOST / DB_USER / DB_PASSWORD / DB_NAME
node query.js
```

Frontend:
```bash
npm install
quasar dev
```

## Tech stack

Vue 3, Quasar Framework, Axios, ECharts, Node.js, Express, MySQL.

---
<sub>UI foundation based on the Quasar Prime Admin template by Pratik Patel (MIT licensed, see [LICENSE.md](LICENSE.md)).</sub>
