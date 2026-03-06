---
title: Privacy Statement
description: TPEN3 Privacy Statement - How we collect, use, and protect your information
permalink: /privacy
---

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Statement | TPEN3</title>
    <script type="module" src="components/gui/site/index.js"></script>
    <link href="components/gui/site/index.css" rel="stylesheet" type="text/css" />
    <style>
        .privacy-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 1em;
            line-height: 1.6;
            color: var(--dark, #2d2d2d);
        }

        .privacy-content h2 {
            color: var(--primary-color, hsl(186, 84%, 40%));
            margin-top: 2em;
            margin-bottom: 0.5em;
            padding-bottom: 0.3em;
            border-bottom: 2px solid var(--light-color, hsl(186, 84%, 90%));
        }

        .privacy-content h3 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }

        .privacy-version {
            background-color: var(--light-color, hsl(186, 84%, 90%));
            padding: 1em;
            border-radius: 0.5em;
            margin-bottom: 2em;
            font-size: 0.9em;
        }

        .privacy-toc {
            background-color: #f7f7f7;
            padding: 1.5em;
            border-radius: 0.5em;
            margin-bottom: 2em;
        }

        .privacy-toc ol {
            margin: 0.5em 0 0 1.5em;
            padding: 0;
        }

        .privacy-toc li {
            margin-bottom: 0.3em;
        }

        .privacy-toc a {
            text-decoration: none;
            color: var(--primary-color, hsl(186, 84%, 40%));
        }

        .privacy-toc a:hover {
            text-decoration: underline;
        }

        .privacy-content ul,
        .privacy-content ol {
            margin-left: 1.5em;
            margin-bottom: 1em;
        }

        .privacy-content li {
            margin-bottom: 0.4em;
        }

        .highlight-box {
            background-color: var(--light-color, hsl(186, 84%, 90%));
            border-left: 4px solid var(--primary-color, hsl(186, 84%, 40%));
            padding: 1em;
            margin: 1em 0;
            border-radius: 0 0.5em 0.5em 0;
        }

        .highlight-box p {
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            font-size: 0.95em;
        }

        th {
            background-color: var(--dark, #2d2d2d);
            border: 1px solid var(--dark, #2d2d2d);
            color:  white;
            padding: 0.75em;
            text-align: left;
            font-weight: bold;
        }

        td {
            border: 1px solid var(--dark, #2d2d2d);
            background-color:  white;
            color: var(--dark, #2d2d2d);
            padding: 0.75em;
            vertical-align: top;
        }
    </style>
</head>

<body>
    <tpen-page>
        <div class="privacy-content">
            <h1>Privacy Statement</h1>

            <div class="privacy-version">
                <strong>Version:</strong> 1.0<br>
                <strong>Last Updated:</strong> February 16, 2026<br>
                <strong>Effective Date:</strong> February 16, 2026
            </div>

            <p>
                TPEN3 is operated by the Research Computing Group at Saint Louis University. We provide web-based tools
                for transcribing manuscripts and historical documents. This privacy statement explains how we collect,
                use, and protect your information when you use TPEN3 at
                <strong>three.t-pen.org</strong> and <strong>app.t-pen.org</strong>.
            </p>

            <div class="highlight-box">
                <p><strong>We do not sell your personal information. We do not use tracking cookies or advertising.</strong></p>
            </div>

            <nav class="privacy-toc" aria-label="Table of Contents">
                <strong>Table of Contents</strong>
                <ol>
                    <li><a href="#who-we-are">Who We Are</a></li>
                    <li><a href="#what-we-collect">Information We Collect</a></li>
                    <li><a href="#how-we-use">How We Use Your Information</a></li>
                    <li><a href="#information-sharing">Information Sharing &amp; Public Disclosure</a></li>
                    <li><a href="#third-party-services">Third-Party Services</a></li>
                    <li><a href="#cookies-and-storage">Cookies &amp; Local Storage</a></li>
                    <li><a href="#security">How We Protect Your Information</a></li>
                    <li><a href="#data-retention">Data Retention &amp; Deletion</a></li>
                    <li><a href="#gdpr-rights">Your Rights Under GDPR (European Users)</a></li>
                    <li><a href="#ccpa-rights">Your Rights Under CCPA/CPRA (California &amp; US Users)</a></li>
                    <li><a href="#gpc">Global Privacy Control (GPC)</a></li>
                    <li><a href="#children">Children's Privacy</a></li>
                    <li><a href="#changes-and-contact">Changes &amp; Contact</a></li>
                </ol>
            </nav>

            <!-- Section 1 -->
            <h2 id="who-we-are">1. Who We Are</h2>
            <p>
                TPEN (Transcription for Paleographical and Editorial Notation) is a web-based transcription platform
                developed and maintained by the <strong>Research Computing Group</strong> at
                <strong>Saint Louis University</strong>, St. Louis, Missouri, United States.
            </p>
            <p>
                Our services are available at:
            </p>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Domain</th>
                        <th scope="col">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>three.t-pen.org</strong></td>
                        <td>TPEN3 home and authentication</td>
                    </tr>
                    <tr>
                        <td><strong>app.t-pen.org</strong></td>
                        <td>TPEN3 application interface</td>
                    </tr>
                    <tr>
                        <td><strong>api.t-pen.org</strong></td>
                        <td>TPEN3 services API
                            (<a href="https://api.t-pen.org/API.html" target="_blank"
                                rel="noopener noreferrer">documentation</a>)</td>
                    </tr>
                    <tr>
                        <td><strong>static.t-pen.org</strong></td>
                        <td>Published Project Resources</td>
                    </tr>
                </tbody>
            </table>
            <p>
                TPEN3 source code is open source under the
                <a href="https://github.com/CenterForDigitalHumanities/TPEN-interfaces/blob/main/LICENSE"
                    target="_blank" rel="noopener noreferrer">Apache License 2.0</a>.
                Non-code content (documentation, images) is licensed under
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
                    rel="noopener noreferrer">CC BY 4.0</a>.
            </p>

            <!-- Section 2 -->
            <h2 id="what-we-collect">2. Information We Collect</h2>

            <h3>A. Account &amp; Authentication Data</h3>
            <p>
                Auth0 is the identity provider for RERUM services, of which TPEN is one. When you log in, a public
                agent IRI is created and associated with your login token. Authentication generates a JSON Web Token
                (JWT) that contains your user ID, agent identifier (IRI), and an expiration timestamp.
                T-PEN.org does not display or share user emails through its services. No passwords are stored by
                TPEN directly.
            </p>

            <h3>B. Profile Information (Opt-In)</h3>
            <p>
                You may opt in to sharing the following on your public profile with other TPEN users.
                None of these are required:
            </p>
            <ul>
                <li>Display name (defaults to your email handle and may be identifying if not changed)</li>
                <li>Profile image URL</li>
                <li>Academic identifiers: ORCID ID, NSF ID, Institutional ID</li>
                <li>Social links: LinkedIn, Twitter, Instagram, Facebook, GitHub, Homepage URL</li>
            </ul>

            <h3>C. User-Generated Content</h3>
            <ul>
                <li><strong>Transcriptions and annotations</strong> &mdash; Stored in RERUM (our linked open data
                    store) and publicly accessible by design for open scholarship</li>
                <li><strong>Feedback and bug reports</strong> &mdash; Submitted through TPEN and posted as GitHub Issues
                    (includes your description and the page URL you submitted from)</li>
                <li><strong>Transcription drafts</strong> &mdash; Auto-saved in your browser's local storage to prevent
                    data loss during editing</li>
                <li><strong>Cached resources</strong> &mdash; Downloaded resources (images, manifest documents) and
                    your authentication token (idToken) are stored in your browser's local storage for performance
                    and session continuity</li>
            </ul>

            <h3>D. Project &amp; Collaboration Data</h3>
            <ul>
                <li>Project membership and your assigned role (Owner, Leader, Contributor, or Viewer), linked
                    to your public Agent</li>
                <li>Email addresses of users you invite to collaborate (stored to connect invite codes to
                    temporary accounts until the invitee accepts)</li>
            </ul>

            <h3>E. Activity Data</h3>
            <p>
                We track per User metrics on the server to power features like the "continue working" panel on
                your dashboard. This includes which projects you recently edited and when projects were last modified.
            </p>

            <h3>F. Technical Information</h3>
            <p>
                When your browser loads TPEN or fetches resources from third-party CDNs and external servers, the
                following is automatically sent by your browser as part of standard HTTP requests:
            </p>
            <ul>
                <li>IP address</li>
                <li>User-Agent string (browser type and operating system)</li>
                <li>Referer header</li>
            </ul>
            <p>
                TPEN does not explicitly collect or store this information on our servers, but third-party CDN providers
                and external image servers may log it per their own privacy policies.
            </p>

            <!-- Section 3 -->
            <h2 id="how-we-use">3. How We Use Your Information</h2>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Purpose</th>
                        <th scope="col">Data Used</th>
                        <th scope="col">Legal Basis (GDPR)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Account authentication</td>
                        <td>Email, JWT tokens</td>
                        <td>Contractual necessity</td>
                    </tr>
                    <tr>
                        <td>Attribute transcriptions to authors</td>
                        <td>Public user agent</td>
                        <td>Legitimate interest (academic attribution)</td>
                    </tr>
                    <tr>
                        <td>Project collaboration</td>
                        <td>Email, display name, roles</td>
                        <td>Contractual necessity</td>
                    </tr>
                    <tr>
                        <td>Display your public profile</td>
                        <td>Optional profile fields</td>
                        <td>Consent (you choose to provide them)</td>
                    </tr>
                    <tr>
                        <td>Show recent projects on dashboard</td>
                        <td>Activity timestamps, project IDs</td>
                        <td>Legitimate interest (user experience)</td>
                    </tr>
                    <tr>
                        <td>Import projects from TPEN 2.8</td>
                        <td>Legacy project data, temporary cookie</td>
                        <td>Contractual necessity</td>
                    </tr>
                </tbody>
            </table>

            <div class="highlight-box">
                <p><strong>We do not sell or rent your personal information to anyone.</strong></p>
            </div>

            <!-- Section 4 -->
            <h2 id="information-sharing">4. Information Sharing &amp; Public Disclosure</h2>

            <h3>A. Publicly Accessible Information</h3>
            <ul>
                <li><strong>Transcriptions and annotations</strong> are publicly accessible via
                    <a href="https://rerum.io" target="_blank" rel="noopener noreferrer">RERUM</a> and
                    attributed to your public user agent (not your email address)</li>
                <li><strong>Public profile</strong> information you choose to provide (display name, social links)
                    is visible at your public profile endpoint</li>
                <li><strong>Public projects</strong> and their metadata are visible to unauthenticated users</li>
                <li><strong>Published resources</strong> &mdash; When you choose to export your project, resources
                    are published to <strong>static.t-pen.org</strong> (hosted on GitHub Pages). These URLs are
                    obscure but openly available to anyone with the direct link</li>
            </ul>

            <h3>B. Shared with Project Collaborators</h3>
            <p>
                Members of projects you belong to can see your display name and role within that project. Email
                addresses are not available to the TPEN interfaces at all and are only used server-side for sending
                invitations.
            </p>

            <h3>C. Feedback Submissions</h3>
            <p>
                When you submit feedback or a bug report through TPEN, it creates a public GitHub Issue in our
                <a href="https://github.com/CenterForDigitalHumanities/TPEN-Static" target="_blank"
                    rel="noopener noreferrer">TPEN-Static repository</a>. No user information is included in
                the report&mdash;only what you type and the page URL you submitted from.
            </p>

            <h3>D. TPEN 2.8 Legacy Import</h3>
            <p>
                When importing projects from the legacy TPEN 2.8 system (t-pen.org), we temporarily set a cookie to
                authenticate with the legacy system. This cookie uses <code>SameSite=Strict</code> and
                <code>Secure</code> attributes (in production) and is deleted immediately after import completes. We do
                not share your TPEN3 account information with TPEN 2.8. The legacy system operates under its own
                separate policies.
            </p>

            <h3>E. Legal Obligations</h3>
            <p>
                We may disclose information if required by law, court order, or government regulation.
            </p>

            <!-- Section 5 -->
            <h2 id="third-party-services">5. Third-Party Services</h2>

            <h3>A. Authentication</h3>
            <p>
                <strong>Auth0</strong> manages login and stores your email address. Auth0 issues the JWT tokens used
                for authentication.
                <a href="https://auth0.com/privacy" target="_blank" rel="noopener noreferrer">Auth0 Privacy Policy</a>
            </p>

            <h3>B. Data Storage</h3>
            <p>
                <strong>RERUM</strong> (store.rerum.io) is our linked open data store for transcriptions and
                annotations. RERUM is operated by the Research Computing Group at Saint Louis University. Transcriptions
                stored in RERUM are publicly accessible by design to support open scholarship and are attributed to your
                public user agent.
            </p>

            <h3>C. Email Delivery</h3>
            <p>
                When you invite collaborators to a project, invitation emails are sent through a mailrelay server
                at <strong>Saint Louis University</strong>. The invitee's email address is only used for sending
                the invitation and is not stored by the mail service for any other purpose.
            </p>

            <h3>D. Hosting</h3>
            <p>
                <strong>GitHub Pages</strong> hosts portions of this application as well as published project
                resources at <strong>static.t-pen.org</strong>. When you export a project, its resources are
                deployed to this static site and become publicly accessible. GitHub may log IP addresses and
                access patterns per their policy.
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                    target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>
            </p>

            <h3>E. Content Delivery Networks (CDNs) &amp; External Libraries</h3>
            <p>
                TPEN3 is built on modular interfaces that may load libraries and frameworks served over third-party
                CDNs (such as jsDelivr, Cloudflare, Skypack, and unpkg). Your browser also loads fonts from
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google
                Fonts</a>. These providers may log your IP address and User-Agent string per their own privacy
                policies. We do not control these third-party services.
            </p>

            <h3>F. External Resource Servers</h3>
            <p>
                When you import manifest documents or view manuscript images, your browser directly contacts the
                external servers hosting those resources (museums, libraries, archives). These servers may log your
                IP address and browser metadata per their own privacy policies. TPEN does not control these
                third-party services.
            </p>

            <!-- Section 6 -->
            <h2 id="cookies-and-storage">6. Cookies &amp; Local Storage</h2>

            <h3>A. Cookies</h3>
            <p>
                TPEN uses <strong>one cookie</strong>, and only during a specific operation:
            </p>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Attributes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>userToken</code></td>
                        <td>Authenticate with legacy TPEN 2.8 during project import</td>
                        <td>Deleted immediately after import completes</td>
                        <td><code>SameSite=Strict</code>, <code>Secure</code> (production), <code>path=/</code>,
                            <code>domain=t-pen.org</code></td>
                    </tr>
                </tbody>
            </table>
            <p>
                This cookie is <strong>strictly necessary</strong> for the import feature to function and does not
                require consent under GDPR Article 6(1)(b) and the ePrivacy Directive.
            </p>
            <div class="highlight-box">
                <p><strong>We do not use tracking cookies, advertising cookies, or third-party analytics cookies.</strong></p>
            </div>

            <h3>B. Browser Local Storage</h3>
            <p>
                TPEN uses your browser's localStorage for core functionality:
            </p>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Key</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>userToken</code></td>
                        <td>Your JWT authentication token for staying logged in</td>
                        <td>Until logout or token expiration</td>
                    </tr>
                    <tr>
                        <td><code>tpen-drafts:{projectID}:{pageID}</code></td>
                        <td>Auto-saved transcription drafts to prevent data loss</td>
                        <td>Until you save the transcription or clear browser storage</td>
                    </tr>
                    <tr>
                        <td><code>vault:{type}:{id}</code></td>
                        <td>Cached resources (canvases, annotation pages) for faster page loads</td>
                        <td>Until browser storage is cleared</td>
                    </tr>
                    <tr>
                        <td><code>tpen_redirected</code></td>
                        <td>Prevents repeated login redirects</td>
                        <td>Until browser storage is cleared</td>
                    </tr>
                    <tr>
                        <td><code>annotationsState</code></td>
                        <td>Preserves column selection during multi-step editing</td>
                        <td>Cleared on completion or cancellation</td>
                    </tr>
                </tbody>
            </table>

            <h3>C. What Happens When You Log Out</h3>
            <p>
                When you log out, your authentication token is removed from localStorage. Cached resources and
                transcription drafts may remain in your browser's local storage until you clear them manually or
                your browser storage is cleared.
            </p>

            <!-- Section 7 -->
            <h2 id="security">7. How We Protect Your Information</h2>
            <ul>
                <li><strong>Encrypted transmission</strong> &mdash; All data is transmitted over HTTPS (TLS)</li>
                <li><strong>Token-based authentication</strong> &mdash; JWT tokens with automatic expiration</li>
                <li><strong>Role-based access control</strong> &mdash; Project access limited to assigned roles
                    (Owner, Leader, Contributor, Viewer)</li>
                <li><strong>Open-source codebase</strong> &mdash; Publicly auditable code allows community
                    security review</li>
                <li><strong>Token cleanup</strong> &mdash; Authentication tokens are immediately removed from
                    the browser history after login to prevent accidental sharing</li>
            </ul>
            <p>
                No security system is perfect. While we implement industry-standard protections, we cannot guarantee
                absolute security. You are responsible for keeping your login credentials confidential and logging out
                on shared computers.
            </p>
            <p>
                In the event of a data breach affecting your personal information, we will make reasonable efforts
                to notify affected users and relevant authorities in accordance with GDPR and applicable US state
                regulations.
            </p>

            <!-- Section 8 -->
            <h2 id="data-retention">8. Data Retention &amp; Deletion</h2>

            <h3>A. Account Data</h3>
            <p>
                Your account data (email, profile information) is retained while your account is active.
                Authentication tokens expire automatically.
            </p>

            <h3>B. Transcriptions &amp; Annotations</h3>
            <p>
                Transcriptions and annotations are stored permanently in RERUM as public linked open data. This is by
                design to support long-term preservation, scholarly citation, and open access. Transcriptions are
                attributed to your public user agent rather than personal information like email addresses. Under
                GDPR Article 17(3)(d), the right to erasure does not apply where processing is necessary for archiving
                purposes in the public interest or scientific research.
            </p>

            <h3>C. Local Storage</h3>
            <p>
                Your authentication token is removed from browser storage when you log out. Cached resources and
                transcription drafts may persist until cleared manually or by your browser. Orphaned transcription
                drafts for lines that no longer exist are automatically cleaned up when you next visit the page.
            </p>

            <h3>D. Account Deletion</h3>
            <p>
                To request account deletion, contact us at
                <a href="mailto:research.computing@slu.edu">research.computing@slu.edu</a>.
                We can delete or anonymize your account while preserving the scholarly integrity of transcriptions
                attributed to your agent identifier. We will respond within 30 days.
            </p>

            <!-- Section 9 -->
            <h2 id="gdpr-rights">9. Your Rights Under GDPR (European Users)</h2>
            <p>
                If you are in the European Union, European Economic Area, or United Kingdom, you have the following
                rights under the General Data Protection Regulation:
            </p>
            <ul>
                <li><strong>Right of Access</strong> (Article 15) &mdash; Request a copy of the personal data we hold
                    about you</li>
                <li><strong>Right to Rectification</strong> (Article 16) &mdash; Correct inaccurate personal data
                    through your profile settings or by contacting us</li>
                <li><strong>Right to Erasure</strong> (Article 17) &mdash; Request deletion of your personal data,
                    subject to the scholarly archiving exception in Article 17(3)(d) for transcriptions stored in
                    RERUM</li>
                <li><strong>Right to Data Portability</strong> (Article 20) &mdash; Request your personal data in a
                    machine-readable format</li>
                <li><strong>Right to Withdraw Consent</strong> (Article 7(3)) &mdash; Where processing is based on
                    consent (such as optional profile information), you can withdraw consent at any time by removing
                    the information</li>
                <li><strong>Right to Object</strong> (Article 21) &mdash; Object to processing based on legitimate
                    interests</li>
                <li><strong>Right to Lodge a Complaint</strong> &mdash; File a complaint with your national data
                    protection authority if you believe your rights have been violated</li>
            </ul>
            <p>
                TPEN does not use automated decision-making or profiling that produces legal or similarly significant
                effects.
            </p>
            <p>
                To exercise your rights, contact
                <a href="mailto:research.computing@slu.edu">research.computing@slu.edu</a> with "GDPR Request" in the
                subject line. We will respond within 30 days.
            </p>

            <!-- Section 10 -->
            <h2 id="ccpa-rights">10. Your Rights Under CCPA/CPRA (California &amp; US Users)</h2>
            <p>
                If you are a California resident, you have the following rights under the California Consumer Privacy
                Act (CCPA) and California Privacy Rights Act (CPRA):
            </p>
            <ul>
                <li><strong>Right to Know</strong> &mdash; Request disclosure of what personal information we collect,
                    the sources, purposes, and third parties with whom we share it</li>
                <li><strong>Right to Delete</strong> &mdash; Request deletion of your personal information, subject to
                    exceptions for scholarly research integrity</li>
                <li><strong>Right to Correct</strong> &mdash; All public information is editable by you through
                    your profile settings</li>
                <li><strong>Right to Opt-Out of Sale or Sharing</strong> &mdash; TPEN does <strong>not sell</strong>
                    your personal information and does not share personal information for cross-context behavioral
                    advertising</li>
                <li><strong>Right to Non-Discrimination</strong> &mdash; We will not deny services, charge different
                    prices, or provide different quality of service because you exercised your CCPA rights</li>
            </ul>
            <p>
                You may designate an authorized agent to make requests on your behalf. We may require verification of
                the agent's authority.
            </p>
            <p>
                To exercise your rights, contact
                <a href="mailto:research.computing@slu.edu">research.computing@slu.edu</a> with "CCPA Request" in
                the subject line. We will verify your identity and respond within 45 days (which may be extended by
                an additional 45 days with notice).
            </p>

            <!-- Section 11 -->
            <h2 id="gpc">11. Global Privacy Control (GPC)</h2>
            <p>
                <a href="https://globalprivacycontrol.org/" target="_blank" rel="noopener noreferrer">Global Privacy
                Control</a> (GPC) is a browser-level signal that communicates your privacy preferences to websites.
                GPC is legally recognized under California law and other jurisdictions.
            </p>
            <p>
                <strong>We honor GPC signals.</strong> Currently, TPEN does not use analytics or tracking technologies
                that would be affected by GPC. If we add such technologies in the future, GPC signals will
                automatically opt you out.
            </p>
            <p>
                You can enable GPC in browsers that support it, including Brave, Firefox (with Privacy Badger),
                DuckDuckGo, and others. Visit
                <a href="https://globalprivacycontrol.org/#browsers" target="_blank"
                    rel="noopener noreferrer">globalprivacycontrol.org</a> for a full list.
            </p>

            <!-- Section 12 -->
            <h2 id="children">12. Children's Privacy</h2>
            <p>
                TPEN is a scholarly transcription tool not specifically designed for children. We do not knowingly
                collect personal information from children under 13 without verifiable parental consent. If you believe
                a child under 13 has provided us with personal information, please contact us at
                <a href="mailto:research.computing@slu.edu">research.computing@slu.edu</a> and we will take steps to
                delete that information.
            </p>

            <!-- Section 13 -->
            <h2 id="changes-and-contact">13. Changes &amp; Contact</h2>

            <h3>A. Updates to This Statement</h3>
            <p>
                We may update this privacy statement to reflect changes in our practices or legal requirements.
                For material changes affecting your rights, we will provide notice on the TPEN homepage. Non-material
                changes (clarifications, formatting) will be reflected in the "Last Updated" date above.
            </p>

            <h3>B. Version History</h3>
            <ul>
                <li><strong>Version 1.0</strong> (February 16, 2026) &mdash; Initial privacy statement</li>
            </ul>

            <h3>C. Contact Us</h3>
            <p>
                For privacy questions, data requests, or concerns:
            </p>
            <p>
                <strong>Research Computing Group</strong><br>
                Saint Louis University<br>
                St. Louis, Missouri, United States<br>
                Email: <a href="mailto:research.computing@slu.edu">research.computing@slu.edu</a>
            </p>
            <p>
                When contacting us about privacy matters, please include "Privacy", "GDPR Request", or "CCPA Request"
                in the subject line so we can route your inquiry appropriately.
            </p>

            <h3>D. Additional Resources</h3>
            <ul>
                <li><a href="https://three.t-pen.org" target="_blank" rel="noopener noreferrer">TPEN3 Home</a></li>
                <li><a href="https://github.com/CenterForDigitalHumanities" target="_blank"
                        rel="noopener noreferrer">Center for Digital Humanities (GitHub)</a></li>
                <li><a href="https://globalprivacycontrol.org/" target="_blank"
                        rel="noopener noreferrer">Global Privacy Control</a></li>
            </ul>

        </div>
    </tpen-page>
</body>

</html>
