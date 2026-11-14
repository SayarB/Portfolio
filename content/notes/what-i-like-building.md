# What I like building

## The thing underneath
I love solving problems, making small decisions, and improving a part of an application. Each one is a puzzle that needs me to think out of the box.

## Syraa: use what the framework already gives me
Syraa is my take on an agent harness. It doesn't have to be a coding harness. It's a harness that handles memory, context and tools, so that anyone with little knowledge of AI can use it.

I started out with a lot of custom-built stuff and quickly realised the framework has to be used with its own primitives. Standards in AI are changing quickly, and to build a harness that can keep extending as AI keeps changing, it needs to use the standard way of doing things. So I changed my mind: I began by building my own and moved to the standard way.

I use the framework's own streaming, tools, memory and storage. I keep my own domain packages for memory, context and ingestion free of framework imports, and wire them in through tools, processors and instructions. I write custom code only when nothing in the framework fits, when it's genuinely product logic, or when there's a documented workaround.

## ai-mcp-brain: tools that work with agents
I chose an agent-first install: the user pastes a one-liner pointing at an INSTALL.md, and their agent does the setup, with no shell installer. Every operating system is different, and every machine sets things up differently. I wanted the app to be able to set itself up the way each user wants. Everything is so customizable nowadays that it intrigued me. If an agent is going to use the tool, it makes sense for an AI agent to set it up too.

I also built a brainstormer skill that interviews me about an idea before any building starts. I was very much into one-shotting ideas, but I wanted the agent to take a predictable route, with the major decisions made before implementation starts. It saves output tokens, because expectations are set from the beginning. And because I solve problems best when they're put to me one at a time, the skill keeps asking me problems to solve. I come up with the solutions, and the agent implements them later. It surfaces its potential problems up front, instead of building from its own assumptions and then being told to change everything.

## A self-hosted agent for pull requests (a private project)
I designed it to run on a customer's own server. Security came first. Pull requests from forks are never allowed, because I didn't want anybody misusing the tool by creating a lot of them. Outbound network access is allowlisted, and unknown destinations wait for a human to approve, so the infrastructure is protected from malicious websites. That matters because agents get browser access so people can run end-to-end tests. I give a capability like a browser, but only with guardrails around it. I keep the details of this one vague because the project is private.
