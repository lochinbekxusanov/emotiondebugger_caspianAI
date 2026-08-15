# Emotion Debugger 🧠🐛

> Debug your feelings like you debug your code.

An AI agent that reads emotionally loaded text — a message, a comment, a rant — and "debugs" it the way you'd debug a stack trace: it identifies the emotion(s) present, traces the trigger phrases that caused them, explains the likely root cause, and suggests a next step. Built for the **Caspian AI Agent Hackathon**.

## Why

Every AI chatbot can tell you "that sounds frustrating." None of them actually show their work. Emotion Debugger treats an emotional message like a bug report: it doesn't just label the feeling, it traces *why* the model thinks that, the same way a stack trace shows you which line broke.

## What it does

### 1. On-demand debugging (reactive)
Send the agent any piece of text — your own message, a teammate's Slack comment, an email you're not sure how to read — and it replies with a structured "debug report":

```
🐛 EMOTION DEBUG REPORT

Detected: Frustration (70%), Fatigue (20%), Hope (10%)

Trigger trace:
  → "for the third time this week" → repetition/fatigue signal
  → "I guess I'll just do it myself" → frustration + low trust signal

Root cause (inferred):
  Recurring unmet expectation, possibly feeling unsupported by the team.

Suggested response:
  Acknowledge the repetition before addressing the task itself —
  a fix without acknowledgment will likely read as dismissive.
```

### 2. Proactive monitoring
The agent listens to a channel (e.g. a team Slack/Discord channel) and, when it detects a strong negative-emotion spike in someone's message, it privately pings you on a *different* channel (e.g. Telegram) with a heads-up — so you can check in with them before it escalates.

This is the part that only makes sense with Caspian: **one agent identity, reading on one channel and reaching out on another**, without you building any messaging glue code.

## How it uses Caspian

Built on [`caspian-sdk`](https://github.com/TryCaspian/caspian-sdk). One handler, two channels, no per-channel duplication:

```python
from caspian_sdk import CommClient
from emotion_debugger import debug_emotion, should_alert

client = CommClient()  # reads CASPIAN_API_KEY / CASPIAN_BASE_URL from .env

@client.on_message
def handle(message):
    report = debug_emotion(message.text)
    message.reply(report.to_string())

    if should_alert(report):
        client.initiate(
            OWNER_CONNECTION_ID,
            OWNER_TELEGRAM_HANDLE,
            f"⚠️ Heads up — {message.sender} sounded {report.top_emotion} in {message.channel}."
        )

client.listen()  # one loop, every connected channel
```

Channels connected for this submission:
- **Telegram** — where the owner receives proactive alerts and can debug messages directly
- **Slack** — where the agent listens to a team channel and responds to direct debug requests

## Architecture

```
┌─────────────┐        ┌───────────────────┐        ┌──────────────┐
│   Slack /   │──text──▶│  Emotion Debugger  │──alert─▶│  Telegram    │
│   Discord   │        │  (LLM-based        │        │  (owner DM)  │
│  (monitored)│◀─reply──│   analysis engine) │        │              │
└─────────────┘        └───────────────────┘        └──────────────┘
                                │
                                ▼
                        Caspian SDK
                    (single on_message handler,
                     identity shared across channels)
```

## Setup

```bash
git clone <this-repo>
cd emotion-debugger

pip install caspian-sdk
pipx install caspian-cli

caspian init
caspian connect telegram --name "Emotion Debugger"
caspian connect slack --name "Emotion Debugger"

cp .env.example .env   # add your LLM API key
python main.py
```

## Tech stack

- [`caspian-sdk`](https://github.com/TryCaspian/caspian-sdk) — cross-channel messaging identity
- LLM inference for emotion analysis (via Featherless.ai for the hackathon)
- Python

## Demo

📺 [Demo video link here]

## Hackathon submission

Built for the Caspian AI Agent Hackathon (15-day, Aug 2026).
- ✅ Uses `caspian-sdk`
- ✅ Runs on 2 supported channels (Telegram + Slack) through a single handler
- ✅ Reactive debugging + proactive cross-channel alerting

## Roadmap / what's next

- [ ] Emotion trend tracking over time per person/channel
- [ ] WhatsApp support for personal use cases
- [ ] Configurable sensitivity thresholds for proactive alerts
- [ ] Team-level "emotional health" weekly digest

## License

MIT
