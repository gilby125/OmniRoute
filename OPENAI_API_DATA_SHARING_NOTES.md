# Sharing feedback, evaluation and fine-tuning data, and API inputs and outputs with OpenAI

Source: https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai

Updated: 9 hours ago

OpenAI aims to create models that are useful for developers across a variety of domains and applications. We improve our models through research advancements and by applying them to real-world challenges and contexts.

By default, we don't use any inputs or outputs from our products for business users, including ChatGPT Business, ChatGPT Enterprise, and the API, to improve our models. However, we recognize that API users currently face limitations in tailoring these models to evolve with their specific needs.

One way to contribute to this improvement is by opting to share feedback, evaluation and fine tuning data, or API inputs and outputs with OpenAI. Organizations who choose to do so can manage these options at the project or organization level through their data controls settings. Data you share will be used to help identify usage patterns, measure model quality, and inform future evaluation and training of models.

You're always in control of your data and privacy when using the OpenAI API. You can change your settings and choose to opt out again at any time. To help protect people's privacy, we take steps to reduce the amount of personal information in our training datasets before they are used for any model improvement and training.

Please be aware that by sharing data from your organization to OpenAI, you confirm that you have the appropriate permissions for OpenAI to process and use this data as described in this article. Please do not include any sensitive, confidential, or proprietary information in the data you share.

You will need to be an organization owner to opt in to share data with OpenAI. Accounts with Zero Data Retention enabled cannot opt in to our data sharing mechanisms.

## How to share feedback through the API Dashboard

The ability to share feedback via the playground is disabled by default for all organizations. If an account owner wants to opt-in to sharing API model feedback for their organization, they can select "enabled" or "enabled for selected projects" on the organization settings page.

Platform setting to share model feedback enabled for all projects

When this is set to "enabled," members of an organization will see a "thumbs down" button on model responses in the Playground. When clicked, this will give the user the option to share feedback and the conversation up to that point (including inputs, outputs, and files uploaded) with our feedback systems.

ChatGPT feedback form noting OpenAI may use the current chat to improve and train models

## How to share evaluation and fine-tuning data with OpenAI

By default, data sharing for evaluation and fine-tuning data is disabled for all organizations. Account owners can opt into this feature via their organization's settings page, either for all projects or only selected ones. Account owners can change these settings at any time and choose to opt out again. This setting is not available to certain organizations, including customers with Zero Data Retention enabled.

When set to "Enabled," evaluations and fine-tuning data sent to OpenAI on enabled projects will be shared with OpenAI. Evaluations you share with OpenAI are currently processed at no cost for up to 7 runs per week. When sharing data for reinforcement fine-tuning jobs, the resulting models will be billed at discounted inference rates.

Evaluation and fine-tuning data sharing setting with Disabled selected and a notice about 7 free weekly evals

## How to share inputs and outputs with OpenAI

By default, data sharing inputs and outputs is disabled for all organizations. Account owners can opt into this feature via their organization's settings page, either for all projects or only selected ones. Account owners can change these settings at any time and choose to opt out again. This setting is not available to certain organizations, including Enterprise and customers with Zero Data Retention enabled.

Help text for the Share inputs and outputs with OpenAI setting explaining organization traffic sharing

When set to "Enabled," inputs and outputs that are sent to OpenAI on enabled projects will be shared with OpenAI.

## Complimentary tokens on prompts and completions shared with OpenAI

Some organizations may qualify for daily complimentary tokens on traffic shared with OpenAI.

### How do I know if I am eligible for the free tokens or if I am enrolled for the free tokens?

You can see if you're eligible for the offer by going to your data sharing settings page and confirming whether you see the "You're eligible for free daily usage on traffic shared with OpenAI" offer. When you enable data sharing and you're qualified for complimentary tokens, you'll see "You're enrolled for complimentary daily tokens".

OpenAI will give 30 days notice before terminating this program.

This is what the offer for eligible users in Tiers 3-5 looks like:

Share inputs and outputs with OpenAI setting with Disabled selected and free daily usage eligibility notice

Similarly, this is what the offer for eligible users in Tiers 1-2 looks like:

Share inputs and outputs with OpenAI setting with Disabled selected and free daily usage eligibility notice

If you do not see this language on your data sharing page, you are not eligible for the complimentary tokens at this time.

