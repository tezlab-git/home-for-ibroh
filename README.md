# Ibroh's Digital Home

Create a modern, elegant personal website for ibroh.im.

The website represents a young tech enthusiast, builder, creator, and learner. It should feel like a combination of a personal portfolio, personal blog, and digital home — simple for the first version, but designed so it can later grow into a much larger personal platform.

Overall Design

Style: minimal, premium, modern, editorial, slightly futuristic.

Do NOT make it look like a generic corporate portfolio or a typical developer template.

Use:

Lots of whitespace

Clean typography

Subtle borders

Soft rounded corners

Minimal animations

Elegant hover effects

Strong visual hierarchy

Responsive design

Light mode as the default

Very subtle accent color

High-quality typography

The website should feel personal, intelligent, calm, and sophisticated.

Think of the aesthetic as a combination of:

personal knowledge hub

modern designer portfolio

minimalist tech founder website

editorial blog

Avoid excessive gradients, excessive glassmorphism, neon colors, huge animations, or clutter.

Header

Create a clean sticky navigation bar.

Left:
ibroh.im

Navigation:

Home

About

Projects

Writing

Now

Right:

Search icon

Theme toggle

Contact button

On mobile, use a clean hamburger menu.

Hero Section

The first screen should immediately communicate who the website belongs to.

Large headline:

I build, learn, and share.

Supporting text:

A personal space for my projects, ideas, experiments, and things I’m learning along the way.

Add two buttons:

Explore my work
Read my writing

Below the hero, add a subtle small line:

Based in Uzbekistan · Building things on the internet

Keep the hero visually clean and spacious.

Featured Projects

Create a section titled:

Selected Projects

Show 3–4 project cards.

Each card should contain:

Project name

Short description

Category/tag

Status

Arrow icon

Optional thumbnail/visual

Example projects:

Tezlab
AI-powered platform for launching websites and digital businesses.

Mano
A vocabulary learning application focused on helping people remember words more effectively.

SalomAT
An experimental wearable technology concept focused on personal health and daily insights.

Mayoq Labs
A personal technology and product ecosystem for building digital products.

Use placeholder links where necessary.

Add:

View all projects →

About Section

Create a compact but visually interesting About section.

Title:

A little about me

Text should communicate that this is a personal website where the owner documents:

things he builds

things he learns

ideas he explores

experiments

books and knowledge

thoughts about technology and personal development

Add a small portrait placeholder area, but do not generate a fake person image.

Include a simple link:

More about me →

Writing / Blog Section

Create a section titled:

Latest Writing

This should look more like an editorial publication than a standard blog.

Create 4 sample article cards.

Example titles:

What I’m Building Right Now

Why I Like Building Small Products

Lessons From My Latest Project

The Things I’m Learning

Each article should have:

Title

Short excerpt

Date

Reading time

Category

Arrow

Add:

Read all writing →

The blog architecture should be prepared for future CMS/database integration.

Now Section

Create a small section called:

Now

This represents what I am currently working on, learning, reading, and exploring.

Example:

Building
Working on new digital products and experiments.

Learning
Improving my skills in technology, business, AI, and communication.

Exploring
New ideas around startups, education, AI, and personal development.

Add a small "Last updated" label.

Currently Section

Add a subtle horizontal section containing small status indicators:

Building: Digital products
Learning: AI · Business · Technology
Reading: Books & research
Exploring: New ideas

Make these visually elegant.

Footer

Create a sophisticated minimal footer.

Large text:

ibroh.im

Small description:

A personal space for ideas, projects, and experiments.

Links:

Instagram

Telegram

LinkedIn

GitHub

Email

Add:

© 2026 Ibrohimbek

Important UX Requirements

The site must be:

Fully responsive

Fast

Accessible

SEO-friendly

Semantic HTML

Clean URL structure

Smooth page transitions

Subtle scroll animations

Keyboard accessible

Mobile-first

Use modern component architecture so new sections and pages can easily be added later.

Future-ready Architecture

Even though this is only the first simple version, structure the project so it can later expand into:

/about

/projects

/projects/[slug]

/writing

/writing/[slug]

/books

/notes

/now

/uses

/contact

/timeline

/ideas

Do not implement all of these pages yet.

Only create the main homepage and basic navigation placeholders.

Visual Details

Use a high-quality modern sans-serif font.

Typography should be the main visual element.

Use subtle animations such as:

fade-in on scroll

slight card movement on hover

smooth navigation

subtle link underline animations

Keep animations fast and understated.

Do not overdesign.

The website should look like something a thoughtful tech creator actually uses, rather than an AI-generated portfolio template.

Technical Direction

Build the site with a modern React-based architecture.

Use reusable components for:

Navbar

Hero

ProjectCard

ArticleCard

SectionHeader

Footer

Button

Tag/Badge

Keep content data separated from UI components so projects and articles can easily be changed later.

Use placeholder images/visuals where needed, but keep the overall design attractive even without images.

The final result should feel premium, personal, minimal, editorial, and modern.

The most important goal:

Make ibroh.im feel like a digital home, not just a portfolio.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c59e7e81-31d6-40ef-83cd-c6756cd2cc77).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
