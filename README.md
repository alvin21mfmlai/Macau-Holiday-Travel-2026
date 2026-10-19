# Macau family trip site

The trip page plus a trip assistant that answers questions about the plan, using your OpenAI API credit.

```
macau-trip/
├── index.html      the trip page
├── api/chat.js     the trip assistant (holds the itinerary, calls OpenAI)
├── vercel.json     gives the assistant up to 30 s to answer
├── .env.example    settings, for local testing
└── README.md
```

## Before you deploy

1. Create an API key at https://platform.openai.com/api-keys and add credit under Billing.
   A ChatGPT Plus subscription does not cover API use; API credit is billed separately.
2. In the OpenAI dashboard, set a monthly budget for the project the key belongs to, so the
   assistant can never spend more than you want.

## Deploy on Vercel

1. Push this folder to a GitHub repo and import it in Vercel (framework preset: Other),
   or run `vercel` inside the folder.
2. In the Vercel project, open Settings > Environment Variables and add:
   - `OPENAI_API_KEY`: your key (required)
   - `FAMILY_CODE`: a short code the family types once (recommended; stops strangers using your credit)
   - `OPENAI_MODEL`: optional, defaults to `gpt-5-mini`
3. Redeploy so the variables take effect, then share the URL and the family code.

## Good to know

- The key stays on the server. The page and your family never see it.
- Each question sends the itinerary plus the last few messages, and answers are kept short, so cost per question is small.
- If you change the plan, update both `index.html` and the `ITINERARY` text at the top of `api/chat.js`.