### How can I confirm that I'm receiving the free daily tokens, do they apply automatically or do I need to opt-in?

If you opt-in to share traffic with OpenAI and qualify for the complimentary tokens offer, the complimentary tokens will apply automatically to traffic you share with OpenAI on the models listed below.

Fine-tuned models, fine-tuning training, evals, and tool use are not included.

Note that you'll only get the complimentary tokens on traffic shared with OpenAI, so if you only opt-in to share traffic on select projects, only usage on those projects would qualify for the free tokens. You need a positive account balance to use OpenAI models and the free tokens.

You can confirm your free token usage by comparing usage activity (where the free tokens will be included in your total) with Costs (where the free tokens will not appear as a cost) on your Usage Dashboard. Make sure to select both "input tokens" and "output tokens" to view your full usage on the Usage Dashboard.

You can also view the complimentary tokens on your https://platform.openai.com/usage/chat-completions dashboard and grouping by "service tier." The free tokens will be displayed as "data sharing incentive tier - input/output tokens" Make sure to include both input and output tokens to see total usage. Please note that the total number of data sharing incentive tier tokens may not be exactly 1M or 10M depending on request size (see "How does the token quota limit work and when does it refresh?" below).

## What models are included in this offer?

This offer is only available on the following models, and the token quota is shared across the model groups. Fine-tuned models, fine-tuning training, evals, and tool use are not included.

### 1M token group (250K for usage tiers 1-2)

- gpt-5.4-2026-03-05
- gpt-5.2-2025-12-11
- gpt-5.1-2025-11-13
- gpt-5.1-codex
- gpt-5-codex
- gpt-5-2025-08-07
- gpt-5-chat-latest
- gpt-4.5-preview-2025-02-27 (deprecated and shut down as of 7/14/25)
- gpt-4.1-2025-04-14
- gpt-4o-2024-05-13
- gpt-4o-2024-08-06
- gpt-4o-2024-11-20
- o3-2025-04-16
- o1-preview-2024-09-12
- o1-2024-12-17

### 10M token group (2.5M for usage tiers 1-2)

- gpt-5.4-mini-2026-03-17
- gpt-5.4-nano-2026-03-17
- gpt-5.1-codex-mini
- gpt-5-mini-2025-08-07
- gpt-5-nano-2025-08-07
- gpt-4.1-mini-2025-04-14
- gpt-4.1-nano-2025-04-14
- gpt-4o-mini-2024-07-18
- o4-mini-2025-04-16
- o1-mini-2024-09-12
- codex-mini-latest

## How does the token quota limit work and when does it refresh?

You're entitled to up to 1M (250k for tiers 1-2) tokens per day shared across gpt-5, gpt-5-codex, gpt-5-chat-latest, gpt-4.5-preview (deprecated and shut down as of 7/14/25), gpt-4.1, gpt-4o, o1, o3 and o1-preview models, and up to 10M (2.5M for tiers 1-2) tokens per day shared across gpt-5-mini, gpt-5-nano, gpt-4.1-mini, gpt-4.1-nano, gpt-4o-mini, o1-mini, o4-mini, and codex-mini-latest models.

If you use more than the combined limit of 1M/250k or 10M/2.5M across these model groups, overage will be billed at normal rates. For example, if you use 750k tokens on o1 and then 500k tokens on gpt-4o on one day, you'd be billed for 250k tokens as overage.

For each new request, we check against your running total for that day. If a single request would make your daily total exceed the token quota, that entire request is billed at normal rates.

For example, for the 1M token daily quota:

| Time (UTC) | Tokens in request | Running total | Free or billed? |
| --- | ---: | ---: | --- |
| 09:15 | 120k | 120k | Free |
| 12:40 | 140k | 260k | Free |
| 14:30 | 150k | 410k | Free |
| 16:00 | 150k | 560k | Free |
| 18:05 | 150k | 710k | Free |
| 20:20 | 150k | 860k | Free |
| 22:15 | 115k | 975k | Free |
| 23:10 | 30k | 1,005k | Billed (entire 30k) |

In this example, the first seven requests are free. The eighth request would take the total past 1 million tokens, so it is charged in full. The free-token counter resets at 00:00 UTC each day.

As of March 6, 2025, tokens refresh daily at 00:00 UTC time. We made this change to allow for improved predictability and observability.
