# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--alwin-eds-2026--alwinjoseph02.aem.page/
- Live: https://main--alwin-eds-2026--alwinjoseph02.aem.live/

## Documentation

Before using the aem-boilerplate, we recommend you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `alwin-eds-2026` directory in your favorite IDE and start coding :)

## EDS enablement capstone

The custom `EDS Enablement Block` loads from `blocks/eds-enablement-block/`.
Decoration adds both `session-two` and `session-practice` to the block. Each
authored row renders as a responsive panel. Headings, image alternative text,
links, and author-supplied classes are preserved. Images and links are optional;
one-column rows and extra cells remain usable.

### DA authoring

Open https://da.live/#/alwinjoseph02/alwin-eds-2026 and create a page named
`session-2` at the site root. Add a page-level H1, then a new section containing
this two-column block table. Merge the two cells in its first row:

| EDS Enablement Block | |
| --- | --- |
| Insert a valid image using DA's image tools | Add an H2, "Build with Edge Delivery Services", followed by a short paragraph about your practice session. |

The first cell above is an instruction to insert a real image, not text to leave
in the page. A reusable image from the Block Collection is suitable if you have
permission to use it. Give meaningful images descriptive alternative text, and
use empty alternative text only for decorative images. Optionally add a
descriptively named link below the paragraph. Do not use placeholder image URLs.
Keep one H1 on the page and use H2 headings for the new section.

At the bottom of the page, add a separate two-column metadata table with a merged
first row:

| Metadata | |
| --- | --- |
| Title | session-2 setup first page |

For [global/bulk metadata](https://www.aem.live/docs/bulk-metadata), edit the site's
`metadata` sheet in DA (create it if absent). Use one sheet with these columns:

| URL | Title |
| --- | --- |
| ** | session-2 setup |

Preserve existing rows. Put the site-wide `**` entry before more specific entries.
Preview the metadata sheet and the page using AEM Sidekick's **Preview** action;
do not use **Publish** for this review. Page metadata takes precedence over bulk
metadata: `/session-2` must have the title `session-2 setup first page`, while a
page without its own title should use `session-2 setup`. Verify the resulting HTML
`<title>`, rather than assuming the tables took effect.

### Local and feature-branch review

Run `npx -y @adobe/aem-cli up` from this worktree (local code with preview content).
Before reviewing the decorated page, inspect backend markup:

```sh
curl http://localhost:3000/session-2.plain.html
```

Confirm the response includes an `eds-enablement-block` with the expected row and
cell structure. Visit http://localhost:3000/session-2 and check image loading,
keyboard focus, narrow/wide layouts, both required block classes, and the page
title. Run `npm run lint` for JS/CSS checks.

The browser fixture at `test/eds-enablement-block.html` checks missing/extra cells,
image classification, and preservation of authored content. To run it without
preview content, serve the worktree with `python3 -m http.server 3001 --bind 127.0.0.1`
and open http://localhost:3001/test/eds-enablement-block.html. It should report
`3 checks passed`; also inspect narrow/wide layouts and keyboard focus. Test files
are excluded from delivery by `.hlxignore`. This static fixture does not replace
the AEM/DA content checks above.

After the feature branch is pushed and content is previewed, review:
https://aljoseph-adobe-eds-capstone-block--alwin-eds-2026--alwinjoseph02.aem.page/session-2

This URL is a review target, not evidence that content was authored or that code
sync has completed. DA live preview has limitations; see
https://docs.da.live/authors/reference/live-preview#limitations and use the
feature-branch AEM preview to check the actual custom block.

### User-owned completion

Install AEM Sidekick if needed, review and merge the code PR, then separately
publish the intended page and metadata using Sidekick. Check
https://main--alwin-eds-2026--alwinjoseph02.aem.live/session-2 and capture a
screenshot only after confirming the published result. Write a 5-8 sentence
reflection describing what you built, a problem you actually encountered, and
how you resolved it. Neither a code merge nor DA editing alone publishes content.
