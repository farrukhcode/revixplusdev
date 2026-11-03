import type { Service } from "../types";

const service: Service = {
  slug: "rag-knowledge-assistants",
  pillar: "ai",
  title: "RAG assistants that answer from your own data, with sources",
  shortTitle: "RAG Assistants",
  eyebrow: "AI Solutions",
  seoTitle: "RAG Knowledge Assistants & Internal AI Search | RevixPlus",
  metaDescription:
    "Retrieval-augmented assistants built on your documents, tickets and databases: ingestion, embeddings, vector search and grounded answers with citations.",
  keywords: [
    "RAG development services",
    "retrieval augmented generation",
    "internal knowledge assistant",
    "AI search for company documents",
    "enterprise chatbot with citations",
    "vector database integration",
  ],
  icon: "BookOpenCheck",
  heroPromise:
    "Your team should not spend twenty minutes finding the answer that already exists in a PDF, a ticket or a database row. We build assistants that read your data, answer in plain language, and show the source for every claim. Ingestion, chunking, embeddings, vector search and a streaming interface, all tuned on questions your people actually ask.",
  pains: [
    {
      title: "Answers buried in a thousand files",
      body: "Policies, manuals, contracts and old emails hold the knowledge, but search returns file names instead of answers. New hires ask the same questions and senior staff keep interrupting their work to reply.",
    },
    {
      title: "Chatbots that make things up",
      body: "A generic model sounds confident and gets your refund policy wrong. Without retrieval and citations, every answer is a liability and nobody in the company trusts the tool enough to rely on it.",
    },
    {
      title: "Stale knowledge nobody re-indexes",
      body: "The pilot was trained on last year's documents. Nobody owns the update job, so the assistant quietly drifts from reality while the team assumes it is current.",
    },
  ],
  deliverables: [
    "Document ingestion pipeline",
    "Chunking and embedding strategy",
    "Vector search with metadata filters",
    "Grounded answers with citations",
    "Streaming chat interface",
    "Permission-aware retrieval",
    "Evaluation set and accuracy report",
    "Scheduled re-indexing jobs",
  ],
  approach: [
    {
      step: "Collect and clean",
      body: "We connect your sources (drives, wikis, databases, ticketing tools), normalize the content, and decide what should and should not be retrievable based on who will ask.",
    },
    {
      step: "Index",
      body: "Documents are chunked with their structure preserved, embedded, and stored with metadata so retrieval can filter by product, customer, date or access level before ranking.",
    },
    {
      step: "Ground and test",
      body: "The assistant answers only from retrieved context and cites it. We build an evaluation set of real questions and measure answer accuracy and citation precision before launch.",
    },
    {
      step: "Launch and keep fresh",
      body: "The interface streams answers in your web app, Slack or Teams. Re-indexing runs on a schedule or on change events, and a usage dashboard shows what people ask and where answers miss.",
    },
  ],
  stack: [
    "Claude API",
    "OpenAI embeddings",
    "pgvector",
    "Pinecone",
    "Qdrant",
    "LangChain",
    "Vercel AI SDK",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
  ],
  startingAt: {
    price: "from $6,000",
    timeline: "3 weeks",
    note: "Up to three data sources and one interface in the first release.",
  },
  relatedWork: ["difacto", "revixmd-ai-automation", "hrms-saas"],
  relatedServices: ["ai-integration", "chatbots-voice-agents", "llm-evaluation-optimization"],
  faqs: [
    {
      q: "What is a RAG assistant?",
      a: "A RAG assistant is an AI chatbot that retrieves relevant passages from your own documents or databases before answering, then grounds its reply in that content and cites it. Retrieval-augmented generation keeps answers accurate and current without retraining a model.",
    },
    {
      q: "How is RAG different from fine-tuning a model?",
      a: "RAG retrieves your documents at question time, so updates are immediate and answers carry citations. Fine-tuning changes model behavior and style but does not reliably store facts. Most knowledge assistants need RAG first and fine-tuning only for tone or format.",
    },
    {
      q: "Can the assistant respect user permissions?",
      a: "Yes. Permission-aware retrieval stores access metadata with every chunk and filters results by the asking user's role before the model sees anything. A sales rep and a finance lead can use the same assistant and receive answers from different document sets.",
    },
    {
      q: "How accurate are RAG answers?",
      a: "Accuracy depends on source quality, chunking and retrieval tuning, which is why RevixPlus builds an evaluation set of real questions and measures answer and citation accuracy before launch. Well-tuned assistants on clean sources typically answer the large majority of in-scope questions correctly.",
    },
    {
      q: "What does a RAG assistant cost to build?",
      a: "A RAG assistant at RevixPlus starts at $6,000 for up to three data sources and one interface, delivered in about three weeks with an evaluation report. Monthly costs cover model usage and vector storage, usually a few hundred dollars for a mid-sized team.",
    },
  ],
  authorityLinks: [
    {
      label: "Anthropic: Embeddings guide",
      href: "https://docs.anthropic.com/en/docs/build-with-claude/embeddings",
    },
    {
      label: "OpenAI: Retrieval and embeddings guide",
      href: "https://platform.openai.com/docs/guides/embeddings",
    },
    {
      label: "PostgreSQL pgvector extension",
      href: "https://github.com/pgvector/pgvector",
    },
  ],
};

export default service;
