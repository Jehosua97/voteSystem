# Lets Vote — Live Dashboard

🏆 **Part of the project awarded Best Project of the Year, Conestoga College 2025.**

The admin/live dashboard for a Kafka-based distributed voting system, built by **Team 5** at Conestoga College. This is the operator-facing side: login, a live view of votes as they arrive, and admin controls — talking to the citizen nodes over HTTP while the votes themselves replicate between nodes through Kafka.

The distributed backend behind this dashboard — Kafka, Zookeeper, and the citizen nodes — lives in [dockersVoteSystem](https://github.com/Jehosua97/dockersVoteSystem).

## Team

Built with [@kakkarvarun](https://github.com/kakkarvarun) (login/admin layout, vote-log display) alongside [@Jehosua97](https://github.com/Jehosua97) (integration with the citizen backend, CORS/networking, live results view).

## What this is

This project started from the [Quasar Prime Admin](https://github.com/pratik227/quasar-admin) template (Vue 3 + Quasar) and was adapted into the operations dashboard for the voting system: a login flow, an admin view of incoming votes, and a live results display wired up to the citizen services over HTTP.

## Running it

```bash
npm install
quasar dev
```

## Tech stack

Vue 3, Quasar Framework, Axios, ECharts.

---
<sub>UI foundation based on the Quasar Prime Admin template by Pratik Patel (MIT licensed, see [LICENSE.md](LICENSE.md)).</sub>
