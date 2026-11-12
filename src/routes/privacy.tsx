import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy · Guardian PK" },
      { name: "description", content: "Read how Guardian PK handles your data: what stays on your phone, what an accountability partner can see, and why each permission is requested in full." },
      { property: "og:title", content: "Privacy policy · Guardian PK" },
      { property: "og:url", content: "https://guardian.pk/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://guardian.pk/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="[DATE: set on publication]">
      <div className="rounded-xl border border-line-strong bg-panel-2 p-4 text-sm text-ink-muted">
        <strong className="text-ink">Draft for legal review.</strong> Every statement below must match the shipped
        app before this page is published. Remove this notice when approved.
      </div>

      <section>
        <h2>Who we are</h2>
        <p>
          Guardian PK is a digital safety app for Android, operated by [LEGAL ENTITY NAME], [REGISTERED ADDRESS].
          Questions about this policy go to <a href="mailto:support@guardian.pk">support@guardian.pk</a>.
        </p>
      </section>

      <section>
        <h2>What stays on your phone</h2>
        <p>Guardian is designed so that your browsing and search activity is checked on your device. This includes:</p>
        <ul>
          <li>Your browsing and search history.</li>
          <li>The on-device model that classifies searches.</li>
          <li>The local domain blocklist.</li>
          <li>Your password, decoy password and Fortress lock settings.</li>
          <li>Streaks, blocked-attempt counts and activity times.</li>
        </ul>
      </section>

      <section>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not upload search text.</li>
          <li>We do not store browsing history on a server.</li>
          <li>We do not run ads, trackers or analytics on your activity.</li>
          <li>We do not require an account for core protection.</li>
          <li>We do not sell your data or share it with third parties.</li>
        </ul>
      </section>

      <section>
        <h2>Accountability partner</h2>
        <p>If you link a partner, they can see:</p>
        <ul>
          <li>Whether protection is currently on.</li>
          <li>Requests to disable or change protection.</li>
          <li>Tamper or uninstall attempts.</li>
        </ul>
        <p>They cannot see the sites you visit, what you searched for, or anything typed inside other apps.</p>
      </section>

      <section>
        <h2>Permissions</h2>
        <p>
          Guardian asks for Android permissions to enforce the features you turn on. Each one and its purpose is listed
          on the <Link to="/download" hash="permissions">download page</Link>. You can revoke any permission in
          Android settings, although some protection features will stop working when you do.
        </p>
      </section>

      <section>
        <h2>This website</h2>
        <p>
          This website uses Vercel Analytics to count page views. Fonts are served from this website, so no font
          requests go to third parties. [CONFIRM analytics configuration and whether any cookies are set.]
        </p>
      </section>

      <section>
        <h2>Data retention and deletion</h2>
        <p>
          Uninstalling Guardian removes the data stored on your phone. [CONFIRM what, if anything, is kept on any
          server, and for how long.] To request deletion of any data we hold, email support@guardian.pk.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>We will update this page and its date when this policy changes.</p>
      </section>
    </LegalPage>
  );
}